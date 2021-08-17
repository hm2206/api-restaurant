
import Route from '@ioc:Adonis/Core/Route';


Route.get('api/document_types', 'DocumentTypesController.index');
Route.post('api/document_types', 'DocumentTypesController.store');
Route.get('api/document_types/:id', 'DocumentTypesController.show');
Route.put('api/document_types/:id', 'DocumentTypesController.update');
Route.delete('api/document_types/:id', 'DocumentTypesController.delete');
