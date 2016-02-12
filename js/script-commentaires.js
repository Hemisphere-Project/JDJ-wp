(function ($, root, undefined) {

	$(function () {

		'use strict';



		$('#timeheader, #closecomments').on('click',function(){
			document.location.href="/";
		});
		$('#infosheader').on('click',function(){
			document.location.href="/#infos";
		});
		$('#placeheader').on('click',function(){
			document.location.href="/#map";
		});

		$('html').mousedown(function(e) {
			document.location.href="/";
		});
		$('.popup').mousedown(function(e){
			e.stopPropagation();
		});






});

})(jQuery, this);
