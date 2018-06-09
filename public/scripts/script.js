$(document).ready(function(){
	$('.submit-btn').on('click',function(){
		var arr=[];
		for(var i=0;i<10;i++){
			if($('input[name=question'+i+']:checked').val()!=null)
				arr.push($('input[name=question'+i+']:checked').val());	
			else
				arr.push(-1);
		}
		var JsonString = JSON.stringify(arr);
		$.ajax({
            url: "/",
            type: "POST",
            data: {data:JsonString},
            timeout: 5000,
            complete: function() {
              //called when complete
              console.log('process complete');
            },
            success: function(data) {
              console.log(data);
              alert('process sucess');
              
           	},
            error: function() {
              console.log('process error');
            },
        });

	});
});