import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import moment from 'moment'

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

  @computed()
  public get age() {
    let date_string:any = this.date_birth;
    if (typeof date_string == 'object') date_string = date_string.toSQLDate();
    return moment().diff(date_string, 'years', false);
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
