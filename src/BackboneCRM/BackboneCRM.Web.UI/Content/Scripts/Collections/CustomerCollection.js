define(["underscore", "backbone", "Models/Customer"],
    function (underscore, Backbone, Customer) {
        "use strict";

        var Collection = Backbone.Collection.extend({
            model: Customer
        });

        return new Collection();
    });