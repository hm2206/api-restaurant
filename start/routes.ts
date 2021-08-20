
import Route from '@ioc:Adonis/Core/Route';

//  Document Types
Route.get('api/document_types', 'DocumentTypesController.index');
Route.post('api/document_types', 'DocumentTypesController.store');
Route.get('api/document_types/:id', 'DocumentTypesController.show');
Route.put('api/document_types/:id', 'DocumentTypesController.update');
Route.delete('api/document_types/:id', 'DocumentTypesController.delete');


// Person
Route.get('api/people', 'PeopleController.index');
Route.post('api/people', 'PeopleController.store');
Route.get('api/people/:id', 'PeopleController.show');
Route.put('api/people/:id', 'PeopleController.update');
Route.delete('api/people/:id', 'PeopleController.delete');

// System
Route.get('api/systems', 'SystemsController.index');
Route.post('api/systems', 'SystemsController.store');
Route.get('api/systems/:id', 'SystemsController.show');
Route.put('api/systems/:id', 'SystemsController.update');
Route.delete('api/systems/:id', 'SystemsController.delete');