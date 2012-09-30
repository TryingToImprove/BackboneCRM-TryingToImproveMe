define(
    //Dependencies
    ["underscore", "backbone", "marionette", "Routing/MainAppRouter", "App/Events/CustomersEvents", "App/Events/HomeEvents", "App/Events/ProductsEvents", "Views/App/MenuView", "signalr", "noext!../../../signalr/hubs"],

    //Function
    function (underscore, Backbone, Marionette, MainAppRouter, CustomersEvents, HomeEvents, ProductsEvents, MenuView, signalR, Hubs) {
        "use strict";

        var app = new Backbone.Marionette.Application();

        app.addRegions({
            container: "#container"
        });

        //Define namespace for hubs
        app.hubs = {};

        //Initializerd

        function onlineInitialize() {



            require(["Hubs/CustomersHub", "Models/Customer"], function (CustomersHub, Customer) {
                app.hubs.customers = CustomersHub;

                $.connection.hub.start().done(function () {
                    //Run the app
                });
            });

            require(["Views/App/LayoutView"], function (layoutView) {

                app.container.show(layoutView);

                layoutView.menu.show(new MenuView());

                app.router = new MainAppRouter(app);
                if (!Backbone.History.started) { Backbone.history.start(); }
            });
        }

        function offlineInitialize() {
            require(["Views/App/Login"], function (LoginView) {
                app.container.show(new LoginView());
            });
        }

        app.vent.on("justLoggedOn", function () {
            onlineInitialize();
        });

        app.addInitializer(function () {
            if (!!!window.id) {
                offlineInitialize();
            } else {
                onlineInitialize();
            }
        });

        //Setup customersEvents
        HomeEvents(app);
        CustomersEvents(app);
        ProductsEvents(app);

        return app;

    }
);