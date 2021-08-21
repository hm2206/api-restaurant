import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParamsPaginate from 'App/Helpers/ParamsPaginate'
import ClientValidator from 'App/Validators/ClientValidator';
import Client from 'App/Models/Client';
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import NotFoundException from 'App/Exceptions/NotFoundException';

export default class ClientsController {

    public async index({ request }: HttpContextContract) {
        const paramsPaginate = new ParamsPaginate(request);
        const clients = Client.query()
        if (paramsPaginate.getQuerySearch()) clients.where('name', 'like', `%${paramsPaginate.getQuerySearch()}%`);
        const result = await clients.paginate(paramsPaginate.getPage(), paramsPaginate.getPerPage());
        return result; 
    }

    public async store({ request }: HttpContextContract) {
        const payload = await request.validate(ClientValidator);
        try {
            const client = await Client.create(payload);
            return client;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los datos")
        }
    }

    public async show({ params }: HttpContextContract) {
        const client = await Client.find(params.id);
        if (!client) throw new NotFoundException("El cliente");
        return client;
    }

    public async update(ctx: HttpContextContract) {
        const { params, request } = ctx;
        const payload = await request.validate(new ClientValidator(ctx, params.id)) 
        const client = await Client.find(params.id);
        if (!client) throw new NotFoundException("El cliente");
        try {
            client.merge(payload);
            await client.save();
            return client;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los cambios")
        }
    }

    public async delete({ params }: HttpContextContract) {
        const client = await Client.find(params.id);
        if (!client) throw new NotFoundException("El cliente");
        try {
            await client.delete()
            return { success: true }
        } catch (error) {
            throw new InternalServerErrorException("No se pudo eliminar el recuros")
        }
    }

}
