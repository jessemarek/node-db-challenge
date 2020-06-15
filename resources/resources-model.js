const db = require('../data/db-config')

module.exports = {
    add,
    find,
    findById
}

function add(resource) {
    return db('resources')
        .insert(resource)
        .then(([id]) => findById(id))
}

function find() {
    return db('resources')
}

function findById(id) {
    return db('resources as r')
        .where('r.id', id)
        .first()
}