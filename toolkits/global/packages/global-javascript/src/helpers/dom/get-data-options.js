/**
 * @param element
 * @param attributeMap - An Object of data attribute options
 * @returns Object
 */
const getDataOptions = (element, attributeMap) => {
	const dataOptions = {};

	for (const key in attributeMap) {
		// eslint-disable-next-line no-prototype-builtins
		if (attributeMap.hasOwnProperty(key)) {
			let value = attributeMap[key];
			const attributeValue = element.hasAttribute(value) && element.getAttribute(value);

			if (attributeValue) {
				dataOptions[key] = (attributeValue === 'true' || attributeValue === 'false') ? attributeValue === 'true' : attributeValue;
			}
		}
	}

	return dataOptions;
};

export {
	getDataOptions
};
