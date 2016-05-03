(function ($, root, undefined) {

	$(function () {

		'use strict';

		console.log('SCRIPT OFF');
		$('#timeheader, #placeheader, #infosheader, #tweetsheader, #inscriptionheader').hide();
		$('#startoverlay').fadeOut(200,function(){
			$('#offpage').fadeIn(300);
		});

});

// $(window).on("load", function() {});

})(jQuery, this);
