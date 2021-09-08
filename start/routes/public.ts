import Route from "App/Helpers/RouteHelpers";

// Users
Route.resolver("post", "Public/UsersController.store");
Route.resolver("put", "Public/UsersController.resetPassword");
Route.resolver("put", "Public/UsersController.changePassword");