var keystone = require('keystone');
var Oil = keystone.list('Oil');
var FrontVideo = keystone.list('FrontVideo');


// List Oils
exports.getOils = function(req, res) {
  Oil.model.find(function(err, items) {
    if (err) {
      return res.apiError('database error', err);
    }

    res.apiResponse({
      oils: items,
    });
  });
};

exports.getFrontVideo = function(req, res) {
  FrontVideo.model.find(function(err, items) {
    if (err) {
      return res.apiError('database error', err);
    }
    res.apiResponse({
      video: items,
    });
  });
};
