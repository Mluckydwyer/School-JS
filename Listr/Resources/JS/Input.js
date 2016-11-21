/**
 * Created by mluck on 11/18/2016.
 */

function parse(input) {
    console.log(input)
    showSnackbar(input)

    if (input.hostname != "youtube.com") {
        showSnackbar("\"" + input.hostname + "\" Is ot a recognized host name");
    }
    else {
        
    }
}