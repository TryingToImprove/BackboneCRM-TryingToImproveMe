define(["underscore", "backbone", "marionette", "text!template/customers/add/form.html", "App/App", "signalr", "noext!../../../signalr/hubs"],
    function (underscore, Backbone, Marionette, viewTemplate, app, signalr, hubs) {
        "use strict";

        var view = Backbone.Marionette.ItemView.extend({
            events: {
                "submit form": "saveCustomer"
            },
            ui: {
                txtName: "#customer-txtName",
                txtMoney: "#customer-txtMoney",
                btnSubmit: "#customer-btnSubmit"
            },
            template: viewTemplate,
            saveCustomer: function (event) {

                var self = this;

                require(["Models/Customer", "Collections/CustomerCollection"], function (Customer, customerCollection) {
                    var customer = new Customer();
                    customer.set("Name", self.ui.txtName.val());
                    customer.set("Money", self.ui.txtMoney.val());

                    //We dont want it in the collection because we dont have a id for the object

                    self.ui.btnSubmit.attr("disabled", "disabled").text("Saving...");

                    customerCollection.create(customer, {
                        success: function (e) {
                            self.ui.btnSubmit.removeClass("btn-primary").addClass("btn-success").text("Customer is saved!");

                            app.hubs.customers.addCustomer(customer);
                        }
                    });
                });

                return false;
            }
        });

        return view;
    });