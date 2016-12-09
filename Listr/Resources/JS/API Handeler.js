/**
 * Created by mluck on 11/21/2016.
 */

var plLink;

function setup() {
    document.getElementById('center-main-input').onkeypress = function (e) {
        if (e.keyCode == 13) {
            document.getElementById('make-list-button').click();
        }
    };
    
    if (parseQuery(window.location.href.search).url != "") plLink = parse(parseQuery(window.location.href.search).url);
}

function query() {
    plLink = parse(document.getElementById('center-main-input').value);
    queryGo();
}

function queryGo() {
    if (plLink == null) return;

    var requestURLS = buildRequests(plLink.playlistID);
    var PLInfo = JSON.parse(request(requestURLS.info));
    var PLItems = JSON.parse(request(requestURLS.items));

    console.log(PLInfo);
    console.log(PLItems);

    setSpotlight(PLInfo);
    setList(PLItems);
}

function buildRequests(playlistID) {
    var requests = {};
    var temp = "https://www.googleapis.com/youtube/v3/playlists";
    temp += "?client_id=257896472718-gd1g63fmks68jaa8tvlhl890ru3j86lf.apps.googleusercontent.com";
    temp += "&key=AIzaSyAuiLKay4dxwGKC-5FehIQ8w41sQLHAjdc";
    temp += "&response_type=token";
    temp += "&part=snippet";
    temp += "&id=" + playlistID;
    requests.info = temp;

    temp = "https://www.googleapis.com/youtube/v3/playlistItems";
    temp += "?client_id=257896472718-gd1g63fmks68jaa8tvlhl890ru3j86lf.apps.googleusercontent.com";
    temp += "&key=AIzaSyAuiLKay4dxwGKC-5FehIQ8w41sQLHAjdc";
    temp += "&response_type=token";
    temp += "&part=snippet";
    temp += "&maxResults=50";
    temp += "&playlistId=" + playlistID;
    requests.items = temp;

    return requests;
}

function setSpotlight(info) {



}

function setList(vids) {
    for (var i = 0; i < vids.items.length; i++) {
        var vid = vids.items[i];
        console.log(vid);

        var image = document.createElement("img");
            image.setAttribute('class', 'video-image');
            image.setAttribute('src', vid.snippet.thumbnails.medium.url);

        var title = document.createElement("a");
            title.setAttribute('class', 'video-title');
            title.setAttribute('href', 'https://youtube.com/watch?v=' + vid.snippet.resourceId.videoId + '&list=' + playlistID);
            title.innerHTML = (vid.snippet.position + 1) + ". " + vid.snippet.title;

        var description = document.createElement("div");
            description.setAttribute('class', 'video-description');
            description.innerHTML = vid.snippet.description;

        var html = document.createElement("li");
            html.setAttribute('class', 'result');
            html.appendChild(image);
            html.appendChild(title);
            //html.appendChild(description);

        document.getElementById('vid-list').appendChild(html);
    }
}


function request(requestURL) {
        var request = new XMLHttpRequest();
        request.open("GET", requestURL, false);
        request.send(null);

    return request.responseText;
}
