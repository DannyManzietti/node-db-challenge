exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl
        .string("name", 128)
        .notNullable()
        .unique();
      tbl.string("description", 128);
      tbl
        .boolean("completed")
        .notNullable()
        .defaultTo(0);
    })
    .createTable("resources", tbl => {
      tbl.increments();
      tbl
        .string("name", 128)
        .notNullable()
        .unique();
      tbl.string("description", 128);
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.string("description", 128).notNullable();
      tbl.string("notes", 128);
      tbl
        .boolean("completed")
        .notNullable()
        .defaultTo(0);
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("project-resources", tbl => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.unique(["project_id", "resource_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project-resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
