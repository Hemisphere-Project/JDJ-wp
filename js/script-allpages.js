(function ($, root, undefined) {

	$(function () {

		'use strict';

  	FastClick.attach(document.body);

		/////////////////////  BACKGROUND  ///////////////////////
		//////////////////////////////////////////////////////////
		var minbg = 1;
		var maxbg = 6;
		var randombg = Math.floor(Math.random() * (maxbg - minbg + 1)) + minbg;
		// $('body').css("background", "url("+theme_directory+"/img/BG/"+randombg+".jpg) no-repeat center center fixed");
		// $('body').css("-webkit-background-size", "cover");
		// $('body').css("-moz-background-size", "cover");
		// $('body').css("background-size", "cover");
		$('#bodyBG').css("background", "url("+theme_directory+"/img/BG/"+randombg+".jpg) no-repeat center center fixed");
		$('#bodyBG').css("-webkit-background-size", "cover");
		$('#bodyBG').css("-moz-background-size", "cover");
		$('#bodyBG').css("background-size", "cover");



});

})(jQuery, this);
