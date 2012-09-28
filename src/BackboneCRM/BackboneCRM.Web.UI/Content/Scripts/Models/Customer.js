define(["underscore", "backbone"],
    function (underscore, Backbone) {
        "use strict";

        var model = Backbone.Model.extend({
            idAttribute: "Id",
            defaults: {
                Id: null,
                Name: "Oliver",
                Money: 0
            }
        });

        return model;
    });