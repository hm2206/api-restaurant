import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import TicketHook from 'App/Models/Hooks/TicketHook';

export type TicketStatus = 'PENDING' | 'PROCESSING' | 'FINALIZED' | 'CANCEL';

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public reservationNumber: string;

  @column()
  public reservationDate: DateTime

  @column()
  public reservationTime: DateTime
  
  @column()
  public personId: number

  @column() 
  public boardId: number

  @column()
  public status: TicketStatus

  @column()
  public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateReservationNumber(ticket: Ticket) {
    await TicketHook.generateReservationNumber(ticket)
  }

  @beforeSave()
  public static async toggleBoardToBusy(ticket: Ticket) {
    await TicketHook.toggleBoardToBusy(ticket)
  }

}
