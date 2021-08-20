const StyleDictionaryPackage = require('style-dictionary');
const { readdirSync } = require('fs');

function getStyleDictionaryConfig(brand, categories) {
  let path = `${__dirname}/build/${brand}`;
  if (brand === 'global') {
    path = `${__dirname}/build/global`
  }
  return {
    source: [
      `${__dirname}/tokens/brands/${brand}/**/*.json`,
      `${__dirname}/tokens/global/**/*.json`
    ],
    platforms: {
      scss: {
        transformGroup: 'web',
        buildPath: `${path}/scss/`,
        files: categories.map(category => { 
          return {
            destination: `_${category}.scss`,
            format: 'scss/variables',
            filter: {
              attributes: {
                category
              }
            }
          }
        })
      },
      css: {
        transformGroup: 'web',
        buildPath: `${path}/css/`,
        files: categories.map(category => { 
          return {
            destination: `${category}.css`,
            format: 'css/variables',
            filter: {
              attributes: {
                category
              }
            }
          }
        })
      }
    }
  }
}

['global', 'nature', 'springer', 'springernature'].map(function (brand) {
  let dir = `${__dirname}/tokens/brands/${brand}`
  if (brand === 'global') {
    dir = `${__dirname}/tokens/global/`;
  }
  const categories = readdirSync(dir);
  const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, categories));
  brands.buildAllPlatforms();
});

