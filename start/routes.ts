import Route from 'App/Helpers/RouteHelpers';

// Restaurants
Route.resolver("get", "RestaurantsController.index");
Route.resolver("post", "RestaurantsController.store");
Route.resolver("get", "RestaurantsController.show");
Route.resolver("put", "RestaurantsController.update");
Route.resolver("delete", "RestaurantsController.delete");

// Boards
Route.resolver("get", "BoardsController.index");
Route.resolver("post", "BoardsController.store");
Route.resolver("get", "BoardsController.show");
Route.resolver("put", "BoardsController.update");
Route.resolver("delete", "BoardsController.delete");

// Products
Route.resolver("get", "ProductsController.index");
Route.resolver("post", "ProductsController.store");
Route.resolver("get", "ProductsController.show");
Route.resolver("put", "ProductsController.update");
Route.resolver("delete", "ProductsController.delete");