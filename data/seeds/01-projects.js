exports.seed = function(knex) {
  return knex("projects").insert([
    {
      name: " This is a Project!",
      description: "this is a filler description",
      completed: 0,
    },
    {
      name: "This is the second project",
      description: "description for second project",
      completed: 1,
    },
  ]);
};
