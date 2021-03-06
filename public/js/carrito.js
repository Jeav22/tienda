 $(function() {
     var goToCartIcon = function($addTocartBtn) {
         var $cartIcon = $(".my-cart-icon");
         var $image = $('<img width="30px" height="30px" src="' + $addTocartBtn.data("image") + '"/>').css({ "position": "fixed", "z-index": "999" });
         $addTocartBtn.prepend($image);
         var position = $cartIcon.position();
         $image.animate({
             top: position.top,
             left: position.left
         }, 500, "linear", function() {
             $image.remove();
         });
     }

     $('.my-cart-btn').myCart({
         currencySymbol: '$',
         classCartIcon: 'my-cart-icon',
         classCartBadge: 'my-cart-badge',
         classProductQuantity: 'my-product-quantity',
         classProductRemove: 'my-product-remove',
         classCheckoutCart: 'my-cart-checkout',
         affixCartIcon: true,
         showCheckoutModal: true,
         clickOnAddToCart: function($addTocart) {
             goToCartIcon($addTocart);
         },
         afterAddOnCart: function(products, totalPrice, totalQuantity) {
             console.log("afterAddOnCart", products, totalPrice, totalQuantity);
         },
         clickOnCartIcon: function($cartIcon, products, totalPrice, totalQuantity) {
             console.log("cart icon clicked", $cartIcon, products, totalPrice, totalQuantity);
         },
         checkoutCart: function(products, totalPrice, totalQuantity) {
             var checkoutString = "Total Precio: " + totalPrice + "\nTotal Cantidad: " + totalQuantity;
             checkoutString += "\n\n id \t name \t summary \t price \t quantity \t image path";
             $.each(products, function() {
                 checkoutString += ("\n " + this.id + " \t " + this.name + " \t " + this.summary + " \t " + this.price + " \t " + this.quantity + " \t " + this.image);
             });
             alert(checkoutString)
             console.log("checking out", products, totalPrice, totalQuantity);
         },
         getDiscountPrice: function(products, totalPrice, totalQuantity) {
             console.log("calculating discount", products, totalPrice, totalQuantity);
             if (user != undefined)
                 return totalPrice * 0.9;
             else
                 return totalPrice;
         }
     });

 });