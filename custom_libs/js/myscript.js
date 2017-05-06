$(function() {
	$('#main-menu').smartmenus({
		subMenusSubOffsetX: 1,
		subMenusSubOffsetY: -8
	});
	$('#main-menu').smartmenus('keyboardSetHotkey', 123, 'shiftKey');
});

$(document).ready(function () {
	var stickyNavTop = $('#main-nav').offset().top;

	var stickyNav = function () {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > stickyNavTop) {
			$('#main-nav').addClass('navbar-fixed-top');
		} else {
			$('#main-nav').removeClass('navbar-fixed-top');
		}
	};

	stickyNav();

	$(window).scroll(function () {
		stickyNav();
	});
});
