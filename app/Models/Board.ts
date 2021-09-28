import { DateTime } from 'luxon'
import { BaseModel, column, scope } from '@ioc:Adonis/Lucid/Orm'

export default class Board extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  number: string

  @column()
  position: string

  @column()
  restaurantId: number

  @column()
  isBusy: boolean

  @column()
  state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static isEmpty = scope((query, id: number) => {
    query.where('id', id)
    query.where('is_busy', 0)
  });

}
