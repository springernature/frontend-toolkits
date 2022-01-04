/**
 * create it
 */
'use strict';

const Conf = require('conf');

// Create a new app specific configuration file
const config = new Conf({
	projectName: 'frontend-package-manager',
	projectSuffix: ''
});

config.set('context', {
	example: true
});

console.log('PATH:', config.path);
