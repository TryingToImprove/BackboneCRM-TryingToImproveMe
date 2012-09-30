define(["underscore", "backbone", "Models/Customer"],
    function (underscore, Backbone, Customer) {
        "use strict";

        var Collection = Backbone.Collection.extend({
            model: Customer,
            url: "api/customers",
            sync: function (method, model, options) {

                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader("Authorization", ("Basic " + window.id));
                }

                Backbone.sync.call(method, method, this, options);
            }
        });

        var collection = new Collection();
        collection.fetch();

        return collection;
    });