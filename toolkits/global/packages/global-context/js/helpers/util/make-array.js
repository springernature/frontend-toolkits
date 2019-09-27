const makeArray = iterable => {
	const list = [];

	if (!iterable) {
		return list;
	}

	for (let i = 0; i < iterable.length; i++) {
		list.push(iterable[i]);
	}

	return list;
};

export {makeArray};
