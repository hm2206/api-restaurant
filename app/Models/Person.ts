import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public ape_pat: string 

  @column()
  public ape_mat: string 

  @column.date()
  public date_birth: DateTime

  @column()
  public gender: string
  
  @column()
  public type_document_id: number
  
  @column() 
  public document_number: string 

  @column()
  public state: boolean

  @computed()
  public get fullname() {
    return `${this.ape_pat} ${this.ape_mat}, ${this.name}`
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
