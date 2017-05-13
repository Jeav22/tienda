//--Cargar Json-----------------------------------------------------
var productos;
var categorias;
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'dataParcial.json',
        dataType: 'json',
        async: false,
        success: function(source) {
            data = source;
            productos = data.products;
            categorias = data.categories;
            CargarCategorias();
            mostrar();
        }
    });
});


//---Mostrar Contenido----------------------------------------------
function mostrar() {
    var p = null;
    var org = "";
    p = productos;
    org += '<div class="row">' +
        '<div class="col-md-12">';
    for (var i = 0; i < p.length; i++) {
        org += '<div class="col-sm-6 col-md-4 ';
        if (p[i].price < 30.000) {
            org += " mtr ";
        }
        if (10.000 > p[i].price) {} else {
            org += " med ";
        }
        for (var j = 0; j < p[i].categories.length; j++) {
            org += "c" + p[i].categories[j] + " ";
        }
        org += ' bs' + p[i].best_seller + ' p' + p[i].available + ' ">' +
            '<div class="thumbnail" >' +
            '<h4 class="text-center"><span class="label label-info">' + p[i].categories + '</span></h4>' +
            '<img src="' + p[i].img + '" class="img-responsive">' +
            '<div class="caption">' +
            '<div class="row">' +
            '<div class="col-md-6 col-xs-6">' +
            '<h3>' + p[i].name + '</h3>' +
            '</div>' +
            '<div class="col-md-6 col-xs-6 price">' +
            '<h3><label>$' + p[i].price + '</label></h3>' +
            '</div>' +
            '</div>' +
            '<p>' + p[i].description + '</p>' +
            '<div class="row">' +
            '<div class="col-md-6">' +
            '</div>' +
            '<div class="col-md-6">' +
            '<a href="#" class="btn btn-success btn-product my-cart-btn" data-id="' + p[i].id + '" data-name="' + p[i].name + '" data-summary="summary 1" data-price="' + p[i].price + '" data-quantity="1" data-image="' + p[i].img + '" ><span class="glyphicon glyphicon-shopping-cart"></span> Buy</a></div>' +
            '</div>' +
            '<p> </p>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    org += '</div>' +
        '</div>';
    $(".tienda").html(org);
}

//-----Cargar Categorias---------------------------------------------------

function CargarCategorias() {
    var c = null;
    var cate = "";
    c = categorias;
    for (var i = 0; i < c.length; i++) {
        cate += "<li><a href='#' class=" + c[i].categori_id + ">" + c[i].name + "</a></li>";
    }
    $(".cat").html(cate);
}

//-----Sort----------------------------------------------------------------

var sort_by = function(field, reverse, primer) {
    var key = primer ?
        function(x) { return primer(x[field]) } :
        function(x) { return x[field] };

    reverse = !reverse ? 1 : -1;

    return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}


//-----Ordenar por nombre--------------------------------------------------
function ordenarNombre() {
    $(".tienda").empty();
    productos.sort(sort_by('name', false, function(a) { return a.toUpperCase() }));
    mostrar();
}

$(".ord").click(ordenarNombre);

//----Ordenar por Mayor precio---------------------------------------------
function ordenarMaPrecio() {
    $(".tienda").empty();
    productos.sort(sort_by('price', true, parseInt));
    mostrar();
}
$(".map").click(ordenarMaPrecio);

//----Ordenar por Mayor precio---------------------------------------------
function ordenarMePrecio() {
    $(".tienda").empty();
    productos.sort(sort_by('price', false, parseInt));
    mostrar();
}
$(".mep").click(ordenarMePrecio);

//-----Busqueda------------------------------------------------------------
function buscar() {
    var p1 = null;
    $(".tienda").empty();
    var text = document.getElementById("texto").value;
    var p1 = productos;
    var aux = 0;
    for (var i = 0; i < p1.length; i++) {
        if (p1[i].name.toUpperCase().includes(text.toUpperCase())) {
            p1[aux++] = p1[i];
        }
    }
    p1.splice(aux, p1.length - aux);
    mostrar();
}

$(".busc").click(buscar);

//--------Best Seller--------------------------------------------------
function masVendido() {
    $(".bsfalse").toggle();
}

$(".mv").click(masVendido);

//----------Agotados---------------------------------------------------
function prodctoAgotado() {
    $(".med").show();
    $(".mtr").show();
    $(".pfalse").show();
    $(".ptrue").hide();
}

$(".pa").click(prodctoAgotado);


//----------Disponibles---------------------------------------------------
function prodctoDisponible() {
    $(".med").show();
    $(".mtr").show();
    $(".ptrue").show();
    $(".pfalse").hide();
    console.log("disponibles");
}

$(".pd").click(prodctoDisponible);

//----------Mayor a 30.000---------------------------------------------------
function mayorT() {
    $(".med").show();
    $(".ptrue").show();
    $(".pfalse").show();
    $(".mtr").hide();
}

$(".mt").click(mayorT);

//----------Menor a 10.000---------------------------------------------------
function menorD() {
    $(".mtr").show();
    $(".ptrue").show();
    $(".pfalse").show();
    $(".med").hide();
}

$(".mad").click(menorD);