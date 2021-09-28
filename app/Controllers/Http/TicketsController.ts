import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import AllowColumn from 'App/Helpers/AllowColumn';
import ParamsPaginate from 'App/Helpers/ParamsPaginate'
import Ticket from 'App/Models/Ticket';
import TicketValidator from 'App/Validators/TicketValidator';

export default class TicketsController {

    public async index({ request }: HttpContextContract) {
        const paramsPaginate = new ParamsPaginate(request);
        const tickets = Ticket.query()
        if (paramsPaginate.getQuerySearch()) {
            tickets.where('reservation_number', 'like', `%${paramsPaginate.getQuerySearch()}%`);
        }
        // response
        return tickets.paginate(
            paramsPaginate.getPage(),
            paramsPaginate.getPerPage()
        )
    }

    public async store(ctx: HttpContextContract) {
        const { request, user } = ctx;
        const inputs = await request.validate(TicketValidator);
        const payload: any = Object.assign({}, inputs);
        payload.personId = user?.person?.id;
        payload.reservation_date = inputs.reservation_date.toFormat("yyyy-MM-dd");
        payload.reservation_time = inputs.reservation_time.toFormat("HH:mm");
        const ticketValidator = new TicketValidator(ctx);
        await ticketValidator.verifyIsEmptyToBoard();
        try {   
            const ticket = await Ticket.create(payload);
            return ticket;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los datos")
        }
    }

    public async show(ctx : HttpContextContract) {
        const { params } = ctx;
        const columns = ['id', 'reservation_number'];
        const attr = await AllowColumn.verify(ctx, columns);
        const ticket = await Ticket.findByOrFail(attr, params.id);
        return ticket;
    }

    public async delete({ params }: HttpContextContract) {
        const ticket = await Ticket.findOrFail(params.id);
        const allow = ['CANCEL', 'PENDING'];
        try {
            if (!allow.includes(ticket.status)) throw new Error();
            await ticket.delete();
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException("No se pudo eliminar los datos");
        }
    }

}
