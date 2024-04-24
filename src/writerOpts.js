const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");
const compareFunc = require("compare-func");

const dirname = __dirname;

async function createWriterOpts() {
  const [template, header, commit, footer] = await Promise.all([
    readFile(resolve(dirname, "./templates/template.hbs"), "utf-8"),
    readFile(resolve(dirname, "./templates/header.hbs"), "utf-8"),
    readFile(resolve(dirname, "./templates/commit.hbs"), "utf-8"),
    readFile(resolve(dirname, "./templates/footer.hbs"), "utf-8"),
  ]);

  const writerOpts = getWriterOpts();

  writerOpts.mainTemplate = template;
  writerOpts.headerPartial = header;
  writerOpts.commitPartial = commit;
  writerOpts.footerPartial = footer;

  return writerOpts;
}

module.exports.createWriterOpts = createWriterOpts;

function getWriterOpts() {
  return {
    transform: (commit) => {
      if (commit?.character === "!") {
        commit.semver = "major";
        commit.semverTitle = "Major changes";
      } else if (commit?.character === "^") {
        commit.semver = "minor";
        commit.semverTitle = "Minor changes";
      } else if (commit?.character === "~") {
        commit.semver = "patch";
        commit.semverTitle = "Patches";
      } else {
        return;
      }

      if (typeof commit.hash === "string") {
        commit.shortHash = commit.hash.substring(0, 7);
      }

      return commit;
    },
    groupBy: "semverTitle",
    commitGroupsSort: "title",
    commitsSort: ["semver", "shortDesc"],
    noteGroupsSort: "title",
    notesSort: compareFunc,
  };
}
