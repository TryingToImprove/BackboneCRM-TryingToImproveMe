define(
    //Dependencies
    ["underscore", "backbone", "marionette", "views/home/homeView"],

    //Function
    function (_, Backbone, Marionette, HomeView) {

        var eventBuilder = function (app) {
            
            app.vent.on("home", function () {
                var homeView = new HomeView();
                app.main.show(homeView);
            });

        }

        return eventBuilder;
    }
)