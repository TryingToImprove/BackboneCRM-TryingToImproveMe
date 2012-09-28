define(["underscore", "backbone"],
    function (underscore, Backbone) {
        "use strict";

        var model = Backbone.Model.extend({
            defaults: {
                Name: "Oliver",
                Money: 0
            }
        });

        return model;
    });