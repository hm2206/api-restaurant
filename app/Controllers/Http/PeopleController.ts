import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParamsPaginate from 'App/Helpers/ParamsPaginate'
import PersonValidator from 'App/Validators/PersonValidator'
import Person from 'App/Models/Person'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import NotFoundException from 'App/Exceptions/NotFoundException'

export default class PeopleController {

    public async index({ request }: HttpContextContract) {
        const paramsPaginate = new ParamsPaginate(request)
        const people = Person.query()
        const array_query = paramsPaginate.getQuerySearchArray();
        
        array_query.map(query => {
            people.orWhere('name', 'like', `%${query}%`)
            people.orWhere('ape_pat', 'like', `%${query}%`)
            people.orWhere('ape_mat', 'like', `%${query}%`)
        });

        return await people.paginate(paramsPaginate.getPage(), paramsPaginate.getPerPage());
    }

    public async store({ request }: HttpContextContract) {
        const payload: any = await request.validate(PersonValidator);
        payload.address = request.input('address', null)
        payload.phone = request.input('phone', null)
        try {
            const person = await Person.create(payload);
            return person;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los datos")
        }
    }

    public async show({ params }: HttpContextContract) {
        const person = await Person.find(params.id);
        if (!person) throw new NotFoundException("La persona");
        return person;
    }

    public async update(ctx: HttpContextContract) {
        const { params, request } = ctx;
        const payload: any = await request.validate(new PersonValidator(ctx, params.id));
        payload.address = request.input('address', null)
        payload.phone = request.input('phone', null)
        const person = await Person.find(params.id);
        if (!person) throw new NotFoundException("La persona");
        try {
            person.merge(payload)
            await person.save();
            return person;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los cambios")
        }
    }

    public async delete({ params, auth }: HttpContextContract) {
        const person = await Person.find(params.id);
        const user: any = await auth.user;
        if (!person) throw new NotFoundException("La persona");
        if (user.personId == person.id) {
            throw new InternalServerErrorException("No se puede eliminar al usuario actual")
        }
        // process
        try {
            await person.delete();
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException("No se pudo eliminar la persona")
        }
    }

}
