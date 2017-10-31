/**
 * Created by SKings on 10/30/2017.
 */

function init_dashboard() {
  setActive("#menu-dash");
  setView('#dashboard-content');

  var temp = {labels:[], data:[], count:0};
  var hum = {labels:[], data:[], count:0};


  var client = new i1820.I1820Client('http://iot.ceit.aut.ac.ir:58902', true);
  client.discovery().then(function (agents) {

    console.log({agents: agents});
    for (var i = 0; i < agents.length; i++) {
      var agent = agents[i];
      agent.getThingsByType('multisensor')[0].on('log',
        function (result) {
          console.log(result);
          temp.count += 1;
          temp.labels.push(temp.count);
          temp.data.push(result['humidity']);
          changeTemp(temp.labels,temp.data);

          hum.count += 1;
          hum.labels.push(hum.count);
          hum.data.push(result['temperature']);
          changeHumidity(hum.labels, hum.data);

        })
    }

  });
}


function changeTemp(label, data) {
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
  var chart1 = document.getElementById("dashboard-temp-chart").getContext("2d");
  window.tempChart = new Chart(chart1).Line(struct_temp, {
    responsive: true,
    scaleLineColor: "rgba(0,0,0,.2)",
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleFontColor: "#c5c7cc"
  });
  window.tempChart.update();
}

function changeHumidity(label, data) {
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
  var chart2 = document.getElementById("dashboard-humi-chart").getContext("2d");
  window.humiChart = new Chart(chart2).Line(struct_hum, {
    responsive: true,
    scaleLineColor: "rgba(0,0,0,.2)",
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleFontColor: "#c5c7cc"
  });
  window.humiChart.update();
}