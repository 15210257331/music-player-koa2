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

  module.exports = {walk};