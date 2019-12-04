const createDropdown = jest.fn().mockImplementation(() => {
	const mockElement = document.createElement('ul');

	for (let i = 0; i < 5; i++) {
		const item = document.createElement('li');
		item.textContent = 'item ' + i;
		mockElement.append(item);
	}

	return mockElement;
});

export {createDropdown};
