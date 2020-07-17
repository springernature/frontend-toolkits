const path = require('path');
import {render} from '@springernature/util-sass-compiler';

describe('Test RFS mixin', () => {
	test('Springer settings', async () => {
		const result = await render({
			file: path.resolve(__dirname, './sass/_springer.scss')
		});
		expect(result.json).toEqual({
			".base": {
				"font-size": "1rem"
			},
			".large": {
				"font-size": "1.6rem",
			},
			"@media (max-width: 1200px)": {
				".large": {
					"font-size": "calc(1.46875rem + .10938vw)",
				},
				".rem": {
					"font-size": "calc(1.71875rem + .23438vw)",
				}
			},
			".important": {
				"font-size": "2rem !important",
			},
			".rem": {
				"font-size": "2rem",
			},
			".small": {
				"font-size": ".5rem",
			},
			".special": {
				"font-size": "inherit",
			},
			".unsupported": {
				"font-size": "2em",
			}
		});
	});
});
