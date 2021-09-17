import Role from 'App/Models/Role'

export default class RoleHook {

    public static async verifyDefault(role: Role) {
        if (role.isDefault) {
            await Role.query()
                .where('is_default', 1)
                .where('id', '!=', role.id)
                .update({ isDefault: 0 });
        }
    }

}