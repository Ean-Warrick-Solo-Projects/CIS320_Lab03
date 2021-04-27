// This calls our back-end Java program that sets our session info
function login() {
    var url = "api/login_servlet";

    // Grab data from the HTML form
    var sessionKey = "loginId"
    var sessionValue = $("#loginId").val();

    // Create a JSON request based on that data
    var dataToServer = {sessionKey : sessionKey, sessionValue : sessionValue};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Clear the form
        $("#loginId").val("");
        $("#loginSection").hide(200);
        getLogin(200);
    });
}

// This gets session info from our back-end servlet.
function getLogin(speed) {
    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Update the HTML with our result

        if (dataFromServer.substring(0, 4)  === "null") {
            console.log("There is no data found for loginId");
            $('#getSessionResult').html("You are not logged in")
            $("#logoutSection").hide(speed);
        } else {
            console.log("There is data found for loginId");
            $('#getSessionResult').html(dataFromServer)
            $("#loginSection").hide();
            $("#logoutSection").show(speed)
        }
    });
}

// This method calls the servlet that invalidates our session
function logout() {
    var url = "api/log_out_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        $("#loginSection").show(200);
        getLogin(200);
    });
}

// Hook the functions above to our buttons

loginButton = $('#loginButton');
loginButton.on("click", login);

logoutButton = $('#logoutButton');
logoutButton.on("click", logout);

getLogin();