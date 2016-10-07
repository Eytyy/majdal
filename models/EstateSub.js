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

var EstateSub = new keystone.List('EstateSub', {
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  map: {
    name: 'title',
  },
});

EstateSub.add({
  'title': {
    type: String,
    required: true,
  },
  'estate': {
    type: Types.Relationship,
    ref: 'Estate',
  },
  'template': {
    type: Types.Select,
    options: 'Image, Text',
    default: 'Image',
  },
  'image': {
    type: Types.File,
    storage: storage,
    dependsOn: {
      'template': 'Image',
    },
  },
  'text': {
    type: Types.Html,
    wysiwyg: true,
  },
});

EstateSub.defaultColumns = 'title';
EstateSub.register();
