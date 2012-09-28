define(["underscore", "backbone", "marionette", "text!template/customers/home/content.html", "text!template/customers/customer-row.html"],
    function (underscore, Backbone, Marionette, viewTemplate, customerRowTemplate) {
        "use strict";

        var CustomerRowView = Backbone.Marionette.ItemView.extend({
            template: customerRowTemplate,
            tagName: "tr"
        });

        var view = Backbone.Marionette.CompositeView.extend({
            template: viewTemplate,
            itemView: CustomerRowView,
            itemViewContainer: "tbody"
        });

        return view;
    });