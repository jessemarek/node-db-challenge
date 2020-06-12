
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          description: 'create js files',
          notes: 'build the server setup',
          project_id: 1
        },
        {
          description: 'seed the database',
          notes: 'add in test data',
          project_id: 1
        },
        {
          description: 'test the endpoints',
          notes: 'make sure CRUD operations are working',
          project_id: 1
        },
        {
          description: 'create React components',
          notes: 'use best practices',
          project_id: 2
        },
        {
          description: 'connect app to API',
          notes: 'console.log responses',
          project_id: 2
        },
        {
          description: 'play test the game before launch',
          notes: 'git gud',
          project_id: 3
        }
      ]);
    });
};