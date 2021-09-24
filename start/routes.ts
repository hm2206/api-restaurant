import Route from 'App/Helpers/RouteHelpers';

// Restaurants
Route.resolver("get", "RestaurantsController.index");
Route.resolver("post", "RestaurantsController.store");
Route.resolver("get", "RestaurantsController.show");
Route.resolver("put", "RestaurantsController.update");
Route.resolver("delete", "RestaurantsController.delete");