import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('likes', (table) => {
        table.uuid('likesId').primary()
        table.text('productLiked').notNullable()
        table.uuid('userId').references('usersId').inTable('users')    
    })

}



export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('likes')
}

