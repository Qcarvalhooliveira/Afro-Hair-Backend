import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('usersId').primary()
        table.text('name').notNullable()
        table.text('email').notNullable()
        table.text('password').notNullable()
        table.uuid('likeId').references('likesId').inTable('likes')        
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}



