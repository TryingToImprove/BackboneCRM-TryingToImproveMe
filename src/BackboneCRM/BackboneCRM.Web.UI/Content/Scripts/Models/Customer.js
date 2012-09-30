define(["underscore", "backbone"],
    function (underscore, Backbone) {
        "use strict";

        var model = Backbone.Model.extend({
            idAttribute: "Id",
            defaults: {
                Id: null,
                Name: "Oliver",
                Money: 0
            },
            sync: function (method, model, options) {

                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader("Authorization", ("Basic " + window.id));
                }

                Backbone.sync.call(method, method, this, options);
            }

        });

        return model;
    });