var keystone = require('keystone');
var Types = keystone.Field.Types;

var storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    key: process.env.AWSAccessKeyId,
    secret: process.env.AWSSecretKey,
    bucket: process.env.S3BucketName,
    path: '/landing-pages',
  },
  schema: {
    originalname: true,
  },
});

var Page = new keystone.List('Page', {
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  map: {
    name: 'title',
  },
});

Page.add({
  'title': {
    type: String,
    unique: true,
  },
  'header style': {
    type: Types.Select,
    options: 'Paragraph, Title',
    default: 'Title',
  },
  'image': {
    type: Types.File,
    storage: storage,
  },
  'header paragraph': {
    type: Types.Html,
    dependsOn: {
      'header style': 'Paragraph'
    },
  },
  'header title': {
    type: String,
    dependsOn: {
      'header style': 'Title',
    },
  },
});

Page.defaultColumns = 'title';
Page.register();
