import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import ObjectID from 'bson-objectid';

export default class System extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column() 
  public token: string

  @column()
  public email: string

  @column()
  public host: string

  @column()
  public version: string 

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static generateToken(system: System) {
    let token = new ObjectID()
    system.token = token.toHexString();
  }
}
