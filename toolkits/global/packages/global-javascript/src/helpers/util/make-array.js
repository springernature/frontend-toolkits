const makeArray = iterable => {
	const list = [];

	if (!iterable) {
		return list;
	}

	Array.prototype.forEach.call(iterable, function (item) {
		list.push(item)
	});

	return list;
};

export {makeArray};
