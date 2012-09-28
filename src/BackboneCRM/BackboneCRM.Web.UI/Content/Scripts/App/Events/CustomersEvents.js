define(
    //Dependencies
    ["underscore", "backbone", "marionette", "Views/Customers/HomeView"],

    //Function
    function (_, Backbone, Marionette, CustomerHomeView) {

        var eventBuilder = function (app) {
            
            app.vent.on("customers", function () {
                var homeView = new CustomerHomeView();
                app.main.show(homeView);
            });

        }

        return eventBuilder;
    }
)