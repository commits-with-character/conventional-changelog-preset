const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const compareFunc = require('compare-func')

const dirname = __dirname

function getWriterOpts() {
  return {
    commitGroupsSort: 'title',
    commitsSort: ['semver', 'shortDesc'],
    groupBy: 'semverTitle',
    noteGroupsSort: 'title',
    notesSort: compareFunc,
    transform: (commit) => {
      if (commit?.character === '!') {
        commit.semver = 'major'
        commit.semverTitle = 'Major changes'
      } else if (commit?.character === '^') {
        commit.semver = 'minor'
        commit.semverTitle = 'Minor changes'
      } else if (commit?.character === '~') {
        commit.semver = 'patch'
        commit.semverTitle = 'Patches'
      } else {
        return
      }

      if (typeof commit.hash === 'string') {
        commit.shortHash = commit.hash.slice(0, 7)
      }

      return commit
    },
  }
}

function createWriterOpts() {
  const template = readFileSync(
    resolve(dirname, './templates/template.hbs'),
    'utf8',
  )
  const header = readFileSync(
    resolve(dirname, './templates/header.hbs'),
    'utf8',
  )
  const commit = readFileSync(
    resolve(dirname, './templates/commit.hbs'),
    'utf8',
  )

  const writerOpts = getWriterOpts()

  writerOpts.mainTemplate = template
  writerOpts.headerPartial = header
  writerOpts.commitPartial = commit

  return writerOpts
}

module.exports.createWriterOpts = createWriterOpts
