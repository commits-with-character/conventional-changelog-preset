const { createParserOpts } = require('./parser.js')
const { whatBump } = require('./what-bump.js')
const { createWriterOpts } = require('./writer.js')

function createPreset() {
  return {
    parser: createParserOpts(),
    whatBump,
    writer: createWriterOpts(),
  }
}

module.exports = createPreset
