define(
    //Dependencies
    ["underscore", "backbone", "marionette"],

    //Function
    function (_, Backbone, Marionette, ProductsHomeView) {

        var eventBuilder = function (app) {
            
            app.vent.on("products", function () {
                require(["Views/Products/HomeView"], function (ProductsHomeView) {
                    var homeView = new ProductsHomeView();
                    app.container.currentView.content.show(homeView);
                });
            });

        }

        return eventBuilder;
    }
)