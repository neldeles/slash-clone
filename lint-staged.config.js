module.exports = {
  "*.{ts,tsx}": [
    "yarn format:fix",
    "yarn lint",
    () => "tsc --noEmit",
    "yarn test --bail --watchAll=false --findRelatedTests --passWithNoTests",
  ],
};
