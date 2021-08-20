
import Route from "App/Helpers/RouteHelpers";

//  Document Types
Route.resolver('get', 'DocumentTypesController.index');
Route.resolver('post', 'DocumentTypesController.store');
Route.resolver('get', 'DocumentTypesController.show');
Route.resolver('put', 'DocumentTypesController.update');
Route.resolver('delete', 'DocumentTypesController.delete');

// Person
Route.resolver('get', 'PeopleController.index');
Route.resolver('post', 'PeopleController.store');
Route.resolver('get', 'PeopleController.show');
Route.resolver('put', 'PeopleController.update');
Route.resolver('delete', 'PeopleController.delete');

// System
Route.resolver('get', 'SystemsController.index');
Route.resolver('post', 'SystemsController.store');
Route.resolver('get', 'SystemsController.show');
Route.resolver('put', 'SystemsController.update');
Route.resolver('delete', 'SystemsController.delete');