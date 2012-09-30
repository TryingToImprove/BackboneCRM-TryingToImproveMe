define(
    //Dependencies
    ["underscore", "backbone", "marionette"],

    //Function
    function (_, Backbone, Marionette) {

        var eventBuilder = function (app) {

            app.vent.on("customers", function () {
                require(["Views/Customers/Home/LayoutView"], function (customersLayoutView) {
                    app.container.currentView.content.show(customersLayoutView);

                    require(["Views/Customers/Home/DescriptionView"], function (DescriptionView) {
                        customersLayoutView.description.show(new DescriptionView());
                    });

                    require(["Views/Customers/Home/ContentView", "Collections/CustomerCollection"], function (ContentView, customerCollection) {
                        customersLayoutView.content.show(new ContentView({
                            collection: customerCollection
                        }));
                    });
                })
            });

            app.vent.on("customers:add", function () {
                require(["Views/Customers/Add/FormView"], function (customersFormView) {
                    app.container.currentView.content.show(new customersFormView());
                })
            });

            app.vent.on("customers:update", function (customerId) {
                require(["Views/Customers/Update/FormView", "Collections/CustomerCollection"], function (customersFormView, customerCollection) {
                    app.container.currentView.content.show(new customersFormView({
                        model: customerCollection.get(customerId)
                    }));
                })
            });

        }

        return eventBuilder;
    }
)