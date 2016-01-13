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
			for(var k=23;k>0;k--){ hoursArray.push(k); }
			var firstindex = 24-firsthour;
			var start = hoursArray.slice(firstindex);
			var end = hoursArray.slice(0,firstindex);
			hoursArray = $.merge(start,end);
			$.each(hoursArray,function(index,hour){
				$(".elevator").append('<div id='+hour+'h00'+' class="elevator-item">'+hour+'h00'+'</div>');
			});
		}

		// click
		var activeDiv;
		$('.elevator-item').on('click', function(){
			var hourClicked=$(this).text();
			$('.headerpost').each(function(index,post){
				if($(post).attr("hour")==hourClicked){activeDiv=$(post)}
			});
			$('html,body').animate({scrollTop: activeDiv.offset().top-$('header').height()},{duration:400,easing:"swing"});
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
			var scrollTop = $(window).scrollTop()+$('header').height();
			console.log(scrollTop);
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

		/////////////////////  POST ADJUST ///////////////////////
		//////////////////////////////////////////////////////////

		adjustImageSizes();
		function adjustImageSizes(){

		var globalW = $('.timeline').width();
		console.log(globalW);

			$('.image').each(function(){
				var ww = $(this).children('img').width();
				var hh = $(this).children('img').height();
				if(ww>hh){
					console.log('LANDSCAPE');
					$(this).css('width', globalW/2);
				}
				if (hh>ww){
					console.log('PORTRAIT');
					$(this).css('width', globalW/4);
				}
			});

		}







	});

})(jQuery, this);
