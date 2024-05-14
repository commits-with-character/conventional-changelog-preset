# @commits-with-character/conventional-changelog-preset

An adapter you can use with tools such as
[release-it](https://github.com/release-it/release-it)'s
[Conventional Changelog plugin](https://github.com/release-it/conventional-changelog)
to provide the recommended bump, and update the changelog file.

## Using with release-it

```sh
npm install -D release-it @release-it/conventional-changelog @commits-with-character/conventional-changelog-preset
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
