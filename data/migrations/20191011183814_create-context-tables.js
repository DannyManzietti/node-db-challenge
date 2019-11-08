exports.up = function(knex) {
  return knex.schema
    .createTable('contexts', tbl => {
      tbl.increments();
      tbl
        .string('context', 128)
        .notNullable()
        .unique();
    })
    .createTable('task-contexts', tbl => {
      tbl.increments();
      tbl
        .integer('task_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tasks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('context_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('contexts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.unique(['task_id', 'context_id']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('task-contexts')
    .dropTableIfExists('contexts');
};
