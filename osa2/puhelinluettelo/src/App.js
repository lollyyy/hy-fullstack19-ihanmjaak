import React, { useState } from 'react'

const App = () => {
  //Define state for adding new people
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      date: '',
      id: ''}
  ])

  //Define state for input field
  const [ newName, setNewName ] = useState('')

  //Create event handler for form input
  const handleContactChange = (event) => {
    setNewName(event.target.value)
  }

  //Add event handler to submit contact
  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      date: new Date().toISOString(),
      id: persons.length + 1,
    }

    setPersons(persons.concat(contactObject))
    setNewName('')
  }

  //Display names in <li> tag
  const names = () => persons.map(person => <li key={person.id}>{person.name}</li>)

  //Check for duplicates
  const values = persons.map(person => person.name)
  console.log(values)
  console.log(values.includes('Arto Hellas'))

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addContact}>
        <div>
          nimi: <input value={newName}
                onChange={handleContactChange}
                />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
        <ul>
          {names()}
        </ul>
    </div>
  )
}

export default App
