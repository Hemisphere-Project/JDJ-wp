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


		////////////////////////////////////////////////////////
		/////////////////    HTML   CLOSE     //////////////////
		////////////////////////////////////////////////////////

		var page='time'; // comments, infos, time, post, map

		$('html').mousedown(function(e) {
			if (page=='map'){
				console.log('html map hide');
				$('#map').fadeOut(200, function(){
					$('.timeline, .elevator').fadeIn(200);
				});
			}
			if (page=='comments'){
				$('#comments').fadeOut(200, function(){
					$('.timeline, .elevator').fadeIn(200);
				});
			}
			if (page=='infos'){
				$('#infos').fadeOut(200, function(){
					$('.timeline, .elevator').fadeIn(200);
				});
			}
			if (page=='post'){
				$('#postoverlay').fadeOut(200);
			}
			page='time';
			allButtonsInactive();
			$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_orange.png");
		});

		$('#map, header').mousedown(function(e){
			e.stopPropagation();
		});
		$('#infos, #infosheader ,header').click(function(e){
			e.stopPropagation();
		});
		$('#comments').click(function(e){
			e.stopPropagation();
		});
		$('#postdetails, .post, header').click(function(e){
			e.stopPropagation();
		});
		// $('#viewpostmap, .pos_link').mousedown(function(e){
		// 	e.stopPropagation();
		// });


		//////////////////////////////////////////////////////////
		/////////////////////    INFOS     ///////////////////////
		//////////////////////////////////////////////////////////

		// OPEN
		$('#infosheader').click(function(){
			page = 'infos';
			$("#postoverlay").hide();
			$('#map').hide();
			$('.timeline, .elevator').hide();
			$('#infos').fadeIn(200);
			allButtonsInactive();
			$('#infosheader').children('img').attr("src", theme_directory+"/img/buttons/info_orange.png");
		});
		// CLOSE
		$('#closeinfos').click(function() {
			page='time';
			$('#infos').fadeOut(200, function(){
				$('.timeline, .elevator').fadeIn(200);
			});
			allButtonsInactive();
			$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_orange.png");
		});



		//////////////////////////////////////////////////////////
		/////////////////////    COMMENTS     ////////////////////
		//////////////////////////////////////////////////////////

		// OPEN
		$('.commentslink').click(function(){
			page='comments';
			$('#map').hide();
			$('.timeline, .elevator').hide();
			$('#comments').fadeIn(200);
			allButtonsInactive();
		});
		// CLOSE
		$('#closecomments').click(function() {
			page='time';
			$('#comments').fadeOut(200, function(){
				$('.timeline, .elevator').fadeIn(200);
			});
			$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_orange.png");
		});


		//////////////////////////////////////////////////////////
		/////////////////////    TIME     ////////////////////////
		//////////////////////////////////////////////////////////

		// OPEN
		$('#timeheader').click(function(){
			page='time';
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
			page = 'post';
			$('#postoverlay').fadeIn(300);
			// var scrolltop = $(window).scrollTop()+40;
			// $('#postdetails').css('margin-top', scrolltop);
				// $('#postdetails').empty();
				var postId = $(this).parent('.timepost').attr('id');
				var postTime = $(this).parent().find('.posttitle').html();
				var postPosition = $(this).parent().find('.pos_link').attr('value');
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
		$('#closepost').click(function() {
			page = 'time';
			$('#postoverlay').fadeOut(200);
		});


		$("#viewpostmap").click(function(){
			openMap();
			var postId = $(this).attr('valueId');
			var postTime = $(this).attr('valueTime');
			var postPosition = $(this).attr('valuePos');
			showGeoPost(postId,postTime);
			unselectAllMarkers();
			selectMarker(postId);
		});

		$('.pos_link').click(function(){
			openMap();
			var postId = $(this).parent('.timepost').attr('id');
			var postTime = $(this).parent().find('.posttitle').html();
			showGeoPost(postId,postTime);
			unselectAllMarkers();
			selectMarker(postId);
		});

		function showTimePost(id,time){
			$("#postdetails_content").empty();
			$("#timepost_title").html(time);
			var postcontent = $('#'+id).children('.postcontent').html()
			$('#postdetails_content').append(postcontent);
			$('#postdetails_content').children('.imagepost_content').each(function(){
				var ww = $(this).children('img').width();
				var hh = $(this).children('img').height();
				if(ww>hh){ $(this).children('img').css('width', '100%' );	}
				if (hh>ww){ $(this).children('img').css('width', '40%' ); }
			});
			// jQuery.post(
			//     ajaxurl,
			//     {
			//         'action': 'TIMEsingleload',
			//         'id': id
			//     },
			//     function(response){
			//     	$('#postdetails_content').append(response);
			//     }
			// );
		}

		////////////////////////////////////////////////////////
		/////////////////////    PLACE     /////////////////////
		////////////////////////////////////////////////////////

		// OPEN
		$('#placeheader').click(function(){
			openMap();
		});

		function openMap(){
			page='map';
			$('#infos').hide();
			$("#postoverlay").hide();
			$('.timeline, .elevator').hide();
			$('#map').fadeIn(200);
			allButtonsInactive();
			$('#placeheader').children('img').attr("src", theme_directory+"/img/buttons/place_orange.png");
			google.maps.event.trigger(map, "resize");
			map.setCenter(centerpoint);
			map.setZoom(13);
		}

		// SLIDE
		var fullmap = true;

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
		// OPEN OR STAY OPENED
		function slidemap_Open(){
			if (fullmap==true){
				console.log('open');
				$('#togglemap').attr("src", theme_directory+"/img/buttons/map_close.png");
				$("#rmap").animate({right:'0%'},300);
				$("#gmap").animate({width:'50%'},300,function(){
					fullmap = false;
					google.maps.event.trigger(map, "resize");
					map.panTo(selectedpoint.position);
				});
			}
			if (fullmap==false){
				map.panTo(selectedpoint.position);
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
			zoom: 13,
			center: centerpoint,
    	mapTypeControl: false,
			// streetViewControl: false,
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

		var geocoder = new google.maps.Geocoder;


		/////////////////////    CREATE POINTS     ///////////////////////

		var allMarkers=[];
		var selectedpoint;

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
				if(fullmap == false){ map.panTo(this.position);}
				selectedpoint = this;
				showGeoPost(this.id, this.time);
				slidemap_Open();
	    });
		});

		function unselectAllMarkers(){
			$.each(allMarkers, function(index,marker){
				marker.setIcon(placeIconGrey);
			});
		}

		function selectMarker(id){
			$.each(allMarkers,function(index,marker){
				if (marker.id==id){
					// $(marker).click();
					marker.setIcon(placeIconOrange);
					selectedpoint = marker;
					slidemap_Open();
				}
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
						$('#map_post_content').children('.post').children('.mapimage').each(function(){
							var ww = $(this).children('img').width();
							var hh = $(this).children('img').height();
							if(ww>hh){ $(this).children('img').css('width', '100%' );	}
							if (hh>ww){ $(this).children('img').css('width', '60%' ); }
						});
			    }
			);
		}







	});

})(jQuery, this);
