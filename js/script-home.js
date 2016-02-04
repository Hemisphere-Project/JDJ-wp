(function ($, root, undefined) {

	$(function () {

		'use strict';


		/////////////////////  BACKGROUND  ///////////////////////
		//////////////////////////////////////////////////////////
		var minbg = 1;
		var maxbg = 6;
		// and the formula is:
		var randombg = Math.floor(Math.random() * (maxbg - minbg + 1)) + minbg;
		$('body').css("background", "url("+theme_directory+"/img/BG/"+randombg+".jpg) no-repeat center center fixed");
		$('body').css("-webkit-background-size", "cover");
		$('body').css("-webkit-background-size", "cover");
		$('body').css("-moz-background-size", "cover");
		$('body').css("background-size", "cover");

		///////////////////////  ELEVATOR ////////////////////////
		//////////////////////////////////////////////////////////
		initElevator();

		function initElevator(){
			// get first hour
			$('.headerpost').each(function(index,post){
				var hour=$(post).attr("hour");
			});
			var firstheader = $( ".headerpost" ).last();
			var firsthour = parseInt(firstheader.attr("hour").substr(0, 2));

			// build elevator
			var hoursArray = [];
			for(var k=23;k>=0;k--){ hoursArray.push(k); }
			var firstindex = 24-firsthour;
			var start = hoursArray.slice(firstindex);
			var end = hoursArray.slice(0,firstindex);
			hoursArray = $.merge(start,end);
			$.each(hoursArray,function(index,hour){
				$(".elevator").append('<div id='+hour+'h00'+' class="elevator-item">'+hour+'h00'+'</div>');
			});
		}

		// click
		var animating = false;
		var activeDiv;
		$('.elevator-item').on('click', function(){
			animating = true;
			var hourClicked=$(this).text();
			$('.headerpost').each(function(index,post){
				if($(post).attr("hour")==hourClicked){activeDiv=$(post)}
			});
			$('body').animate({scrollTop: activeDiv.offset().top-$('header').height()+1,easing:"swing"},400,function(){
				// actuElevator();
				animating = false;
			});
			//style
			$('.elevator-item').each(function(index,elevatoritem){
				$(elevatoritem).removeClass('elevator-active');
			 });
			$(this).addClass('elevator-active');
		});


		//actu elevator on scroll
		$(window).on('scroll', function() {
				actuElevator();
		});

		function actuElevator(){
			if (animating == false){
				var scrollTop = $(window).scrollTop()+$('header').height();
				// console.log(scrollTop);
				$('.headerpost').each(function() {
						var topDistance = $(this).offset().top;
						if ( (topDistance) < scrollTop ) {
								// console.log( $(this).attr('hour') + ' was scrolled to the top' );
								var hourontop = $(this).attr('hour');
								$('.elevator-item').removeClass('elevator-active');
								$('#'+hourontop).addClass('elevator-active');
						}
				});
		}
		}


		// function infinitecheck() {
    // 	actuElevator();
		// }
	  // setInterval(infinitecheck, 1500 );




	//  $('.onlytextpost p').each(function(index,div){
	// 	 var txtArray = $(div).html().split('');
 // 		 $(div).empty();
	// 	 $.each(txtArray,function(index,char){
	// 		 $(div).append('<span class="singleChar">'+char+'</span>');
	// 	 });
	// 	 $('.singleChar').each(function(index,char){
	// 		 var top = $(char).offset().top - $(char).parent().offset().top;
	// 		 var postH = $(char).parent().height();
	// 		 console.log(top+' '+postH);
	// 		 if (top>postH){ $(char).remove(); }
	// 	 });
	//  });


	// $('#startoverlay').fadeOut(100,function(){});







	});


	$(window).on("load", function() {

    console.log("LOADED");

		// setTimeout(function(){
		// 	$('#startoverlay').fadeOut(300,function(){});
		// }, 300);

		// $('.timeline, .elevator').hide(); // non sinon adjustImageSizes() et randomMarginTop() n'ont pas accès aux dimensions

		$('#startoverlay').fadeOut(200,function(){
			// $('.timeline, .elevator').fadeIn(200);
		});

		/////////////////////  POST ADJUST ///////////////////////
		//////////////////////////////////////////////////////////

		adjustImageSizes();

		function adjustImageSizes(){
			var globalW = $('.timeline').width();
				$('.imagepost_content').each(function(){
					var ww = $(this).children('img').width();
					var hh = $(this).children('img').height();
					if(ww>hh){
						console.log('PAYSAGE');
						// $(this).parent().parent('.imagepost').css('width', globalW/2 );
						$(this).parent().parent('.imagepost').css('width', '50%' );
					}
					if (hh>ww){
						console.log('PORTRAIT');
						// $(this).parent().parent('.imagepost').css('width', globalW/4 );
						$(this).parent().parent('.imagepost').css('width', '25%' );
					}
				});
		}

		randomMarginTop();
		function randomMarginTop(){
			var globalW = $('.timeline').width();
			var scale = globalW/4;
			var min = 40;
			var max = 120;
			$('.timepost').each(function(index,post){
				var posLeft = $(this).position().left-$('.timeline').position().left-$('.timeline').offset().left;
				var random = Math.floor(Math.random()*(max-min+1)+min);
				var margin = 0;
				var previousMargin = $(this).prev('.timepost').css('margin-top');
				if (previousMargin !== undefined){ margin=random+parseInt(previousMargin); }
				if (posLeft < 10){
				}
				if ((posLeft>10)&&(posLeft < scale+10)){
					// $(this).attr('scale', '1');
					$(this).css('margin-top', margin);
				}
				if ((posLeft > scale+10)&&(posLeft < 2*scale+10)){
					$(this).css('margin-top', margin);
				}
				if ((posLeft > 2*scale+10)&&(posLeft < 3*scale+10)){
					$(this).css('margin-top', margin);
				}
				if (!$(this).prev().hasClass('headerpost')&&(posLeft < 10)){
					$(this).css('margin-top', '-50px');
					// A CHANGER, COLLER A LA LIGNE DU DESSUS
				}
			});
		}




		window.onresize = resize;

		function resize(){
			console.log("événement de redimensionnement détecté !");
			adjustImageSizes();
			randomMarginTop();
			var windowWidth = $(window).width();
			console.log(windowWidth);
		}


});






})(jQuery, this);
