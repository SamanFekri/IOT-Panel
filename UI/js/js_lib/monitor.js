/**
 * Created by SKings on 10/30/2017.
 */
function init_monitor() {
  setActive('#menu-moni');
  setView('#monitor-content');

  var values = {}

  //var tempDiv = '<div class="row"> <div class="col-md-12"> <div class="panel panel-default"> <div class="panel-heading">';
  //tempDiv += 'Device <select id="@s"></select></div> <div class="panel-body">';
  //tempDiv += '<div class="canvas-wrapper col-md-5"> <canvas class="main-chart" id="@tc" height="200" width="600"></canvas> </div>';
  //tempDiv += '<div class="canvas-wrapper col-md-5"> <canvas class="main-chart" id="@hc" height="200" width="600"></canvas> </div>';
  //tempDiv += '</div> </div> </div> </div>';


  var client = new i1820.I1820Client('http://iot.ceit.aut.ac.ir:58902', true);
  client.discovery().then(function (agents) {

    console.log({agents: agents});
    for (var i = 0; i < agents.length; i++) {
      var agent = agents[i];
      for (var j = 0; j < agent.getThingsByType('multisensor').length; j++) {
        var dev = agent.getThingsByType('multisensor')[j];

        var tempDiv = '<div class="row"> <div class="col-md-12"> <div class="panel panel-default"> <div class="panel-heading">';
        tempDiv += 'Device <select id="sel@sdv" class="dev-sel" onchange="change_dev_room(@sdv)"></select></div> <div class="panel-body">';
        tempDiv += '<div class="canvas-wrapper col-md-5" style="margin-right: 20px;"> <canvas class="main-chart" id="tc@sdv" height="200" width="600"></canvas> </div>';
        tempDiv += '<div class="canvas-wrapper col-md-5"> <canvas class="main-chart" id="hc@sdv" height="200" width="600"></canvas> </div>';
        tempDiv += '</div> </div> </div> </div>';

        values[dev.id] = {count: 0, label: [], tdata: [], hdata: []};
        for (var k = 0; k < 20; k++) {
          tempDiv = tempDiv.replace("@sdv", dev.id);
        }
        $('#d-list').html(tempDiv);

        get_buildings_for_monitor();

        dev.on('log',
          function (result) {
            console.log(result);
            values[dev.id].count += 1;

            values[dev.id].label.push(values[dev.id].count);
            values[dev.id].tdata.push(result['humidity']);
            values[dev.id].hdata.push(result['temperature']);
            changeTemp(dev.id, values[dev.id].label, values[dev.id].tdata)
            changeHumidity(dev.id, values[dev.id].label, values[dev.id].hdata)
          });

      }
    }
  });

  //$('#d-list').html(tempDiv);
  console.log('hi');

}

function change_dev_room(dev_id) {
  var bid = $('#sel'+dev_id).val();
  var params = {ID:dev_id, Building_ID: bid}
  console.log(params)
  var url = "/Thesis/api/change_building.php"
  $.post(
    url, params, function (data, status) {
      console.log(data)
    }
  )
}

function changeTemp(id, label, data) {
  var struct_temp = {
    labels: label,
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(100,100,220,0.2)",
        strokeColor: "rgba(100,100,220,1)",
        pointColor: "rgba(100,100,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: data
      }]
  };
  var chart1 = document.getElementById("tc"+id).getContext("2d");
  window["tc" + id] = new Chart(chart1).Line(struct_temp, {
    responsive: true,
    scaleLineColor: "rgba(0,0,0,.2)",
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleFontColor: "#c5c7cc"
  });
  window["tc" + id].update();
}
function changeHumidity(id, label, data) {
  var struct_hum = {
    labels: label,
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(220,100,100,0.2)",
        strokeColor: "rgba(220,100,100,1)",
        pointColor: "rgba(220,100,100,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: data
      }]
  };
  var chart2 = document.getElementById("hc" +id).getContext("2d");
  window["hc" + id] = new Chart(chart2).Line(struct_hum, {
    responsive: true,
    scaleLineColor: "rgba(0,0,0,.2)",
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleFontColor: "#c5c7cc"
  });
  window["hc" + id].update();
}

function get_buildings_for_monitor() {
  var url = "/Thesis/api/building.php"
  $.post(
    url, '', function (data, status) {
      console.log(data)
      console.log(typeof data)
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      console.log(data);
      buildings = data;

      var options = '<option value="0">none</option>';
      for(var i=0; i<buildings.length; i++){
        options += '<option value=\"'+ buildings[i].ID +'\">'+ buildings[i].Name +'</option>'
      }

      var mydevices = $('.dev-sel');
      for(var i=0; i<mydevices.length; i++){
        mydevices[i].innerHTML = options;
      }
    }
  )
}
//<div class="col-lg-12">
//  <div class="panel panel-default">
//  <div class="panel-heading">
//  Line Chart
//<ul class="pull-right panel-settings panel-button-tab-right">
//  <li class="dropdown"><a class="pull-right dropdown-toggle" data-toggle="dropdown" href="#">
//  <em class="fa fa-cogs"></em>
//  </a>
//  <ul class="dropdown-menu dropdown-menu-right">
//  <li>
//  <ul class="dropdown-settings">
//  <li><a href="#">
//  <em class="fa fa-cog"></em> Settings 1
//</a></li>
//<li class="divider"></li>
//  <li><a href="#">
//  <em class="fa fa-cog"></em> Settings 2
//</a></li>
//<li class="divider"></li>
//  <li><a href="#">
//  <em class="fa fa-cog"></em> Settings 3
//</a></li>
//</ul>
//</li>
//</ul>
//</li>
//</ul>
//<span class="pull-right clickable panel-toggle panel-button-tab-left"><em class="fa fa-toggle-up"></em></span></div>
//  <div class="panel-body">
//  <div class="canvas-wrapper">
//  <canvas class="main-chart" id="line-chart" height="508" width="1526" style="width: 1526px; height: 508px;"></canvas>
//  </div>
//  </div>
//  </div>
//  </div>