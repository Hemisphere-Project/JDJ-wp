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
		//////////////////////////////////////////////////////////

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

		//////////////////////////////////////////////////////////
		/////////////////////    COMMENTS     ////////////////////
		//////////////////////////////////////////////////////////

		// OPEN
		$('.commentslink').click(function(){
			$('#map').hide();
			$('.timeline, .elevator').hide();
			$('#comments').fadeIn(200);
			allButtonsInactive();
		});

		// CLOSE
		$('html, #closecomments').click(function() {
			$('#comments').fadeOut(200, function(){
				$('.timeline, .elevator').fadeIn(200);
			});
			$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_orange.png");
		});

		$('#comments').click(function(event){
			event.stopPropagation();
		});


		//////////////////////////////////////////////////////////
		/////////////////////    TIME     ////////////////////////
		//////////////////////////////////////////////////////////

		// OPEN
		$('#timeheader').click(function(){
			$('#infos').hide();
			$("#postoverlay").hide();
			$('#map').hide();
			$('.timeline, .elevator').fadeIn(200)
			allButtonsInactive();
			$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_orange.png");
		});

		//////////////////////////////////////////////////////////
		/////////////////////    POST     ///////////////////////
		//////////////////////////////////////////////////////////

		// OPEN
		$('.postcontent').click(function(){
			$('#postoverlay').fadeIn(300);
			// var scrolltop = $(window).scrollTop()+40;
			// $('#postdetails').css('margin-top', scrolltop);
				// $('#postdetails').empty();
				var postId = $(this).parent('.timepost').attr('id');
				var postTime = $(this).parent().find('.posttitle').html();
				var postPosition = $(this).parent().find('.pos_link').attr('value');
				console.log(postPosition);
				console.log(postPosition);
				showTimePost(postId, postTime);

				$('#viewpostmap').hide();

				if (postPosition!==undefined){
					$('#viewpostmap').show();
					$('#viewpostmap').attr('valuePos',postPosition);
					$('#viewpostmap').attr('valueId',postId);
					$('#viewpostmap').attr('valueTime',postTime);
				}

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
			var postId = $(this).attr('valueId');
			var postTime = $(this).attr('valueTime');
			var postPosition = $(this).attr('valuePos');
			showGeoPost(postId,postTime);
			unselectAllMarkers();
			$.each(allMarkers,function(index,marker){
				if (marker.id==postId){
					$(marker).click();
					map.panTo(marker.position);
					marker.setIcon(placeIconOrange);
				}
			});
		});

		$('.pos_link').click(function(){
			openMap();
			var postId = $(this).parent('.timepost').attr('id');
			var postTime = $(this).parent().find('.posttitle').html();
			showGeoPost(postId,postTime);
			unselectAllMarkers();
			$.each(allMarkers,function(index,marker){
				if (marker.id==postId){
					$(marker).click();
					map.panTo(marker.position);
					marker.setIcon(placeIconOrange);
				}
			});
		});

		function showTimePost(id,time){
			$("#postdetails_content").empty();
			$("#timepost_title").html(time);

			jQuery.post(
			    ajaxurl,
			    {
			        'action': 'TIMEsingleload',
			        'id': id
			    },
			    function(response){
			    	$('#postdetails_content').append(response);
			    }
			);

		}

		////////////////////////////////////////////////////////
		/////////////////////    PLACE     /////////////////////
		////////////////////////////////////////////////////////

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
		$('html, #closepost').click(function(event) {
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
			slidemap();
		});

		function slidemap(){
			if (fullmap==false){
				console.log('close');
				$('#togglemap').attr("src", theme_directory+"/img/buttons/map_open.png");
				$("#rmap").animate({right:'-47%'},300);
				$("#gmap").animate({width:'97%'},300, function(){
					fullmap = true;
					google.maps.event.trigger(map, "resize");
				});
			}
			if (fullmap==true){
				console.log('open');
				$('#togglemap').attr("src", theme_directory+"/img/buttons/map_close.png");
				$("#rmap").animate({right:'0%'},300);
				$("#gmap").animate({width:'50%'},300,function(){
					fullmap = false;
					google.maps.event.trigger(map, "resize");
					// map.setCenter(centerpoint);
				});
			}
		}

		function slidemap_Open(){
			if (fullmap==true){
				console.log('open');
				$('#togglemap').attr("src", theme_directory+"/img/buttons/map_close.png");
				$("#rmap").animate({right:'0%'},300);
				$("#gmap").animate({width:'50%'},300,function(){
					fullmap = false;
					google.maps.event.trigger(map, "resize");
				});
			}
		}



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
		var placeIconGrey = new google.maps.MarkerImage( theme_directory+"/img/buttons/place_small_black.png");
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

		var geocoder = new google.maps.Geocoder;

	// 	var lat = 50.406994;
	// 	var lng = 2.634328;
	//   var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
	//   geocoder.geocode({'location': latlng}, function(results, status) {
	//     if (status === google.maps.GeocoderStatus.OK) {
	//         console.log(results[0].formatted_address);
	//   }
	// });


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
			$("#map_post_content").empty();
			$("#map_post_title").html(time);
			// get position from id
			$.each(allPoints,function(index,point){
				if (point.id == id){
					var lat = point.lat;
					var lng = point.lng;
					var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
					geocoder.geocode({'location': latlng}, function(results, status) {
						if (status === google.maps.GeocoderStatus.OK) {
								var streetAdress = results[0].formatted_address;
								$("#map_post_adress").html(streetAdress);
						}
					});
				}
			});
			// var loader = $("<img src="+theme_directory+"/img/ajax-loader.gif></img>").appendTo('#map_post');
			jQuery.post(
			    ajaxurl,
			    {
			        'action': 'MAPsingleload',
			        'id': id
			    },
			    function(response){
						// loader.remove();
			    	$('#map_post_content').append(response);
			    }
			);
			slidemap_Open();
		}







	});

})(jQuery, this);
