var fs = require("fs");
var path = require("path");
var regexpu = require("regexpu-core");

var uniReg = {
  typeMatchClass: regexpu(
    "\\.((?:\\\\.|[A-Za-z_\\-\\u{00a0}-\\u{10ffff}])(?:\\\\.|[A-Za-z_\\-0-9\\u{00a0}-\\u{10ffff}])*)",
    "u"
  ),
  typeMatchId: regexpu(
    "#((?:\\\\.|[A-Za-z_\\-\\u{00a0}-\\u{10ffff}])(?:\\\\.|[A-Za-z_\\-0-9\\u{00a0}-\\u{10ffff}])*)",
    "u"
  ),
  identifierEscapeRegexp: regexpu(
    "(^[^A-Za-z_\\-\\u{00a0}-\\u{10ffff}]|^--|[^A-Za-z_0-9\\-\\u{00a0}-\\u{10ffff}])",
    "ug"
  ),
};

var targetFile = path.join(__dirname, "../lib/uni-regexp.js");

fs.writeFileSync(
  targetFile,
  "/* AUTO GENERATED */\nmodule.exports = " + JSON.stringify(uniReg, null, 4) + '\n'
);

console.log('Done building ' + targetFile)