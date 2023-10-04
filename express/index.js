const express = require('express')
const cors = require('cors');

const app = express();

app.use(cors({origin:"http://111beeston.local:5000"}))

app.use(express.json())

let people = [
	{
		"name":"Aiden",
		"home":true,
		"note":"",
		"id":0
	},
	{
		"name":"Aimee",
		"home":false,
		"note":"",
		"id":1
	},
	{
		"name":"Quin",
		"home":true,
		"note":"",
		"id":2
	},
	{
		"name":"Grace",
		"home":true,
		"note":"",
		"id":3
	},
	{
		"name":"Kieran",
		"home":true,
		"note":"",
		"id":4
	},
	{
		"name":"Rachel",
		"home":true,
		"note":"",
		"id":5
	},
	{
		"name":"Bethany",
		"home":true,
		"note":"",
		"id":6
	}
]

let events = [
	{
		"title": "test",
		"date": "2023-09-10",
		"time": "4pm",
		"id":0
	}
]

function getNewID(arr) {return (arr.length > 0 ? (Math.max(...arr.map(p => p.id)) + 1) : 0)}


app.get('/', (request, response) => {response.send('<h1>Hello from guleisPi!</h1>')})
app.get('/api/people', (request, response) => {
	console.log(`GET request recieved from ${request.ip} for ALL PEOPLE`);
	response.json(people)
})

app.get('/api/events', (request, response) => {
	console.log(`GET request recieved from ${request.ip} for ALL EVENTS`);
	response.json(events);
})

app.post(`/api/events`,(request, response) => {
	console.log(`POST request recieved from ${request.ip} to try and add a new event`)
	const e = request.body
	e.id = getNewID(events)
	events = events.concat(e)
	response.json(e)
})

app.delete(`/api/events/:id`, (request, response) => {
	console.log(`DELETE request recieved from ${requeste.ip} to delete event with ID ${request.params.id}`)
	events = events.filter(e => e.id != request.params.id)
	response.status(204).end()
})

app.put(`/api/events/:id`, (request, response) => {
	console.log(`PUT request recieved from ${request.ip} for event with ID ${request.params.id}`)
	if (events.find(e => e.id == request.params.id)){
		events = events.map(e => e.id == request.params.id ? request.body : e);
		response.json(request.params);
	}
	else response.status(404).end();
})

app.get('/api/people/:id', (request, response) => {
	console.log(`GET request recieved from ${request.ip} for person with ID ${request.params.id}`)
	const ppl = people.find(p => p.id == request.params.id)
	if(ppl) response.json(ppl);
	else response.status(404).end();
})

app.put('/api/people/:id', (request, response) => {
	console.log(`PUT request recieved from ${request.ip} for person with ID ${request.params.id}`)
	if(people.find(p => p.id == request.params.id)){
		people = people.map(p => p.id == request.params.id ? request.body : p);
		response.json(request.params);
	}
	else response.status(404).end();
})

app.post('/api/people',(request,response) => {
	console.log(`POST request recieved from ${request.ip} to try and add a person`)
	const person = request.body
	person.id = getNewID(people)
	people = people.concat(person)
	response.json(person)
})

app.delete('/api/people/:id', (request, response) => {
	console.log(`DELETE request recieved from ${request.ip} to delete person with ID ${request.params.id}`)
	people = people.filter(p => p.id != request.params.id)
	response.status(204).end()
})

const PORT = 3002
app.listen(PORT, () => {console.log(`guleisPi House REST API running on port ${PORT}`)})
