var keystone = require('keystone');
var OliveCategories = keystone.list('OliveCategory');
var Olives = keystone.list('Olive');

// List Oils
exports.getOlivesCategories = function(req, res) {
  OliveCategories.model.find(function(err, items) {
    if (err) {
      return res.apiError('database error', err);
    }

    res.apiResponse({
      olives: items,
    });
  });
};

exports.getOlives = function(req, res) {
  var locals = res.locals;

  locals.id = req.params.id;

  Olives.model.find().where('category').equals(locals.id).exec(function(err, items) {
    if (err) {
      return res.apiError('database error', err);
    }
    res.apiResponse({
      olives: items,
    });
  });
};
