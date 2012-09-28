define(
    //Dependencies
    ["underscore", "backbone", "marionette", "Views/Products/HomeView"],

    //Function
    function (_, Backbone, Marionette, ProductsHomeView) {

        var eventBuilder = function (app) {
            
            app.vent.on("products", function () {
                var homeView = new ProductsHomeView();
                app.main.show(homeView);
            });

        }

        return eventBuilder;
    }
)