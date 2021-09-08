import { DateTime } from 'luxon'
import Person from 'App/Models/Person'
import Role from 'App/Models/Role'
import UserHook from './hooks/UserHook'
import {
  column,
  beforeSave,
  beforeCreate,
  BaseModel,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public personId: number

  @column()
  public roleId: number

  @column()
  public resetPassword?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Person)
  public person: BelongsTo<typeof Person>

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @beforeSave()
  public static async hashPassword(user: User) {
    await UserHook.hashPassword(user)
  }

  @beforeCreate()
  public static async defaultRole(user: User) {
    await UserHook.defaultRole(user)
  }

}
