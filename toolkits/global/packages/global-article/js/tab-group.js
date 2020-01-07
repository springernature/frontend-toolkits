/* global $ */
/*
 * Responsive Tabs with Accordion fallback
 *
 * Options
 * ----------
 * activeTab - <num> [optional] - tab visible on load. Default: 1
 *
 */

window.Component.TabGroup = (function () {
	'use strict';

	var TAB_ITEM_SELECTOR = '[data-component-tab-item]';
	var TAB_ACTIVE_ITEM_CLASS = 'c-article-tabs__active-tab';

	var TabGroup = function ($element) {
		this.$el = $element;
		this.id = $element.attr('id');
		this.$tabs = $element.find('[role="tab"]');
		this.$content = $element.find('[role="tabpanel"]');
		this.numTabs = this.$tabs.length;
		this.tabsWidth = 0;
		this.tabsHeight = 0;
		this.active = null;
	};

	TabGroup.prototype = {
		init: function (options, scheduler) {
			var self = this;
			var activeIndex = typeof options.activeTab === 'number' ? options.activeTab : 1;
			var currentActive = activeIndex - 1;
			var nonActive = (currentActive === 0) ? self.numTabs - 1 : 0;

			self.active = self.setActiveTab(activeIndex > 0 && activeIndex <= self.numTabs ? currentActive : 0);

			self.breakpoints = options.breakpoints || [];
			self.$tabs.wrapInner('<button class="c-article-tabs__button"><span><span><span></span></span></span></button>');

			// calculate total width naturally used by tabs
			self.$tabs.each(function () {
				self.tabsWidth += $(this).outerWidth(true);
			});

			// get non-active tab height to work out content position later
			self.tabsHeight = self.$tabs.eq(nonActive).height();

			$('#' + self.id).on('click', 'button', function (event) {
				self.click(event);
			});
			scheduler.on('resize orientationchange', function () {
				self.redraw();
			});
			self.redraw();
		},

		click: function (event) {
			var element = $(event.target);
			var id = element.parents(TAB_ITEM_SELECTOR).attr('id');

			this.switchTo(id);
		},

		switchTo: function (id) {
			var $tabContent = $('#' + id);

			if (this.active !== id) {
				if (!$tabContent.length) { // eslint-disable-line unicorn/explicit-length-check
					$tabContent = this.$el.find(TAB_ITEM_SELECTOR + ':first');
				}
				$('#' + this.active).removeClass(TAB_ACTIVE_ITEM_CLASS);

				$tabContent.addClass(TAB_ACTIVE_ITEM_CLASS);
				this.prev = this.active;
				this.active = id;
				this.redraw();
			}
		},

		setActiveTab: function (index) {
			return this.$el.find(TAB_ITEM_SELECTOR).eq(index).addClass(TAB_ACTIVE_ITEM_CLASS).attr('id');
		},

		redraw: function () {
			var self = this;
			var totalWidth = 0;
			var availableWidth = self.$el.width() - self.numTabs;
			var width = Math.floor(availableWidth / self.numTabs);
			var buttonSelector = '.c-article-tabs__button';

			self.$el.find(buttonSelector).removeAttr('style');
			self.$tabs.each(function () {
				totalWidth += $(this).outerWidth(true);
			});

			if (totalWidth >= availableWidth) {
				self.$el.find(buttonSelector).css('width', width);
			}

			self.$content.css('marginTop', self.tabsHeight + 1); // position the content below tabs
			$('#' + self.prev).find(buttonSelector).css('height', 'auto');
			$('#' + self.active).find(buttonSelector).css('height', self.tabsHeight + 2);
		}

	};

	return TabGroup;
})();
