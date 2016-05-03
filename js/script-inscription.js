(function ($, root, undefined) {

	$(function () {

		'use strict';

		console.log('SCRIPT INSCRIPTION');
		//////////////////////////////////////////////////
		////////////////// INSCRIPTION ///////////////////
		//////////////////////////////////////////////////

		// FILL EVENTS dropdown
		var allEvents = new Array();
		getEvents();

		function getEvents(){
			$.ajax({
					url: theme_directory+"/php/nodebridge.php",
					type: "POST",
					data: { action: 'allevents' }
			})
			.done(function(response){
				// console.log(response);
				var allEventsIn = JSON.parse(response);
				//clean db file
				$.each(allEventsIn,function(index,event){
					if (event !=null){ allEvents.push(event); }
				});
				buildEvents();
			});
		}

		function buildEvents(){
			$('#eventselector').empty();
			$.each(allEvents,function(index,event){
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
				// SUBSCRIBING NEW USER
				var newuser = {phone:telnum, eventid:eventselected.id, date: dateselected};
				subscribenewuser(newuser);
			}
			if (!telformat){
				$("#telcomments").css('visibility', 'visible').html('Veuillez entrer un numéro de protable au format 06XXXXXXXX ou 07XXXXXXXX');;
				$("#telcomments").val('06XXXXXXXX');
			}
		});

		function subscribenewuser(newuser){
			$.ajax({
					url: theme_directory+"/php/nodebridge.php",
					type: "POST",
					data: {
							action: 'adduser',
							user:JSON.stringify(newuser)
					}
			})
			.done(function() {
				$("#telcomments").css('visibility', 'visible').html('Merci, nous avons bien enregistré votre participation pour le spectacle du '+newuser.date+' ! ');
			})
			.fail(function() {
				$("#telcomments").css('visibility', 'visible').html('Désolé, une erreur est survenue. Veuillez essayez ultérieurement...');
			});
		}

});

// $(window).on("load", function() {});

})(jQuery, this);
