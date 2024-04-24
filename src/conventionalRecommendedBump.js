const { whatBump } = require("./what-bump.js");

function createConventionalRecommendedBumpOpts(parserOpts) {
  return {
    parserOpts,
    whatBump,
  };
}

module.exports.createConventionalRecommendedBumpOpts =
  createConventionalRecommendedBumpOpts;
