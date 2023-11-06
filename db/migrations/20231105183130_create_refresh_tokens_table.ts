import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('refresh_tokens', function(table) {
        table.increments('id').primary(); 
        table.string('token', 255).notNullable().unique();
        table.uuid('userId').references('usersId').inTable('users'); 
        table.timestamp('expires_at').notNullable(); 
        table.timestamps(true, true); 
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('refresh_tokens');
}

