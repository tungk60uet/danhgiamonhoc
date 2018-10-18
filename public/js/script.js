function CreateNewUser() {
  $.ajax({
    method: "POST",
    url: "/users/register",
    data: { name: $("#addAccName").val(), username: $("#addAccUserName").val(), password:$("#addAccPass").val() ,usertype:$("#addAccUserType option:selected").val() }
  }).done(function(msg) {
  	$("#addAccountModal").modal("hide");
  });
}
function showdata(obj){
	var clickedID = this.id;
}
$("button[username]").click(function(){
	console.log($(this).text().trim());
	$("#editAccountModal").modal("toggle");
})
function testButton(){
  alert( "click" );
}
