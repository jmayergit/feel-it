$(document).ready(function(){

  function checkUsername(){
    $('[data-toggle="tooltip"]').tooltip('show');
    var username = $('#registration_username').val();
    var userLength = username.length;
    var re = /^[\w_]+[\w._]*[\w_]$/;
    if (username === ""){
      $("#registration_username").removeClass("username_blue");
      $("#registration_username").removeClass("username_red");
      $("#registration_username").addClass("username_white");
    } else if (re.test(username)){
      var enc_username = window.btoa(username);
      $.ajax("/middleman/?username=" + enc_username).done(function(response){
        var registered = response["isRegistered"];
        if(registered === 0 && userLength <= 15){
          $("#registration_username").removeClass("username_white");
          $("#registration_username").removeClass("username_red");
          $("#registration_username").addClass("username_blue");
        }else {
          $("#registration_username").removeClass("username_white");
          $("#registration_username").removeClass("username_blue");
          $("#registration_username").addClass("username_red");
        }
      });
    }else {
      $("#registration_username").removeClass("username_white");
      $("#registration_username").removeClass("username_blue");
      $("#registration_username").addClass("username_red");
    }
  }

  function checkEmail(){
    var email = $('#registration_email').val();
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === ""){
      $("#registration_email").removeClass("email_blue");
      $("#registration_email").removeClass("email_red");
      $("#registration_email").addClass("email_white");
    }else if(re.test(email)){
      var enc_email = window.btoa(email);
      $.ajax("/middleman/?email=" + enc_email).done(function(response){
        var registered = response["isRegistered"];
        if(registered === 0){
          $("#registration_email").removeClass("email_white");
          $("#registration_email").removeClass("email_red");
          $("#registration_email").addClass("email_blue");
        }else {
          $("#registration_email").removeClass("email_white");
          $("#registration_email").removeClass("email_blue");
          $("#registration_email").addClass("email_red");
        }
      });
    }else {
      $("#registration_email").removeClass("email_white");
      $("#registration_email").removeClass("email_blue");
      $("#registration_email").addClass("email_red");
    }
  }

  function checkPassword(){
    var password = $('#registration').val();
    var enc_password = window.btoa(password);
    if (password === "") {
      $("#registration").removeClass("password_blue");
      $("#registration").removeClass("password_red");
      $("#registration").addClass("password_white");
    } else {
      $.ajax("/middleman/?password=" + enc_password).done(function(response){
        var valid = response["isValid"];
        if(valid == 0){
          $("#registration").removeClass("password_white");
          $("#registration").removeClass("password_blue");
          $("#registration").addClass("password_red");
        } else {
          $("#registration").removeClass("password_white");
          $("#registration").removeClass("password_red");
          $("#registration").addClass("password_blue");
        }
      });
    }
  }


  $("#registration_email").on ('blur', function(){
    checkEmail();
  });

  $("#registration_username").on ('blur', function(){
    checkUsername();
  });

  $("#registration").on('blur', function(){
    checkPassword();
  });

  $('#register').on('mouseover', function(){
    checkEmail();
    checkUsername();
    checkPassword();
  });

  $('#register').on('click', function(){
    var username = window.btoa($('#registration_username').val());
    var password = window.btoa($('#registration').val());
    var email = window.btoa($('#registration_email').val());
    if ($("#registration").hasClass("password_blue") && $("#registration_email").hasClass("email_blue") && $("#registration_username").hasClass("username_blue")) {
      $.ajax("/middleman/register?username=" + username + "&password=" + password + "&email=" + email).done(function(response){
      });
      window.location.href='/registration/facebook';
    }else {
    }
  });
});
