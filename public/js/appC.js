//--Cargar Json-----------------------------------------------------
var categorias;
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'dataParcial.json',
        dataType: 'json',
        async: true,
        success: function(source) {

            $(".1").click(bebdidas);
            $(".2").click(lunch);
            $(".3").click(food);
            $(".4").click(sea);
        }
    });
});


//-----Filtrar por Drinks---------------------------------------------
function bebdidas() {
    $(".c2").hide();
    $(".c3").hide();
    $(".c4").hide();
    $(".c1").show();
    console.log("Bebidassssssss");
}

//-----Filtrar por Lunch-----------------------------------------------
function lunch() {
    $(".c1").hide();
    $(".c3").hide();
    $(".c4").hide();
    $(".c2").show();
    console.log("luunch");
}

//-----Filtrar por Food------------------------------------------------
function food() {
    $(".c1").hide();
    $(".c2").hide();
    $(".c4").hide();
    $(".c3").show();
    console.log("Fooodddd");
}

//-----Filtrar por Sea-------------------------------------------------
function sea() {
    $(".c1").hide();
    $(".c2").hide();
    $(".c3").hide();
    $(".c4").show();
    console.log("Seeeeaaaaaa");
}