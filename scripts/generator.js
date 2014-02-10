var paginator = require(hexo.lib_dir + 'plugins/generator/paginator');

hexo.extend.generator.register(function(locals, render, callback){
  var config = hexo.config,
    route = hexo.route;

  var langs = [];

  // Find languages
  locals.posts.each(function(post){
    if (post.lang && langs.indexOf(post.lang) == -1) langs.push(post.lang);
  });

  langs.forEach(function(lang){
    var posts = locals.posts.find({lang: lang}).sort('date', -1),
      arr = posts.toArray(),
      length = arr.length;

    paginator(lang === 'en' ? '' : lang, posts, 'index', render);

    arr.forEach(function(post, i){
      var layout = post.layout,
        path = (lang === 'en' ? '' : lang + '/') + post.path;

      if (!layout || layout === 'false'){
        route.set(path, function(fn){
          fn(null, post.content);
        });
      } else {
        post.prev = i === 0 ? null : arr[i - 1];
        post.next = i === length - 1 ? null : arr[i + 1];

        render(path, [layout, 'post', 'page', 'index'], post);
      }
    })
  });

  callback();
});