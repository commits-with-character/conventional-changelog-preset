export function whatBump(commits) {
  let level = 3
  let reason = 'There are no releasable changes'

  for (const commit of commits) {
    if (commit.character === '!') {
      level = 0
      reason = 'There are breaking, major changes'
    } else if (commit.character === '^' && level > 0) {
      level = 1
      reason = 'There are minor changes'
    } else if (commit.character === '~' && level > 1) {
      level = 2
      reason = 'There are patches'
    }
  }

  return { level, reason }
}
