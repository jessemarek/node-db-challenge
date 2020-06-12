const express = require('express')
const server = express()

//Middleware
server.use(express.json())

//Routers
const projectsRouter = require('../projects/projects-router')


//Endpoints
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: "up and running!" })
})

module.exports = server