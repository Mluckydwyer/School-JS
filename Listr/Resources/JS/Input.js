/**
 * Created by mluck on 11/18/2016.
 */

function setup() {
    document.getElementById('center-main-input').onkeypress=function(e){
        if(e.keyCode==13){
            document.getElementById('make-list-button').click();
        }
    }
}



function parse(input) {
    console.log(input)
    showSnackbar(input)

    if (input.hostname != "youtube.com") {
        showSnackbar("\"" + input.hostname + "\" Is ot a recognized host name");
    }
    else {
        
    }
}