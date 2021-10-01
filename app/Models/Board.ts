import { DateTime } from 'luxon'
import { BaseModel, column, scope, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Restaurant from './Restaurant'

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

  @belongsTo(() => Restaurant)
  public restaurant: BelongsTo<typeof Restaurant>

  public static isEmpty = scope((query, id: number) => {
    query.where('id', id)
    query.where('is_busy', 0)
  });

}
