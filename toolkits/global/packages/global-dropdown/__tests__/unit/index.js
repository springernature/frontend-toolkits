'use strict';
const fs = require('fs');
const path = require('path');

import init from '../../js/index';

const filePath = path.join(__dirname, '../../view/dropdown.html');
const template = fs.readFileSync(filePath);

beforeEach( () => {
	document.body.innerHTML = template;
	init();
});

afterEach(() => {
	document.body.innerHTML = '';
});

describe('index', () => {
	test('dropdown opens when clicked!', () => {
		const toggleDropdown = jest.fn();
		var button = document.querySelector('button');
		button.dispatchEvent(new Event('click'));
		setTimeout(() => {
			expect(toggleDropdown).toHaveBeenCalledTimes(1);
			expect(!document.querySelector('.c-dropdown__menu').contains('u-display-none'));
		}, 150);
	});
	
	test('Esc key closes dropdown', () => {
		const closeDropdown = jest.fn();
		var button = document.querySelector('button');
		button.dispatchEvent(new Event('click'));
		document.dispatchEvent(new KeyboardEvent('keydown', {
			key: 'Esc'
		}));
		setTimeout(() => {
			expect(closeDropdown).toHaveBeenCalledTimes(2);
		}, 150);
	})

	test('Up arrow calls up arrow callback', () => {
		const handleUpArrow = jest.fn();
		document.dispatchEvent(new KeyboardEvent('keydown', {
			key: 'ArrowUp'
		}))
		setTimeout(() => {
			expect(handleUpArrow).toHaveBeenCalledTimes(1);
		}, 150);
	});
});
