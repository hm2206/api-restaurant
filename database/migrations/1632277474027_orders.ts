import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.double('price', 10, 2).notNullable();
      table.integer('amount').notNullable().defaultTo(1);
      table.integer('product_id').unsigned()
        .notNullable()
        .references('id')
        .inTable('products');
      table.integer('ticket_id').unsigned()
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tickets');
      table.boolean('is_ready').notNullable().defaultTo(0);
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
