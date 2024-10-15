const path = require('node:path')

module.exports = {
  github: {
    release: true,
  },
  hooks: {
    'before:init': ['npm run lint', 'npm test'],
  },
  plugins: {
    '@release-it/conventional-changelog': {
      header: '# Changelog',
      infile: 'CHANGELOG.md',
      preset: path.join(__dirname, 'src/index.js'),
    },
  },
}
