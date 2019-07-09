const mongoose = require('mongoose')

if( process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jaak_mongoUSR:${password}@jaak-cluster-wggom.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({ important: true }).then(res => {
  res.map(note =>
    console.log(note)
  )
  mongoose.connection.close()
})
