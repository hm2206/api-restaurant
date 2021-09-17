import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import Role from 'App/Models/Role';
import RoleValidator from 'App/Validators/RoleValidator';
import ParamsPaginate from '../../Helpers/ParamsPaginate';

export default class RolesController {

    public async index({ request }: HttpContextContract) {
        const paramsPaginate = new ParamsPaginate(request);
        // obtener roles
        const roles = Role.query()
            .orderBy('is_default', 'desc')
            .orderBy('name', 'asc');
        // filtrar por el query search
        if (paramsPaginate.getQuerySearch()) {
            roles.where('name', 'like', `%${paramsPaginate.getQuerySearch()}%`);
        }   
        // obtener datos paginados
        return await roles.paginate(
            paramsPaginate.getPage(), 
            paramsPaginate.getPerPage()
        );
    }

    public async store({ request }: HttpContextContract) {
        const payload: any = await request.validate(RoleValidator);
        try {
            payload.isDefault = request.input('is_default', 0);
            // crear
            const role = await Role.create(payload)
            return role;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los datos")
        }
    }

    public async update(ctx: HttpContextContract) {
        const { params, request } = ctx;
        const payload: any = await request.validate(new RoleValidator(ctx, params.id));
        const role = await Role.findOrFail(params.id);
        try {
            payload.isDefault = request.input('is_default', 0);
            // update
            role.merge(payload)
            await role.save();
            return role;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los cambios")
        }
    }

    public async delete({ params }: HttpContextContract) {
        const role = await Role.findOrFail(params.id);
        if (role.isDefault) throw new InternalServerErrorException("No se puede eliminar el rol predeterminado")
        try {
            // eliminar
            await role.delete();
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los cambios")
        }
    }

}
