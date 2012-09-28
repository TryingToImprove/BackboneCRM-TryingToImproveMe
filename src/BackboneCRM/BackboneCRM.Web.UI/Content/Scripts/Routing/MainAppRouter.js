
define(
    ["underscore", "backbone", "marionette", "Views/Home/HomeView"],
    function (_, Backbone, Marionette, HomeView) {

        return function (app) {

            var router = Backbone.Marionette.AppRouter.extend({
                routes: {
                    "": "home",
                    "customers": "customers",
                    "customers/add": "addCustomer",
                    "customers/update/:id": "updateCustomer",
                    "products": "products"
                },
                home: function () {
                    app.vent.trigger("home");
                },
                customers: function () {
                    app.vent.trigger("customers");
                },
                addCustomer: function () {
                    app.vent.trigger("customers:add");
                },
                updateCustomer: function (customerId) {
                    app.vent.trigger("customers:update", customerId);
                },
                products: function () {
                    app.vent.trigger("products");
                }
            })

            return new router();
        }
    }
);