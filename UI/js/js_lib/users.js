/**
 * Created by SKings on 10/30/2017.
 */
function init_users(){
  get_users();
  setActive('#menu-user');
  setView('#user-content');
}

function get_users(){
  var url = "/Thesis/api/users.php"
  $.post(
    url, '', function (data, status) {
      console.log(data)
      console.log(typeof data)
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      console.log(data);
      users = data;

      $('#users-list').html('');

      for(var k in users){
        var myUser = users[k]
        console.log(users[k])

        var userCard = '<div class="col-md-4">';
        userCard += '<div class="panel panel-primary">';
        userCard += '<div class="panel-heading">';
        userCard += '<img class="img-responsive" style="width: 50px; border-radius: 50%; 50%; display: inline-block; margin-right: 20px" src="'+myUser['image']+'"/>';
        userCard += myUser['name'] +'</div>';
        userCard += '<div class="panel-body">';

        userCard += '<span style="font-size: 20px;">Email: </span>';
        userCard += '<span style="font-size: 15px;">' + myUser['email'] + '</span>';

        userCard += '<div class="form-group">';
        userCard += '<label>Role</label>';
        userCard += '<select id=\"select_role_'+myUser['id']+'\" onchange=\"change_role('+myUser['id'] + ')\" class="form-control" style="margin-bottom: 5px; margin-up: 5px;">';

        if(myUser['access'] == 0){
          userCard+= '<option value="0">Admin</option>';
          userCard+= '<option value="1">Normal</option>';
        }else{
          userCard+= '<option value="1">Normal</option>';
          userCard+= '<option value="0">Admin</option>';
        }
        userCard += '</select>';

        userCard += '<button onclick=\"delete_user(' + myUser['id'] + ')\" type="button" class="btn btn-md btn-danger">Delete</button>';
        userCard += '</div>';
        userCard += '</div>';
        userCard +='</div>';
        userCard +='</div>';

        $('#users-list').append(userCard)
      }
    }
  )
}

function change_role(index){
  var access = $("#select_role_"+index).val();
  console.log(index);
  console.log(access);

  var url = "/Thesis/api/change_access.php"
  var param = {ID: index, Access: access};
  $.post(
    url, param, function (data, status) {
      console.log(data)
    }
  )

}

function delete_user(index){
  console.log(index);

  var url = "/Thesis/api/del_user.php";
  var param = {ID: index};
  $.post(
    url, param, function (data, status) {
      console.log(data);
      get_users();
    }
  )
}

function add_user(){
  var url = "/Thesis/api/add_user.php";
  var param = {Name: '', Pass: '', Email: '', Image: '', Access: 1};
  param.Name = $('#add-user-name').val();
  param.Pass = $('#add-user-password').val();
  param.Email = $('#add-user-email').val();
  param.Image = $('#add-user-image').val();
  param.Access = $('#add-user-role').val();


  $.post(
    url, param, function (data, status) {
      console.log(data);
      get_users();
      $('#add-user-name').val('');
      $('#add-user-password').val('');
      $('#add-user-email').val('');
      $('#add-user-image').val('');
      $('#add-user-role').val('');
    }
  )
}