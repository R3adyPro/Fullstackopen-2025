import { useState } from 'react'
import Person from "./components/Person"
import Form from "./components/Form"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const personToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(newFilter.toLowerCase()))

  const addNumber = (event) => {
    event.preventDefault()
    console.log(event)

    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }

    const personObject = {
      name : newName,
      number : newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form >
        filter shown with: <input 
          onChange={handleFilterChange}/>
      </form>
      <h2>add a new</h2>
      <Form addNumber={addNumber} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {personToShow.map(person => 
        <Person numbers={person}/>    
      )}

    </div>
  )

}

export default App