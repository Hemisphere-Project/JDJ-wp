(function ($, root, undefined) {

	$(function () {

		'use strict';

		console.log('SCRIPT OFF');

		$('#startoverlay').fadeOut(200,function(){ });
		$('#timeheader, #placeheader, #infosheader, #tweetsheader').hide();
		$('#offpage').show();


		// FILL EVENTS dropdown

		$.ajax({
				url: theme_directory+"/js/files.php",
				type: "POST",
				data: {
						// action: 'load',
						// filename: name
				}
		})
		.done(function(response){
			console.log(response);
		});





});

})(jQuery, this);
