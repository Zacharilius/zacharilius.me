$(function() {
	setupClickingProjectDeviceButtons();
})

function setupClickingProjectDeviceButtons() {
	$('.project-device-icon').click(function() {
		var imageId = $(this).attr('img-id');
		$('#' + imageId).siblings($('button')).hide();
		$('#' + imageId).show();	
	});
}
