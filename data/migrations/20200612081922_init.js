
exports.up = function (knex) {
    return knex.schema

        //Projects Table
        .createTable('projects', tbl => {
            //Primary key ID
            tbl.increments()

            tbl.string('name', 128).notNullable()

            tbl.text('description')

            tbl.boolean('completed')
                .notNullable()
                .defaultTo(false)
        })

        //Tasks Table
        .createTable('tasks', tbl => {
            //Primary key ID
            tbl.increments()

            tbl.string('description', 128)
                .notNullable()

            tbl.text('notes')

            tbl.boolean('completed')
                .notNullable()
                .defaultTo(false)

            //Foreign Key
            tbl.integer('project_id')
                .unsigned()
                .references('projects.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })

        //Resources Table
        .createTable('resources', tbl => {
            //Primary key ID
            tbl.increments()

            tbl.string('name', 128)
                .notNullable()
                .unique()

            tbl.text('description')
        })

        //Project Resources Table
        .createTable('project_resources', tbl => {
            //Primary key ID
            tbl.increments()

            //Foreign Key
            tbl.integer('project_id')
                .unsigned()
                .references('projects.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')

            //Foreign Key
            tbl.integer('resource_id')
                .unsigned()
                .references('resources.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects')
};
