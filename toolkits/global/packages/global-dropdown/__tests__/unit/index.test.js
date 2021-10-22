'use strict';
const fs = require('fs');
const path = require('path');

import init from '../../js/index';

beforeEach( () => {
	document.body.innerHTML =`
	<div class="c-dropdown">
		<button aria-expanded="false" aria-haspopup="true" class="c-dropdown__button" data-dropdown>dropdown <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="6" viewBox="0 0 10 6"><defs><path id="chevron-down-a" d="M12.5857864,13 L9.29289322,9.70710678 C8.90236893,9.31658249 8.90236893,8.68341751 9.29289322,8.29289322 C9.68341751,7.90236893 10.3165825,7.90236893 10.7071068,8.29289322 L14.7071068,12.2928932 C15.0976311,12.6834175 15.0976311,13.3165825 14.7071068,13.7071068 L10.7071068,17.7071068 C10.3165825,18.0976311 9.68341751,18.0976311 9.29289322,17.7071068 C8.90236893,17.3165825 8.90236893,16.6834175 9.29289322,16.2928932 L12.5857864,13 Z"/></defs><g fill-rule="evenodd" transform="translate(-7 -10)"><rect width="24" height="24" opacity="0"/><use fill-rule="nonzero" transform="rotate(90 12 13)" xlink:href="#chevron-down-a"/></g></svg></button>
		<ul class="c-dropdown__menu">
			<li class="c-dropdown__menu-button">
			  <a data-dropdown-item download href="prongles.mp3">
			  <span class="u-visually-hidden">Download</span> file 1</a>
			</li>
			<li class="c-dropdown__menu-button">
			  <a data-dropdown-item download href="orinocoflow.mp3">
			  <span class="u-visually-hidden">Download</span> file 2</a>
			</li>
		    <li class="c-dropdown__menu-button">
		      <a data-dropdown-item download href="somefile.mp3">
		      <span class="u-visually-hidden">Download</span> file 3</a>
		    </li>
		</ul>
	</div>`;
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
