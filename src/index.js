const { createParserOpts } = require('./parser.js')
const { createWriterOpts } = require('./writer.js')
const { whatBump } = require('./what-bump.js')

function createPreset() {
  return {
    parser: createParserOpts(),
    whatBump,
    writer: createWriterOpts(),
  }
}

module.exports = createPreset
