/**
 * Created by SKings on 10/30/2017.
 */
var buildings;
function init_buildings(){
  get_buildings();
}
function get_buildings() {
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

      $('#building-table').html('');

      for(var k in buildings){
        console.log(buildings[k]['Name'])
        $('#building-table').append('<p style="font-size: 25px; color: #0f0f0f; display: inline-block; margin-right: 20px;">'+buildings[k]['Name']+'</p>'+
        '<span><button onclick=\'del_buildings('+buildings[k]['ID']+')\' type="button" class="btn btn-sm btn-danger">Delete</button></span><br/>')
      }
    }
  )
}

function add_buildings() {
  var url = "/Thesis/api/add_building.php"
  var param = {Name:$('#new-building-input').val()};
  console.log(name);

  $.post(
    url, param, function (data, status) {
      console.log(data);
      get_buildings();
      $('#new-building-input').val('');
    }
  )
}

function del_buildings(index) {
  console.log(index)
  var url = "/Thesis/api/del_building.php"
  var param = {ID: index}
  $.post(
    url, param, function (data, status) {
      console.log(data)
      get_buildings()
    }
  )
}
