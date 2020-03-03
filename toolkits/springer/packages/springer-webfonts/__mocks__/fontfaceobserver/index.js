const load = jest.fn().mockImplementation(() => new Promise((resolve, reject) => resolve()));
const mock = jest.fn().mockImplementation(() => {
		return {load: load}
	}
);
export default mock;
