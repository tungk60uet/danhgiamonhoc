var listSurveyTemplate = [];
$(document).ready(function () {
  fillSurveyTemplate();
  fillUserList();
  fillSurveyList();
});

function fillUserList() {
  $.ajax({
    method: "GET",
    url: "/users/userlist",
    success: function (data) {
      $(".user-list").empty();
      $(".lec-container").empty();
      data.forEach(function (item) {
        $(".user-list").append("<button type='button' id='" + item._id + "'username='" + item.username + "' usertype='" + item.usertype + "' class='list-group-item list-group-item-action'>" + item.name + "</button>");
        if (item.usertype === "lec")
          $(".lec-container").append("<option value='" + item.username + "'>" + item.name + "</option>");
      });
    }
  });
}

function fillSurveyList() {
  $.ajax({
    method: "GET",
    url: "/survey/read",
    success: function (data) {
      $(".survey-list").empty();
      data.forEach(function (item) {
        $(".survey-list").append("<button type='button' id='" + item._id + "' class='list-group-item list-group-item-action'>" + item.name + "</button>");
      });
    }
  });
}

function fillSurveyTemplate() {
  $.ajax({
    method: "GET",
    url: "/surveyTemplate/read",
    success: function (data) {
      listSurveyTemplate = data;
      $(".survey-template-container").empty();
      $(".survey-template-dropdown").empty();
      data.forEach(function (item) {
        $(".survey-template-container").append("<button type='button' id='" + item._id + "' class='list-group-item list-group-item-action'>" + item.name + "</button>");
        $(".survey-template-dropdown").append("<option value='" + item._id + "'>" + item.name + "</option>");
      });
    }
  });
};

//user//
function CreateNewUser() {
  $.ajax({
    method: "POST",
    url: "/users/register",
    data: {
      name: $("#addAccName").val(),
      username: $("#addAccUserName").val(),
      password: $("#addAccPass").val(),
      usertype: $("#addAccUserType option:selected").val()
    }
  }).done(function (msg) {
    $("#addAccountModal").modal("hide");
  });
}
$(".btn-del-user").click(function () {
  $.ajax({
    method: "POST",
    url: "/users/delete",
    data: {
      username: $(".input-edit-username").val()
    }
  }).done(function (msg) {
    $("#editAccountModal").modal("hide");
  });
});
$(".btn-update-user").click(function () {
  $.ajax({
    method: "POST",
    url: "/users/update",
    data: {
      username: $(".input-edit-username").val(),
      name: $(".input-edit-name").val(),
      password: $(".input-edit-pass").val()
    }
  }).done(function (msg) {
    $("#editAccountModal").modal("hide");
  });
});
$('.user-list').on('click', 'button', function () {
  $(".input-edit-name").val($(this).text().trim());
  $(".input-edit-username").val($(this).attr("username"));
  $(".input-edit-pass").val('');
  var utype;
  if ($(this).attr("usertype") === 'std') {
    utype = 'Sinh viên';
  } else if ($(this).attr("usertype") === 'lec') {
    utype = 'Giảng viên';
  } else if ($(this).attr("usertype") === 'admin') {
    utype = 'Quản trị';
  }
  $(".input-edit-usertype").val(utype);
  $("#editAccountModal").modal("toggle");
});
//user
//survey
var surveySelected;
$('.survey-list').on('click', 'button', function () {
  $.ajax({
    method: "POST",
    url: "/survey/readId",
    dataType: 'json',
    data: {
      _id: $(this).attr('id')
    },
    success: function (data) {
      console.log(data);
      surveySelected = data;
      $("#dialogServey .name").val(data["name"]);
      $("#dialogServey .lecture").val($(".lec-container").find("[value='" + data["lecid"] + "']").html());
      $("#dialogServey .result").empty();
      $("#dialogServey .result").append("<option value='tonghop'>Tổng hợp</option>");
      data["result"].forEach(function (element) {
        $("#dialogServey .result").append("<option value='" + element.username + "'>" + $(".user-list").find("[username='" + element.username + "']").html() + "</option>");
      });
      $("#dialogServey").modal("toggle");
    }
  });
});

