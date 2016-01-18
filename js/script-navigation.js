(function ($, root, undefined) {

	$(function () {

		'use strict';


		//////////////////////////////////////////////////////////
		/////////////////////    NAVIG     ///////////////////////
		//////////////////////////////////////////////////////////


		function allButtonsInactive(){
			$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_grey.png");
			$('#placeheader').children('img').attr("src", theme_directory+"/img/buttons/place_grey.png");
			$('#infosheader').children('img').attr("src", theme_directory+"/img/buttons/info_grey.png");
		}

		$('#map').hide();
		$('#infos').hide();
		$("#postoverlay").hide();
		$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_orange.png");

		/////////////////////    INFOS     ///////////////////////

		// OPEN
		$('#infosheader').click(function(){
			$("#postoverlay").hide();
			$('#map').hide();
			$('.timeline, .elevator').hide();
			// $('.timeline, .elevator').css('visibility','hidden');
			$('#infos').fadeIn(200);

			allButtonsInactive();
			$('#infosheader').children('img').attr("src", theme_directory+"/img/buttons/info_orange.png");
		});

		// CLOSE
		$('html, #closeinfos').click(function() {
			$('#infos').fadeOut(200, function(){
				$('.timeline, .elevator').fadeIn(200);
			});
			// $('.timeline, .elevator').css('visibility','visible');
			allButtonsInactive();
			$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_orange.png");
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
			$('#placeheader').children('img').attr("src", theme_directory+"/img/buttons/place_orange.png");
			// initmap();
			google.maps.event.trigger(map, "resize");
			map.setCenter(centerpoint);
		}

		// CLOSE
		$('html, #closepost').click(function() {
			$('#map').fadeOut(200);
			allButtonsInactive();
			$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_orange.png");
		});

		$('#map, header').click(function(event){
			event.stopPropagation();
		});

		// SLIDE
		var fullmap = false;

		$('#togglemap').click(function(){

			if (fullmap==false){
				console.log('open');
				$(this).attr("src", theme_directory+"/img/buttons/map_open.png");
				$("#rmap").animate({right:'-47%'},600);
				$("#gmap").animate({width:'97%'},600, function(){
					fullmap = true;
					google.maps.event.trigger(map, "resize");
				});

			}

			if (fullmap==true){
				console.log('close');
				$(this).attr("src", theme_directory+"/img/buttons/map_close.png");
				$("#rmap").animate({right:'0%'},600);
				$("#gmap").animate({width:'50%'},600,function(){
					fullmap = false;
					google.maps.event.trigger(map, "resize");
					// map.setCenter(centerpoint);
				});

			}
		});

		/////////////////////    TIME     ///////////////////////

		// OPEN
		$('#timeheader').click(function(){
			$('#infos').hide();
			$("#postoverlay").hide();
			$('#map').hide();
			$('.timeline, .elevator').fadeIn(200)
			allButtonsInactive();
			$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_orange.png");
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





		////////////////////////////////////////////////////////
		/////////////////////    MAP     ///////////////////////
		////////////////////////////////////////////////////////

		var centerpoint = new google.maps.LatLng(45.761392, 4.861950);

		var options = {
			zoom: 14,
			center: centerpoint,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("carte"), options);

		var pinImage = new google.maps.MarkerImage( theme_directory+"/img/buttons/info_orange.png");

		var marqueur = new google.maps.Marker({
				position: new google.maps.LatLng(45.761392, 4.861950),
				map: map,
				icon: pinImage,
		});






		var styles = [
			{
				stylers: [
					{ hue: "#00ffe6" },
					{ saturation: -100 }
				]
			},{
				featureType: "road",
				elementType: "geometry",
				stylers: [
					{ lightness: 100 },
					{ visibility: "simplified" }
				]
			},{
				featureType: "road",
				elementType: "labels",
				stylers: [
					{ visibility: "off" }
				]
			}
		];
		map.set('styles',styles);


		// google.maps.event.trigger(map, "resize");
		// map.setCenter( map.getCenter());
		// map.setZoom( map.getZoom() );





	});

})(jQuery, this);
