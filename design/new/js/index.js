
$(".add-account-btn").click(function(e){
  e.preventDefault();
  dataModal = $(this).attr("data-modal");
  $("#"+dataModal).css({"display":"block"});
  // $("body").css({"overflow-y": "hidden"}); //Prevent double scrollbar.
});
$(".close-modal, .modal-sandbox").click(function(){
  $(".modal").css({"display":"none"});
});

$("#tabBody0 .add-account-btn").click(function(e){
  e.preventDefault();
  $("#add-account-modal").css({"display":"block"});
});
$("#tabBody0 .table-row").click(function(e){
  e.preventDefault();
  $("#edit-account-modal").css({"display":"block"});
});
$("#tabBody1 .table-row").click(function(e){
  e.preventDefault();
  $("#view-survey-modal").css({"display":"block"});
});
$("#tabBody1 .add-survey-btn").click(function(e){
  e.preventDefault();
  $("#add-survey-modal").css({"display":"block"});
});

$("#tabBody2 .table-row").click(function(e){
  e.preventDefault();
  $("#edit-survey-template-modal").css({"display":"block"});
});
$("#tabBody2 .add-survey-template-btn").click(function(e){
  e.preventDefault();
  $("#add-survey-template-modal").css({"display":"block"});
});

$(document).ready(function() {
    var numItems = $('li.fancyTab').length;
			  if (numItems == 12){
					$("li.fancyTab").width('8.3%');
				}
			  if (numItems == 11){
					$("li.fancyTab").width('9%');
				}
			  if (numItems == 10){
					$("li.fancyTab").width('10%');
				}
			  if (numItems == 9){
					$("li.fancyTab").width('11.1%');
				}
			  if (numItems == 8){
					$("li.fancyTab").width('12.5%');
				}
			  if (numItems == 7){
					$("li.fancyTab").width('14.2%');
				}
			  if (numItems == 6){
					$("li.fancyTab").width('16.666666666666667%');
				}
			  if (numItems == 5){
					$("li.fancyTab").width('20%');
				}
			  if (numItems == 4){
					$("li.fancyTab").width('25%');
				}
			  if (numItems == 3){
					$("li.fancyTab").width('33.3%');
				}
			  if (numItems == 2){
					$("li.fancyTab").width('50%');
				}
				if (numItems == 1){
					$("li.fancyTab").width('100%');
				}
		});
