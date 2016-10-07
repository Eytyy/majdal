var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    key: process.env.AWSAccessKeyId,
    secret: process.env.AWSSecretKey,
    bucket: process.env.S3BucketName,
    path: '/estates',
  },
});

var Estate = new keystone.List('Estate', {
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  map: {
    name: 'title',
  },
});

Estate.add({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Types.Number,
  },
  'header template': {
    type: Types.Select,
    options: 'Full, Split',
    default: 'Full',
  },
  'header image': {
    type: Types.File,
    storage: storage,
    dependsOn: {
      'header template': 'Full',
    },
  },
  'header description': {
    type: Types.Html,
    dependsOn: {
      'header template': 'Split',
    },
  },
});

Estate.relationship({
  ref: 'EstateSub',
  path: 'estates',
});

Estate.defaultColumns = 'title';
Estate.register();
