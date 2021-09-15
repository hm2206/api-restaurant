import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import ParamsPaginate from 'App/Helpers/ParamsPaginate';
import UserValidator from 'App/Validators/UserValidator'
import User from 'App/Models/User';
import NotFoundException from 'App/Exceptions/NotFoundException';
import UserEntity from 'App/Entities/UserEntity';
import Role from 'App/Models/Role';
import Person from 'App/Models/Person';

export default class UsersController {

    public async index({ request }: HttpContextContract) {
        const paramsPaginate = new ParamsPaginate(request);
        const user = User.query()
        if (paramsPaginate.getQuerySearch()) user.where('email', 'like', `%${paramsPaginate.getQuerySearch()}%`)
        const result = await user.paginate(paramsPaginate.getPage(), paramsPaginate.getPerPage());
        return result;
    }

    public async store({ request }: HttpContextContract) {
        const payload:any = await request.validate(UserValidator);
        const person = await Person.findOrFail(payload.personId);
        const role = await Role.findOrFail(payload.roleId);
        const user = await UserEntity.store(payload, person, role)
        return user;
    }

    public async show({ params }: HttpContextContract) {
        const user = await User.find(params.id);
        if (!user) throw new NotFoundException("El usuario");
        return user;
    }

    public async update(ctx: HttpContextContract) {
        const { params, request } = ctx;
        const payload = await request.validate(new UserValidator(ctx, params.id))
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
