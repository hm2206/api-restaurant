import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParamsPaginate from 'App/Helpers/ParamsPaginate';
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import Product from 'App/Models/Product';
import ProductValidator from 'App/Validators/ProductValidator';

export default class ProductsController {

    public async index({ request }: HttpContextContract) {
        const paramsPaginate = new ParamsPaginate(request);
        const products = Product.query()
        if (paramsPaginate.getQuerySearch()) {
            products.where('name', 'like', `%${paramsPaginate.getQuerySearch()}%`)
        }
        // response
        return await products.paginate(
            paramsPaginate.getPage(),
            paramsPaginate.getPerPage()
        )
    }

    public async store({ request }: HttpContextContract) {
        const payload: any = await request.validate(ProductValidator);
        payload.state = true;
        try {
            const product = await Product.create(payload);
            return product;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los datos")
        }
    }

    public async show({ params }: HttpContextContract) {
        const product = await Product.findOrFail(params.id);
        return product;
    }

    public async update(ctx: HttpContextContract) {
        const { params, request } = ctx;
        const product = await Product.findOrFail(params.id);
        const payload: any = await request.validate(new ProductValidator(ctx, params.id));
        try {
            product.merge(payload);
            await product.save();
            return product;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los cambios")
        }
    }

    public async delete({ params }: HttpContextContract) {
        const product = await Product.findOrFail(params.id);
        try {
            await product.delete();
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException("No se pudo eliminar los datos")
        }
    }

}
