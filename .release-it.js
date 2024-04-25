const config = require("./src/index");

module.exports = {
  git: {
    commitMessage: "Release v${version}",
    requireCleanWorkingDir: false,
  },
  github: {
    release: true,
  },
  plugins: {
    "@release-it/conventional-changelog": {
      infile: "CHANGELOG.md",
      config: config(),
    },
  },
};
