(function ($, root, undefined) {

	$(function () {

		'use strict';

		/////////////////////    NAVIG     ///////////////////////
		//////////////////////////////////////////////////////////

		function allButtonsInactive(){
			$('#timeheader').children('img').removeClass('timeheaderactive').addClass('timeheaderinactive');
			$('#placeheader').children('img').removeClass('placeheaderactive').addClass('placeheaderinactive');
			$('#infosheader').children('img').removeClass('infosactive').addClass('infosinactive');
		}



		/////////////////////    INFOS     ///////////////////////

		$('#infosheader').on("click",function(){
			$('.timeline, .elevator').fadeOut(200,function(){
				$('.infos').fadeIn(300);
			});
			allButtonsInactive();
			$('#infosheader').children('img').removeClass('infosinactive').addClass('infosactive');
		});

		$('html, .closeinfos').click(function() {
			closeInfos();
		});
		$('.infos, #infosheader ,header').click(function(event){
		  event.stopPropagation();
		});

		function closeInfos(){
			$('.infos').fadeOut(200, function(){
				$('.timeline, .elevator').fadeIn(300);
			});
			$('#infosheader').children('img').removeClass('infosactive').addClass('infosinactive');
			$('#timeheader').children('img').removeClass('timeheaderinactive').addClass('timeheaderactive');
		}

		/////////////////////    PLACE     ///////////////////////

		$('#placeheader').on("click",function(){
			// $('.timeline, .elevator').fadeOut(200,function(){
			// 	$('.place').fadeIn(300);
			// });
			console.log("PLACE");
			allButtonsInactive();
		});






	});

})(jQuery, this);
