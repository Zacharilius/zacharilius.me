$(function() {
	setupHeight();
})

function setupHeight() {
	setPortfolioContainerHeight();
	$('portfolio-container').resize('resize', function() {
		setPortfolioContainerHeight();
	})
}

function setPortfolioContainerHeight() {
	$('.portfolio-container').height($(window).height() - 64) /* 64 is the height of the nav title */
}
