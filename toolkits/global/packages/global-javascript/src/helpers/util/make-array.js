const makeArray = iterable => {
	const list = [];

	if (!iterable) {
		return list;
	}

	for (const key in iterable) {
		if (Object.prototype.hasOwnProperty.call(iterable, key)) {
			list.push(iterable[key]);
		}
	}

	return list;
};

export {makeArray};
