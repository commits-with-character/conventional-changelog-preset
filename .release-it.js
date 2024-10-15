const config = require('./src/index.js')

module.exports = {
  github: {
    release: true,
  },
  hooks: {
    'before:init': ['npm run lint', 'npm test'],
  },
  plugins: {
    '@release-it/conventional-changelog': {
      config: config(),
      header: '# Changelog',
      infile: 'CHANGELOG.md',
    },
  },
}
