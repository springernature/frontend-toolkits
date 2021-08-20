const StyleDictionaryPackage = require('style-dictionary');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

const getFolderNames = (p) => readdirSync(p).filter((f) => statSync(join(p, f)).isDirectory());

function getStyleDictionaryConfig(brand, platform, categories) {
  return {
    source: [
      `tokens/brands/${brand}/*.json`
    ],
    platforms: {
      scss: {
        transformGroup: 'scss',
        buildPath: `build/scss/${brand}/scss/`,
        files: categories.map(category => { 
          return {
            destination: `_${category}.scss`,
            format: 'scss/variables',
            filter: {
              attributes: {
                category: category
              }
            }
          }
        })
      }
    }
  }
}

['nature', 'springer', 'springernature'].map(function (brand) {
  const categories = readdirSync(`${__dirname}/tokens/brands/${brand}`);
  ['scss'].map(function (platform) {
    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform, categories));
    StyleDictionary.buildPlatform(platform);
  })
})