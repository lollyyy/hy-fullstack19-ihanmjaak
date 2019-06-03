import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import Display from './components/Display'


const App = () => {

  //Define state for adding new people
  const [ persons, setPersons] = useState([
    { name: '',
      number: '',
      id: Math.random * 1000
    }
  ])

  const personsHook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(personsHook, [])



  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter persons={persons} setPersons={setPersons}/>

      <h2>Lisää uusi yhteystieto:</h2>
      <AddContact persons={persons} setPersons={setPersons}/>

      <h2>Numerot</h2>
      <Display persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App
