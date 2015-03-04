$(document).ready(function(){
  $("#registration_username").on ('blur', function(){
    var username = $('#registration_username').val();
    var re = /^[\w_]+[\w._]*[\w_]$/;
    if (username === "") {
      $("#registration_username").removeClass("username_blue")
      $("#registration_username").removeClass("username_red")
      $("#registration_username").addClass("username_white")
    } else if (re.test(username)){
      var enc_username = window.btoa(username);
      $.ajax("/middleman/?username=" + enc_username).done(function(response){
        var registered = response["isRegistered"];
        if(registered === 0){
          $("#registration_username").removeClass("username_white")
          $("#registration_username").removeClass("username_blue")
          $("#registration_username").addClass("username_red")
        }else {
          $("#registration_username").removeClass("username_white")
          $("#registration_username").removeClass("username_red")
          $("#registration_username").addClass("username_blue")
        }
      });
    } else {
      $("#registration_username").removeClass("username_white")
      $("#registration_username").removeClass("username_blue")
      $("#registration_username").addClass("username_red")
    }
  });

  $("#registration_email").on ('blur', function(){
    var email = $('#registration_email').val();
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)){
      var enc_email = window.btoa(email);
      $.ajax("/middleman/?email=" + enc_email).done(function(response){
        var registered = response["isRegistered"];
        if(registered === 0){
          console.log("Not registered!");
        }else {
          console.log("Registered!");
        }
      });
    } else {
      console.log("Email is not valid");
    }
  });

  $("#registration").on('blur', function(){
    var password = $('registration').val();
    var enc_password = window.btoa(password);
    $.ajax("/middleman/?password=" + enc_password).done(function(response){
      var valid = response["isValid"];
      console.log(valid);
      if(valid == 0){
        console.log("Password Contains Invalid Characters");
      } else {
        console.log("Valid");
      }
    });
  });

});
