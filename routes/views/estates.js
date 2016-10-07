var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  locals.section = 'estate';

  locals.data = {
    estates: [],
    subs: [],
    landing: [],
  };

  view.on('init', function(next) {
    var query = keystone.list('Page').model.findOne({ slug: 'estates' });
    query.exec(function (err, results) {
      locals.data.landing = results;
      next(err);
    });
  });

  view.render('estates');
};
