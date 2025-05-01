# @commits-with-character/conventional-changelog-preset

An adapter you can use with tools such as
[release-it](https://github.com/release-it/release-it)'s
[Conventional Changelog plugin](https://github.com/release-it/conventional-changelog)
to provide the recommended bump, and update the changelog file.

It will convert [Commits with Character](https://commits-with-character.org/)
style commit messages to a changelog.

## Using with release-it

npm:

```sh
npm install -D release-it @release-it/conventional-changelog @commits-with-character/conventional-changelog-preset
```

pnpm:

```sh
pnpm install -D release-it @release-it/conventional-changelog @commits-with-character/conventional-changelog-preset
```

```jsonc
// .release-it.json
{
  "plugins": {
    "@release-it/conventional-changelog": {
      "preset": {
        "name": "@commits-with-character/preset",
      },
      "infile": "CHANGELOG.md",
      "header": "# Changelog",
    },
  },
}
```
