import React from 'react'
import RemoveContact from './RemoveContact'

const Display = ({persons, setPersons, messages, setMessages}) => {

const names = persons.map(person =>
     <li key={person.id}>
       {person.name} <em key={person.number}>{person.number}</em>
       <RemoveContact persons={persons} setPersons={setPersons}
                      id={person.id} name={person.name}
                      messages={messages} setMessages={setMessages}/>
     </li>
   )

return (
  <div>
      <ul>
        {names}
      </ul>
  </div>
)

}
export default Display
