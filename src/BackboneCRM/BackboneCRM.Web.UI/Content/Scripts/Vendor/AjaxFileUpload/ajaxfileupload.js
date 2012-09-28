(function (jQuery, document, window) {
    "use strict";
    jQuery.extend({
        createUploadIframe: function (id, uri) {
            //create frame
            var frameId = 'jUploadFrame' + id,
                iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';

            if (window.ActiveXObject) {
                if (typeof uri === 'boolean') {
                    iframeHtml += ' src="' + 'javascript:false' + '"';
                } else if (typeof uri === 'string') {
                    iframeHtml += ' src="' + uri + '"';
                }
            }

            iframeHtml += ' />';

            jQuery(iframeHtml).appendTo(document.body);

            return jQuery('#' + frameId).get(0);
        },
        createUploadForm: function (id, fileElementId, data) {
            //create form	
            var formId = 'jUploadForm' + id,
                fileId = 'jUploadFile' + id,
                form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>'),
                oldElement = jQuery('input[name="' + fileElementId + '"]'),
                newElement = jQuery(oldElement).clone(),
                i;

            if (data) {
                for (i in data) {
                    jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
                }
            }

            jQuery(oldElement).attr('id', fileId)
                .before(newElement)
                .appendTo(form);

            //set attributes
            jQuery(form).css({
                'position': 'absolute',
                'top': '-1200px',
                'left': '-1200px'
            }).appendTo('body');

            return form;
        },

        ajaxFileUpload: function (s) {
            s = jQuery.extend({}, jQuery.ajaxSettings, s);

            var id = new Date().getTime(),
                form = jQuery.createUploadForm(id, s.fileElementId, (s.data === undefined ? false : s.data)),
                io = jQuery.createUploadIframe(id, s.secureuri),
                frameId = 'jUploadFrame' + id,
                formId = 'jUploadForm' + id,
                requestDone = false,
                xml = {},
                uploadCallback;

            // Watch for a new set of requests
            if (s.global && !(jQuery.active + 1)) {
                jQuery.event.trigger("ajaxStart");
            }

            if (s.global) { jQuery.event.trigger("ajaxSend", [xml, s]); }

            // Wait for a response to come back
            uploadCallback = function (isTimeout) {
                var io = document.getElementById(frameId),
                    status,
                    data;

                try {
                    if (io.contentWindow) {
                        xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerText : null;
                        xml.responseXML = io.contentWindow.document.XMLDocument || io.contentWindow.document;
                    } else if (io.contentDocument) {
                        xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerText : null;
                        xml.responseXML = io.contentDocument.document.XMLDocument || io.contentDocument.document;
                    }
                } catch (e) {
                    throw e;
                }

                if (xml || isTimeout === "timeout") {
                    requestDone = true;

                    status = isTimeout !== "timeout" ? "success" : "error";

                    // Make sure that the request was successful or notmodified
                    if (status !== "error") {
                        // process the data (runs the xml through httpData regardless of callback)
                        data = jQuery.uploadHttpData(xml, s.dataType);

                        // If a local callback was specified, fire it and pass it the data
                        if (s.success) { s.success(data, status); }

                        // Fire the global callback
                        if (s.global) { jQuery.event.trigger("ajaxSuccess", [xml, s]); }
                    } else {
                        jQuery.handleError(s, xml, status);
                    }


                    // The request was completed
                    if (s.global) { jQuery.event.trigger("ajaxComplete", [xml, s]); }

                    // Handle the global AJAX counter
                    if (s.global && !(jQuery.active - 1)) { jQuery.event.trigger("ajaxStop"); }

                    // Process result
                    if (s.complete) { s.complete(xml, status); }

                    jQuery(io).unbind();

                    setTimeout(function () {
                        jQuery(io).remove();
                        jQuery(form).remove();
                    }, 100);

                    xml = null;
                }
            };

            // Timeout checker
            if (s.timeout > 0) {
                setTimeout(function () {
                    // Check to see if the request is still happening
                    if (!requestDone) { uploadCallback("timeout"); }
                }, s.timeout);
            }

            form = jQuery('#' + formId).attr({
                'action': s.url,
                'method': 'POST',
                'target': frameId
            });

            if (form.encoding) {
                form.attr('encoding', 'multipart/form-data');
            } else {
                form.attr('enctype', 'multipart/form-data');
            }

            jQuery(form).submit();

            jQuery('#' + frameId).load(uploadCallback);
            return { abort: function () { } };

        },

        uploadHttpData: function (r, type) {
            var data = !type;
            data = type === "xml" || data ? r.responseXML : r.responseText;

            switch (type) {
            case "script":
                jQuery.globalEval(data);
                break;
            case "json":
                eval("data = " + data);
                break;
            case "html":
                jQuery("<div>").html(data).evalScripts();
                break;
            }

            return data;
        }
    });

})(jQuery, document, window);