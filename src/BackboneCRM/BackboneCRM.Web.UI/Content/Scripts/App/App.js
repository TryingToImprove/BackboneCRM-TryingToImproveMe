define(
    //Dependencies
    ["underscore", "backbone", "marionette", "text!template/app/main-layout.html", "Routing/MainAppRouter", "App/Events/CustomersEvents", "App/Events/HomeEvents", "App/Events/ProductsEvents", "Views/App/MenuView", "signalr", "noext!../../../signalr/hubs"],

    //Function
    function (underscore, Backbone, Marionette, mainLayoutTemplate, MainAppRouter, CustomersEvents, HomeEvents, ProductsEvents, MenuView, signalR, Hubs) {
        "use strict";

        var app = new Backbone.Marionette.Application();

        app.template = mainLayoutTemplate;
        app.addRegions({
            main: "#main-content-container",
            menu: "#menu-container"
        });

        //Define namespace for hubs
        app.hubs = {};

        //Initializerd

        //Initializer for menu
        app.addInitializer(function () {
            this.menu.show(new MenuView());
        });
        //Initializer for routing
        app.addInitializer(function () {
            this.vent.trigger("routing:start");
        });

        //Initializer for customerHubs
        app.addInitializer(function () {
            require(["Hubs/CustomersHub", "Models/Customer"], function (CustomersHub, Customer) {
                app.hubs.customers = CustomersHub;

                $.connection.hub.start().done(function () {
                    //Run the app
                });
            });
        });


        //Events
        app.vent.on("routing:start", function () {
            app.router = new MainAppRouter(app);
            if (!Backbone.History.started) { Backbone.history.start(); }
        });

        //Setup customersEvents
        HomeEvents(app);
        CustomersEvents(app);
        ProductsEvents(app);

        return app;

    }
);