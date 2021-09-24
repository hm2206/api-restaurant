import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import ParamsPaginate from 'App/Helpers/ParamsPaginate'
import Restaurant from 'App/Models/Restaurant';
import RestaurantValidator from 'App/Validators/RestaurantValidator';

export default class RestaurantsController {

    public async index({ request, user }: HttpContextContract) {
        const paramsPaginate = new ParamsPaginate(request);
        const restaurants = Restaurant.query();
        if (paramsPaginate.getQuerySearch()) {
            restaurants.where('name', 'like', `%${paramsPaginate.getQuerySearch()}%`);
        }
        // response
        return await restaurants.paginate(
            paramsPaginate.getPage(),
            paramsPaginate.getPerPage()
        )
    }

    public async store({ request }: HttpContextContract) {
        const payload :any = await request.validate(RestaurantValidator);
        try {
            payload.isVerify = 1;
            payload.state = 1;
            const restaurant = await Restaurant.create(payload);
            return restaurant;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los datos")
        }
    }

    public async show({ params }: HttpContextContract) {
        const restaurant = await Restaurant.findOrFail(params.id);
        return restaurant;
    }

    public async update(ctx: HttpContextContract) {
        const { params, request } = ctx;
        const restaurant = await Restaurant.findOrFail(params.id);
        const payload = await request.validate(new RestaurantValidator(ctx, params.id));
        try {
            restaurant.merge(payload);
            await restaurant.save();
            return restaurant;
        } catch (error) {
            throw new InternalServerErrorException("No se pudo guardar los cambios")
        }
    }

    public async delete({ params }: HttpContextContract) {
        const restaurant = await Restaurant.findOrFail(params.id);
        try {
            await restaurant.delete();
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException("No se pudo eliminar los datos")
        }
    }

}
