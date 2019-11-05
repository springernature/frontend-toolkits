import {Dropdown} from '../../js/dropdown';
import {createDropdown} from '../../js/create-dropdown';
jest.mock('../../js/dropdown');

describe('create-dropdown', () => {
	/**
	 * Helpers
	 */
	const createLinks = () => {
		const links = [];
		for (let i = 0; i < 5; i++) {
			const link = document.createElement('a');
			links.push(link);
		}

		return links;
	};

	beforeEach(() => Dropdown.mockClear());

	it('Should throw if BUTTON_TEXT property is not passed in', () => {
		// Given
		const links = createLinks();
		const noButtonTextMock = {
			LINKS: links
		};

		//Then
		expect(() => createDropdown(noButtonTextMock)).toThrow();
	});

	it('Should throw if LINKS property is not passed in', () => {
		// Given
		const noLinksMock = {
			BUTTON_TEXT: 'Menu'
		};

		// When / Then
		expect(() => createDropdown(noLinksMock)).toThrow();
	});

	it('Should call Dropdown if options are valid', () => {
		// Given
		const links = createLinks();

		jest.spyOn(Dropdown.prototype, 'init').mockImplementation(() => {});

		const validOptionsMock = {
			BUTTON_TEXT: 'Menu text',
			LINKS: links
		};

		// When
		createDropdown(validOptionsMock);

		// Then
		expect(Dropdown).toHaveBeenCalledTimes(1);
		const mockDropdownInstance = Dropdown.mock.instances[0];
		expect(mockDropdownInstance.init).toHaveBeenCalledTimes(1);
	});

	it('Should call Dropdown with DROPDOWN_OPTIONS if passed in', () => {
		// Given
		const links = createLinks();

		const validOptionsMock = {
			BUTTON_TEXT: 'Menu text',
			LINKS: links,
			DROPDOWN_OPTIONS: {
				HIDE_CLASS: 'my-class',
			}
		};

		// When
		createDropdown(validOptionsMock);

		// Then
		expect(Dropdown.mock.calls[0][1]).toMatchObject({HIDE_CLASS: 'my-class'});
	});
});