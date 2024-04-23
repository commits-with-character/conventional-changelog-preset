export function createParserOpts() {
  return {
    headerPattern: /^([!^~]) \s*(.*)$/,
    headerCorrespondence: ["character", "subject"],
  };
}
