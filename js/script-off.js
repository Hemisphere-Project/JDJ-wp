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
					url: theme_directory+"/js/file_operations.php",
					type: "POST",
					data: {
							action: 'readfile',
							fileurl:'http://app.journaldunseuljour.fr/server/db/show_beta.db'
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
				$("#telcomments").css('visibility', 'visible').html('Merci, nous avons bien enregistré votre participation pour le spectacle du '+dateselected+' ! ');
				// SUBSCRIBING NEW USER
				var newuser = {phone:telnum, event:eventselected};
				console.log(newuser);
				subscribenewuser(newuser);
			}
			if (!telformat){
				$("#telcomments").css('visibility', 'visible').html('Veuillez entrer un numéro de protable au format 06XXXXXXXX ou 07XXXXXXXX');;
				$("#telcomments").val('06XXXXXXXX');
			}
		});





		var allUsers= [];
		getallusers();

		function getallusers(){
			$.ajax({
					url: theme_directory+"/js/file_operations.php",
					type: "POST",
					data: {
							action: 'readfile',
							fileurl:'http://app.journaldunseuljour.fr/server/db/users_from_wp.db'
					}
			})
			.done(function(response){
				allUsers= [];
				allUsers.push(JSON.parse(response));
				console.log(allUsers);
			});
		}

		function subscribenewuser(newuser){
			allUsers.push(newuser);
			$.ajax({
					url: theme_directory+"/js/file_operations.php",
					type: "POST",
					data: {
							action: 'saveusers',
							content:JSON.stringify(allUsers)
					}
			})
			.done(function(response){
				console.log(response);
				getallusers();
			});

		}







});

})(jQuery, this);
