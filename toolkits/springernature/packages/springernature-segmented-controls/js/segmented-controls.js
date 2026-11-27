function segmentedControls(container, onCheckedRadioChange) {
	let radioButtons;
	let checkedValue;

	return {
		init
	};

	function init() {
		if (!container || !onCheckedRadioChange) {
			return;
		}
		if (typeof onCheckedRadioChange !== 'function') {
			throw new TypeError('onChangeCallback should be a function');
		}
		radioButtons = container.querySelectorAll('input');
		const checked = container.querySelector('input[checked]');
		checkedValue = checked ? checked.value : null;

		Array.prototype.forEach.call(radioButtons, function (element) {
			element.addEventListener('click', onClickCallback);

			// In standby now since browser vendors seem to transfer keyboard
			// interaction to the click handler.
			// Caveat: This seems to not be the case of JSDOM (used underneath of Jest).
			// element.addEventListener('keydown', function (event) {
			// 	if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
			// 		onClickCallback(event);
			// 	}
			// });
		});
	}

	// eslint-disable-next-line unicorn/consistent-function-scoping
	function onClickCallback(_event) {
		for (const radioButton of radioButtons) {
			if (radioButton.checked) {
				if (radioButton.value !== checkedValue) {
					checkedValue = radioButton.value;
					onCheckedRadioChange(checkedValue);
					break;
				}
			}
		}
	}
}

export {
	segmentedControls
};

