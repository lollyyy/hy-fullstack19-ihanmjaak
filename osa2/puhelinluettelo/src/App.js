import React, {useState, useEffect} from 'react'
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import Display from './components/Display'
import personService from './services/personService'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const App = () => {

  //Define state for adding new people
  const [ persons, setPersons ] = useState([])

  //Define state for messages
  const [ messages, setMessages ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h1>Puhelinluettelo</h1>

      <Notification message={messages}/>

      <Filter
        persons={persons} setPersons={setPersons}
        messages={messages} setMessages={setMessages}
        />

      <h2>Lisää uusi yhteystieto:</h2>
      <AddContact
        persons={persons} setPersons={setPersons}
        messages={messages} setMessages={setMessages}
      />

      <h2>Numerot</h2>
      <Display
        persons={persons} setPersons={setPersons}
        messages={messages} setMessages={setMessages}
      />

    </div>
  )
}

export default App
