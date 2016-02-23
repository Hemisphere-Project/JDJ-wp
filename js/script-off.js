(function ($, root, undefined) {

	$(function () {

		'use strict';

		console.log('SCRIPT OFF');

		$('#startoverlay').fadeOut(200,function(){ });
		$('#timeheader, #placeheader, #infosheader, #tweetsheader').hide();
		$('#offpage').show();


		//////////////////////////////////////////////////
		////////////////// INSCRIPTION ///////////////////
		//////////////////////////////////////////////////

		// FILL EVENTS dropdown
		var allEvents = new Array();
		getEvents();

		function getEvents(){
			$.ajax({
					url: theme_directory+"/js/files.php",
					type: "POST",
					data: {
							// action: 'load',
							// filename: name
					}
			})
			.done(function(response){
				var allEventsIn = JSON.parse(response);
				//clean db file
				$.each(allEventsIn,function(index,event){
					if (event !=null){ allEvents.push(event); }
				});
				buildEvents();
			});
		}

		function buildEvents(){
			console.log(allEvents);
			$('#eventselector').empty();
			$.each(allEvents,function(index,event){
				console.log(event);
				$("#eventselector").append(('<option value_id="'+event.id+'" value="'+event.date+'">'+event.place+' - '+event.date+'</option>'));
			});
		}

		$('#telinput, #eventselector').change(function(){
				$("#telcomments").css('visibility', 'hidden');
		});

		$("#sendtel").click(function(){
			var telnum = $('#telinput').val();
			var regex = /^(06|07)\d{8}$/i;
			var telformat = regex.test(telnum);
			var dateselected = $('#eventselector option:selected').val();
			var eventselected = [];
			$.each(allEvents,function(index,event){
				if (dateselected == event.date){
					eventselected = event;
				}
			});
			if (telformat){
				$("#telcomments").css('visibility', 'visible').html('Merci, nous avons bien enregistré votre participation pour le spectacle du '+dateselected+' ! ');

				// SUBSCRIBING NEW USER
				console.log(telnum);
				console.log(eventselected);
			}
			if (!telformat){
				$("#telcomments").css('visibility', 'visible').html('Veuillez entrer un numéro de protable au format 06XXXXXXXX ou 07XXXXXXXX');;
				$("#telcomments").val('06XXXXXXXX');
			}
		});







});

})(jQuery, this);
