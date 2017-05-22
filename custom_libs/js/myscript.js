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
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.9&appId=738459509656428";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
