import { useEffect, useState } from 'react'
import personService from './services/person'
import './app.css'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'
import NotificationSuccess from './components/Notifications/Success'
import NotificationError from './components/Notifications/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .all()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const hanldeChangeName = (event) => {
    setNewName(event.target.value)
  }

  const hanldeChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    let person = persons.find(person => person.name === newName)

    if(! person) {
      let personObject = {name: newName, number: newNumber}
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${returnedPerson.name}`)
        })
    } else {
      let confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if(confirm) {
        let personObject = {...person, number: newNumber}
        personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Updated ${returnedPerson.name}`)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    }

    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const destroyPerson = (id, name) => {
    const confirm = window.confirm(`Delete ${name}`)
    if(confirm) {
      personService
        .destroy(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`Person '${name}' was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleChangeSearch = (event) => {
    setSearch(event.target.value)
  }

  const showPersons = search 
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <NotificationSuccess message={successMessage} />
      <NotificationError message={errorMessage} />
      
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

      <Persons 
        persons={showPersons} 
        handleClickDestroyPerson={destroyPerson}
      />
    </div>
  )
}

export default App
