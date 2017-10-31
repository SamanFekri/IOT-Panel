/**
 * Created by SKings on 9/4/2017.
 */
function get_user_info(userData) {
  var url = "/Thesis/api/get_user_info.php";
  $.post(
    url, userData, function (data, status) {
      console.log(data);
      console.log(typeof data);
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
    }
  )
}


function load_user(userData, success) {
  var url = "/Thesis/api/index.php";
  $.post(
    url, userData, function (data, status) {
      console.log(data);
      console.log(typeof data);
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      success(data)
    }
  )
}


window.onload = function () {
  //var chart1 = document.getElementById("line-chart").getContext("2d");
  //window.myLine = new Chart(chart1).Line(lineChartData, {
  //  responsive: true,
  //  scaleLineColor: "rgba(0,0,0,.2)",
  //  scaleGridLineColor: "rgba(0,0,0,.05)",
  //  scaleFontColor: "#c5c7cc"
  //});

//        get_user_info({email: "samanf74@gmail.com"})

  console.log(localStorage.getItem('token'));
  load_user({token: localStorage.getItem('token')}, load_user_data_in_page);

  init_dashboard();
}

function load_user_data_in_page(userData) {
  $("#profile_img").attr('src', userData['image']);
  $("#profile_username").html(userData['name']);
  if (userData['access'] != 0) {
    $('#menu-user').hide();
  }
}

function logout() {
  localStorage.clear();
}


function setActive(id){
  removeActive()
  $(id).addClass('active');
}
function removeActive() {
  $('#menu-dash').removeClass();
  $('#menu-moni').removeClass();
  $('#menu-cont').removeClass();
  $('#menu-build').removeClass();
  $('#menu-scen').removeClass();
  $('#menu-user').removeClass();
}

function setView(id){
  var contents = ['#dashboard-content', '#monitor-content','#control-content','#building-content','#scenario-content','#user-content']
  for(var i=0; i<6; i++){
    console.log()
    if(contents[i] == id){
      $(id).show();
    }else{
      $(contents[i]).hide();
    }
  }
}