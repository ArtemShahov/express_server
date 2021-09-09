const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const tasks = [{
  number: '1',
  title: 'Title1',
  description: 'lorem ipsum',
  assignee: 'Yan1',
  taskStatus: 'done',
}, {
  number: '2',
  title: 'Title2',
  description: 'lorem ipsum',
  assignee: 'Yan2',
  taskStatus: 'done',
}, {
  number: '3',
  title: 'Title3',
  description: 'lorem ipsum',
  assignee: 'Yan3',
  taskStatus: 'pr',
}, {
  number: '4',
  title: 'Title4',
  description: 'lorem ipsum',
  assignee: 'Yan4',
  taskStatus: 'pr',
}, {
  number: '5',
  title: 'Title5',
  description: 'lorem ipsum',
  assignee: 'Yan5',
  taskStatus: 'progress',
}, {
  number: '6',
  title: 'Title6',
  description: 'lorem ipsum',
  assignee: 'Yan6',
  taskStatus: 'progress',
}, {
  number: '7',
  title: 'Title7',
  description: 'lorem ipsum',
  assignee: 'Yan7',
  taskStatus: 'todo',
}, {
  number: '8',
  title: 'Title8',
  description: 'lorem ipsum',
  assignee: 'Yan8',
  taskStatus: 'todo',
}, {
  number: '9',
  title: 'Title9',
  description: 'lorem ipsum',
  assignee: 'Yan9',
  taskStatus: 'todo',
},]

app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tasks', (req, res) => {
  setTimeout(() => { res.json(tasks) }, 1000)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})