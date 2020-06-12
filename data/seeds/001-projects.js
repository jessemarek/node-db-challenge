
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'Data API',
          description: 'create a server that can return data'
        },
        {
          name: 'React Website',
          description: 'create a web application using React.js'
        },
        {
          name: 'Cool Video Game',
          description: 'learn to code by building a game'
        }
      ]);
    });
};
