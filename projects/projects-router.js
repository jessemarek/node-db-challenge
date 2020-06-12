const router = require('express').Router()

const Projects = require('./projects-model')


//Create a new project
router.post('/', (req, res) => {
    const project = req.body

    if (project.name) {
        Projects.add(project)
            .then(project => {
                if (project) {
                    res.status(201).json(project)
                }
                else {
                    res.status(404).json({ message: "Project not found" })
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    }
    else {
        res.status(400).json({ message: "Bad Request: please provide a valid project name" })
    }

})

//Add a new task to a project
router.post('/:id/tasks', (req, res) => {
    const task = req.body

    if (task.description && task.project_id) {
        Projects.addTask(task)
            .then(task => {
                if (task) {
                    res.status(201).json(task)
                }
                else {
                    res.status(404).json({ message: "Project or task not found" })
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    }
    else {
        res.status(400).json({ message: "Bad Request: please provide a task description and associated project_id" })
    }
})

//Add a new resource to the project
router.post('/:id/resources', (req, res) => {
    const { id } = req.params
    const resource = req.body

    if (resource.resource_id) {
        resource.project_id = id

        Projects.addResource(resource)
            .then(resource => {
                if (resource) {
                    res.status(201).json(resource)
                }
                else {
                    res.status(404).json({ message: "The resource could not be found" })
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    }
    else {
        res.status(400).json({ message: "Bad Request: please provide a project_id and resource_id" })
    }
})

//Get a list of projects
router.get('/', (req, res) => {
    Projects.find()
        .then(projects => {
            if (projects.length) {
                res.status(200).json(projects)
            }
            else {
                res.status(404).json({ message: "No projects found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

//Get project by ID
router.get('/:id', (req, res) => {
    const { id } = req.params

    Projects.getProject(id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            }
            else {
                res.status(404).json({ message: "Project with that Id not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

//Get a list of tasks for a project
router.get('/tasks', (req, res) => {
    Projects.findTasks()
        .then(tasks => {
            if (tasks.length) {
                res.status(200).json(tasks)
            }
            else {
                res.status(404).json({ message: "No tasks found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

//Delete a project
router.delete('/:id', (req, res) => {
    const { id } = req.params

    Projects.remove(id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            }
            else {
                res.status(404).json({ message: "Project not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

module.exports = router