define(["underscore", "backbone", "marionette", "text!template/app/login.html", "app/app"],
    function (_, Backbone, Marionette, loginViewTemplate, app) {
        var view = Backbone.Marionette.ItemView.extend({
            template: loginViewTemplate,
            ui: {
                txtPassword: "#login-txtPassword",
                txtUsername: "#login-txtUsername"
            },
            events: {
                "submit form": "tryLogin"
            },
            tryLogin: function () {
                $.post("/api/authentication/authenticate?username=" + this.ui.txtUsername.val() + "&password=" + this.ui.txtPassword.val(), function (data) {
                    window.id = data;
                    app.vent.trigger("justLoggedOn", data);
                });
                return false;
            }
        });

        return view;
    }
);