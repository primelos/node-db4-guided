exports.up = function(knex) {
  return knex.schema

    .createTable("species", tbl => {
      tbl.increments();
      tbl.string("name", 255).notNullable();
    })
    .createTable("animals", tbl => {
      tbl.increments();

      tbl.string("name", 255).notNullable();

      //define our foreign key
      tbl
        .integer("species_id")
        .unsigned()
        .references("id")
        .inTable("species")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('zoo', tbl => {
        tbl.increments()
        
        tbl.string('name', 255).notNullable()
        tbl.string('address', 512)

    })
    .createTable('animal_zoo', tbl => {
        tbl.increments()

        tbl.string('name', 255).notNullable()
        tbl.integer('zoo_id')
        .unsigned()
        .references("id")
        .inTable("zoo")
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

        tbl.integer('animal_id')
        .unsigned()
        .references("id")
        .inTable("animals")
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

        tbl.date('from')
        tbl.date('to')
    })
};

exports.down = function(knex) {
    dropTableIfExists('species')
    dropTableIfExists('animals')
    dropTableIfExists('zoo')
    dropTableIfExists('animal_zoo')

};
