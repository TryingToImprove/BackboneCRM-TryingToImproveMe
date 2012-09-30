define(["underscore", "backbone", "marionette", "text!template/customers/update/form.html", "App/App", "signalr", "noext!../../../signalr/hubs", "Vendor/AjaxFileUpload/Ajaxfileupload"],
    function (underscore, Backbone, Marionette, viewTemplate, app, signalr, hubs, ajaxfileupload) {
        "use strict";

        var view = Backbone.Marionette.ItemView.extend({
            events: {
                "submit form": "saveCustomer"
            },
            ui: {
                txtName: "#customer-txtName",
                txtMoney: "#customer-txtMoney",
                uplImage: "#customer-image"
            },
            template: viewTemplate,
            saveCustomer: function (event) {

                function updateCustomerAndSave() {
                    self.model.set("Name", self.ui.txtName.val());
                    self.model.set("Money", self.ui.txtMoney.val());

                    //Notity users
                    app.hubs.customers.updateCustomer(self.model);
                }

                var self = this,
                    saveNewImage = (self.ui.uplImage.val() !== "");

                //If the user have choosing a new image
                if (saveNewImage) {
                    //then upload it
                    $.ajaxFileUpload({
                        url: '/customers/upload',
                        fileElementId: 'customerImage', //name of input[type='file']
                        dataType: 'json',
                        success: function (data, status) {
                            //Set the filename
                            self.model.set("ImageUrl", data);

                            updateCustomerAndSave();
                        },
                        error: function (data, status, e) {
                            console.log(data, status, e);
                        }
                    });
                } else {
                    //If not file, then just save the textbox values
                    updateCustomerAndSave();
                }

                return false;
            }
        });

        return view;
    });