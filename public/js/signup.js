$(document).ready(function () {
    //signup button event listener/checking if the passwords match/ creating users
    $("#signup-button").on("click", function (event) {
        event.preventDefault();
        $("#alert").empty();
        var reEnteredPassword = $("#re-password").val().trim();
        var userData = {
            email: $("input#email").val().trim(),
            password: $("input#password").val().trim()
        };
        if (!userData.email || !userData.password) {
            $("#alert").append("<p>Feild Empty</p>");
            emptyFeilds();
            return;
        }
        else if (reEnteredPassword !== userData.password) {
            $("#alert").append("<p>Passwords do not match</p>");
            emptyFeilds();
            return;
        }
        else {
            $.post("/api/signup", {
                email: userData.email,
                password: userData.password
            })
                .then(function (data) {
                    console.log("sign up success");
                    window.location.replace("/jobs");
                    // If there's an error, handle it by throwing up a bootstrap alert
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

    });
    //this empties the fields after button is pressed
    function emptyFeilds() {
        $("input#email").val("");
        $("input#password").val("");
        $("input#re-password").val("");
    }

    // Signup Animations
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