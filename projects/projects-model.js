const db = require('../data/db-config')

module.exports = {
    add,
    addTask,
    find,
    findById,
    findTasks
}

function add(project) {
    return db('projects')
        .insert(project)
        .then(([id]) => findById(id))
}

function addTask(task) {
    return db('tasks')
        .insert(task)
        .then(([id]) => findTaskById(id))

}

function find() {
    return db('projects')
}

function findById(id) {
    return db('projects')
        .where('id', id)
        .first()
}

function findTasks() {
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.id')
        .select('t.id', 't.description as task', 'p.name as project')
}

function findTaskById(id) {
    return db('tasks')
        .where('id', id)
        .first()
}