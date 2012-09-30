/// <reference path="Vendor/Require/require-jquery.js" />
//Configure Require

require.config({
    baseUrl: "/Content/Scripts",
    paths: {
        backbone: "Vendor/Backbone/backbone.min",
        underscore: "Vendor/Backbone/underscore.min",
        marionette: "Vendor/Backbone/backbone.marionette",
        handlebars: "Vendor/Handlebars/handlebars.1.0.rc1",
        signalr: "Vendor/SignalR/jquery.signalR.0.5.3",
        template: "../Templates",
        text: "Vendor/Require/text",
        noext: "Vendor/Require/noext"
    },
    deps: ["signalr", "noext!../../../signalr/hubs"]
});

require(["underscore", "backbone", "marionette", "App/App", "handlebars", "signalr", "noext!../../../signalr/hubs"],
    function (_, Backbone, Marionette, App, Handlebars, signalr, hubs) {

        window.id = null;

        //Configure Backbone.Marionette

        //Templating
        //Does not work now. Its need a AMD version of handlebars. Search Backbone.Marionette.Handlebars
        //Reference: https://github.com/marionettejs/backbone.marionette/wiki/Using-handlebars-templates-with-marionette
        Backbone.Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
            return Handlebars.compile(rawTemplate);
        };

        Handlebars.registerHelper("indexPosition", function (array, fn) {
            var buffer = "";
            for (var i = 0, j = array.length; i < j; i++) {
                var item = array[i];

                // stick an index property onto the item, starting with 1, may make configurable later
                item.index = i + 1;

                // show the inside of the block
                buffer += fn(item);
            }

            // return the finished buffer
            return buffer;

        });


        //Templating
        //Needed for plain text in templates
        Backbone.Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
            // Marionette expects "templateId" to be the ID of a DOM element.
            // But with RequireJS, templateId is actually the full text of the template.
            var template = templateId;

            // Make sure we have a template before trying to compile it
            if (!template || template.length === 0) {
                var msg = "Could not find template: '" + templateId + "'";
                var err = new Error(msg);
                err.name = "NoTemplateError";
                throw err;
            }

            return template;
        }

        $(function () {
            App.start();
        });
    });