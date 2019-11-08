exports.seed = function(knex) {
  return knex("resources").insert([
    { name: "Danny", description: "Owner" },
    { name: "Bart", description: "Operator" },
    { name: "Norman", description: "stranding" },
    {
      name: "Software License",
      description: "generic software license description",
    },
  ]);
};
