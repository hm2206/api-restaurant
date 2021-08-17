import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TypeDocuments extends BaseSchema {
  protected tableName = 'type_documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug').notNullable().unique()
      table.string('name').notNullable()
      table.string('name_short').notNullable()
      table.boolean('state').defaultTo(true)

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
