const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'pug')
app.locals.pretty = true
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var tasks = []
var completedTasks = []
var time = new Date().toString()

app.get('/', (req, res) => {
  res.render('pages/index', { tasks, time })
})

app.get('/completed', (req, res) => {
  res.render('pages/completes', { completedTasks })
})

app.post('/tasks', (req, res) => {
  if (req.body.task) {
    tasks.push(req.body.task.trim())
  }
  res.redirect('/')
})

app.delete('/tasks/:taskName', (req, res) => {
  var toDelete = req.params.taskName
  if (tasks.indexOf(toDelete) > -1) {
    tasks.splice(tasks.indexOf(toDelete), 1)
  }
  res.status(200).send('deleted success')
})

app.put('/completed/:taskName', (req, res) => {
  var taskDone = req.params.taskName
  if (tasks.indexOf(taskDone) > -1) {
    tasks.splice(tasks.indexOf(taskDone), 1)
    completedTasks.push(taskDone)
  }
  res.status(200).send('deleted success')
})

app.put('/completed/all', (req, res) => {
  console.log('hola')
  completedTasks = completedTasks.concat(tasks)
  tasks = []
  res.status(200).send('all done success')
})
app.listen(3001)
