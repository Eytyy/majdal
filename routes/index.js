/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
  api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
  app.get('/', routes.views.index);
  app.get('/oils', routes.views.index);

  app.get('/olives', routes.views.olives);
  app.get('/olives/:id', routes.views.olives);

  app.get('/estate', routes.views.estates);
  app.get('/estate/:id', routes.views.estates);

  app.all('/contact', routes.views.contact);

  // API
  app.get('/api/video', keystone.middleware.api, routes.api.index.getFrontVideo);
  app.get('/api/oils', keystone.middleware.api, routes.api.index.getOils);

  app.get('/api/olives', keystone.middleware.api, routes.api.olives.getOlivesCategories);
  app.get('/api/olives/:id', keystone.middleware.api, routes.api.olives.getOlives);

  app.get('/api/estatelanding', keystone.middleware.api, routes.api.estate.getLanding);
  app.get('/api/estate', keystone.middleware.api, routes.api.estate.getEstates);
  app.get('/api/estate/:id', keystone.middleware.api, routes.api.estate.getEstates);

  app.get('/api/adjacent/:order', keystone.middleware.api, routes.api.estate.getAdjacentEstates);

  app.get('/api/estatesubs', keystone.middleware.api, routes.api.estate.getEstatesSubs);
  app.get('/api/estatesubs/:id', keystone.middleware.api, routes.api.estate.getEstatesSubs);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
};
