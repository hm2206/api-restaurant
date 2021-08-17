import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeDocument from 'App/Models/TypeDocument';
import DocumentTypeValidator from 'App/Validators/DocumentTypeValidator';
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException';
import NotFoundException from 'App/Exceptions/NotFoundException';

export default class DocumentTypesController {

    public async index({ request } : HttpContextContract) {
        const page = request.input('page', 1);
        const per_page = request.input('per_page', 20);
        const query_search = request.input('query_search', '');
        const type_documents = TypeDocument.query()
        if (query_search) type_documents.where('name', 'like', `%${query_search}%`);
        const result = await type_documents.paginate(page, per_page);
        return result;
    }

    public async store({ request }: HttpContextContract) {
        const datos: any = await request.validate(DocumentTypeValidator);
        try {
            const type_document = await TypeDocument.create(datos);
            return type_document.name;
        } catch (error) {
            throw new InternalServerErrorException("No se pudó guardar los datos")
        }
    }

    public async show({ params }: HttpContextContract) {
        const type_document = await TypeDocument.find(params.id);
        if (!type_document) throw new NotFoundException("El Tipo de Documento")
        return type_document;
    }

    public async update({ params, request }: HttpContextContract) {
        const datos: any = await request.validate(DocumentTypeValidator);
        const type_document = await TypeDocument.find(params.id);
        if (!type_document) throw new NotFoundException("El Tipo de Documento")
        try {
            type_document.merge(datos)
            await type_document.save();
            return type_document   
        } catch (error) {
            throw new InternalServerErrorException("No se pudó guardar los cambios")
        }
    }

    public async delete({ params }: HttpContextContract) {
        const type_document = await TypeDocument.find(params.id);
        if (!type_document) throw new NotFoundException("El Tipo de Documento")
        try {
            await type_document.delete();
            return { success: true }
        } catch (error) {
            throw new InternalServerErrorException("No se pudo eliminar el regístro");
        }
    }

}
