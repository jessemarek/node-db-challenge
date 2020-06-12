const db = require('../data/db-config')

module.exports = {
    add,
    addTask,
    addResource,
    find,
    findById,
    findResources,
    findTasks,
    getProject,
    remove
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

function addResource(resource) {
    return db('project_resources as pr')
        .insert(resource)
        .then(([id]) => findResourceById(id))
}

async function find() {
    const projects = await db('projects')
    return projects.map(p => p.completed ? { ...p, completed: true } : { ...p, completed: false })

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

function findResources(id) {
    return db('project_resources as pr')
        .where('pr.project_id', id)
        .join('projects as p', 'pr.project_id', 'p.id')
        .join('resources as r', 'pr.resource_id', 'r.id')
        .select('pr.id', 'p.name', 'r.name')
}

function findResourceById(id) {
    return db('project_resources as pr')
        .where('pr.id', id)
        .first()
}

async function getProject(id) {
    const project = await db('projects')
        .where('id', id)
        .first()

    const resources = await db('project_resources as pr')
        .where('pr.project_id', id)
        .join('resources as r', 'pr.resource_id', 'r.id')
        .select('r.id', 'r.name', 'r.description')

    const tasks = await db('tasks as t')
        .where('t.project_id', id)
        .select('t.id', 't.description', 't.notes', 't.completed')

    tasks.map(t => t.completed ? (t.completed = true) : (t.completed = false))

    return {
        id: project.id,
        name: project.name,
        description: project.description,
        completed: project.completed ? true : false,
        tasks,
        resources
    }
}

async function remove(id) {
    const project = await findById(id)

    db('projects')
        .where('id', id)
        .del()
        .then(count => {
            if (count) {
                return project
            }
            else {
                return count
            }
        })
}