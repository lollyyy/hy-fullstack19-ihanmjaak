import React from 'react'
import personService from '../services/personService'

const RemoveContact = ({id, name, persons, setPersons}) => {
  const removal = () => {
  //Ask user for confirmation
  window.confirm(`Remove ${name} from contacts?`)
  //if true, trigger HTTP delete request
  ? personService
    .remove(id)
    //After removal, rerender contact list
    .then(
      setPersons(persons)
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
