import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Allows extends BaseSchema {
  protected tableName = 'allows'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('role_id').notNullable()
      table.integer('method_id').notNullable()
      table.boolean('state').notNullable().defaultTo(true)
      table.unique(['role_id', 'method_id'])

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
