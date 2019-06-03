import React, { useState } from 'react'

const App = () => {
  //Define state for adding new people
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123123'},
    { name: 'Ihmis Persoona', number: '040-456456'},
    { name: 'John Doe', number: '040-789789'}
  ])

  //Define state for input field
  const [ newName, setNewName ] = useState('')

  //Define state for number input field
  const [ newNumber, setNewNumber ] = useState('')

  //Define state for search
  const [ search, setSearch ] = useState('')

  //Create event handler for form input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  //Event handler for number input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //Event handler for search
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
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

    const names =
     persons.map(person =>
       <li key={person.id}>
         {person.name} <em>{person.number}</em>
       </li>
     )

  //Search function for persons array
  //Event handler for search input
  const handleSearch = (event) => {
    event.preventDefault()

    //Set search term to lowercase letters
    const searchTerm = search.toLowerCase()

    //Filter all names that contain search term
    setPersons(persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm)))

    //Reset search field
    setSearch('')
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <div>
       <form onSubmit = {handleSearch}>
        Hae luettelosta: <input value = {search}
                          onChange = {handleSearchChange}/>
        </form>
      </div>

      <form onSubmit={addContact}>
      <h2>Lisää uusi yhteystieto:</h2>
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
      <h2>Numerot</h2>
        <ul>
          {names}
        </ul>
    </div>
  )
}

export default App
