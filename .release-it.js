const path = require('node:path')

module.exports = {
  github: {
    release: true,
  },
  hooks: {
    'before:init': ['pnpm lint', 'pnpm test'],
  },
  plugins: {
    '@release-it/conventional-changelog': {
      header: '# Changelog',
      infile: 'CHANGELOG.md',
      preset: path.join(__dirname, 'src/index.js'),
    },
  },
}
