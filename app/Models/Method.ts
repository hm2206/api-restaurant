import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Method extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public systemId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public url: string

  @column()
  public actionType: string

  @column()
  public required: boolean

  @column()
  public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
