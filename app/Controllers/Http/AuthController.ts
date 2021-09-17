import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

    public async me({ auth }: HttpContextContract) {
        const user = auth.user;
        await user?.load('person');
        return user
    }

    public async authorize() {
        return []
    }

}
