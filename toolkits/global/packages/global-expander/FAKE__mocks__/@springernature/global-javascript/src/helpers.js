/**
 *
 * TODO:
 * This is a duplication of the actual helpers.
 * Once https://github.com/springernature/frontend-toolkits/issues/27 is resolved
 * these will not be mocked and the actual dependencies will be used.
 *
 */

const getDataOptions = (element, attributeMap) => {
	const dataOptions = {};

	for (const key in attributeMap) {
		// eslint-disable-next-line no-prototype-builtins
		if (attributeMap.hasOwnProperty(key)) {
			let value = attributeMap[key];
			const attributeValue = element.hasAttribute(value) && element.getAttribute(value);

			if (attributeValue) {
				dataOptions[key] = attributeValue;
			}
		}
	}

	return dataOptions;
};

const makeArray = iterable => {
	const list = [];

	if (!iterable) {
		return list;
	}

	for (const item of iterable) {
		list.push(item);
	}

	return list;
};

export {
	getDataOptions, makeArray
};
