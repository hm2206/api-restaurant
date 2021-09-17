import { DateTime } from 'luxon'
import { BaseModel, column, afterSave } from '@ioc:Adonis/Lucid/Orm'
import RoleHook from './hooks/RoleHook'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public isDefault: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterSave()
  public static async varifyDefault(role: Role) {
    await RoleHook.verifyDefault(role);
  }

}
