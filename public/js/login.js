$(document).ready(function () {

    $("#login-button").on("click", function (event) {
        event.preventDefault();
        $("#alert").empty();
        console.log("login hit");
        var userData = {
            email: $("input#email").val().trim(),
            password: $("input#password").val().trim()
        };
        //console.log(userData);
        if (!userData.email) {
            $("#alert").append("<p>Please enter a email</p>");
            return;
        }
        else if (!userData.password) {
            $("#alert").append("<p>Please enter a password</p>");
            return;
        }
        else {
            $.post("/api/login", {
                email: userData.email,
                password: userData.password
            })
                .then(function () {

                    // If there's an error, log the error
                    console.log("signed in!!");
                    window.location.replace("/jobs");
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        $("input#email").val("");
        $("input#password").val("");

    });

    // Login Animation

    const inputs = document.querySelectorAll(".input");


    inputs.forEach(input => {
        input.addEventListener('focus', focusFunction)
        input.addEventListener('blur', blurFunction)
    });

    function focusFunction() {
        let parent = this.parentNode.parentNode;
        parent.classList.add('focus')

    }

    function blurFunction() {
        let parent = this.parentNode.parentNode;
        if (this.value === "") {
            parent.classList.remove('focus')
        }
    }
});