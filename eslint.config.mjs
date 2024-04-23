import config from '@will-stone/eslint-config'

export default [
  ...config(),
  {
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },
]
