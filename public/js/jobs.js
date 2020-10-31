class BulmaModal {
    constructor(selector) {
        this.elem = document.querySelector(selector)
        this.close_data()
    }

    show() {
        this.elem.classList.toggle('is-active')
        this.on_show()
    }

    close() {
        this.elem.classList.toggle('is-active')
        this.on_close()
    }

    close_data() {
        var modalClose = this.elem.querySelectorAll("[data-bulma-modal='close'], .modal-background")
        var that = this
        modalClose.forEach(function (e) {
            e.addEventListener("click", function () {

                that.elem.classList.toggle('is-active')

                var event = new Event('modal:close')

                that.elem.dispatchEvent(event);
            })
        })
    }

    on_show() {
        var event = new Event('modal:show')

        this.elem.dispatchEvent(event);
    }

    on_close() {
        var event = new Event('modal:close')

        this.elem.dispatchEvent(event);
    }

    addEventListener(event, callback) {
        this.elem.addEventListener(event, callback)
    }
}

var btn = document.querySelector("#new-job-DOM")
var mdl = new BulmaModal("#myModal")

btn.addEventListener("click", function () {
    mdl.show()
})

mdl.addEventListener('modal:show', function () {
    console.log("opened")
})

mdl.addEventListener("modal:close", function () {
    console.log("closed")
})

$("#submitJob").on("click", function(event) {
    console.log("makeing job");
    var newCompany = $("#new-company").val().trim();
    var newTitle = $("#new-title").val().trim();
    console.log(newCompany);
    console.log(newTitle);

    if (newCompany === "" || newTitle === "") {
        return;
    }
    else{
        $.post("/api/user/jobs", {
            title: newTitle,
            company: newCompany,
            status: "applied"
            })
            .then(function(data) {
                console.log("added job");
                //window.location.reload();
            })
            .catch(function(err){
                console.log(err);
            });
    }

});