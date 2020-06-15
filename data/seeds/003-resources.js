
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {
          name: 'Macbook Pro',
          description: 'overpriced computer'
        },
        {
          name: 'iPhone',
          description: 'pocket computer that can make phone calls'
        },
        {
          name: 'teh interwebs',
          description: 'the world wide web network'
        },
        {
          name: 'Playful Cats',
          description: 'useful for taking breaks from working'
        },
        {
          name: 'Food',
          description: 'needed to stay alive'
        }
      ]);
    });
};
