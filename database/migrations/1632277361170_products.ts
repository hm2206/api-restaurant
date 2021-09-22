import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('code').unique().notNullable();
      table.double('price', 10, 2).notNullable().defaultTo(0);
      table.integer('amount').notNullable().defaultTo(1);
      table.integer('restaurant_id').unsigned()
        .notNullable()
        .references('id')
        .inTable('restaurants');;
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
