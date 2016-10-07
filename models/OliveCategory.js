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
});

var OliveCategory = new keystone.List('OliveCategory', {
  autokey: {
    path: 'key',
    from: 'name',
    unique: true,
  },
});

OliveCategory.add({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Types.File,
    storage: storage,
  },
});

OliveCategory.relationship({ ref: 'Olive', refPath: 'category' });

OliveCategory.defaultColumns = 'name';
OliveCategory.register();
