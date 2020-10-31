$(document).ready(function() {

    $("#login-button").on("click", function(event) {
        event.preventDefault();
        console.log("login hit");
        var userData = {
        email: $("input#email").val().trim(),
        password: $("input#password").val().trim()
        };
        console.log(userData);
        if (!userData.email || !userData.password) {
        return;
        }
        $("input#email").val("");
        $("input#password").val("");
        
        $.post("/api/login", {
            email: userData.email,
            password: userData.password
            })
            .then(function() {

                // If there's an error, log the error
                console.log("signed in!!");
                window.location.replace("/jobs");
            })
            .catch(function(err) {
                console.log(err);
            });

    });
});