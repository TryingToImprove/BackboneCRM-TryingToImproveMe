define(["underscore", "backbone", "marionette", "text!template/customers/home/layout.html"],
    function (underscore, Backbone, Marionette, homeLayoutTemplate, HomeView) {
        "use strict";


        var Layout = Backbone.Marionette.Layout.extend({
            template: homeLayoutTemplate,
            regions: {
                description: "#customers-description",
                content: "#customers-content"
            }
        }), layout = new Layout();
     

        return layout;
    });