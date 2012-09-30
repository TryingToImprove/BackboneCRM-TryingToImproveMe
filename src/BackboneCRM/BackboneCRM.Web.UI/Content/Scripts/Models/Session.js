define(["underscore", "backbone"],
    function (underscore, Backbone) {
        "use strict";

        var model = Backbone.Model.extend({
            idAttribute: "Id",
            defaults: {
                Id: null,
                AccessToken: null
            },
            initialize: function(){

            },
            isAuthenticated: function () {
                return (this.get("AccessToken") !== null) ? true : false;
            }
        });

        return model;
    });