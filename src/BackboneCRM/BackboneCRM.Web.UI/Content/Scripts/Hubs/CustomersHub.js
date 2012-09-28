define(
    //Dependencies
    ["underscore", "backbone", "marionette", "app/app",
        "signalr", "noext!../../../signalr/hubs"],

    //Function
    function (_, Backbone, Marionette, app, signalR, Hubs) {

        var hub = $.connection.customers;

        hub.customerAdded = function (appId, customer) {

            if (appId !== window.id) {
                require(["Models/Customer", "Collections/CustomerCollection"], function (Customer, customerCollection) {
                    var cust = new Customer(customer);

                    customerCollection.add(cust);
                });
            }
        };

        return hub;
    });