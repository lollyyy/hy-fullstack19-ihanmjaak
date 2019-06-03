import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = (props) => {
  //Define state for adding new notes
  const [notes, setNotes] = useState([])

  //Define new state for input field
  const [newNote, setNewNote] = useState(
    'uusi muistiinpano...'
  )

  //Add a state for showing all setNotes
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
    }

    useEffect(hook, [])
    console.log('render', notes.length, 'notes')

  //Add event handler for input field
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    //synchronize input changes to App state
    setNewNote(event.target.value)
  }

  //Filter notes on importance and store important notes to notesToShow variable
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  //Render Note component
  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
    />
  )

  //Add event handler for adding notes
  const addNote = (event) => {
    event.preventDefault()
    //Create new object for note
    const noteObject = {
      //Fetch note content from newNote state
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length +1,
    }

    //Concatenate noteObject to notes array
    setNotes(notes.concat(noteObject))
    //Clear input field after submitting note
    setNewNote('')
  }

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? 'vain tärkeät' : 'kaikki' }
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Tallenna</button>
      </form>
    </div>
  )
}

export default App
