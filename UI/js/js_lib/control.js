/**
 * Created by SKings on 10/30/2017.
 */
function init_control(){
  setActive('#menu-cont');
  setView('#control-content');
}

function toggle_lamp(id){
  var lamp = $('#lamp'+id);
  var mval = lamp.val();
  if(mval == 1){
    lamp.val(0);
    lamp.addClass("btn-danger");
    lamp.removeClass("btn-success");
    lamp.html("OFF");
    setActuator(id, 1);
  }else{
    lamp.val(1);
    lamp.addClass("btn-success");
    lamp.removeClass("btn-danger");
    lamp.html("ON");
    setActuator(id, 0);
  }
}


function setActuator(id , value){

}