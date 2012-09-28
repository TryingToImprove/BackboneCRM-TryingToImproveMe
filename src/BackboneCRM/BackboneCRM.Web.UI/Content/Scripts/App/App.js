define(
    //Dependencies
    ["underscore", "backbone", "marionette", "text!template/app/main-layout.html", "Routing/MainAppRouter",
        "App/Events/CustomersEvents", "App/Events/HomeEvents", "App/Events/ProductsEvents",
        "Views/App/MenuView"],

    //Function
    function (_, Backbone, Marionette, mainLayoutTemplate, MainAppRouter, CustomersEvents, HomeEvents, ProductsEvents, MenuView) {

        var app = new Backbone.Marionette.Application();

        app.template = mainLayoutTemplate;
        app.addRegions({
            main: "#main-content-container",
            menu: "#menu-container"
        });

        //Initializerd

        //Initializer for menu
        app.addInitializer(function () {
            this.menu.show(new MenuView());

        });

        app.addInitializer(function () {
            this.vent.trigger("routing:start");
        });

        //Events
        app.vent.on("routing:start", function () {
            app.router = new MainAppRouter(app);;
            if (!Backbone.History.started) Backbone.history.start();
        });

        //Setup customersEvents
        HomeEvents(app);
        CustomersEvents(app);
        ProductsEvents(app);

        return app;

    }
);