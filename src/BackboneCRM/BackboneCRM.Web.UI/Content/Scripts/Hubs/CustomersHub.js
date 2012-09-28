define(
    //Dependencies
    ["underscore", "backbone", "marionette", "app/app",
        "signalr", "noext!../../../signalr/hubs"],

    //Function
    function (underscore, Backbone, Marionette, app, signalR, Hubs) {
        "use strict";

        var hub = $.connection.customers;

        hub.customerAdded = function (customer) {
            //if (appId !== window.id) {
            require(["Models/Customer", "Collections/CustomerCollection"], function (Customer, customerCollection) {
                customerCollection.add(new Customer(customer));
            });
            //}
        };

        hub.customerUpdated = function (customer) {
            require(["Collections/CustomerCollection"], function (customerCollection) {
                var cust = customerCollection.get(customer.Id);
                cust.set("Name", customer.Name);
                cust.set("Money", customer.Money);
            });
        }

        return hub;
    });