(function ($, root, undefined) {

	$(function () {

		'use strict';

		console.log("SCRIPT NAVIGATION");


		//////////////////////////////////////////////////////////
		///////////////////   RESPONSIVE   ///////////////////////
		//////////////////////////////////////////////////////////
		// INIT SIZES

		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var screenSize = 'desktop';
		var screenCheck = true;
		var desktop = false;
		var init  = true;
		var reset_postdetailsCSS = false;

		checkSizes();
		$( window ).resize(function() {
			checkSizes();
		});

		function checkSizes(){
			windowWidth = $(window).width();
			if((windowWidth > 768)&&((desktop==false)||(init==true))){
				setDesktop();
				desktop=true;
				init=false;
			}else if ((windowWidth < 768)&&((desktop==true)||(init==true))){
				setSmartphone();
				desktop=false;
				init=false;
			}
		}

		function setDesktop(){
			console.log('window is desktop');
			$('#togglemap').attr("src", theme_directory+"/img/buttons/map_open.png");
			$('#gmap').css({height: '100%', width:'97%',float:'left'});
			$('#rmap').css({height: '100%', width:'50%',top:'0', right:'-47%'});
			fullmap=true;
			$('.logo').unbind();
		}

		function setSmartphone(){
			console.log('window is mobile');
			$('#togglemap').attr("src", theme_directory+"/img/buttons/map_resp_open.png");
			$('#gmap').css({	width:'100%',height: '90%',float: 'top'});
			$('#rmap').css({width:'100%',height: '100%',top:'90%',right:'0'});
			fullmap=true;
			$('.logo').unbind();
			$('.logo').click(function(e){
				e.preventDefault();
				$('#timeheader').click();
			});
		}


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
		function hideTimeline(){
			// $('.timeline, .elevator').hide();
			$('.timeline, .elevator, .wp-audio-shortcode').css('visibility', 'hidden');
		}
		function showTimeline(){
			// $('.timeline, .elevator').fadeIn(200);
			console.log('show timeline');
			$('.timeline, .elevator, .wp-audio-shortcode').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1}, 100);
			$('html').css('overflow-y','scroll');
		}

		var page='time'; // comments, infos, time, post, map

		$('html').mousedown(function(e) {
			if (page=='map'){
				console.log('html map hide');
				$('#map').fadeOut(200, function(){
					showTimeline();
					stopPlayers();
				});
			}
			if (page=='comments'){
				$('#comments').fadeOut(200, function(){
					showTimeline();
				});
			}
			if (page=='infos'){
				$('#infos').fadeOut(200, function(){
					showTimeline();
				});
			}
			if (page=='post'){
				$('#postoverlay').fadeOut(200);
				$('html').css('overflow-y','scroll');
				stopPlayers();
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
		$('#comments').mousedown(function(e){
			e.stopPropagation();
		});
		$('#postdetails, .post, header').mousedown(function(e){
			e.stopPropagation();
		});
		$('#viewpostmap, .pos_link').mousedown(function(e){
			e.stopPropagation();
		});


		//////////////////////////////////////////////////////////
		/////////////////////    INFOS     ///////////////////////
		//////////////////////////////////////////////////////////

		// OPEN
		$('#infosheader').click(function(){
			openInfos();
		});
		function openInfos(){
			page = 'infos';
			stopPlayers();
			$("#postoverlay").hide();
			$('#map').hide();
			hideTimeline();
			$('#infos').fadeIn(200);
			allButtonsInactive();
			$('#infosheader').children('img').attr("src", theme_directory+"/img/buttons/info_orange.png");
		}
		// CLOSE
		$('#closeinfos').click(function() {
			page='time';
			$('#infos').fadeOut(200, function(){
				showTimeline();
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
			stopPlayers();
			$('#map').hide();
			hideTimeline();
			$('#comments').fadeIn(200);
			allButtonsInactive();
		});
		// CLOSE
		$('#closecomments').click(function() {
			page='time';
			$('#comments').fadeOut(200, function(){
				showTimeline();
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
			stopPlayers();
			showTimeline();
			allButtonsInactive();
			$('#timeheader').children('img').attr("src", theme_directory+"/img/buttons/clock_orange.png");
		});

		//////////////////////////////////////////////////////////
		/////////////////////    POST     ///////////////////////
		//////////////////////////////////////////////////////////

		// OPEN
		$('.postcontent').click(function(){
			// page='post';
			// $('#postoverlay').fadeIn(300);
			var postId = $(this).parent('.post').attr('id');
			var postTime = $(this).parent().find('.posttitle').html();
			var postPosition = $(this).parent().find('.pos_link').attr('value');
			$('#viewpostmap').hide();
			if (postPosition!==undefined){
				$('#viewpostmap').show();
				$('#viewpostmap').attr('valuePos',postPosition);
				$('#viewpostmap').attr('valueId',postId);
				$('#viewpostmap').attr('valueTime',postTime);
			}
			showTimePost(postId, postTime);
		});
		// CLOSE
		$('#closepost').click(function() {
			page='time';
			$('#postoverlay').fadeOut(200);
			$('html').css('overflow-y','scroll');
			stopPlayers();
			// Reset CSS of post detail if it was responsive fullscreen video
			if (reset_postdetailsCSS==true){
				$("#timepost_title").show();
				$('#viewpostmap').show();
				$('.header').show();
				$('#postdetails').css({'height':'90%','width':'100%','margin-top':'100px', 'padding':'2%'});
				$('#closepost').css({'position':'relative', 'float':'right'});
				reset_postdetailsCSS = false;
			}

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
			var postId = $(this).parent('.post').attr('id');
			var postTime = $(this).parent().find('.posttitle').html();
			showGeoPost(postId,postTime);
			unselectAllMarkers();
			selectMarker(postId);
		});


		////////////////////////////////////////////////////////
		/////////////////////    PLACE     /////////////////////
		////////////////////////////////////////////////////////

		// OPEN
		$('#placeheader').click(function(){
			openMap();
		});

		function openMap(){
			page='map';
			stopPlayers();
			$('#infos').hide();
			$('#comments').hide();
			$("#postoverlay").hide();
			hideTimeline();
			$('#map').fadeIn(200);
			allButtonsInactive();
			$('#placeheader').children('img').attr("src", theme_directory+"/img/buttons/place_orange.png");
			google.maps.event.trigger(map, "resize");
			map.setCenter(centerpoint);
			map.setZoom(13);
		}

		// SLIDE
		var fullmap = true;

		$('#slidemap').click(function(){ //ANCIENNEMENT #togglemap
			slidemap();
		});

		function slidemap(){
			console.log(desktop);
			if (fullmap==false){
				console.log('close');
				if (desktop==true){
					$('#togglemap').attr("src", theme_directory+"/img/buttons/map_open.png");
					$("#rmap").animate({right:'-47%'},300);
					$("#gmap").animate({width:'97%'},300, function(){
						fullmap = true;
						google.maps.event.trigger(map, "resize");
					});
				}else if(desktop==false){
					$('#togglemap').attr("src", theme_directory+"/img/buttons/map_resp_open.png");
					$("#rmap").animate({top:'90%'},300);
					$("#gmap").animate({height:'90%'},300, function(){
						fullmap = true;
						google.maps.event.trigger(map, "resize");
					});
				}
			}
			if (fullmap==true){
				console.log('open');
				if (desktop==true){
					$('#togglemap').attr("src", theme_directory+"/img/buttons/map_close.png");
					$("#rmap").animate({right:'0%'},300);
					$("#gmap").animate({width:'50%'},300,function(){
						fullmap = false;
						google.maps.event.trigger(map, "resize");
					});
				}else if (desktop==false){
					$('#togglemap').attr("src", theme_directory+"/img/buttons/map_resp_close.png");
					$("#rmap").animate({top:'20%'},300);
					$("#gmap").animate({height:'20%'},300,function(){
						fullmap = false;
						google.maps.event.trigger(map, "resize");
					});
				}
			}
		}
		// OPEN OR STAY OPENED
		function slidemap_Open(){
			if (fullmap==true){
				console.log('open');
				if (desktop==true){
					$('#togglemap').attr("src", theme_directory+"/img/buttons/map_close.png");
					$("#rmap").animate({right:'0%'},300);
					$("#gmap").animate({width:'50%'},300,function(){
						fullmap = false;
						google.maps.event.trigger(map, "resize");
						map.panTo(selectedpoint.position);
					});
				}else if (desktop==false){
					$('#togglemap').attr("src", theme_directory+"/img/buttons/map_resp_close.png");
					$("#rmap").animate({top:'20%'},300);
					$("#gmap").animate({height:'20%'},300,function(){
						fullmap = false;
						google.maps.event.trigger(map, "resize");
						map.panTo(selectedpoint.position);
					});
				}
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
			var postId = positiondiv.parent('.post').attr('id');
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
			var loader = $("<img class='maploader' src="+theme_directory+"/img/rolling.svg></img>").appendTo('#map_post_title');

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

			jQuery.post(
			    ajaxurl,
			    {
			        'action': 'MAPsingleload',
			        'id': id
			    },
			    function(response){
						// loader.fadeOut(200);
						loader.attr('src', theme_directory+"/img/buttons/clock_white.png");
						loader.attr('idofpost', id);
						mapToTime();
			    	$('#map_post_content').append(response);
						$('#map_post_content').fadeOut(0).fadeIn(200);
						$('#map_post_content').children('.post').children('.mapimage').each(function(){
							var ww = $(this).children('img').width();
							var hh = $(this).children('img').height();
							if(ww>hh){ $(this).children('img').css('width', '100%' );	}
							if (hh>ww){ $(this).children('img').css('width', '60%' ); }
						});
			    }
			);
		}

		function mapToTime(){
			$('.maploader').click(function(){
				var id = $(this).attr('idofpost');
				$('#map').fadeOut(200, function(){
					showTimeline();
					stopPlayers();
					page='time';
				});
				var postdiv =  $('#'+id);
				$('body, html').animate({scrollTop: postdiv.offset().top-$('header').height()+1,easing:"swing"},400,function(){
					// animating = false;
				});

			});
		}



		////////////////////////////////////////////////////////
		/////////////////////   PLAYERS    /////////////////////
		////////////////////////////////////////////////////////

		// MediaElementPlayer.remove();

		// AUDIO
		$('.wp-audio-shortcode').each(function(index,div){
			$(div).css('visibility', 'visible');
		});
		// firefox / permet la lecture sans ouvrir le post
		$('.wp-audio-shortcode').click(function(e){
			e.stopPropagation();
		});
		// prevent multiple plays
		document.addEventListener('play', function(e){
				var audios = document.getElementsByTagName('audio');
				for(var i = 0, len = audios.length; i < len;i++){
						if(audios[i] != e.target){
								audios[i].pause();
						}
				}
		}, true);


		$('.wp-video-shortcode').each(function(index,div){
			$(div).prop("controls", false);
		});
		// $('.wp-video-shortcode').click(function(e){
		// 	e.stopPropagation();
		// });

		function stopPlayers(){
			$('.wp-video-shortcode').each(function(index,div){
				$(div).get(0).pause();
			});
			$('.wp-audio-shortcode').each(function(index,div){
				$(div).get(0).pause();
			});
		}

		////////////////////////////////////////////////////////
		/////////////////////    SHOW      /////////////////////
		////////////////////////////////////////////////////////


		function showTimePost(id,time){
			stopPlayers();
			$("#timepost_title").html(time);
			$("#postdetails_content").empty();
			var postcontent = $('#'+id).children('.postcontent').html()
			$('#postdetails_content').append(postcontent);

			if($('#postdetails_content').children().hasClass('imagepost_content')&&(desktop==false)){
				return;
			}

			$('#postoverlay').fadeIn(300);
			page='post';
			$('html').css('overflow-y','hidden');

			if($('#postdetails_content').children().hasClass('imagepost_content')&&(desktop==true)){
				$('#postdetails_content').children('.imagepost_content').each(function(){
					var ww = $(this).children('img').width();
					var hh = $(this).children('img').height();
					if(ww>hh){ $(this).children('img').css('width', '100%' );	}
					if (hh>ww){ $(this).children('img').css('width', '40%' ); }
				});
			}

			if ($("#postdetails_content").children().hasClass('videopost_content')){
				$("#postdetails_content").find('.playvid')[0].remove();
				var player = $("#postdetails_content").find('.wp-video-shortcode')[0];
				$(player).get(0).play();
				$(player).prop("controls", true);
				if (desktop==false){
					$("#timepost_title").hide();
					$('#viewpostmap').hide();
					$('.header').hide();
					$('#postdetails').css({'height':'100%','width':'100%','margin-top':'0px', 'padding':'0px'});
					$('#closepost').css({'position':'absolute'});
					reset_postdetailsCSS = true;
				}
			}

			if ($("#postdetails_content").children().hasClass('audiopost_content')){
				var player = $("#postdetails_content").find('.wp-audio-shortcode')[0];
				$(player).get(0).play();
			}

			if ($("#postdetails_content").children().hasClass('onlytextpost')){
			}
		}




		//////////////////////////////////////////////////////////
		/////////////////////    HASH      ///////////////////////
		//////////////////////////////////////////////////////////

		var hash = window.location.hash.substr(1);
		console.log(hash);
		if (hash =='map'){
			openMap();
		}else if (hash=='infos') {
			openInfos();
		}






	});

})(jQuery, this);
