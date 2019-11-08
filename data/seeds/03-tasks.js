exports.seed = function(knex) {
  return knex('tasks').insert([
    {
      description: 'Task 1 for Project 1',
      notes: 'Notes for Project 1 Task 1',
      completed: 0,
      project_id: 1,
    },
    {
      description: 'Task 2 for Project 1',
      notes: 'Notes for Project 1 Task 2',
      completed: 0,
      project_id: 1,
    },
    {
      description: 'Task 1 for Project 2',
      notes: 'Notes for Project 2 Task 1',
      completed: 0,
      project_id: 2,
    },
    {
      description: 'Task 2 for Project 2',
      notes: 'Notes for Project 2 Task 2',
      completed: 0,
      project_id: 2,
    },
  ]);
};
