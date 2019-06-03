import React, {useState} from 'react'
import axios from 'axios'
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import Display from './components/Display'


const App = () => {

  //Define state for adding new people
  const [ persons, setPersons] = useState([
    { name: '',
      number: '',
      id: Math.random * 10
    }
  ])

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
