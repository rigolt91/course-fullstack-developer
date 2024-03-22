import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const hanldeChangeName = (event) => {
    setNewName(event.target.value)
  }

  const hanldeChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    let existPerson = persons.find(person => person.name.toLowerCase().search(newName.toLowerCase()))

    if(! existPerson) {
      let personObject = {name: newName, number: newNumber}
      setPersons(persons.concat(personObject))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleChangeSearch = (event) => {
    setSearch(event.target.value)
  }

  const showPersons = search 
    ? persons.filter(person => person.name.toLowerCase() === search.toLowerCase())
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter 
        value={search} 
        onChange={handleChangeSearch}        
      />

      <h2>Add a new</h2>

      <PersonForm 
        newName={newName}
        hanldeChangeName={hanldeChangeName}
        newNumber={newNumber}
        hanldeChangeNumber={hanldeChangeNumber}
        onSubmit={addPerson}
      />
      
      <h2>Numbers</h2>

      <Persons persons={showPersons} />
    </div>
  )
}

export default App
