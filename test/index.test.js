import path from 'node:path'

import conventionalChangelog from 'conventional-changelog-core'
import { Bumper } from 'conventional-recommended-bump'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import preset from '../src/index.js'

import { TestTools } from './utils.js'

function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

let testTools

beforeEach(() => {
  testTools = new TestTools()
  testTools.gitInit()
  vi.setSystemTime('0')
  testTools.writeFileSync(
    'package.json',
    JSON.stringify({
      name: 'conventional-changelog-preset',
      repository: {
        type: 'git',
        url: 'https://github.com/commits-with-character/conventional-changelog-preset.git',
      },
      version: '1.0.0',
    }),
  )
})

afterEach(() => {
  testTools.cleanup()
})

test('should be breaking on !', async () => {
  testTools.gitCommit(['^ Minor minor'])
  testTools.gitCommit(['! Breaking breaking'])
  testTools.gitCommit(['~ Patch patch'])
  testTools.gitCommit(['Nothing releasable'])

  const bumper = new Bumper(testTools.cwd)
  bumper.loadPreset(path.join(__dirname, '../src/index.js'))
  const result = await bumper.bump()

  expect(result).toStrictEqual({
    level: 0,
    reason: 'There are breaking, major changes',
    releaseType: 'major',
  })

  await expect(
    streamToString(
      conventionalChangelog({
        config: preset,
        cwd: testTools.cwd,
      }),
    ),
  ).resolves.toMatch(
    /^## 1.0.0 \(2000-01-01\)\n\n### Major changes\n\n\* Breaking breaking \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/commits-with-character\/conventional-changelog-preset\/commit\/[0-9a-f]{40}\)\)\n\n### Minor changes\n\n\* Minor minor \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/commits-with-character\/conventional-changelog-preset\/commit\/[0-9a-f]{40}\)\)\n\n### Patches\n\n\* Patch patch \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/commits-with-character\/conventional-changelog-preset\/commit\/[0-9a-f]{40}\)\)\n\n$/gmu,
  )
})

test('should be minor on ^', async () => {
  testTools.gitCommit(['^ Minor minor'])
  testTools.gitCommit(['Nothing releasable'])
  testTools.gitCommit(['~ Patch patch'])

  const bumper = new Bumper(testTools.cwd)
  bumper.loadPreset(path.join(__dirname, '../src/index.js'))
  const result = await bumper.bump()

  expect(result).toStrictEqual({
    level: 1,
    reason: 'There are minor changes',
    releaseType: 'minor',
  })

  await expect(
    streamToString(
      conventionalChangelog({
        config: preset,
        cwd: testTools.cwd,
      }),
    ),
  ).resolves.toMatch(
    /^## 1.0.0 \(2000-01-01\)\n\n### Minor changes\n\n\* Minor minor \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/commits-with-character\/conventional-changelog-preset\/commit\/[0-9a-f]{40}\)\)\n\n### Patches\n\n\* Patch patch \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/commits-with-character\/conventional-changelog-preset\/commit\/[0-9a-f]{40}\)\)\n\n$/gmu,
  )
})

test('should be patch on ~', async () => {
  testTools.gitCommit(['Nothing releasable'])
  testTools.gitCommit(['~ Patch patch'])

  const bumper = new Bumper(testTools.cwd)
  bumper.loadPreset(path.join(__dirname, '../src/index.js'))
  const result = await bumper.bump()

  expect(result).toStrictEqual({
    level: 2,
    reason: 'There are patches',
    releaseType: 'patch',
  })

  await expect(
    streamToString(
      conventionalChangelog({
        config: preset,
        cwd: testTools.cwd,
      }),
    ),
  ).resolves.toMatch(
    /^## 1.0.0 \(2000-01-01\)\n\n### Patches\n\n\* Patch patch \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/commits-with-character\/conventional-changelog-preset\/commit\/[0-9a-f]{40}\)\)\n\n$/gmu,
  )
})
