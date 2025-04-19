import { createParserOpts } from './parser.js'
import { whatBump } from './what-bump.js'
import { createWriterOpts } from './writer.js'

function createPreset() {
  return {
    parser: createParserOpts(),
    whatBump,
    writer: createWriterOpts(),
  }
}

export default createPreset
