import Person from 'App/Models/Person'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';

interface userAttributes {
    username: string
    email: string
    password: string
}

export default class UserEntity {

    public static async store(attributes: userAttributes, person: Person, role: Role) {
        try {
            const user = new User();
            user.username = attributes.username;
            user.email = attributes.email;
            user.password = attributes.password;
            await user.related('person').associate(person);
            await user.related('role').associate(role);
            return user;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los datos")
        }
    }

}


