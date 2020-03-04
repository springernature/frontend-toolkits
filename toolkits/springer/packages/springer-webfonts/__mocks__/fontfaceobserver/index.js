const load = jest.fn().mockImplementation(() =>
	new Promise(resolve => resolve())
);
const mock = jest.fn().mockImplementation(() =>
	{load: load}
);
export default mock;
