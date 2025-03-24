import config from '@will-stone/eslint-config'

export default [
  ...(await config()),
  {
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },
]
