define(
    //Dependencies
    ["underscore", "backbone", "marionette"],

    //Function
    function (_, Backbone, Marionette, ProductsHomeView) {

        var eventBuilder = function (app) {
            
            app.vent.on("products", function () {
                require(["Views/Products/HomeView"], function (ProductsHomeView) {
                    var homeView = new ProductsHomeView();
                    app.main.show(homeView);
                });
            });

        }

        return eventBuilder;
    }
)