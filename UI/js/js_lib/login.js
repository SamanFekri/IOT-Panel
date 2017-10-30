function login(userData) {
  var url = "/Thesis/api/login.php"
  $.post(
    url, userData, function (data, status) {
      console.log(data);
      console.log(typeof data);
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      if (data.code == 200) {
        localStorage.setItem('token', data['token']);
        console.log("token: " + localStorage.getItem('token'));
        window.location.replace("/Thesis/UI/index.html")


      } else if (data.code == 900) { // username not exists
        $("#error_msg").css('color', "#ef4040");
        $("#error_msg").html(data.message);

      } else { // password is wrong
        $("#error_msg").css('color', "#ef4040");
        $("#error_msg").html(data.message);
      }
    }
  )
}

$("#login_btn").on('click', function () {
  var userData = {};
  userData.email = $("#email").val();
  userData.password = $("#password").val();
  console.log(userData);
  login(userData)
})