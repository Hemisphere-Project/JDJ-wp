(function ($, root, undefined) {

	$(function () {

		'use strict';

		///////////////////////  ELEVATOR ////////////////////////
		//////////////////////////////////////////////////////////
		// get time of SERVER // CHECK
		var nowdate = new Date();
		var nowhour = nowdate.getHours();
		var nowmin = nowdate.getMinutes();

		initElevator();
		colorElevator();

		function initElevator(){
			// get first hour
			$('.headerpost').each(function(index,post){
				var hour=$(post).attr("hour");
			});
			var firsttimepost = $( ".timepost" ).last();
			// exclude en 'pre' spectacle
			if(firsttimepost.hasClass('timepost')){
				var firsthour = parseInt(firsttimepost.attr("hour").substr(0, 2))+1;
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
				$(".elevator").append('<div id=elevator-preposts class="elevator-item elevator-clickable">...</div>');
			}
		}

		function colorElevator(){
			// INUTILE DE REFAIRE UNE 2E FOIS CE QU'ON FAIT EN PHP, SE BASER SUR LA PRESENCE OU NON DE HEADERPOSTS
			$('.headerpost').each(function(index,post){
				var hour=$(post).attr("hour");
				$('#'+hour).addClass('elevator-clickable');
			});


		}


		// click
		var animating = false;
		var activeDiv;
		$('.elevator-clickable').on('click', function(){
			animating = true;
			var hourClicked=$(this).text();
			if (hourClicked !='...'){
				$('.headerpost').each(function(index,post){
					if($(post).attr("hour")==hourClicked){activeDiv=$(post)}
				});
				$('body,html').animate({scrollTop: activeDiv.offset().top-$('header').height()+1,easing:"swing"},400,function(){
					animating = false;
				});
			}else if(hourClicked =='...'){
				activeDiv =	$('.prepost').first();
				$('body,html').animate({scrollTop: activeDiv.offset().top-$('header').height()+1,easing:"swing"},400,function(){
					animating = false;
				});
			}

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

		$("#gotobottom").click(function(){
			var sHeight = $('#comments')[0].scrollHeight;
			// $('#comments').scrollTop(sHeight);
			$('#comments').animate({scrollTop: sHeight,easing:"swing"},400);
		});


		// WINDOW ON LOAD DOES NOT TRIGGER ON IPAD
		var iOS8 = navigator.userAgent.match(/(iPad|iPhone|iPod).*OS 8_\d/i);
	    if( iOS8 ){
	      setTimeout(function(){
	        $(window).trigger('load');
	      }, 7000);
	    }


	});


	$(window).on("load", function() {

    // console.log("LOADED");

		// $('.timeline, .elevator').hide(); // non sinon adjustImageSizes() et randomMarginTop() n'ont pas accès aux dimensions
		$('#startoverlay').fadeOut(200,function(){
			// $('.timeline, .elevator').fadeIn(200);
		});

		/////////////////////  POST ADJUST ///////////////////////
		//////////////////////////////////////////////////////////

		function adjustImageSizes_BIG(){
				$('.imagepost_content').each(function(){
					var ww = $(this).children('img').width();
					var hh = $(this).children('img').height();
					if(ww>hh){
						// console.log('PAYSAGE');
						$(this).parent().parent('.imagepost').css('width', '50%' );
					}
					if (hh>ww){
						// console.log('PORTRAIT');
						$(this).parent().parent('.imagepost').css('width', '25%' );
					}
				});
			$('.textpost').css('width', '25%' );
			$('.audiopost, .videopost').css('width', '50%' );
			$('.post').css('margin-top', '0px');
		}


		function randomMarginTop(){
			var globalW = $('.timeline').width();
			var scale = globalW/4;
			var min = 40;
			var max = 120;
			$('.post').each(function(index,post){
				var posLeft = $(this).position().left-$('.timeline').position().left-$('.timeline').offset().left;
				var random = Math.floor(Math.random()*(max-min+1)+min);
				var margin = 0;
				var previousMargin = $(this).prev('.post').css('margin-top');
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
					$(this).css('margin-top', '0px');
					// A CHANGER, COLLER A LA LIGNE DU DESSUS
				}
			});

			$('.headerpost').each(function(index,div){
				$(this).css('margin-top', '10px');
			});

		}


		// INIT SIZES
		var checkBig = true;
		var windowWidth = $(window).width();
		actuSizes();

		// RESIZE SIZES
		window.onresize = actuSizes;

		function actuSizes(){
			windowWidth = $(window).width();
			if(windowWidth > 768){
				if (checkBig==true){
					// console.log('big');
					adjustImageSizes_BIG();
					randomMarginTop();
					checkBig = false;
				}

			}else if (windowWidth <= 768){
				// console.log('small');
				// in css on start
				$('.post').css('width', '100%');
				$('.post').css('margin-top', '50px');
				checkBig = true;

			}

		}


});






})(jQuery, this);
