
var fs = require('fs');

function BitBarWebpackProgressPlugin(webpack) {
  this.filePath = '/tmp/webpack-status';
  this.webpack = webpack;
}

BitBarWebpackProgressPlugin.prototype.apply = function(compiler) {
  var self = this;
  var webpack = self.webpack;

  var progress = new webpack.ProgressPlugin((p, msg) => {
    let percentage = `${Math.round(p * 100)}`;
    fs.writeFileSync(self.filePath, percentage)
  });

  /*
  compiler.plugin('compile', function(stats) {
    fs.writeFile(self.filePath, '0');
  });

  compiler.plugin('done', function(stats) {
    if (stats.hasErrors())
      fs.writeFile(self.filePath, '-1');
    else
      fs.writeFile(self.filePath, '1');
  });
  */

};

module.exports = BitBarWebpackProgressPlugin;