$(function() {
	setupClickNav();
})

function setupClickNav() {
	$('.navbar.icon').click(function() {
		$('.icon').removeClass('is-active');
		$(this).addClass('is-active')
	})
}
