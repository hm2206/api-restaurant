import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Role from 'App/Models/Role'
import NotFoundException from 'App/Exceptions/NotFoundException'

export default class UserHook {

    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }

    public static async defaultRole(user: User) {
        if (user.roleId) return;
        const role = await Role.findBy('is_default', 1);
        if (!role) throw new NotFoundException("El rol")
        user.roleId = role.id;
    }

}