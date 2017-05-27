//--Cargar Json-----------------------------------------------------
var productos;
var categorias;
var json;
var user = document.getElementById("usuario");
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '../dataParcial.json',
        dataType: 'json',
        async: false,
        success: function(source) {
            data = source;
            json = data;
            productos = data.products;
            categorias = data.categories;
            sesionDropdown();
            CargarCategorias();
            mostrar(productos);
            modificar(productos);
        }
    });
});


//---Mostrar Contenido----------------------------------------------
function mostrar(p) {
    var org = "";
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
        '</div>' +
        '<script src="../js/carrito.js"></script>';
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
    mostrar(productos);
}

$(".ord").click(ordenarNombre);

//----Ordenar por Mayor precio---------------------------------------------
function ordenarMaPrecio() {
    $(".tienda").empty();
    productos.sort(sort_by('price', true, parseInt));
    mostrar(productos);
}
$(".map").click(ordenarMaPrecio);

//----Ordenar por Mayor precio---------------------------------------------
function ordenarMePrecio() {
    $(".tienda").empty();
    productos.sort(sort_by('price', false, parseInt));
    mostrar(productos);
}
$(".mep").click(ordenarMePrecio);

//-----Busqueda------------------------------------------------------------
function buscar() {
    var p1 = null;
    var text = document.getElementById("texto").value;
    var p1 = productos.splice();
    var aux = 0;
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].name.toUpperCase().includes(text.toUpperCase())) {
            p1[aux++] = productos[i];
        }
    }
    p1.splice(aux, p1.length - aux);
    console.log(p1.length);
    mostrar(p1);
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
//------------------------ Funcion dropdown sesion -------------------------
function sesionDropdown() {
    var org = "";
    if (user != null) {
        document.getElementById("inicio").href = "/bienvenido"
        org = "<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" + user.innerText + " <span class='caret'></span></a>" +
            "<ul class='dropdown-menu'>" +
            "<li><a href='cerrarSesion'>Cerrar Sesión</a></li>" +
            "</ul>";
    } else {
        org = "<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>Sesion <span class='caret'></span></a>" +
            "<ul class='dropdown-menu'>" +
            "<li><a href='signup'>Registrarse</a></li>" +
            "<li><a href='login'>Iniciar Sesion</a></li>" +
            "</ul>";
    }
    $(".sesion").html(org);
}

//----------Modificar producto---------------------------------------------------

function modificar(pr) {

    var linea = '';

    linea += '<div class="container">' +
        '<div class="row">' +
        '<div class="col-sm-3">' +
        '<a href="#" class="nav-tabs-dropdown btn btn-block btn-primary">Productos</a>' +
        '<ul id="nav-tabs-wrapper" class="nav nav-tabs nav-pills nav-stacked well">';
    for (var i = 0; i < pr.length; i++) {
        linea += '<li><a href="#vtab' + (i + 1) + '" data-toggle="tab">' + pr[i].name + '</a></li>';
    }
    linea += '</ul>' +
        '<h1></h1>' +
        '<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap"><span class="glyphicon glyphicon-plus"></span> Agregar Producto</button>' +
        '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h4 class="modal-title" id="exampleModalLabel">Nuevo Producto</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<form method="POST" action="/users/crearProducto">' +
        '<div class="form-group">' +
        '<label for="recipient-name" class="control-label">Nombre:</label>' +
        '<input type="text" class="form-control" id="recipient-name">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="message-text" class="control-label">Descripción:</label>' +
        '<textarea type="text" class="form-control" id="message-text"></textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="message-text" class="control-label">Precio:</label>' +
        '<div class="input-group">' +
        '<span class="input-group-addon">$</span>' +
        '<input type="number" class="form-control" aria-label="Amount (to the nearest dollar)">' +
        '</div>' +
        '</div>' +
        '<label for="message-text" class="control-label">Categorias:</label>' +
        '<br>';
    c = null;
    c = categorias;
    for (var i = 0; i < c.length; i++) {
        linea += '<div class="checkbox-inline">' +
            '<label>' +
            '<input type="checkbox" value="">' +
            c[i].categori_id + ': ' + c[i].name +
            '</label>' +
            '</div>';
    }
    linea += '</ul>' +
        '<br>' +
        '<div class="form-group">' +
        '<label for="pwd">Cantidad:</label>' +
        '<input type="number" class="form-control" id="pwd">' +
        '</div>' +
        '<div class="form-group">' +
        '<input class = "filestyle" name="uploadedfile" type="file" />' +
        '</div>' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>' +
        '<button type="submit" class="btn btn-primary">Agregar Producto</button>' +
        '</form>' +
        '</div>' +
        '<div class="modal-footer">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<h1></h1>' +

        '<button type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-plus"></span> Agregar Categoria</button>'+
        '<div class="modal fade" id="myModal" role="dialog">'+
        '<div class="modal-dialog">'+
        '<div class="modal-content">'+
        '<div class="modal-header">'+
        '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
        '<h4 class="modal-title">Modal Header</h4>'+
        '</div>'+
        '<div class="modal-body">'+
        '<label for="message-text" class="control-label">Categorias existentes :</label>'+
        '<br>';
        for (var i = 0; i < c.length; i++) {
        linea += '<label>' +
            c[i].categori_id + ': ' + c[i].name +
            '</label>'+
            '<br>';
    }
    linea += '<form action="/action_page.php">'+
        '<div class="form-group">'+
        '<h3></h3>'+
        '<label for="email">ID:</label>'+
        '<input type="text" class="form-control" id="di_categoria" placeholder="Ingrese el ID de la categoria" name="email">'+
        '</div>'+
        '<div class="form-group">'+
        '<label for="pwd">Nombre:</label>'+
        '<input type="text" class="form-control" id="pwd" placeholder="Ingrese el nombre de la categoria" name="pwd">'+
        '</div>'+
        '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>' +
        '<button type="submit" class="btn btn-primary">Agregar Categoria</button>' +
        '</form>'+
        '</div>'+
        '<div class="modal-footer">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>' +
        '<h1></h1>' +
        '<div class="col-sm-9">' +
        '<div class="tab-content">';
    for (var i = 0; i < pr.length; i++) {
        linea += '<div role="tabpanel" class="tab-pane " id="vtab' + (i + 1) + '">' +
            '<img src=' + pr[i].img + '/>' +
            '<h1>' + pr[i].name + '</h1>' +
            '<h3>' + pr[i].description + '</h3>' +
            '<h3> Precio: $' + pr[i].price + '</h3>';
        var disponible = "";
        if (pr[i].available == true) {
            disponible = "Si";
        } else {
            disponible = "No";
        }
        var mejorVendido = "";
        if (pr[i].best_seller == true) {
            mejorVendido = "Si";
        } else {
            mejorVendido = "No";
        }
        linea += '<h4>Disponibilidad: ' + disponible + '</h4>' +
            '<h4>Mejor vendido: ' + mejorVendido + '</h4>' +
            '<h4>Categorias: ' + pr[i].categories + '</h4>' +
            '<a href="#" class="btn btn-info btn-lg btn-danger">' +
            '<span class="glyphicon glyphicon-trash"></span> Eliminar Producto' +
            '</a>' +
            '</div>';
    }
    linea += '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    $(".modificar").html(linea);
}