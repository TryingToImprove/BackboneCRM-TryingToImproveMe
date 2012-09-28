define(["underscore", "backbone", "marionette", "text!template/customers/add/form.html", "App/App", "signalr", "noext!../../../signalr/hubs"],
    function (underscore, Backbone, Marionette, viewTemplate, app, signalr, hubs) {
        "use strict";

        var view = Backbone.Marionette.ItemView.extend({
            events: {
                "submit form": "saveCustomer"
            },
            ui: {
                txtName: "#customer-txtName",
                txtMoney: "#customer-txtMoney"
            },
            template: viewTemplate,
            saveCustomer: function (event) {
                
                var self = this;

                require(["Models/Customer", "Collections/CustomerCollection"], function (Customer, customerCollection) {
                    var customer = new Customer();
                    customer.set("Name", self.ui.txtName.val());
                    customer.set("Money", self.ui.txtMoney.val());

                    customerCollection.add(customer);
                    
                    //Trigger the event to the other clients
                    app.hubs.customers.addCustomer(window.id, customer);
                });

                return false;
            }
        });

        return view;
    });