/**
 * Created by mluck on 11/21/2016.
 */

var plLink;

function setup() {
    document.getElementById('center-main-input').onkeypress = function (e) {
        if (e.keyCode == 13) {
            document.getElementById('make-list-button').click();
        }
    }
}

function query() {
    plLink = parse(document.getElementById('center-main-input').value);
    if (plLink == null) return;

    var requestURLS = buildRequests(plLink.playlistID);
    var responsePLInfo = request(requestURLS.info);
    var responsePLItems = request(requestURLS.items);
    console.log(responsePLInfo);
    console.log(responsePLItems);
}

function buildRequests(playlistID) {
    var requests = {};
    var temp = "https://www.googleapis.com/youtube/v3/playlists?";
    temp += "client_id=257896472718-gd1g63fmks68jaa8tvlhl890ru3j86lf.apps.googleusercontent.com";
    temp += "&key=AIzaSyAuiLKay4dxwGKC-5FehIQ8w41sQLHAjdc";
    temp += "&response_type=token";
    temp += "&part=snippet";
    temp += "&id=" + playlistID;
    requests.info = temp;

    temp = "https://www.googleapis.com/youtube/v3/playlistItems?";
    temp += "client_id=257896472718-gd1g63fmks68jaa8tvlhl890ru3j86lf.apps.googleusercontent.com";
    temp += "&key=AIzaSyAuiLKay4dxwGKC-5FehIQ8w41sQLHAjdc";
    temp += "&response_type=token";
    temp += "&part=snippet";
    temp += "&maxResults=50";
    temp += "&playlistId=" + playlistID;
    requests.items = temp;

    return requests;
}

function request(requestURL) {
        var request = new XMLHttpRequest();
        request.open("GET", requestURL, false);
        request.send(null);

    return request.responseText;
}
