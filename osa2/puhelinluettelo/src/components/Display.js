import React from 'react'
import RemoveContact from './RemoveContact'

const Display = ({persons, setPersons}) => {

const names = persons.map(person =>
     <li key={person.id}>
       {person.name} <em key={person.number}>{person.number}</em>
       <RemoveContact id={person.id} name={person.name} setPersons={setPersons} persons={persons}/>
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
