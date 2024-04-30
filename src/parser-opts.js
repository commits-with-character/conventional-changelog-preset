function createParserOpts() {
  return {
    headerCorrespondence: ['character', 'subject'],
    headerPattern: /^([!^~]) \s*(.*)$/u,
  }
}

module.exports.createParserOpts = createParserOpts
