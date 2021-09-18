import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import Method from 'App/Models/Method';
import Role from 'App/Models/Role';
import RoleValidator from 'App/Validators/RoleValidator';
import ParamsPaginate from '../../Helpers/ParamsPaginate';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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

    public async methods({ params, request }: HttpContextContract) {
        const role = await Role.findOrFail(params.id);
        const paramsPaginate = new ParamsPaginate(request);
        // obtener los métodos no requeridos
        const methods = Method.query()
            .orderBy('methods.system_id', 'asc')
            .orderBy('name', 'asc')
            .preload('system')
            .where(build => {
                build.where('required', 0)
                build.orWhereHas('roles', buildR => {
                    buildR.where('roles.id', role.id)
                })
            });
        // filtrar query search
        if (paramsPaginate.getQuerySearch()) {
            methods.where(build => {
                build.where('name', 'like', `%${paramsPaginate.getQuerySearch()}%`)
                build.orWhere('description', 'like', `%${paramsPaginate.getQuerySearch()}%`)
            });
        }
        // response
        return await methods.paginate(
            paramsPaginate.getPage(),
            paramsPaginate.getPerPage(),
        )
    }

    public async detachMethod({ params, request }: HttpContextContract) {
        const role = await Role.findOrFail(params.id);
        const schemaMethod = schema.create({ 
            method_id: schema.number([ rules.required() ]) 
        })
        // validar
        const payload = await request.validate({ schema: schemaMethod });
        // obtener el method
        const method = await Method.findOrFail(payload.method_id);
        if (!method.required) throw new InternalServerErrorException("El método debe de ser privado")
        // procesar
        try {
            role.related('methods').detach([method.id]);
            return { success: true }
        } catch (error) {
            throw new InternalServerErrorException("No se pudó actualizar los datos")
        }
    }

}
