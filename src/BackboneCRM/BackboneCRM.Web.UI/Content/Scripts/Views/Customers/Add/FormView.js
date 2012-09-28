define(["underscore", "backbone", "marionette", "text!template/customers/add/form.html", "App/App", "signalr", "noext!../../../signalr/hubs", "Vendor/AjaxFileUpload/Ajaxfileupload"],
    function (underscore, Backbone, Marionette, viewTemplate, app, signalr, hubs, ajaxfileupload) {
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
            savingError: function () {
                this.ui.btnSubmit.attr("disabled", "disabled")
                    .removeClass("btn-primary")
                    .addClass("btn-danger")
                    .text("A error happen doing creation...");
            },
            saveCustomer: function (event) {

                var self = this;

                require(["Models/Customer", "Collections/CustomerCollection"], function (Customer, customerCollection) {

                    self.ui.btnSubmit.attr("disabled", "disabled")
                        .text("Saving...");

                    $.ajaxFileUpload({
                        url: '/customers/upload',
                        fileElementId: 'customerImage', //name of input[type='file']
                        dataType: 'json',
                        success: function (data, status) {
                            var customer = new Customer();
                            customer.set("Name", self.ui.txtName.val());
                            customer.set("Money", self.ui.txtMoney.val());
                            customer.set("ImageUrl", data);

                            customerCollection.create(customer, {
                                success: function (e) {
                                    self.ui.btnSubmit.removeClass("btn-primary")
                                        .addClass("btn-success")
                                        .text("Customer is saved!");

                                    app.hubs.customers.addCustomer(customer);
                                },
                                error: function (data, status, e) {
                                    self.savingError();
                                }
                            });
                        },
                        error: function (data, status, e) {
                            self.savingError();
                            console.log(data, status, e);
                        }
                    });


                });

                return false;
            }
        });

        return view;
    });