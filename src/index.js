const { createParserOpts } = require('./parser.js')
const { createWriterOpts } = require('./writer.js')
// const {
//   createConventionalChangelogOpts,
// } = require('./conventional-changelog.js')
// const {
//   createConventionalRecommendedBumpOpts,
// } = require('./conventional-recommended-bump.js')
const { whatBump } = require('./what-bump.js')

function createPreset() {
  // const recommendedBumpOpts = createConventionalRecommendedBumpOpts(parserOpts)
  // const conventionalChangelog = createConventionalChangelogOpts(
  //   parserOpts,
  //   writerOpts,
  // )

  return {
    // conventionalChangelog,
    // parserOpts,
    // recommendedBumpOpts,
    // writerOpts,
    parser: createParserOpts(),
    whatBump,
    writer: createWriterOpts(),
  }
}

module.exports = createPreset
