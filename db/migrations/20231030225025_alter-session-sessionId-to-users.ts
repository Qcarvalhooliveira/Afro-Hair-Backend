import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.uuid('sessionId').index()
        table.uuid('likeId').references('likesId').inTable('likes');
    })
    await knex.schema.table('likes', (table) => {
        table.uuid('userId').references('usersId').inTable('users');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('sessionId')
    })
    await knex.schema.table('likes', (table) => {
        table.dropColumn('userId');
    });
}

