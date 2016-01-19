(function ($, root, undefined) {

	$(function () {

		'use strict';

		console.log("SCRIPT NAVIGATION");

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
					// $('#postdetails').empty();

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



		////////////////////////////////////////////////////////
		/////////////////////    MAP     ///////////////////////
		////////////////////////////////////////////////////////



		/////////////////////    GET POINTS     ///////////////////////
		var allPoints=[];
		var latSum=0;
		var lngSum=0;


		$('.pos_link').each(function(index, poslink){

			var positiondiv = $(poslink);
			var postId = positiondiv.parent('.timepost').attr('id');
			var postTime = positiondiv.parent().find('.posttitle').html();
			var position = positiondiv.attr('value');
			var lat= parseFloat(position.substr(0, position.indexOf(',')));
			var lng= parseFloat(position.substr(position.indexOf(',')+2));
			allPoints.push({id: postId, time:postTime, lat: lat, lng: lng});

			latSum+=lat;
			lngSum+=lng;
		});


		var latAvg = latSum / allPoints.length;
		var lngAvg = lngSum / allPoints.length;
		var centerpoint = new google.maps.LatLng(latAvg, lngAvg);



		/////////////////////    CREATE MAP     ///////////////////////
		var options = {
			zoom: 14,
			center: centerpoint,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var placeIconGrey = new google.maps.MarkerImage( theme_directory+"/img/buttons/place_small_grey.png");
		var placeIconOrange = new google.maps.MarkerImage( theme_directory+"/img/buttons/place_small_orange.png");


		var map = new google.maps.Map(document.getElementById("carte"), options);

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



		/////////////////////    CREATE POINTS     ///////////////////////

		var allMarkers=[];

		$.each(allPoints,function(index,point){


			var googlepoint = new google.maps.Marker({
					id: point.id,
					position: new google.maps.LatLng(point.lat,point.lng),
					map: map,
					icon: placeIconGrey,
					time: point.time
			});

			allMarkers.push(googlepoint);

			google.maps.event.addListener(googlepoint, 'click', function() {
				unselectAllMarkers();
				this.setIcon(placeIconOrange);
				map.panTo(this.position);
				showGeoPost(this.id, this.time);
	    });
		});

		function unselectAllMarkers(){
			$.each(allMarkers, function(index,marker){
				marker.setIcon(placeIconGrey);
			});
		}

		function showGeoPost(id,time){
			$("#map_post").empty();

			$("#map_post").append("<h2 class='geopost_title'>"+time+"</h2>");
			// var loader = $("<img src="+theme_directory+"/img/ajax-loader.gif></img>").appendTo('#map_post');

			jQuery.post(
			    ajaxurl,
			    {
			        'action': 'singleload',
			        'id': id
			    },
			    function(response){
						// loader.remove();
			    	$('#map_post').append(response);
			    }
			);

		}







	});

})(jQuery, this);
