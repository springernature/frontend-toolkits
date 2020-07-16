const path = require('path');
import {render} from '@springernature/util-sass-compiler';

describe('Test RFS mixin', () => {
	test('Default settings', async () => {
		const result = await render({
			file: path.resolve(__dirname, './sass/_default.scss')
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
					"font-size": "calc(1.54167rem + .04861vw)",
				},
				".rem": {
					"font-size": "calc(1.875rem + .10417vw)",
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
