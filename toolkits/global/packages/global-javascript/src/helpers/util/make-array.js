const makeArray = iterable => {
	const list = [];

	if (!iterable) {
		return list;
	}

	for (let i = 0; i < iterable.length; i++) {
		const key = iterable[i];

		if (Object.prototype.hasOwnProperty.call(iterable, key)) {
			list.push(iterable[key]);
		}
	}

	return list;
};

export {makeArray};
