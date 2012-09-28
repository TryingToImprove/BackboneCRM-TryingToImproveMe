define(["underscore", "backbone", "marionette", "text!template/products/home.html"],
    function (_, Backbone, Marionette, homeViewTemplate) {

        var homeView = Backbone.Marionette.ItemView.extend({
            template: homeViewTemplate
        });

        return homeView;
    }
);