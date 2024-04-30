function createParserOpts() {
  return {
    headerPattern: /^([!^~]) \s*(.*)$/,
    headerCorrespondence: ['character', 'subject'],
  }
}

module.exports.createParserOpts = createParserOpts
