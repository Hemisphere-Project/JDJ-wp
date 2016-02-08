(function ($, root, undefined) {

	$(function () {

		'use strict';


		console.log("HELLO COMMENTS");
		/////////////////////  BACKGROUND  ///////////////////////
		//////////////////////////////////////////////////////////
		var minbg = 1;
		var maxbg = 6;
		// and the formula is:
		var randombg = Math.floor(Math.random() * (maxbg - minbg + 1)) + minbg;
		// $('body').css("background", "url("+theme_directory+"/img/BG/"+randombg+".jpg) no-repeat center center fixed");
		// $('body').css("-webkit-background-size", "cover");
		// $('body').css("-moz-background-size", "cover");
		// $('body').css("background-size", "cover");
		$('#bodyBG').css("background", "url("+theme_directory+"/img/BG/"+randombg+".jpg) no-repeat center center fixed");
		$('#bodyBG').css("-webkit-background-size", "cover");
		$('#bodyBG').css("-moz-background-size", "cover");
		$('#bodyBG').css("background-size", "cover");



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
