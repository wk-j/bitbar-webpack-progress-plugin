/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

const fs = require("fs");
const os = require("os");

const pluginName = "BitBarWebpackProgress";

function BitBarWebpackProgressPlugin(handler) {
  function write(p, msg) {
    let filePath = `${os.tmpdir()}/webpack-progress`;
    let percentage = `${Math.round(p * 100)}`;
    fs.writeFileSync(filePath, percentage);
  }
  this.handler = write;
}

BitBarWebpackProgressPlugin.prototype.apply = function(compiler) {
  const handler = this.handler;
  if (compiler.compilers) {
    const states = new Array(compiler.compilers.length);
    compiler.compilers.forEach((compiler, idx) => {
      compiler.apply(
        new ProgressPlugin((p, msg) => {
          states[idx] = [p, msg];
          handler(
            states
              .map(state => (state && state[0]) || 0)
              .reduce((a, b) => a + b) / states.length,
            states
              .map(state => state && state[1])
              .filter(Boolean)
              .join(" | ")
          );
        })
      );
    });
  } else {
    let lastModulesCount = 0;
    let moduleCount = 1;
    let doneModules = 0;

    const update = () => {
      handler(
        0.1 + doneModules / Math.max(lastModulesCount, moduleCount) * 0.6,
        `${doneModules}/${moduleCount} build modules`
      );
    };
    compiler.hooks.compilation.tap(pluginName, compilation => {
      if (compilation.compiler.isChild()) {
        return;
      }

      lastModulesCount = moduleCount;
      moduleCount = 0;
      doneModules = 0;
      handler(0, "compile");
      compilation.hooks.buildModule.tap(pluginName, () => {
        moduleCount++;
        update();
      });
      compilation.hooks.succeedModule.tap(pluginName, () => {
        doneModules++;
        update();
      });
      compilation.hooks.seal.tap(pluginName, () => handler(0.71, "seal"));
      compilation.hooks.optimize.tap(pluginName, () =>
        handler(0.73, "optimize")
      );
      compilation.hooks.beforeHash.tap(pluginName, () =>
        handler(0.75, "hashing")
      );
      compilation.hooks.beforeChunkAssets.tap(pluginName, () =>
        handler(0.76, "create chunk assets")
      );
      compilation.hooks.additionalChunkAssets.tap(pluginName, () =>
        handler(0.78, "additional chunk assets")
      );
      compilation.hooks.optimizeChunkAssets.tapAsync(
        pluginName,
        (chunks, callback) => {
          handler(0.8, "optimize chunk assets");
          callback();
        }
      );
      compilation.hooks.optimizeAssets.tapAsync(
        pluginName,
        (assets, callback) => {
          handler(0.9, "optimize assets");
          callback();
        }
      );
    });
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      handler(0.95, "emit");
      callback();
    });
    compiler.hooks.done.tap(pluginName, () => handler(1, ""));
  }
};

module.exports = BitBarWebpackProgressPlugin;
