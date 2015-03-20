$(document).ready(function(){

  var userNameError;

  function mrWhite () {
    $("#registration_username").removeClass("username_blue");
    $("#registration_username").removeClass("username_red");
    $("#registration_username").addClass("username_white");
  }

  function mrBlue () {
    $("#registration_username").removeClass("username_white");
    $("#registration_username").removeClass("username_red");
    $("#registration_username").addClass("username_blue");
  }

  function mrRed () {
    $("#registration_username").removeClass("username_white");
    $("#registration_username").removeClass("username_blue");
    $("#registration_username").addClass("username_red");
  }

  function emailWhite () {
    $("#registration_email").removeClass("email_blue");
    $("#registration_email").removeClass("email_red");
    $("#registration_email").addClass("email_white");
  }

  function emailBlue () {
    $("#registration_email").removeClass("email_white");
    $("#registration_email").removeClass("email_red");
    $("#registration_email").addClass("email_blue");
  }

  function emailRed () {
    $("#registration_email").removeClass("email_white");
    $("#registration_email").removeClass("email_blue");
    $("#registration_email").addClass("email_red");
  }

  function whitePassword () {

  }

  function bluePassword () {

  }

  function redPassword () {

  }

  function checkUsername(){
    var username = $('#registration_username').val();
    var re = /^[\w_]+[\w._]*[\w_]$/;
    if (username === ""){
      mrWhite();
      userNameError= 'Please enter a Username';
    } else if(username.length > 15) {
      mrRed();
      userNameError= 'Must be less than 16 characters';
    } else if (re.test(username)){
      var enc_username = window.btoa(username);
      $.ajax("/middleman/?username=" + enc_username).done(function(response){
        var registered = response["isRegistered"];
        if(registered === 0){
          mrBlue();
          userNameError = "";
        }else {
          mrRed();
          userNameError = 'Username is already taken';
        }
      });
    } else {
      mrRed();
      userNameError = 'Invalid characters';
    }
  }

  var emailError;
  function checkEmail(){
    var email = $('#registration_email').val();
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === ""){
      emailWhite();
      emailError = 'Please enter an email';
    }else if(re.test(email)){
      var enc_email = window.btoa(email);
      $.ajax("/middleman/?email=" + enc_email).done(function(response){
        var registered = response["isRegistered"];
        if(registered === 0){
          emailBlue();
          emailError = '';
        }else {
          emailRed();
          emailError = 'Email is already registered';
        }
      });
    }else {
      emailRed();
      emailError = 'Not a valid email';
    }

  }

  var passwordError;
  function checkPassword(){
    var password = $('#registration').val();
    var enc_password = window.btoa(password);
    if (password === "") {
      $("#registration").removeClass("password_blue");
      $("#registration").removeClass("password_red");
      $("#registration").addClass("password_white");
      passwordError = "Please enter a password";
    } else {
      $.ajax("/middleman/?password=" + enc_password).done(function(response){
        var valid = response["isValid"];
        if(valid == 0){
          $("#registration").removeClass("password_white");
          $("#registration").removeClass("password_blue");
          $("#registration").addClass("password_red");
          passwordError = "Password contains invalid characters";
        } else {
          $("#registration").removeClass("password_white");
          $("#registration").removeClass("password_red");
          $("#registration").addClass("password_blue");
          passwordError = "";
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

  function setError(input, message){
    var tooltip = '[data-name="'+ input + '"]';
    $(tooltip).attr('data-original-title', message);
    $(tooltip).tooltip('fixTitle');
  }

  $('#register').on('click', function(){
    var username = window.btoa($('#registration_username').val());
    var password = window.btoa($('#registration').val());
    var email = window.btoa($('#registration_email').val());
    if ($("#registration").hasClass("password_blue") && $("#registration_email").hasClass("email_blue") && $("#registration_username").hasClass("username_blue")) {
      $.ajax("/middleman/register?username=" + username + "&password=" + password + "&email=" + email).done(function(response){
      });
      window.location.href='/registration/facebook';
    }else {
      setError("email", emailError);
      setError("password", passwordError);
      setError("username", userNameError);
      $('[data-toggle="tooltip"]').tooltip('show');
      setTimeout(function() {
        setError("email", "");
        setError("password", "");
        setError("username", "");
      }, 5000);
    }
  });
});
