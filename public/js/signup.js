$(document).ready(function() {
    $("#signup-button").on("click", function(event) {
        event.preventDefault();
        var userData = {
        email: $("input#email").val().trim(),
        password: $("input#password").val().trim()
        };
        console.log(userData);
        if (!userData.email || !userData.password) {
        return;
        }
        // If we have an email and password, run the signUpUser function
        $("input#email").val("");
        $("input#password").val("");

        $.post("/api/signup", {
            email: userData.email,
            password: userData.password
            })
            .then(function(data) {
                console.log("sign up success");
                //window.location.replace("/jobs");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(function(err){
                console.log(err);
            });
        
    });
});