import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import ParamsPaginate from 'App/Helpers/ParamsPaginate'
import Board from 'App/Models/Board';
import BoardValidator from 'App/Validators/BoardValidator';

export default class BoardsController {

    public async index({ request }: HttpContextContract) {
        const paramsPaginate = new ParamsPaginate(request);
        const boards = Board.query().preload("restaurant")
        if (paramsPaginate.getQuerySearch()) {
            boards.where('number', 'like', `%${paramsPaginate.getQuerySearch()}%`)
        }
        // response
        return await boards.paginate(
            paramsPaginate.getPage(),
            paramsPaginate.getPerPage()
        )
    }

    public async store({ request }: HttpContextContract) {
        const payload: any = await request.validate(BoardValidator);
        payload.isBusy = false;
        payload.state = true;
        try {
            const board = await Board.create(payload);
            await board.load("restaurant");
            return board;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los datos")
        }
    }

    public async show({ params }: HttpContextContract) {
        const board = await Board.findOrFail(params.id);
        return board;
    }

    public async update(ctx: HttpContextContract) {
        const { params, request } = ctx;
        const board = await Board.findOrFail(params.id);
        const payload: any = await request.validate(BoardValidator);
        try {
            board.merge(payload);
            await board.save();
            return board;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los cambios")
        }
    }

    public async delete({ params }: HttpContextContract) {
        const board = await Board.findOrFail(params.id);
        try {
            await board.delete();
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException("No se pudo eliminar los datos")
        }
    }

}
