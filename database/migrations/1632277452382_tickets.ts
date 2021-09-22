import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tickets extends BaseSchema {
  protected tableName = 'tickets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('reservation_number').notNullable().unique();
      table.date('reservation_date').notNullable().unique();
      table.time('reservation_time').notNullable();
      table.integer('person_id').unsigned().notNullable();
      table.integer('board_id').unsigned()
        .notNullable()
        .references('id')
        .inTable('boards');
      table.enum('status', ['PENDING', 'PROCESSING', 'CONTINUE', 'CANCEL']);
      table.boolean('state').defaultTo(true);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
