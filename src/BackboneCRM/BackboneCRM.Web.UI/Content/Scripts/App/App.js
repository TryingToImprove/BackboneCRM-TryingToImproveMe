define(
    //Dependencies
    ["underscore", "backbone", "marionette", "Routing/MainAppRouter", "App/Events/CustomersEvents", "App/Events/HomeEvents", "App/Events/ProductsEvents", "Views/App/MenuView", "signalr", "noext!../../../signalr/hubs"],

    //Function
    function (underscore, Backbone, Marionette, MainAppRouter, CustomersEvents, HomeEvents, ProductsEvents, MenuView, signalR, Hubs) {
        "use strict";

        var app = new Backbone.Marionette.Application();

        app.addRegions({
            main: "#main-content-container",
            menu: "#menu-container"
        });

        //Define namespace for hubs
        app.hubs = {};

        //Initializerd

        function onlineInitialize() {
            app.menu.show(new MenuView());
            app.vent.trigger("routing:start");

            require(["Hubs/CustomersHub", "Models/Customer"], function (CustomersHub, Customer) {
                app.hubs.customers = CustomersHub;

                $.connection.hub.start().done(function () {
                    //Run the app
                });
            });

            app.router = new MainAppRouter(app);
            if (!Backbone.History.started) { Backbone.history.start(); }
        }

        function offlineInitialize() {
            require(["Views/App/Login"], function (LoginView) {
                app.main.show(new LoginView());
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