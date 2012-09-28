define(["underscore", "backbone", "Models/Customer"],
    function (underscore, Backbone, Customer) {
        "use strict";

        var Collection = Backbone.Collection.extend({
            model: Customer,
            url: "api/customers"
        });

        var collection = new Collection();
        collection.fetch();

        return collection;
    });