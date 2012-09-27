/// <reference path="Vendor/Require/require-jquery.js" />
//Configure Require

require.config({
    baseUrl: "/Content/Scripts",
    paths: {
        backbone: "Vendor/Backbone/backbone.min",
        underscore: "Vendor/Backbone/underscore.min",
        marionette: "Vendor/Backbone/backbone.marionette"
    }
});

require(["underscore", "backbone", "marionette", "App"], function (_, Backbone, Marionette, App) {

    App.start();

});