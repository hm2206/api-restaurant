import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParamsPaginate from 'App/Helpers/ParamsPaginate'
import SystemValidator from '../../Validators/SystemValidator'
import System from 'App/Models/System';
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import NotFoundException from 'App/Exceptions/NotFoundException';


export default class SystemsController {

    public async index({ request }: HttpContextContract) {
        const paramsPaginate = new ParamsPaginate(request);
        const system = System.query()
        if (paramsPaginate.getQuerySearch()) system.where('name', 'like', `%${paramsPaginate.getQuerySearch()}%`)
        const result = await system.paginate(paramsPaginate.getPage(), paramsPaginate.getPerPage());
        return result;
    }

    public async store({ request }: HttpContextContract) {
        const payload: any = await request.validate(SystemValidator)
        payload.description = request.input('description', null);
        try {
            const system = await System.create(payload)
            return system;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los datos");
        }
    }

    public async show({ params }: HttpContextContract) {
        const system = await System.find(params.id);
        if (!system) throw new NotFoundException("El sistema");
        return system;
    }

    public async update(ctx: HttpContextContract) {
        const { params, request } = ctx;
        const payload: any = await request.validate(new SystemValidator(ctx, params.id));
        payload.description = request.input('description', null)
        const system = await System.find(params.id);
        if (!system) throw new NotFoundException("El sistema");
        try {
            system.merge(payload);
            await system.save()
            return system;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los cambios");
        }
    }   

    public async delete({ params }: HttpContextContract) {
        const system = await System.find(params.id);
        if (!system) throw new NotFoundException("El sistema");
        try {
            await system.delete();
            return { success: true } 
        } catch (error) {
            throw new InternalServerErrorException("No se pudo eliminar el recurso");
        }
    }

    public async authorize({ system }: HttpContextContract) {
        return system;
    }

}
