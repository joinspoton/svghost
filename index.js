var ff = require('ff');

var phantom = null;

module.exports = function (svg, options, next) {
  var page = null;
  var html = '<body style="margin:0">' + svg + '</body>';
  
  var f = ff(function () {
    module.exports.getPhantom(f.waitPlain());
  }, function () {
    phantom.createPage(f.slotPlain());
  }, function (obj) {
    page = obj;
    
    page.set('viewportSize', {
        width: options.width
      , height: options.height
    }, f.waitPlain());
    
    page.set('content', html, f.waitPlain());
  }, function () {
    page.renderBase64(options.format || 'png', f.slotPlain());
  }, function (data) {
    page.close();
    
    f.pass(new Buffer(data, 'base64'));
  }).onComplete(next);
};

module.exports.getPhantom = function (next) {
  if (phantom) {
    setImmediate(next, null, phantom);
  } else {
    var f = ff(function () {
      require('phantom').create(f.slotPlain());
    }, function (proc) {
      module.exports.setPhantom(proc);
      module.exports.getPhantom(f.slot());
    }).onComplete(next);
  }
};

module.exports.setPhantom = function (proc) {
  phantom = proc;
};

module.exports.delPhantom = function () {
  if (phantom) {
    phantom.exit();
    phantom = null;
  }
};