import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function getWriterOpts() {
  return {
    commitGroupsSort: 'title',
    commitsSort: ['semver', 'shortDesc'],
    groupBy: 'semverTitle',
    transform: (commit) => {
      const output = {}

      if (commit?.character === '!') {
        output.semver = 'major'
        output.semverTitle = 'Major changes'
      } else if (commit?.character === '^') {
        output.semver = 'minor'
        output.semverTitle = 'Minor changes'
      } else if (commit?.character === '~') {
        output.semver = 'patch'
        output.semverTitle = 'Patches'
      } else {
        return
      }

      if (typeof commit.hash === 'string') {
        output.shortHash = commit.hash.slice(0, 7)
      }

      if (commit.body) {
        output.body = commit.body
      }

      return output
    },
  }
}

export function createWriterOpts() {
  const template = readFileSync(
    resolve(import.meta.dirname, './templates/template.hbs'),
    'utf8',
  )
  const header = readFileSync(
    resolve(import.meta.dirname, './templates/header.hbs'),
    'utf8',
  )
  const commit = readFileSync(
    resolve(import.meta.dirname, './templates/commit.hbs'),
    'utf8',
  )

  const writerOpts = getWriterOpts()

  writerOpts.mainTemplate = template
  writerOpts.headerPartial = header
  writerOpts.commitPartial = commit

  return writerOpts
}
