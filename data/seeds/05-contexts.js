exports.seed = function(knex) {
  return knex('contexts').insert([
    { context: 'at home' },
    { context: 'at work' },
    { context: 'at computer' },
    { context: 'online' },
  ]);
};
