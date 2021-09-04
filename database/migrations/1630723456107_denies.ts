import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Denies extends BaseSchema {
  protected tableName = 'denies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable()
      table.integer('method_id').notNullable()
      table.string('observation');
      table.boolean('state').notNullable().defaultTo(true)
      table.unique(['user_id', 'method_id'])

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
