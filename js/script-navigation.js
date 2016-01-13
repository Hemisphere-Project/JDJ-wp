(function ($, root, undefined) {

	$(function () {

		'use strict';

		/////////////////////    INFOS     ///////////////////////
		//////////////////////////////////////////////////////////

		$('#infosheader').on("click",function(){
			$('.timeline, .elevator').fadeOut(200,function(){
				$('.infos').fadeIn(300);
			});


			$('#infosheader').children('img').removeClass('infosinactive').addClass('infosactive');
		});

		$('html, .closeinfos').click(function() {
			closeInfos();
		});
		$('.infos, #infosheader').click(function(event){
		  event.stopPropagation();
		});

		function closeInfos(){
			$('.infos').fadeOut(200, function(){
				$('.timeline, .elevator').fadeIn(300);
			});
			$('#infosheader').children('img').removeClass('infosactive').addClass('infosinactive');
		}



	});

})(jQuery, this);
