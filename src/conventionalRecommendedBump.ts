import { whatBump } from "./what-bump.js";

export function createConventionalRecommendedBumpOpts(parserOpts: any) {
  return {
    parserOpts,
    whatBump,
  };
}
