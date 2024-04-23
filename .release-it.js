const config = require('./src/index')

module.exports = {
  github: {
    release: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      config: config(),
      header: '# Changelog',
      infile: 'CHANGELOG.md',
    },
  },
}
