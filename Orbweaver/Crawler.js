/**
 * Created by mluck on 5/18/2017.
 */

var url;

var setup = function () {

};

function go() {
    url = document.getElementById("url-input").value;
    crawlURL(url);
}

function crawlURL(url){
    console.log("Crawling: " + url);
    httpGetAsync(url, console.log);
}

function crawl(depth) {

}

function httpGetAsync(theUrl, callback) {
    console.log(request(theUrl));
    
    /*var xmlHttp = new XMLHttpRequest();

    //xmlHttp.withCredentials = true;

    if ("withCredentials" in xmlHttp) {
        xmlHttp.open('GET', theUrl, false);
        // xmlHttp.onload = onload;
        // xmlHttp.setRequestHeader(theUrl, 'Access-Control-Allow-Origin');
        // xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        console.log("Test1");
        xmlHttp.send(null);
    } else if (XDomainRequest) {
        xdr = new XDomainRequest();
        xdr.open("get", url);
        console.log("Test2");
        xdr.send();
    }

    var onload = function () {
        callback(xmlHttp.responseText);
    };*/
}

function request(requestURL) {
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open("GET", requestURL, true);
    request.send();

    return request.responseText;
}
window.onload = setup;