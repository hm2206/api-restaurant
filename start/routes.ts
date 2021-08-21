
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

// Clients
Route.resolver('get', 'ClientsController.index');
Route.resolver('post', 'ClientsController.store');
Route.resolver('get', 'ClientsController.show');
Route.resolver('put', 'ClientsController.update');
Route.resolver('delete', 'ClientsController.delete');

// User
Route.resolver('get', 'UsersController.index');
Route.resolver('post', 'UsersController.store');
Route.resolver('get', 'UsersController.show');
Route.resolver('put', 'UsersController.update');
Route.resolver('delete', 'UsersController.delete');

// Login
Route.resolver('post', 'LoginController.login');