$("#dialogServey .delete").click(function () {
  $.ajax({
    method: "POST",
    url: "/survey/delete",
    dataType: 'json',
    data: {
      _id: surveySelected._id
    },
    success: function (data) {
      console.log("del");
      $("#dialogServey").modal("toggle");
      fillSurveyList();
    }
  });
});
$(".btn-save-survey").click(function () {
  $.ajax({
    method: "POST",
    url: "/survey/create",
    dataType: 'json',
    data: {
      name: $("#dialogAddServey .name").val(),
      lecid: $("#dialogAddServey .lec-container").val(),
      templateid: $("#dialogAddServey .survey-template-dropdown").val(),
      listuser: $("#dialogAddServey textarea").val().split('\n')
    },
    success: function (data) {
      console.log("create");
      $("#dialogAddServey").modal("toggle");
      fillSurveyList();
    }
  });
});

//survey
//survey-template
$(".btn-add-question").click(function () {
  $(".question-container").append("<div class='form-group row px-3'> <input type='text' class='col form-control'> <button type='button' class='col-1 btn btn-danger btn-del-question'>Xóa</button> </div>");
});
$('.question-container').on('click', '.btn-del-question', function () {
  $(this).parent().remove();
});
var idSurveyTemplate = 0;
$(".add-survey-template").click(function () {
  idSurveyTemplate = 0;
  $('.btn-del-survey-template').hide();
  $('.input-name-surveyTemplate').val('');
  $(".question-container").empty();
  $('#dialogServeyTemplate').modal('toggle');
});
$('.btn-save-survey-template').click(function () {
  var listQuestion = $('.question-container input').map(function () {
    return $(this).val();
  }).get();
  if (idSurveyTemplate === 0) {
    $.ajax({
      method: "POST",
      url: "/surveyTemplate/create",
      dataType: 'json',
      data: {
        name: $('.input-name-surveyTemplate').val(),
        listquestion: listQuestion
      },
      success: function (data) {
        console.log("create");
        $('#dialogServeyTemplate').modal('toggle');
        idSurveyTemplate = 0;
        fillSurveyTemplate();
      }
    });
  } else {
    $.ajax({
      method: "POST",
      url: "/surveyTemplate/update",
      dataType: 'json',
      data: {
        _id: idSurveyTemplate,
        name: $('.input-name-surveyTemplate').val(),
        listquestion: listQuestion
      },
      success: function (data) {
        console.log("update");
        $('#dialogServeyTemplate').modal('toggle');
        idSurveyTemplate = 0;
        fillSurveyTemplate();
      }
    });
  }
});
$('.btn-del-survey-template').click(function () {
  $.ajax({
    method: "POST",
    url: "/surveyTemplate/delete",
    dataType: 'json',
    data: {
      _id: idSurveyTemplate
    },
    success: function (data) {
      console.log("delete");
      $('#dialogServeyTemplate').modal('toggle');
      idSurveyTemplate = 0;
      fillSurveyTemplate();
    }
  });
});
$('.survey-template-container').on('click', 'button', function () {
  $('.btn-del-survey-template').show();
  var svt = listSurveyTemplate.find(x => x._id === $(this).attr('id'));
  idSurveyTemplate = svt._id;
  $('.input-name-surveyTemplate').val(svt.name);
  $(".question-container").empty();
  svt.listquestion.forEach(function (element) {
    $(".question-container").append("<div class='form-group row px-3'> <input type='text' class='mr-1 col form-control' value='" + element + "'> <button type='button' class='col-1 btn btn-danger btn-del-question'>Xóa</button> </div>");
  });
  $('#dialogServeyTemplate').modal('toggle');
});