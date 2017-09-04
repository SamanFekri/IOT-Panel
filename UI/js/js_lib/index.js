/**
 * Created by SKings on 9/4/2017.
 */
function get_user_info(userData) {
    var url = "/Thesis/api/get_user_info.php"
    $.post(
        url, userData, function (data, status) {
            console.log(data)
            console.log(typeof data)
            if (typeof data == "string") {
                data = JSON.parse(data)
            }
        }
    )
}
