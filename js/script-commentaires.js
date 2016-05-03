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
		$('#tweetsheader').on('click',function(){
			document.location.href="/#tweets";
		});
		$('#inscriptionheader').on('click',function(){
			document.location.href="/#inscription";
		});


		$('html').mousedown(function(e) {
			document.location.href="/";
		});
		$('.popup').mousedown(function(e){
			e.stopPropagation();
		});






});

})(jQuery, this);
