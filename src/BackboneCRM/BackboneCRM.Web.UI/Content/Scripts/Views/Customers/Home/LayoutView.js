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

        //Render the layout
        layout.render();

        require(["Views/Customers/Home/DescriptionView"], function (DescriptionView) {
            layout.description.show(new DescriptionView());
        });

        require(["Views/Customers/Home/ContentView", "Collections/CustomerCollection", "Models/Customer"], function (ContentView, customerCollection, Customer) {

            var contentView = new ContentView({
                collection: customerCollection
            });

            layout.content.show(contentView);
        });

        return layout;
    });