import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board';
import { RequestContract } from '@ioc:Adonis/Core/Request'
import PaymentRequiredException from 'App/Exceptions/PaymentRequiredException';
import PaymentItem from 'App/Helpers/PaymentItem';

export default class TicketValidator {
  
  private request: RequestContract;

	constructor (protected ctx: HttpContextContract) {
    this.request = ctx.request;
  }
	
  private formatSchema = {
    reservation_date: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.required()
    ]),
  
    reservation_time: schema.date({format: 'HH:mm' }, [
      rules.required()
    ]),
  
    board_id: schema.number([
      rules.required()
    ])
  }
	
  public async verifyIsEmptyToBoard() {
    let id = this.request.input('board_id');
    let board = await Board.find(id);
    if (!board) {
      throw new PaymentRequiredException([
        new PaymentItem('board_id', 'La mesa no existe!')
      ])
    } else if (board.isBusy) {
      throw new PaymentRequiredException([
        new PaymentItem('board_id', 'La mesa está ocupada!')
      ])
    }
  }
	
  public schema = schema.create(this.formatSchema);

  public messages = {}
}
