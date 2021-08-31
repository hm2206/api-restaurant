import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

    async me({ auth }: HttpContextContract) {
        const user = auth.user;
        await user?.load('person');
        return user
    }

}
