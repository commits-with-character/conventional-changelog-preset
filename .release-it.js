import path from 'node:path'

export default {
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
      preset: path.join(import.meta.dirname, 'src/index.js'),
    },
  },
}
