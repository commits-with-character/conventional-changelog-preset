const preset = require("./dist/index.cjs");

module.exports = {
  git: {
    commitMessage: "Release v${version}",
  },
  github: {
    release: true,
  },
  plugins: {
    "@release-it/conventional-changelog": {
      config: preset,
      infile: "CHANGELOG.md",
    },
  },
};
