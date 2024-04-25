const { createParserOpts } = require("./parserOpts.js");
const { createWriterOpts } = require("./writerOpts.js");
const {
  createConventionalChangelogOpts,
} = require("./conventionalChangelog.js");
const {
  createConventionalRecommendedBumpOpts,
} = require("./conventionalRecommendedBump.js");

function createPreset() {
  const parserOpts = createParserOpts();
  const writerOpts = createWriterOpts();
  const recommendedBumpOpts = createConventionalRecommendedBumpOpts(parserOpts);
  const conventionalChangelog = createConventionalChangelogOpts(
    parserOpts,
    writerOpts
  );

  return {
    parserOpts,
    writerOpts,
    recommendedBumpOpts,
    conventionalChangelog,
  };
}

module.exports = createPreset;
