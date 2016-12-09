/**
 * Created by mluck on 11/18/2016.
 */

var selectedVideoID;
var playlistID;
var playlistIndex;

function parse(input) {
    var url = document.createElement("a");
    url.href = input;
    var query = parseQuery(url.search);
    
    if (url.hostname != "youtube.com" && url.hostname != "www.youtube.com") {
        showSnackbar("\"" + url.hostname + "\" Is not a recognized host name");
    }
    else if (query.v == null && query.list == null) {
        showSnackbar("This URL is not recognized as a youtube playlist or video");
    }
    else {
        if (query.v != null) selectedVideoID = query.v;
        if (query.list != null) playlistID = query.list;
        if (query.index != null) playlistIndex = query.index;
        return this;
    }

    // Not Mine
    function parseQuery(qstr) {
        var query = {};
        var a = qstr.substr(1).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    }
}

