import React, {useState} from 'react';

const AddContact = ({persons, setPersons}) => {


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
      id: persons.length + 1,
    }

    //Check for duplicates
    const duplicateValue = persons.map(person => person.name)
    duplicateValue.includes(newName)
    ? alert(`${newName} on jo luettelossa`)
    : setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
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
