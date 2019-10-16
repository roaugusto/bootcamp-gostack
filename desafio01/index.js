const express = require('express');

const server = express();
server.use(express.json());

const projects = [
    { id: "1", title: "Projeto 1", tasks: ["Primeira tarefa"] },
    { id: "2", title: "Projeto 2", tasks: ["Primeira tarefa"] },
    { id: "3", title: "Projeto 3", tasks: ["Primeira tarefa"] },
    { id: "4", title: "Projeto 4", tasks: ["Primeira tarefa"] },
    { id: "5", title: "Projeto 5", tasks: ["Primeira tarefa"] },
];

const kindMethods = []

server.use((req, res, next) => {
    const index = kindMethods.findIndex(item => item.method === req.method)
    let kindMethod = {}

    if (index >= 0) {
        kindMethod = kindMethods[index]
        kindMethod.count = kindMethod.count + 1
        kindMethods.splice(index, 1, kindMethod)
    } else {
        kindMethod = {
            method: req.method,
            count: 1
        }
        kindMethods.push(kindMethod)
    }
    console.table(kindMethods)
    next()
})

function checkProjectExist(req, res, next) {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ error: 'Project ID is required' })
    }
    const index = projects.findIndex(item => item.id === id)
    return index < 0 ? res.status(400).json({ error: 'Project ID not exist!' }) : next()
}

server.get('/projects/', (req, res) => {
    return res.json(projects)
})

server.post('/projects', (req, res) => {
    const newProject = { id: req.body.id, title: req.body.title, tasks: [] }
    projects.push(newProject)
    return res.json(projects)
})

server.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const index = projects.findIndex(item => item.id === id)
    let project = projects[index]
    let tasks = project.tasks
    tasks.push(title)
    projects.splice(index, 1, project)
    return res.json(projects)
})

server.put('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const index = projects.findIndex(item => item.id === id)
    let project = projects[index]
    project.title = title
    projects.splice(index, 1, project)
    return res.json(projects)
})

server.delete('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params
    const index = projects.findIndex(item => item.id === id)
    projects.splice(index, 1)
    return res.send(projects)
})

server.listen(3000);