var walk = function(modelPath) {
    fs
      .readdirSync(modelPath)
      .forEach(function(file) {
        var filePath = path.join(modelPath, '/' + file)
        var stat = fs.statSync(filePath)
  
        if (stat.isFile()) {
          if (!(/\.js$/i.test(item))) {
            require(filePath)
          }
        }
        else if (stat.isDirectory()) {
          walk(filePath)
        }
      })
  }
//  递归读取文件注册路由
  var walk1 = function (dirPath, apiUrl) {
    fs.readdirSync(dirPath).forEach(function (file) {
      let filePath = path.join(dirPath, '/' + file)
      let routeUrl = apiUrl
      let stat = fs.statSync(filePath)
      if (stat.isFile()) {
        if ((/\.js$/i.test(file))) {
          routeUrl = path.join(routeUrl, '/', file.replace(/\.js$/i, ''));
          router.use(routeUrl, require(filePath).routes());
          // apiArr.push(routeUrl);
        }
      } else if (stat.isDirectory()) {
        routeUrl = path.join(routeUrl, '/' + file)
        walk(filePath, routeUrl)
      }
    })
  }
  
  // walk(path.join(__dirname, 'routes'), '/api');
  module.exports = {walk, walk1};