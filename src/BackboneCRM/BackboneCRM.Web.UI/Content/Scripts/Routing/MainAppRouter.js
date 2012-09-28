
define(
    ["underscore", "backbone", "marionette", "Views/Home/HomeView"],
    function (_, Backbone, Marionette, HomeView) {

        return function (app) {

            var router = Backbone.Marionette.AppRouter.extend({
                routes: {
                    "": "home",
                    "customers": "customers",
                    "customers/add": "addCustomer",
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
                products: function () {
                    app.vent.trigger("products");
                }
            })

            return new router();
        }
    }
);