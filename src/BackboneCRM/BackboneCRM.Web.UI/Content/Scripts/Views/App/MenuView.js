define(["underscore", "backbone", "marionette", "text!template/app/menu.html"],
    function (_, Backbone, Marionette, menuViewTemplate) {
        var menuView = Backbone.Marionette.ItemView.extend({
            events: {
                "click a": "changeLocation"
            },
            template: menuViewTemplate,
            changeLocation: function (event) {

                //var anchor = $(event.target),
                //    hash = anchor.attr("href");

                ////Remove #-sign
                //if (hash.indexOf("#") == 0) {
                //    hash = hash.replace("#", "");
                //}

                ////Lowercase the hash for conventice
                //hash = hash.toLowerCase();

                ////Trigger backbone history navigate
                //Backbone.history.navigate(hash, { trigger: true });

                //return false;
            }
        });

        return menuView;
    }
);