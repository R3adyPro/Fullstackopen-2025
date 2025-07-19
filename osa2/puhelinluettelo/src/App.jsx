import { useState, useEffect } from 'react'
import Person from "./components/Person"
import Form from "./components/Form"
import Filter from "./components/Filter"
import personServises from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    console.log('effect')
    console.log(persons)
    personServises
      .getALl()
      .then(initialPersons => {
        setPersons(initialPersons), console.log('testi', initialPersons)
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
            setNewName('')
            setNewNumber('')
            setMessageType('success')
            setMessage(`Updated ${response.name}`)
          })
          .catch(error => {
            setMessageType('error')
            setMessage(`Information of ${isAlready.name} has been already been removed from server`)
            console.log(message)
          })
      }
    } 
    else {
      personServises
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setMessageType('success')
          setMessage(`Added ${response.name}`)
        })
        .catch(error => {
          setMessageType('error')
          setMessage(error.response.data.error)
        })
      setNewName('')
      setNewNumber('')
    }

  }

  const deletePerson = (id) => {
    if (window.confirm(`delete ${persons.find(p => p.id === id).name}`)){
      personServises
        .deletePerson(id)
        .then(response => {
          setMessageType('success')
          setMessage(`deleted ${persons.find(p => p.id === id).name}`)
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
      <Notification message={message} type={messageType}/>
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