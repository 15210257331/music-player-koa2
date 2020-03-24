const fs = require('fs');
const path = require('path');

/**
 * 自动读取路由文件并且注册路由
 * @param {*} filePath 路由文件所在文件夹
 * @param {*} app koa实例
 */
var walk = function (filePath, app) {
  fs.readdirSync(filePath).forEach(function (routerFile) {
    var routerFilePath = path.join(filePath, '/' + routerFile);
    if (fs.statSync(routerFilePath).isFile()) {
      if ((/\.router\.js$/i.test(routerFilePath))) {
        var router = require(routerFilePath);
        app.use(router.routes(), router.allowedMethods());
      }
    } else {
      var newfilePath = path.join(filePath, '/' + routerFile);
      walk(newfilePath, app)
    }
  })
}

// 生成8位编码
var generate8Code = function (num) {
  var str = "2367820149QWERTYUIOPASDFGHJKLZXCVBNM1456789";
  var res = '#';
  for (var i = 0; i < num; i++) {
    res += str[Math.floor(Math.random() * str.length)];
  }
  return res;
}

// 数组扁平化
var flatten = function (arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

module.exports = { walk, generate8Code, flatten };