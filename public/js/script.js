function CreateNewUser() {
  $.ajax({
    method: "POST",
    url: "/users/register",
    data: { name: $("#addAccName").val(), username: $("#addAccUserName").val(), password:$("#addAccPass").val() ,usertype:$("#addAccUserType option:selected").val() }
  }).done(function(msg) {
    $("#addAccountModal .close").click();
  });
}
function testButton(){
  alert( "click" );
}
