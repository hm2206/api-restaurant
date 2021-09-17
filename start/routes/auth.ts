import Route from "App/Helpers/RouteHelpers";

//  Document Types
Route.resolver('get', 'DocumentTypesController.index').middleware('auth');
Route.resolver('post', 'DocumentTypesController.store').middleware('auth');
Route.resolver('get', 'DocumentTypesController.show').middleware('auth');
Route.resolver('put', 'DocumentTypesController.update').middleware('auth');
Route.resolver('delete', 'DocumentTypesController.delete').middleware('auth');

// Person
Route.resolver('get', 'PeopleController.index').middleware('auth');
Route.resolver('post', 'PeopleController.store').middleware('auth');
Route.resolver('get', 'PeopleController.show').middleware('auth');
Route.resolver('put', 'PeopleController.update').middleware('auth');
Route.resolver('delete', 'PeopleController.delete').middleware('auth');

// System
Route.resolver('get', 'SystemsController.index').middleware('auth');
Route.resolver('post', 'SystemsController.store').middleware('auth');
Route.resolver('get', 'SystemsController.show').middleware('auth');
Route.resolver('put', 'SystemsController.update').middleware('auth');
Route.resolver('delete', 'SystemsController.delete').middleware('auth');

// Clients
Route.resolver('get', 'ClientsController.index').middleware('auth');
Route.resolver('post', 'ClientsController.store').middleware('auth');
Route.resolver('get', 'ClientsController.show').middleware('auth');
Route.resolver('put', 'ClientsController.update').middleware('auth');
Route.resolver('delete', 'ClientsController.delete').middleware('auth');

// Roles
Route.resolver('get', 'RolesController.index').middleware('auth');
Route.resolver('post', 'RolesController.store').middleware('auth');
Route.resolver('put', 'RolesController.update').middleware('auth');
Route.resolver('delete', 'RolesController.delete').middleware('auth');

// User
Route.resolver('get', 'UsersController.index').middleware('auth');
Route.resolver('post', 'UsersController.store').middleware('auth');
Route.resolver('get', 'UsersController.show').middleware('auth');
Route.resolver('put', 'UsersController.update').middleware('auth');
Route.resolver('delete', 'UsersController.delete').middleware('auth');

// Login
Route.resolver('post', 'LoginController.login');
Route.resolver('post', 'LoginController.logout').middleware('auth');

// Auth
Route.resolver('get', 'AuthController.me').middleware('auth');