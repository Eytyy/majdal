var keystone = require('keystone');
var Types = keystone.Field.Types;

var storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    key: process.env.AWSAccessKeyId,
    secret: process.env.AWSSecretKey,
    bucket: process.env.S3BucketName,
    path: '/olives',
  },
  schema: {
    originalname: true,
  },
});

var Olive = new keystone.List('Olive', {
  autokey: {
    path: 'slug',
    from: 'name',
    unique: true,
  },
  singular: 'olive',
  plural: 'olives',
});

Olive.add({
  'name': {
    type: String,
    required: true
  },
  'title': {
    type: String,
  },
  'image': {
    type: Types.File,
    storage: storage,
  },
  'description': {
    type: Types.Html
  },
  'category': {
    type: Types.Relationship,
    ref: 'OliveCategory',
  },
});

Olive.defaultColumns = 'name, category';
Olive.register();
