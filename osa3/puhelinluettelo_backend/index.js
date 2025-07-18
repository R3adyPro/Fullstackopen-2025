const express = require('express')
const morgan = require("morgan")
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) 
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('<p>Hello</p>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> \n ${new Date().toString()}`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(404).json({
            error: 'content missing'
        })
    } 
    // else if(Person.find({ name: body.name}).then(person => {person.length !== 0})){
    //     return response.status(404).json({
    //         error: 'name must be unique'
    //     })
    // }
    
    const person = new Person ({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`)
})