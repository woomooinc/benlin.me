var builtinProcessor = require(hexo.lib_dir + 'plugins/processor/post');

hexo.extend.processor.register('_posts_:lang/*path', function(data, callback){
  var Post = hexo.model('Post'),
    params = data.params;

  builtinProcessor(data, function(err){
    if (err) return callback(err);

    var post = Post.findOne({source: data.path});
    if (!post) return;

    post.lang = params.lang;
    post.save();
    callback();
  });
});