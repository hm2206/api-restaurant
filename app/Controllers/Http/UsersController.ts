import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import ParamsPaginate from 'App/Helpers/ParamsPaginate';
import UserValidator from 'App/Validators/UserValidator'
import User from 'App/Models/User';
import NotFoundException from 'App/Exceptions/NotFoundException';

export default class UsersController {

    public async index({ request }: HttpContextContract) {
        const paramsPaginate = new ParamsPaginate(request);
        const user = User.query()
        if (paramsPaginate.getQuerySearch()) user.where('email', 'like', `%${paramsPaginate.getQuerySearch()}%`)
        const result = await user.paginate(paramsPaginate.getPage(), paramsPaginate.getPerPage());
        return result;
    }

    public async store({ request }: HttpContextContract) {
        const payload = await request.validate(UserValidator);
        try {
            const user = await User.create(payload)
            return user;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los datos")
        }
    }

    public async show({ params }: HttpContextContract) {
        const user = await User.find(params.id);
        if (!user) throw new NotFoundException("El usuario");
        return user;
    }

    public async update(ctx: HttpContextContract) {
        const { params, request } = ctx;
        const payload = await request.validate(new UserValidator(ctx, params.id))
        payload.roleId = request.input('roleId', null)
        const user = await User.find(params.id);
        if (!user) throw new NotFoundException("El usuario");
        try {
            user.merge(payload);
            await user.save()
            return user;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los cambios");
        }
    }

    public async delete({ params }: HttpContextContract) {
        const user = await User.find(params.id);
        if (!user) throw new NotFoundException("El usuario");
        try {
            await user.delete()
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException("No se pudo eliminar el recurso");
        }
    }

}
