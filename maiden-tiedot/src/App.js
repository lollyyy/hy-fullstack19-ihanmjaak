import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  //Define state for search
  const [ search, setSearch ] = useState('')

  //Define countries array and set state
  const [ countries, setCountries ] = useState('')

  //Event handler for search
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const getCountries = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }

useEffect(getCountries, [])

  //Search countries from API response
  //Event handler for search input
  const handleSearch = (event) => {
    event.preventDefault()

    //Set searchterm to lowercase
    const searchterm = search.toLowerCase()

    //Find search term from countries array
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchterm)
    )

    /*
    *  Ask user to specify search term
    * if search returns more than 10 countries
    * else set found countries to countries array
    */

    filtered.length > 10
    ? alert('Tarkenna hakuehtoa')
    : setCountries(filtered)

    //Reset search field
    setSearch('')
  }

  //Render single country's information
  const displaySingle = () => {
    return (
      countries.map(country =>
      <div>
        <h1 key={country.name}>{country.name}</h1>
        <p key={country.capital}>{country.capital}</p>
        <p key={country.population}>{country.population}</p>
      <h2>Languages</h2>
        {country.languages.map(language =>
        <li key={language.name}>{language.name}</li>)}
        <img src={country.flag} alt='Country flag'/>

      </div>
    )
  )
  }

  //Map out country names
  //Return message if API response is empty
  const displayCountries = () => {
    return (
    countries === ''
      ? <p>Fetching countries...</p>
      :  countries.map(country =>
      <div>
      <p key={country.name}>{country.name}</p>
      <button onClick={}>show</button>
      </div>
      )
    )
  }

  return (
  <div>
   <form onSubmit = {handleSearch}>
    Hae maata: <input value = {search}
                      onChange = {handleSearchChange}/>
    </form>

    <div>{
      countries.length === 1
      ? displaySingle()
      : displayCountries()
    }</div>

  </div>
  )
}

export default App
