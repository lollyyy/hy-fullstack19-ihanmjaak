import React, { useState } from 'react'
import personService from '../services/personService'

const AddContact = ({persons, setPersons, messages, setMessages}) => {

  //Define state for input field
  const [ newName, setNewName ] = useState('')

  //Define state for number input field
  const [ newNumber, setNewNumber ] = useState('')

  //Create event handler for form input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  //Event handler for number input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //Add event handler to submit contact
  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
    }

    //Add contacts to JSON server
    const addToServer = () => {
      personService
        .create(contactObject)
        .then(returnedPerson => {

          setPersons(persons.concat(returnedPerson))
          setMessages(`${newName} lisätty luetteloon`)

          setNewName('')
          setNewNumber('')

          setTimeout(() => {
            setMessages(null)
          }, 1500)
        })
    }

    const replaceNumber = found => {
      window.confirm(`${newName} on jo luettelossa, korvataanko
                      olemassa oleva numero?`)
      ? personService
        .update(found.id, contactObject)
        .then(returnedPerson => {

          setMessages(`Numero päivitetty yhteystiedolle ${newName}`)
          setNewName('')
          setNewNumber('')
          setPersons(persons)
        })
      : console.log('Contact not updated')
    }

    //Check for duplicates
    function duplicateValue(person) {
      return person.name === newName
    }

    const found = persons.find(duplicateValue)

    persons.find(duplicateValue)
    ? replaceNumber(found)
    : addToServer()
  }

  return (

    <form onSubmit={addContact}>
      <div>
        nimi: <input value={newName}
              onChange={handleNameChange}
              />
      </div>
      <div>
        numero: <input value={newNumber}
                  onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default AddContact
