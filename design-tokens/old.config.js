const StyleDictionary = require('style-dictionary');
const tokens = require('./tokens');

console.log(tokens);

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: tokens.map(tokenCategory => ({
        destination: `_${tokenCategory}.scss`,
        format: "scss/variables",
        filter: {
          attributes: {
            category: tokenCategory
          }
        }
      }))
    }
  }
}
