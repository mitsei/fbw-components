// SetIFrameHeight.js
'use strict';

var SetIFrameHeight = function (frame) {
    // fix iFrame height
    // per http://www.dyn-web.com/tutorials/iframes/height/
    function getDocHeight(doc) {
        doc = doc || document;
        // stackoverflow.com/questions/1145850/
        var body = doc.body, html = doc.documentElement;
        var height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );
        return height;
    }
    function setIframeHeight(ifrm) {
        var doc = ifrm.contentDocument? ifrm.contentDocument:
            ifrm.contentWindow.document;
        ifrm.style.visibility = 'hidden';
        ifrm.style.height = "10px"; // reset to minimal height ...
        // IE opt. for bing/msn needs a bit added or scrollbar appears
        ifrm.style.height = getDocHeight( doc ) + 4 + "px";
        ifrm.style.visibility = 'visible';
    }

    // this seems hacky...but without the timeout
    // it sets the height before the iframe content
    // has fully rendered, making the height 10px;
    window.setTimeout(function () {
        try {
            setIframeHeight(frame);
        } catch (e) {
            //console.log('iFrame disappeared before it could be re-sized.');
        }
    }, 1000);
};

module.exports = SetIFrameHeight;