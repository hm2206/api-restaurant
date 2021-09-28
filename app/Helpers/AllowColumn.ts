import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';

type paramsColumn = {
    ctx: HttpContextContract, 
    columns: string[], 
    attribute: string,
    defaultAttribute: string
}

export default class AllowColumn {

    private ctx: HttpContextContract

    private columns: string[];

    private attribute: string;

    private defaultAttribute: string

    constructor(ctx: HttpContextContract, columns: string[], attribute: string = 'column', defaultAttribute: string = 'id') {
        this.ctx = ctx;
        this.columns = columns;
        this.attribute = attribute;
        this.defaultAttribute = defaultAttribute;
    }

    public async handle() {
        let attr = this.ctx.request.input(this.attribute, this.defaultAttribute);
        if (!this.columns.includes(attr)) {
            throw new InternalServerErrorException("No se puede realizar la busqueda por el parametro")
        }

        return attr;
    }

    public static async verify(
        ctx: HttpContextContract, 
        columns: string[], 
        attribute: string = 'column',
        defaultAttribute: string = 'id'
    ): Promise<string> {
        const allow = new AllowColumn(ctx, columns, attribute, defaultAttribute);
        return await allow.handle();
    }

}