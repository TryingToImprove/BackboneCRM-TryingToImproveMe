define(["underscore", "backbone", "marionette", "text!template/app/online-layout.html"],
    function (underscore, Backbone, Marionette, layoutTemplate, HomeView) {
        "use strict";

        var Layout = Backbone.Marionette.Layout.extend({
            template: layoutTemplate,
            regions: {
                menu: "#menu-container",
                content: "#main-content-container"
            }
        }), layout = new Layout();


        return layout;
    });