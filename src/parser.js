export function createParserOpts() {
  return {
    headerCorrespondence: ['character', 'subject'],
    headerPattern: /^([!^~]) \s*(.*)$/u,
  }
}
