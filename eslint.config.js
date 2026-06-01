import config from '@will-stone/eslint-config'

export default [
  ...(await config({ cwd: import.meta.dirname })),
  {
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },
]
