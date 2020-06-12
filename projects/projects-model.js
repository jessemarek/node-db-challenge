const db = require('../data/db-config')

module.exports = {
    add,
    find,
    findById
}

function add(data) {
    return db('projects')
        .insert(data)
        .then(([id]) => findById(id))
}

function find() {
    return db('projects')
}

function findById(id) {
    return db('projects as p')
        .where('p.id', id)
        .first()
}