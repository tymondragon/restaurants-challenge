
exports.up = async function(knex) {
  await knex.schema.createTable('restaurants', t => {
    t.integer('id').primary()
    t.string('name').notNullable()
    t.string('place_id').notNullable()
    t.timestamps()
    t.unique(['name', 'place_id'])
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable('restaurants')
};
