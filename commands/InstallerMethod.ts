import { BaseCommand } from '@adonisjs/core/build/standalone'
import Env from '@ioc:Adonis/Core/Env'
import RunSystemException from 'App/Exceptions/RunSystemException'
import { collect } from 'collect.js'

export default class InstallerMethod extends BaseCommand {

  /**
   * Command name is used to run the command
   */
  public static commandName = 'installer:method'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Instalar los método del sistema'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  private async insertMethod(methods: any = []) {
    const { default: Method } = await import('App/Models/Method')
    if (methods?.length) {
      const arrayNewMethod = await Method.createMany(methods); 
      // logger Insert
      for(let method of arrayNewMethod) {
        this.logger.success(`Insert Method => ${method.name}`);
      }
    }
  }

  public async run () {

    const { default: Method } = await import('App/Models/Method')
    const { default: System } = await import('App/Models/System')
    const SystemToken = Env.get('SYSTEM_TOKEN')

    const system = await System.findBy('token', SystemToken)
    if (!system) throw new RunSystemException();

    const tmpMethods = await Method.all();
    const listMethod = collect(tmpMethods.map(m => m.toJSON()))
    const methodJSON = require('../start/method.json')
    const payloadMethod: any = []

    await Object.keys(methodJSON).forEach(key => {
      let obj = methodJSON[key]
      payloadMethod.push({ 
        systemId: system.id,
        name: key, 
        ...obj 
      });
    })

    const updateMethod: any = [];
    const newMethod: any = [];

    // primera carga al crear
    if (!listMethod.count()) {
      newMethod.push(...payloadMethod)
      return await this.insertMethod(newMethod);
    }
    
    // verificar add y update
    await payloadMethod.forEach(async (m: any) => {
      let existsMethod = await listMethod.where('name', m.name).first();
      if (!existsMethod) return newMethod.push(m);

      existsMethod = Object.assign({}, existsMethod);
      let attributes = ['description', 'url', 'action_type', 'required'];

      let isModify = false

      for(let attr of attributes) {
        let diffMethod = existsMethod[attr] != m[attr];
        if (diffMethod) {
          isModify = true;
          break;
        } 
      }

      if (isModify) updateMethod.push(m); 
    });

    // agregar métodos nuevos
    this.insertMethod(newMethod)

    // actualizar métodos
    for(let method of updateMethod) {
      await Method.query()
        .where('system_id', method.systemId)
        .where('name', method.name)
        .update({
          description: method.description,
          url: method.url,
          actionType: method.actionType,
          required: method.required
        })
      // logger Insert
      this.logger.info(`Update Method => ${method.name}`);
    }

  }
}
