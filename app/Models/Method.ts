import { DateTime } from 'luxon'
import { BaseModel, 
  column, 
  belongsTo, 
  BelongsTo, 
  manyToMany,
  ManyToMany, } from '@ioc:Adonis/Lucid/Orm'
import System from './System'
import Role from './Role'

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

  @belongsTo(() => System)
  public system: BelongsTo<typeof System>

  @manyToMany(() => Role, {
    pivotTable: 'allows'
  })
  public roles: ManyToMany<typeof Role>
}
