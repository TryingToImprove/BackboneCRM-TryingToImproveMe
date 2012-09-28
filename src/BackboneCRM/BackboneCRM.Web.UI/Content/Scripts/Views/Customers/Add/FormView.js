define(["underscore", "backbone", "marionette", "text!template/customers/add/form.html", ],
    function (underscore, Backbone, Marionette, viewTemplate) {
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
                    customer.set("name", self.ui.txtName.val());
                    customer.set("money", self.ui.txtMoney.val());

                    customerCollection.add(customer);
                });

                return false;
            }
        });

        return view;
    });