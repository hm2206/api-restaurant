import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParamsPaginate from 'App/Helpers/ParamsPaginate'
import PersonValidator from 'App/Validators/PersonValidator'
import moment from 'moment'
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
        payload.date_birth = moment(payload.date_birth).format('YYYY-MM-DD');
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
        const validationPerson = new PersonValidator(ctx, params.id);
        const schemaPerson = await validationPerson.getSchemaUpdate();
        const payload: any = await request.validate({ schema: schemaPerson });
        payload.date_birth = moment(payload.date_birth).format('YYYY-MM-DD');
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

    public async delete({ params }: HttpContextContract) {
        const person = await Person.find(params.id);
        if (!person) throw new NotFoundException("La persona");
        try {
            await person.delete();
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException("No se pudo eliminar la persona")
        }
    }

}
