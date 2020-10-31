$(document).ready(function() {
    $("#signup-button").on("click", function(event) {
        event.preventDefault();
        $("#alert").empty();
        var reEnteredPassword = $("#re-password").val().trim();
        var userData = {
        email: $("input#email").val().trim(),
        password: $("input#password").val().trim()
        };
        //console.log(userData);
        if (!userData.email || !userData.password) {
            $("#alert").append("<p>Feild Empty</p>");
            emptyFeilds();
            return;
        }
        else if(reEnteredPassword !== userData.password){
            $("#alert").append("<p>Passwords do not match</p>");
            emptyFeilds();
            return;
        }
        else{
            $.post("/api/signup", {
                email: userData.email,
                password: userData.password
                })
                .then(function(data) {
                    console.log("sign up success");
                    window.location.replace("/jobs");
                    // If there's an error, handle it by throwing up a bootstrap alert
                })
                .catch(function(err){
                    console.log(err);
                });
        }
        
    });
    function emptyFeilds(){
        $("input#email").val("");
        $("input#password").val("");
        $("input#re-password").val("");
    }
});