import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Systems extends BaseSchema {
  protected tableName = 'systems'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('token').unique().notNullable();
      table.string('name').unique();
      table.text('description');
      table.string('email').unique();
      table.string('host').notNullable();
      table.string('version').notNullable();

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
