
$(document).ready(function(){
  $("#signup").click(function(){
    var userobj={};
    userobj.firstName=$('#fname').val();
    userobj.lastName=$('#lname').val();
    userobj.email=$("#email").val();
    userobj.phoneNumber=$("#sigPhno").val();
    userobj.dob=$("#Dob").val();
    userobj.password=$("#sigPass").val();
    var fields=Object.keys(userobj);
    var i=0;
    jQuery.each(userobj, function(j, val) {
      if (val=="" || typeof val=="undefined"){
        alert (getNames(fields[i]) +"is empty");
        return false;
      }
      i=i+1;
    });
    var url="http://34.213.107.212:4000/webSignup"
    post(userobj,url,function(message){
      // console.log("response from post method"+JSON.stringify(message))
      // var message=JSON.parse(response);
      console.log(message)
      if(message['success']){
        $('#signupMessage').text("Signup Successful");
        $('#signupMessage').css("color", "White");
        $('#signupMessage').css("background-color", "Black");
        sessionStorage.setItem("cid",message["cid"])
      }else{
        $('signupMessage').val()="Signup Unsuccessful"
      }
    })
    
  });
  
  $("#signin").click(function(){
    var loginobj={};
    loginobj.phoneNumber=$("#logPhno").val();
    loginobj.password=$("#logPass").val();
    var fields=Object.keys(loginobj);
    var i=0;
    jQuery.each(loginobj, function(j, val) {
      if (val=="" || typeof val=="undefined"){
        alert (getNames(fields[i]) +"is empty");
        return false;
      }
      i=i+1;
    });
    var url="http://34.213.107.212:4000/login"
    post(loginobj,url,function(response){
      if(response.message==="login Successful"){
        sessionStorage.setItem("token",response.token)
        sessionStorage.setItem("cid",response.cid)
        window.location.href="./dashboard.html"
      }else{
        // loginMessage
        $('#loginMessage').text(response.message);
        $('#loginMessage').css("color", "White");
        $('#loginMessage').css("background-color", "Black");
      }

    })
  });
  
});

function post(obj,url,callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST",url,true);
  xhttp.setRequestHeader('content-type', 'application/json');
  
  xhttp.onreadystatechange = function() {  
    if (this.readyState === XMLHttpRequest.DONE ) {
      callback(JSON.parse(this.responseText))      
    }
  };

   xhttp.send(JSON.stringify(obj))
}

function getNames(name){
  if (name=="firstName"){
    return "First Name "
  }
  if(name=="lastName"){
    return "Last Name "
  }
  if(name=="email"){
    return "Email "
  }
  if(name=="phoneNumber"){
    return "Phone Number ";
  }
  if(name=="dob"){
    return "Date of Birth ";
  }
  if(name=="password"){
    return "Password "
  }

}