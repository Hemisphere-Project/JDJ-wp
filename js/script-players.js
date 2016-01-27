(function ($, root, undefined) {

	$(function () {

		'use strict';


		console.log('HELLO PLAYERS');

		$('.audiopost_content').parent('.postcontent').click(function(e){
			// e.stopPropagation();
		});

		$('.wp-video').click(function(e){
			console.log('VIDEO CLICK');
			$(this).stop();
		});


	//
	// $('.mejs-overlay-play').each(function(index,wpvideo){
	// 		$(this).css('display','none');
	// });
	//
	// $('.mejs-control').each(function(index,wpvideo){
	// 		$(this).css('display','none');
	// });






});

})(jQuery, this);
