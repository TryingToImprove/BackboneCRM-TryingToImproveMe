define(
    //Dependencies
    ["underscore", "backbone", "marionette"],

    //Function
    function (_, Backbone, Marionette) {

        var eventBuilder = function (app) {

            app.vent.on("customers", function () {
                require(["Views/Customers/Home/LayoutView"], function (customersLayoutView) {
                    app.main.show(customersLayoutView);
                })
            });
        }

        return eventBuilder;
    }
)