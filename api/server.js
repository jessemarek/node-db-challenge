const express = require('express')
const server = express()

//Middleware
server.use(express.json())

//Routers

//Endpoints
server.get('/', (req, res) => {
    res.status(200).json({ api: "up and running!" })
})

module.exports = server