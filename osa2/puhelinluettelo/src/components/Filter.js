import React, {useState} from 'react';

const Filter = ({persons, setPersons}) => {


  //Define state for search
  const [ search, setSearch ] = useState('')

  //Event handler for search
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

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
   <form onSubmit = {handleSearch}>
    Hae luettelosta: <input value = {search}
                      onChange = {handleSearchChange}/>
    </form>
  </div>

  )
}
export default Filter
