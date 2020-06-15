const router = require('express').Router()

const Resources = require('./resources-model')


//Create a new resource
router.post('/', (req, res) => {
    const resource = req.body

    if (resource.name) {
        Resources.add(resource)
            .then(resource => {
                res.status(201).json(resource)
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    }
    else {
        res.status(400).json({ message: "Bad Request: please provide a valid resource name" })
    }

})

//Get a list of resources
router.get('/', (req, res) => {
    Resources.find()
        .then(resources => {
            if (resources.length) {
                res.status(200).json(resources)
            }
            else {
                res.status(404).json({ message: "No resources found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

module.exports = router