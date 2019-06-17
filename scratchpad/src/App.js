import React, {useState, useEffect} from 'react'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
     <br />
     <em>Note app, Department of Computer Science, University of Helsinki 2019</em>
    </div>
  )
}

const App = (props) => {
  //Define state for adding new notes
  const [notes, setNotes] = useState([])

  //Define new state for input field
  const [newNote, setNewNote] = useState('')

  //Add a state for showing all setNotes
  const [showAll, setShowAll] = useState(true)

  //Add error message state
  const [ errorMessage, setErrorMessage ] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  console.log('render', notes.length, 'notes')

  //Add event handler for input field
  const handleNoteChange = (event) => {
    //synchronize input changes to App state
    setNewNote(event.target.value)
  }

  //Filter notes on importance and store important notes to notesToShow variable
  const Note = ({ note, toggleImportance }) => {
    const label = note.important
      ? 'make not important' : 'make important'

    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }


  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  //Filter notes on importance and store important notes to notesToShow variable
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const rows = () => notesToShow.map(note =>
  <Note
    key={note.id}
    note={note}
    toggleImportance={() => toggleImportanceOf(note.id)}
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
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  return (
    <div>
      <h1>Muistiinpanot</h1>

      <Notification message={errorMessage} />

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
          placeholder='Uusi muistiinpano...'
        />
        <button type="submit">Tallenna</button>
      </form>

      <Footer />

    </div>
  )
}

export default App
