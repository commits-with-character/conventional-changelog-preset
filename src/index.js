const { createParserOpts } = require('./parser-opts.js')
const { createWriterOpts } = require('./writer-opts.js')
const {
  createConventionalChangelogOpts,
} = require('./conventional-changelog.js')
const {
  createConventionalRecommendedBumpOpts,
} = require('./conventional-recommended-bump.js')

function createPreset() {
  const parserOpts = createParserOpts()
  const writerOpts = createWriterOpts()
  const recommendedBumpOpts = createConventionalRecommendedBumpOpts(parserOpts)
  const conventionalChangelog = createConventionalChangelogOpts(
    parserOpts,
    writerOpts,
  )

  return {
    conventionalChangelog,
    parserOpts,
    recommendedBumpOpts,
    writerOpts,
  }
}

module.exports = createPreset
