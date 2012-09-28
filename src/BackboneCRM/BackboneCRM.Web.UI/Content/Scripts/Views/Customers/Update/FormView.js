define(["underscore", "backbone", "marionette", "text!template/customers/update/form.html", "App/App", "signalr", "noext!../../../signalr/hubs"],
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

                this.model.set("Name", this.ui.txtName.val());
                this.model.set("Money", this.ui.txtMoney.val());

                app.hubs.customers.updateCustomer(this.model);

                return false;
            }
        });

        return view;
    });