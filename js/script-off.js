(function ($, root, undefined) {

	$(function () {

		'use strict';

		console.log('SCRIPT OFF');

		$('#startoverlay').fadeOut(200,function(){ });
		$('#timeheader, #placeheader, #infosheader, #tweetsheader').hide();
		$('#offpage').show();



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
				allEvents = JSON.parse(response);
				buildEvents();
			});
		}

		function buildEvents(){
			$('#eventselector').empty();
			// $("#eventselector").append(('<option value="all">all</option>'));
			$.each(allEvents,function(index,event){
				console.log(event);
				$("#eventselector").append(('<option value_id="'+event.id+'" value="'+event.date+'">'+event.place+' - '+event.date+'</option>'));
			});
		}

		// $('#eventselector').change(function(){
		// 	dateselected = $('#eventselector option:selected').val();
		// 	$.each(allEvents,function(index,event){
		// 		if (dateselected == event.date){
		// 			socket.emit('eventselected', event);
		// 		}
		// 	});
		// });


		$('#telinput').change(function(){
			console.log($('#telinput').val());
			var telnum = $('#telinput').val();

			// var regex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
			var regex = /^(06|07)\d{8}$/i;
			var telformat = regex.test(telnum);


			console.log(telformat);
		})







});

})(jQuery, this);
