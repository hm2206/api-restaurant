import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import Person from 'App/Models/Person';
import Role from 'App/Models/Role';
import UserEntity from 'App/Entities/UserEntity';
import User from 'App/Models/User';
import ResetPassword from 'App/Mailers/ResetPassword';
import Encryption from '@ioc:Adonis/Core/Encryption';
import random from 'random';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import PaymentRequiredException from 'App/Exceptions/PaymentRequiredException';
import PaymentItem from 'App/Helpers/PaymentItem';

export default class UsersController {

    public async store({ request }: HttpContextContract) {
        const payload:any = await request.validate(UserValidator);
        const person = await Person.findOrFail(payload.personId);
        const role = await Role.findByOrFail('is_default', 1);
        const user = await UserEntity.store(payload, person, role)
        return user;
    }

    public async resetPassword({ params }: HttpContextContract) {
        const user = await User.findByOrFail("email", params.email);
        const codePlain = `A-${random.int(1000, 9999)}`
        const codeEncrypt = Encryption.encrypt(codePlain)
        user.resetPassword = codeEncrypt
        await user.save();
        await (new ResetPassword(user).send())
        return { send: true }
    }

    public async changePassword({ params, request }: HttpContextContract) {
        const user = await User.findByOrFail("email", params.email);
        const datos = request.all();
        const schemaUser = schema.create({
            code: schema.string({ trim: true }, [
                rules.maxLength(6),
                rules.minLength(6)
            ]),
            password: schema.string({ trim: true }, [
                rules.confirmed()
            ])
        })
        // validar inputs to requests
        await request.validate({ data: datos, schema: schemaUser });
        // comparar reset_password
        const reset_password = Encryption.decrypt(`${user.resetPassword}`)
        if (reset_password != datos.code) throw new PaymentRequiredException([
            new PaymentItem("code", "El código es incorrecto")
        ])
        // actualizar user
        user.resetPassword = "";
        user.password = datos.password;
        await user.save();
        // response
        return { process: true }
    }

}
