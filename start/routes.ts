import Route from 'App/Helpers/RouteHelpers';

// Restaurants
Route.resolver("get", "RestaurantsController.index").middleware('jwt');
Route.resolver("post", "RestaurantsController.store").middleware('jwt');
Route.resolver("get", "RestaurantsController.show").middleware('jwt');
Route.resolver("put", "RestaurantsController.update").middleware('jwt');
Route.resolver("delete", "RestaurantsController.delete").middleware('jwt');

// Boards
Route.resolver("get", "BoardsController.index").middleware('jwt');
Route.resolver("post", "BoardsController.store").middleware('jwt');
Route.resolver("get", "BoardsController.show").middleware('jwt');
Route.resolver("put", "BoardsController.update").middleware('jwt');
Route.resolver("delete", "BoardsController.delete").middleware('jwt');

// Products
Route.resolver("get", "ProductsController.index").middleware('jwt');
Route.resolver("post", "ProductsController.store").middleware('jwt');
Route.resolver("get", "ProductsController.show").middleware('jwt');
Route.resolver("put", "ProductsController.update").middleware('jwt');
Route.resolver("delete", "ProductsController.delete").middleware('jwt');

// Tickets
Route.resolver("get", "TicketsController.index").middleware('jwt');
Route.resolver("post", "TicketsController.store").middleware('jwt');
Route.resolver("get", "TicketsController.show").middleware('jwt');
Route.resolver("delete", "TicketsController.delete").middleware('jwt');