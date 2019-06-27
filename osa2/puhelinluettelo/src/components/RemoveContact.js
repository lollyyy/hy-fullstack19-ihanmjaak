import React from 'react'
import personService from '../services/personService'

const RemoveContact = ({id, name, messages, setMessages, persons, setPersons}) => {
  const removal = () => {
  //Ask user for confirmation
  window.confirm(`Poistetaanko ${name} luettelosta?`)
  //if true, trigger HTTP delete request
  ? personService
    .remove(id)
    //After removal, rerender contact list
    .then(res => {
      setPersons(persons.filter(person => person.id !== id) )
      setMessages(`${name} poistettu luettelosta`)
    }
    )
    
    //if false, go back to contact list
  : console.log('Contact not removed')
}

return (
  <button onClick={removal}>Remove contact
  </button>
)


}

export default RemoveContact
