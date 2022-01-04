/**
 * use it
 */
'use strict';

const path = require('path');
const environmentPaths = require('env-paths')('frontend-package-manager', {suffix: ''});

const pathName = path.join(environmentPaths.config, 'config.json');
const config = require(pathName);
console.log(config);
