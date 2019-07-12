const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jaak_mongoUSR:${password}@jaak-cluster-wggom.mongodb.net/persons-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length < 4 ) {
  console.log(
  Person
  .find({})
  .then(res => {
  res.map(person =>
    console.log(person),
    mongoose.connection.close()
  )
  })
)
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  date: new Date(),
})

person.save().then(res => {
  console.log(`added "${person.name}" number ${person.number} to phonebook`)
  mongoose.connection.close()
})
