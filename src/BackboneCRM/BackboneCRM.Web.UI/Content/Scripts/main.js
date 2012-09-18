/// <reference path="Vendor/Require/require-jquery.js" />
//Configure Require

require.config({
    baseUrl: "/Content/Scripts",
    paths: {
        backbone: "Vendor/Backbone/backbone.min",
        underscore: "Vendor/Backbone/underscore.min"
    }
});

require(["underscore", "backbone"], function (_, Backbone) {

    alert("Got it?" + $("body").html());

});