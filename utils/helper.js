const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
// 读取路由文件注册路由
/**
 * 
 * @param {*} routeFilePath 路由文件所在文件夹
 * @param {*} app koa实例
 */
var walk = function (routeFilePath, app) {
  fs.readdirSync(routeFilePath)
    .forEach(function (routeFile) {
      var filePath = path.join(routeFilePath, '/' + routeFile);
      var route = require(filePath);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        app.use(route.routes(), route.allowedMethods());
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

var generate8Code = function (num) {
  var str = "2367820149QWERTYUIOPASDFGHJKLZXCVBNM1456789";
  var res = '#';
  for (var i = 0; i < num; i++) {
    res += str[Math.floor(Math.random() * str.length)];
  }
  return res;
}

module.exports = { walk, walk1, generate8Code };