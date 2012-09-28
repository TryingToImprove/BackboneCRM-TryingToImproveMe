define(["underscore", "backbone"],
    function (underscore, Backbone) {
        "use strict";

        var model = Backbone.Model.extend({
            defaults: {
                name: "Oliver",
                money: 0
            }
        });

        return model;
    });