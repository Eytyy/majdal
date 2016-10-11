var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    key: process.env.AWSAccessKeyId,
    secret: process.env.AWSSecretKey,
    bucket: process.env.S3BucketName,
    path: '/oils',
  },
});

var Oil = new keystone.List('Oil', {
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  map: {
    name: 'title',
  },
});

Oil.add({
  title: {
    type: String,
    required: true,
  },
  image: { type: Types.File, storage: storage },
  'image mobile': { type: Types.File, storage: storage },
  description: { type: Types.Html, wysiwyg: true, height: 150 },
});


transform.toJSON(Oil);
Oil.defaultColumns = 'title';
Oil.register();
