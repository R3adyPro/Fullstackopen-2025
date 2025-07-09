import { useState, useEffect } from 'react'
import Person from "./components/Person"
import Form from "./components/Form"
import Filter from "./components/Filter"
import personServises from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personServises
      .getALl()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const personToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(newFilter.toLowerCase()))

  const addNumber = (event) => {
    event.preventDefault()
    const isAlready = persons.find(person => person.name === newName)
    const personObject = {
      name : newName,
      number : newNumber
    }

    if (persons.some(person => person.name === newName)){
      if (window.confirm(`${isAlready.name} is already added to phonebook, replace the old number with a new one?`)){
        personServises
          .update(isAlready.id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== isAlready.id ? person : response))
          })
          .catch(error => {
            console.error(error)
          })
      }
    } 
    else {
      personServises
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
        })
        .catch(error => {
          console.error(error)
        })
      setNewName('')
      setNewNumber('')
    }

  }

  const deletePerson = (id) => {
    if (window.confirm(`delete ${persons.find(p => p.id === id).name}`)){
      personServises
        .deletePerson(id)
        .then(initialPersons => {
          console.log(initialPersons)
        })
        .catch(error => {
          console.error(error)
        })

      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  console.log(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Form addNumber={addNumber} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {personToShow.map(person => 
        <Person
          key={person.id}
          person={person} 
          handleDelete={() => deletePerson(person.id)}
          />    
      )}

    </div>
  )

}

export default App