import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Boards extends BaseSchema {
  protected tableName = 'boards'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('number').nullable();
      table.string('position').notNullable();
      table.boolean('is_busy').defaultTo(false).notNullable();
      table.integer('restaurant_id').unsigned()
        .notNullable()
        .references('id')
        .inTable('restaurants');
      table.boolean('state').defaultTo(true);
      table.unique(['number', 'restaurant_id']);
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
