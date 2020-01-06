
function ScrollWrapper() {
	var toggleScrollerShadow = function (scroller) {
		var baseClass = 'c-table-scroll-wrapper__fade';
		var transparentClass = baseClass + '--transparent';
		var scrollRight = scroller.scrollWidth - (scroller.scrollLeft + scroller.clientWidth);

		if (scrollRight > 0) {
			scroller.classList.add(baseClass);
			scroller.classList.remove(transparentClass);
		} else {
			scroller.classList.add(transparentClass);
		}
	};

	return {
		init: function (elements, debounce, scheduler) {
			(elements || []).forEach(function (el) {
				this.bindEvents(el, debounce, scheduler);
			}, this);
		},

		bindEvents: function (element, debounce, scheduler) {
			var bindToggleToElement = function () {
				toggleScrollerShadow(element);
			};
			scheduler.on('load resize', bindToggleToElement);
			element.addEventListener('scroll', debounce(bindToggleToElement, 100), false);
		}
	};
}

if (typeof module !== 'undefined') {
	module.exports = ScrollWrapper;
}
