define("App", ["underscore", "backbone", "marionette"], function (_, Backbone, Marionette) {

    var app = new Backbone.Marionette.Application();

    app.addInitializer(function () {

        alert("Hello");

    });

    return app;

});