define(["underscore", "backbone", "Models/Customer"],
    function (underscore, Backbone, Customer) {
        "use strict";

        var Collection = Backbone.Collection.extend({
            model: Customer
        });

        var collection = new Collection();

        var customer = new Customer();
        customer.set("Money", 200);
        collection.add(customer);

        return collection;
    });