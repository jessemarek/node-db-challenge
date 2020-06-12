const router = require('express').Router()

const Projects = require('./projects-model')


//Create a new project
router.post('/', (req, res) => {
    const project = req.body

    if (project.name) {
        Projects.add(project)
            .then(project => {
                res.status(201).json(project)
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    }
    else {
        res.status(400).json({ message: "Bad Request: please provide a valid project name" })
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

module.exports = router