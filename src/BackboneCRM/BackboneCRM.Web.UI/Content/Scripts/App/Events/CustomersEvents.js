define(
    //Dependencies
    ["underscore", "backbone", "marionette"],

    //Function
    function (_, Backbone, Marionette) {

        var eventBuilder = function (app) {

            app.vent.on("customers", function () {
                require(["Views/Customers/Home/LayoutView"], function (customersLayoutView) {
                    app.main.show(customersLayoutView);

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
                    app.main.show(new customersFormView());
                })
            });

        }

        return eventBuilder;
    }
)