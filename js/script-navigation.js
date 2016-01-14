(function ($, root, undefined) {

	$(function () {

		'use strict';

		/////////////////////    NAVIG     ///////////////////////
		//////////////////////////////////////////////////////////



		function allButtonsInactive(){
			$('#timeheader').children('img').removeClass('timeheaderactive').addClass('timeheaderinactive');
			$('#placeheader').children('img').removeClass('placeheaderactive').addClass('placeheaderinactive');
			$('#infosheader').children('img').removeClass('infosactive').addClass('infosinactive');

		}

		$('#map').hide();
		$('#infos').hide();
		$("#postoverlay").hide();
		$('#timeheader').children('img').removeClass('timeheaderinactive').addClass('timeheaderactive');

		/////////////////////    INFOS     ///////////////////////

		// OPEN
		$('#infosheader').click(function(){
			$("#postoverlay").hide();
			$('#map').hide();
			$('.timeline, .elevator').hide();
			// $('.timeline, .elevator').css('visibility','hidden');
			$('#infos').fadeIn(200);
			allButtonsInactive();
			$('#infosheader').children('img').removeClass('infosinactive').addClass('infosactive');
		});

		// CLOSE
		$('html, #closeinfos').click(function() {
			$('#infos').fadeOut(200, function(){
				$('.timeline, .elevator').fadeIn(200);
			});
			// $('.timeline, .elevator').css('visibility','visible');
			$('#infosheader').children('img').removeClass('infosactive').addClass('infosinactive');
			$('#timeheader').children('img').removeClass('timeheaderinactive').addClass('timeheaderactive');
		});

		$('#infos, #infosheader ,header').click(function(event){
		  event.stopPropagation();
		});


		/////////////////////    PLACE     ///////////////////////

		// OPEN
		$('#placeheader').click(function(){
			openMap();
		});

		function openMap(){
			$('#infos').hide();
			$("#postoverlay").hide();
			$('.timeline, .elevator').hide();
			$('#map').fadeIn(200);
			allButtonsInactive();
			// $('#placeheader').children('img').attr("src", theme_directory+"/img/buttons/place_orange.png");
			$('#placeheader').children('img').removeClass('placeheaderinactive').addClass('placeheaderactive');
		}

		// CLOSE
		$('html, #closepost').click(function() {
			$('#map').fadeOut(200);
			allButtonsInactive();
			$('#timeheader').children('img').removeClass('timeheaderinactive').addClass('timeheaderactive');
		});

		$('#map, header').click(function(event){
			event.stopPropagation();
		});

		// SLIDE
		$('#slidemap').click(function(){
			// $("#rmap").animate({width:'0%'},1000);
			$("#gmap").animate({width:'100%'},1000);
		});

		/////////////////////    TIME     ///////////////////////

		// OPEN
		$('#timeheader').click(function(){
			$('#infos').hide();
			$("#postoverlay").hide();
			$('#map').hide();
			$('.timeline, .elevator').fadeIn(200)
			allButtonsInactive();
			$('#timeheader').children('img').removeClass('timeheaderinactive').addClass('timeheaderactive');
		});

		/////////////////////    POST     ///////////////////////

		// OPEN
		$('.post').click(function(){
				$('#postoverlay').fadeIn(300);
				// var scrolltop = $(window).scrollTop()+40;
				// $('#postdetails').css('margin-top', scrolltop);
		});

		// CLOSE
		$('html, #closepost').click(function() {
			$('#postoverlay').fadeOut(200);
		});
		$('#postdetails, .post, header').click(function(event){
			event.stopPropagation();
		});


		$("#viewpostmap").click(function(){
			openMap();
		});




	});

})(jQuery, this);
