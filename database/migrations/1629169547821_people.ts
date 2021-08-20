import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class People extends BaseSchema {
  protected tableName = 'people'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('ape_pat').notNullable()
      table.string('ape_mat').notNullable()
      table.date('date_birth').notNullable()
      table.enum('gender', ['M', 'F']).notNullable()
      table.integer('type_document_id').notNullable()
      table.string('document_number').notNullable().unique()
      table.string('address');
      table.string('phone');
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
