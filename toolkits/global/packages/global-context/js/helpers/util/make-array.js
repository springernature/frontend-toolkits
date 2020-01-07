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

export {makeArray};
