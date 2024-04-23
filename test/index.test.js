import conventionalChangelog from "conventional-changelog-core";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { TestTools } from "./utils.js";
import preset from "../dist/index.js";
import conventionalRecommendedBump from "conventional-recommended-bump";

function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

let testTools;

beforeEach(() => {
  testTools = new TestTools();
  testTools.gitInit();
  vi.setSystemTime("0");
  testTools.writeFileSync(
    "package.json",
    JSON.stringify({
      name: "conventional-changelog-semver-commits",
      version: "1.0.0",
      repository: {
        type: "git",
        url: "https://github.com/SemVer-Commits/conventional-changelog-semver-commits.git",
      },
    })
  );
});

afterEach(() => {
  testTools.cleanup();
});

test("should be breaking on !", async () => {
  testTools.gitCommit(["^ Minor minor"]);
  testTools.gitCommit(["! Breaking breaking"]);
  testTools.gitCommit(["~ Patch patch"]);
  testTools.gitCommit(["Nothing releasable"]);

  expect(
    await conventionalRecommendedBump({
      cwd: testTools.cwd,
      config: await preset(),
    })
  ).toStrictEqual({
    level: 0,
    reason: "There are breaking, major changes",
    releaseType: "major",
  });

  expect(
    await streamToString(
      conventionalChangelog({
        cwd: testTools.cwd,
        config: preset,
      })
    )
  ).toMatch(
    /^## 1.0.0 \(2000-01-01\)\n\n\n### Major changes\n\n\* Breaking breaking \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/SemVer-Commits\/conventional-changelog-semver-commits\/commit\/[0-9a-f]{40}\)\)\n\n### Minor changes\n\n\* Minor minor \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/SemVer-Commits\/conventional-changelog-semver-commits\/commit\/[0-9a-f]{40}\)\)\n\n### Patches\n\n\* Patch patch \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/SemVer-Commits\/conventional-changelog-semver-commits\/commit\/[0-9a-f]{40}\)\)\n\n$/gmu
  );
});

test("should be minor on ^", async () => {
  testTools.writeFileSync(
    "package.json",
    JSON.stringify({
      name: "conventional-changelog-semver-commits",
      version: "1.0.0",
      repository: {
        type: "git",
        url: "https://github.com/SemVer-Commits/conventional-changelog-semver-commits.git",
      },
    })
  );

  testTools.gitCommit(["^ Minor minor"]);
  testTools.gitCommit(["Nothing releasable"]);
  testTools.gitCommit(["~ Patch patch"]);

  expect(
    await conventionalRecommendedBump({
      cwd: testTools.cwd,
      config: await preset(),
    })
  ).toStrictEqual({
    level: 1,
    reason: "There are minor changes",
    releaseType: "minor",
  });

  expect(
    await streamToString(
      conventionalChangelog({
        cwd: testTools.cwd,
        config: preset,
      })
    )
  ).toMatch(
    /^## 1.0.0 \(2000-01-01\)\n\n\n### Minor changes\n\n\* Minor minor \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/SemVer-Commits\/conventional-changelog-semver-commits\/commit\/[0-9a-f]{40}\)\)\n\n### Patches\n\n\* Patch patch \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/SemVer-Commits\/conventional-changelog-semver-commits\/commit\/[0-9a-f]{40}\)\)\n\n$/gmu
  );
});

test("should be patch on ~", async () => {
  testTools.writeFileSync(
    "package.json",
    JSON.stringify({
      name: "conventional-changelog-semver-commits",
      version: "1.0.0",
      repository: {
        type: "git",
        url: "https://github.com/SemVer-Commits/conventional-changelog-semver-commits.git",
      },
    })
  );

  testTools.gitCommit(["Nothing releasable"]);
  testTools.gitCommit(["~ Patch patch"]);

  expect(
    await conventionalRecommendedBump({
      cwd: testTools.cwd,
      config: await preset(),
    })
  ).toStrictEqual({
    level: 2,
    reason: "There are patches",
    releaseType: "patch",
  });

  expect(
    await streamToString(
      conventionalChangelog({
        cwd: testTools.cwd,
        config: preset,
      })
    )
  ).toMatch(
    /^## 1.0.0 \(2000-01-01\)\n\n\n### Patches\n\n\* Patch patch \(\[[0-9a-f]{7}\]\(https:\/\/github.com\/SemVer-Commits\/conventional-changelog-semver-commits\/commit\/[0-9a-f]{40}\)\)\n\n$/gmu
  );
});
