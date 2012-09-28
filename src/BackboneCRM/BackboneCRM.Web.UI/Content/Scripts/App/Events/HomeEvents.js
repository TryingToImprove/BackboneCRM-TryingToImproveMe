define(
    //Dependencies
    ["underscore", "backbone", "marionette"],

    //Function
    function (_, Backbone, Marionette) {

        var eventBuilder = function (app) {

            app.vent.on("home", function () {
                require(["views/home/homeView"], function (HomeView) {
                    var homeView = new HomeView();
                    app.main.show(homeView);
                });
            });

        }

        return eventBuilder;
    }
)