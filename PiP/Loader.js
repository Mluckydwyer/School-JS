/**
 * Created by mluck on 3/6/2017.
 */

var key = "AIzaSyCJwkeQqI-w9OgK7DoDF4k_Hj0eHiPN-3o";
var engineCode = "006200105595254320970:96q_xrh6qt0";
var term = null;

function goSearch() {

    if (document.getElementById("username-input").value != "") {
        term = document.getElementById("username-input").value;
    }
    else term = "trippy";

    var response = request(buildRequests(this.term));

    console.log(response);
}

function queryGo() {
    if (plLink == null) return;

    var requestURLS = buildRequests(plLink.playlistID);
    var PLInfo = JSON.parse(request(requestURLS.info));
    var PLItems = JSON.parse(request(requestURLS.items));

    setSpotlight(PLInfo.items[0].snippet);
    setList(PLItems);

    console.log(PLItems);
}

function buildRequests(searchTerm) {
    var request = "https://www.googleapis.com/customsearch/v1?";
    request += "q=" + searchTerm;
    request += "&fileType=png%2C+jpg";
    request += "&filter=1";
    request += "&cx=" + engineCode;
    request += "&imgColorType=color";
    request += "&imgSize=large";
    request += "&num=100";
    request += "&safe=high";
    request += "&searchType=image";
    request += "&fields=kind%2Cpromotions";
    request += "&key=" + key;

    temp += "?client_id=257896472718-gd1g63fmks68jaa8tvlhl890ru3j86lf.apps.googleusercontent.com";
    temp += "&key=AIzaSyAuiLKay4dxwGKC-5FehIQ8w41sQLHAjdc";
    temp += "&response_type=token";
    temp += "&part=snippet";
    temp += "&id=" + playlistID;

    return request;
}

function loadMore() {
    var q = "https://www.googleapis.com/youtube/v3/playlistItems?";
    //q += "client_id=257896472718-gd1g63fmks68jaa8tvlhl890ru3j86lf.apps.googleusercontent.com";
    q += "key=AIzaSyAuiLKay4dxwGKC-5FehIQ8w41sQLHAjdc";
    q += "&response_type=token";
    q += "&part=snippet";
    q += "&maxResults=50";
    q += "&playlistId=" + playlistID;
    q += "&pageToken = " + playlistVidsNextPage;

    var response = JSON.parse(request(q));
    playlistVidsNextPage = response.nextPageToken;
    setList(response);
}

function request(requestURL) {
    var request = new XMLHttpRequest();
    request.open("GET", requestURL, false);
    request.send(null);

    return request.responseText;
}

goSearch();
