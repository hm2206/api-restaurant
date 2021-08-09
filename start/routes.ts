
import Route from '../app/Helpers/RouteHelpers'

// Disks
Route.resolver("get", "DisksController.index")
Route.resolver("post", "DisksController.store")

// Files
Route.resolver("get", "FilesController.index").middleware(['disk'])
Route.resolver("post", "FilesController.store").middleware(['disk'])
Route.resolver("get", "FilesController.show").middleware(['disk', 'file'])
Route.resolver("put", "FilesController.update").middleware(['disk', 'file'])
Route.resolver("delete", "FilesController.delete").middleware(['disk', 'file'])
Route.resolver("get", "FilesController.binary").middleware(['disk', 'file'])
Route.resolver("put", "FilesController.enabledLinkPublic").middleware(['disk', 'file'])
Route.resolver("put", "FilesController.disabledLinkPublic").middleware(['disk', 'file'])

// Public
Route.resolver("get", "PublicsController.handle");
