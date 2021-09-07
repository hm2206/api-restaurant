import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import Person from 'App/Models/Person';
import Role from 'App/Models/Role';
import UserEntity from 'App/Entities/UserEntity';

export default class UsersController {

    public async store({ request }: HttpContextContract) {
        const payload:any = await request.validate(UserValidator);
        const person = await Person.findOrFail(payload.personId);
        const role = await Role.findByOrFail('is_default', 1);
        const user = await UserEntity.store(payload, person, role)
        return user;
    }

}
