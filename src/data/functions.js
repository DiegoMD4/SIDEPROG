import $ from 'jquery';


function fnc_getSIDEPROG(callback, anio) {
    var parametros =
    {
        "actividad": "get_expedientesPorEtapa",
        "anio":anio
    };
    $.ajax
        ({
            data: parametros,
            url: 'http://localhost:7609/negocio/php/tree_sideprog.php',
            type: 'post',
            async: false,
            dataType: 'json',
            beforeSend: function () { },
            success: function (response) {
                callback(response);
                //response.forEach((element) => console.log(element))
            },
            error: function (xhr) { // if error occured
                alert("Error occured.please try again");
                alert(xhr.statusText + xhr.responseText);
                console.log(xhr.statusText + " " + xhr.responseText);
                callback(-1);
            }
        });

}
