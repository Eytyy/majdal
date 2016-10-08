var keystone = require('keystone');
var Estates = keystone.list('Estate');
var EstatesSub = keystone.list('EstateSub');
var EstateLanding = keystone.list('Page');


exports.getLanding = function(req,res) {
  EstateLanding.model.findOne({ slug: 'estates' }).exec(function (err, results) {
    if (err) {
      return res.apiError('database error', err);
    }
    res.apiResponse({
      data: results,
    });
  });
};

// Estates
exports.getEstates = function(req, res) {
  var locals = res.locals;

  locals.filters = {
    section: req.params.id,
  };

  var query = Estates.model.find().sort('order');
  if (locals.filters.section) {
    query.where('slug').in([locals.filters.section]);
  }
  if (!locals.filters.section) {
    query.where('order').equals('1');
  }
  query.exec(function (err, results) {
    if (err) {
      return res.apiError('database error', err);
    }
    res.apiResponse({
      data: results,
    });
  });
};

// EstatesSubs
exports.getEstatesSubs = function(req, res) {
  EstatesSub.model.find().exec(function (err, results) {
    if (err) {
      return res.apiError('database error', err);
    }
    res.apiResponse({
      data: results,
    });
  });
};

// Adjacent Estates
exports.getAdjacentEstates = function(req, res) {
  var locals = res.locals;

  locals.order = parseInt(req.params.order);
  locals.next = locals.order + 1 + '';
  locals.prev = locals.order - 1 + '';

  var query = Estates.model.find().or([
    { 'order': locals.next },
    { 'order': locals.prev }
  ]).sort('order');

  query.exec(function (err, results) {
    if (err) {
      return res.apiError('database error', err);
    }
    res.apiResponse({
      data: results,
    });
  });
};
