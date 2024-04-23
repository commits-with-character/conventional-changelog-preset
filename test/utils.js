import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

function fixMessage(message) {
  let msg = message

  if (!msg || typeof msg !== 'string') {
    msg = 'Test commit'
  }

  // we need to escape backtick for bash but not for windows
  // probably this should be done in git-dummy-commit or shelljs
  if (process.platform !== 'win32') {
    msg = msg.replaceAll('`', '\\`')
  }

  return `"${msg}"`
}

function formatMessageArgs(msg) {
  const args = []

  if (Array.isArray(msg)) {
    if (msg.length > 0) {
      for (const m of msg) {
        args.push('-m', fixMessage(m))
      }
    } else {
      args.push('-m', fixMessage())
    }
  } else {
    args.push('-m', fixMessage(msg))
  }

  return args
}

export class TestTools {
  constructor() {
    const tmpDir = path.join(__dirname, '..', 'node_modules', '.tmp')
    if (fs.existsSync(tmpDir)) {
      fs.rmdirSync(tmpDir)
    }
    fs.mkdirSync(tmpDir, { recursive: true })
    this.cwd = tmpDir
  }

  cleanup() {
    try {
      this.rmSync(this.cwd, {
        recursive: true,
      })
    } catch {
      // ignore
    }
  }

  mkdirSync(dir, options) {
    return fs.mkdirSync(path.resolve(this.cwd, dir), options)
  }

  writeFileSync(file, content) {
    return fs.writeFileSync(path.resolve(this.cwd, file), content)
  }

  readFileSync(file, options) {
    return fs.readFileSync(path.resolve(this.cwd, file), options)
  }

  rmSync(target, options) {
    return fs.rmSync(path.resolve(this.cwd, target), options)
  }

  exec(command) {
    return execSync(command, {
      cwd: this.cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    })
  }

  gitInit() {
    this.mkdirSync('git-templates')
    return this.exec(
      'git init --template=./git-templates  --initial-branch=master',
    )
  }

  gitCommit(msg) {
    const args = formatMessageArgs(msg)
    args.push('--allow-empty', '--no-gpg-sign')
    return this.exec(`git commit ${args.join(' ')}`)
  }
}
