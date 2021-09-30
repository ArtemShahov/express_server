const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// const tasks = [{
//   number: '1',
//   title: 'Title1',
//   description: 'lorem ipsum',
//   assignee: 'Yan1',
//   taskStatus: 'done',
// }, {
//   number: '2',
//   title: 'Title2',
//   description: 'lorem ipsum',
//   assignee: 'Yan2',
//   taskStatus: 'done',
// }, {
//   number: '3',
//   title: 'Title3',
//   description: 'lorem ipsum',
//   assignee: 'Yan3',
//   taskStatus: 'pr',
// }, {
//   number: '4',
//   title: 'Title4',
//   description: 'lorem ipsum',
//   assignee: 'Yan4',
//   taskStatus: 'pr',
// }, {
//   number: '5',
//   title: 'Title5',
//   description: 'lorem ipsum',
//   assignee: 'Yan5',
//   taskStatus: 'progress',
// }, {
//   number: '6',
//   title: 'Title6',
//   description: 'lorem ipsum',
//   assignee: 'Yan6',
//   taskStatus: 'progress',
// }, {
//   number: '7',
//   title: 'Title7',
//   description: 'lorem ipsum',
//   assignee: 'Yan7',
//   taskStatus: 'todo',
// }, {
//   number: '8',
//   title: 'Title8',
//   description: 'lorem ipsum',
//   assignee: 'Yan8',
//   taskStatus: 'todo',
// }, {
//   number: '9',
//   title: 'Title9',
//   description: 'lorem ipsum',
//   assignee: 'Yan9',
//   taskStatus: 'todo',
// },]

let initialData = {
  nextTaskId: 9,
  tasks: {
    newTask: {
      title: '',
      content: '',
      assign: '',
      status: '',
    },
    task_1: {
      id: 'task_1',
      title: 'Task 1',
      content: 'lorem ipsum',
    },
    task_2: {
      id: 'task_2',
      title: 'Task 2',
      content: 'lorem ipsum',
    },
    task_3: {
      id: 'task_3',
      title: 'Task 3',
      content: 'lorem ipsum',
    },
    task_4: {
      id: 'task_4',
      title: 'Task 4',
      content: 'lorem ipsum',
    },
    task_5: {
      id: 'task_5',
      title: 'Task 5',
      content: 'lorem ipsum',
    },
    task_6: {
      id: 'task_6',
      title: 'Task 6',
      content: 'lorem ipsum',
    },
    task_7: {
      id: 'task_7',
      title: 'Task 7',
      content: 'lorem ipsum',
    },
    task_8: {
      id: 'task_8',
      title: 'Task 8',
      content: 'lorem ipsum',
    },
  },
  columns: {
    column_1: {
      id: 'column_1',
      title: 'To do',
      status: 'todo',
      tasksId: ['task_1', 'task_2',],
    },
    column_2: {
      id: 'column_2',
      title: 'PR',
      status: 'pr',
      tasksId: ['task_3', 'task_4',],
    },
    column_3: {
      id: 'column_3',
      title: 'In progress',
      status: 'progress',
      tasksId: ['task_5', 'task_6',],
    },
    column_4: {
      id: 'column_4',
      title: 'Done',
      status: 'done',
      tasksId: ['task_7', 'task_8',],
    },
    todo: 'column_1',
    pr: 'column_2',
    progress: 'column_3',
    done: 'column_4',
  },
  columnOrder: ['column_1', 'column_2', 'column_3', 'column_4'],
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tasks', (req, res) => {
  setTimeout(() => { res.json(initialData) }, 100)
})

app.post('/addTask', (req, res) => {
  console.log(req, res);
  const { taskData, statusData } = req.body;
  const newTaskId = `task_${initialData.nextTaskId}`;
  initialData.tasks[newTaskId] = taskData;
  initialData.tasks[newTaskId].id = newTaskId;
  initialData.columns[initialData.columns[statusData]].tasksId.push(newTaskId);
  initialData.nextTaskId = initialData.nextTaskId + 1;
  setTimeout(() => { res.json(initialData) }, 1000)
})

app.post('/updateTask', (req, res) => {
  const newData = { ...initialData };
  const { draggableId, source, destination } = req.body;
  const sourceArray = newData.columns[source.droppableId].tasksId;
  const destinationArray = newData.columns[destination.droppableId].tasksId;
  sourceArray.splice(source.index, 1);
  destinationArray.splice(destination.index, 0, draggableId);
  initialData = newData;
  // setTimeout(() => { res.json(initialData) }, 1000)
})

app.post('/delTask', (req, res) => {
  const { id, columnId } = req.body;
  const newData = { ...initialData };
  const idIndex = newData.columns[columnId].tasksId.indexOf(id);
  delete newData.tasks[id];
  newData.columns[columnId].tasksId.splice(idIndex, 1);
  initialData = newData;
  setTimeout(() => { res.json(columnId) }, 1000)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})