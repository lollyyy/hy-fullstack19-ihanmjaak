import React from 'react';

const Display = ({persons, setPersons}) => {

const names = persons.map(person =>
     <li key={person.id}>
       {person.name} <em key={person.number}>{person.number}</em>
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
