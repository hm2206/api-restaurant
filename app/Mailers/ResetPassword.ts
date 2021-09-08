import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class ResetPassword extends BaseMailer {

  constructor(private user: User) {
    super()
  }

  public prepare(message: MessageContract) {
    const code = Encryption.decrypt(`${this.user.resetPassword}`)
    message.subject('Recuperarción de cuenta')
      .from('admin@example.com')
      .to(this.user.email)
      .htmlView("emails/reset_password", { code })
  }

}
