
$(document).ready(function () {
    renderCards();
    //Registering Dragula drag and drop with our containers
    var drake = dragula([document.querySelector('#applied-DOM'),
    document.querySelector('#phone-DOM'),
    document.querySelector('#interviewing-DOM'),
    document.querySelector('#offer-DOM'),
    document.querySelector('#rejected-DOM')]);
    //adding the "drop" event listener for updating our job status
    drake.on('drop', function (el, target, source, sibling) {
        var id = el.id;
        var status = target.id;
        if (status === "applied-DOM") {
            updateStatus(id, "applied");
        }
        else if (status === "phone-DOM") {
            updateStatus(id, "phone-screen");
        }
        else if (status === "interviewing-DOM") {
            updateStatus(id, "interviewing");
        }
        else if (status === "offer-DOM") {
            updateStatus(id, "offer");
        }
        else if (status === "rejected-DOM") {
            updateStatus(id, "rejected");
        }
    });
    //"PUT" ajax call to our SQL server for updating job status
    function updateStatus(id, status) {
        var today = new Date();
        var day = today.getDate();
        if (day < 10) day = "0" + day;
        var month = today.getMonth();
        if (month < 10) month = "0" + month;
        var year = today.getFullYear();
        $(`#status${id}`).text(`Last Updated: ${month}/${day}/${year}`);
        $.ajax("/api/update_status", {
            type: "PUT",
            data: {
                id: id,
                status: status
            }
        })
            .then(function (data) {
                console.log("status updated");
                $.get("/api/user_data").then(function (data) {
                    countByStatus(data);
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    //adding Modal with Bulma.io
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

    // mdl.addEventListener('modal:show', function () {
    //     console.log("opened")
    // })

    // mdl.addEventListener("modal:close", function () {
    //     console.log("closed")
    // })
    //creating a new job
    $("#submitJob").on("click", function (event) {
        console.log("makeing job");
        var newCompany = $("#new-company").val().trim();
        var newTitle = $("#new-title").val().trim();
        if (newCompany === "" || newTitle === "") {
            return;
        }
        else {
            $.post("/api/user/jobs", {
                title: newTitle,
                company: newCompany,
                status: "applied"
            })
                .then(function (data) {
                    console.log("added job");

                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        location.reload();

    });
    //creating a new card 
    function renderCards() {
        $.get("/api/user_data").then(function (data) {
            console.log(data);
            countByStatus(data);
            for (i = 0; i < data.length; i++) {
                var createdDate = formatDate(data[i].createdAt);
                var updatedDate = formatDate(data[i].updatedAt);
                var card = makeCard(data[i].id, data[i].title, data[i].company, data[i].status, createdDate, updatedDate);
                //console.log(card);
                if (data[i].status === "applied") {
                    $("#applied-DOM").append(card);
                }
                else if (data[i].status === "phone-screen") {
                    $("#phone-DOM").append(card);
                }
                else if (data[i].status === "interviewing") {
                    $("#interviewing-DOM").append(card);
                }
                else if (data[i].status === "offer") {
                    $("#offer-DOM").append(card);
                }
                else if (data[i].status === "rejected") {
                    $("#rejected-DOM").append(card);
                }
            }
        });
    };
    //Status counter to track how many jobs we have in each position
    function countByStatus(data) {
        var totalCount = data.length;
        var appliedCounter = 0;
        var phoneCounter = 0;
        var interviewCounter = 0;
        var offerCounter = 0;
        var rejectedCounter = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].status === "applied") {
                appliedCounter++;
            }
            else if (data[i].status === "phone-screen") {
                phoneCounter++;
            }
            else if (data[i].status === "interviewing") {
                interviewCounter++;
            }
            else if (data[i].status === "offer") {
                offerCounter++;
            }
            else if (data[i].status === "rejected") {
                rejectedCounter++;
            }
            //adding text to fields in the job card 
        }
        $("#appliedCount").text(appliedCounter);
        $("#phoneCount").text(phoneCounter);
        $("#interviewCount").text(interviewCounter);
        $("#offerCount").text(offerCounter);
        $("#rejectedCount").text(rejectedCounter);
        $("#totalCount").text(totalCount);

        // $("#appliedCount").text("No Response: "+appliedCounter);
        // $("#phoneCount").text("Phone Interviews: "+phoneCounter);
        // $("#interviewCount").text("Interviews: "+interviewCounter);
        // $("#offerCount").text("Offer: "+offerCounter);
        // $("#rejectedCount").text("Rejected: "+rejectedCounter);
        // $("#totalCount").text("Total Applied: "+totalCount);
    }
    //defining the HTMl structure of our dynamically created cards
    function makeCard(id, title, company, status, createdAt, updatedDate) {
        // var card = `
        // <div id = '${id}'class="job-card-DOM card">
        //     <div class="card-content">
        //         <p>Company: ${company}</p>
        //         <p>Title: ${title}</p>
        //         <p>Date Applied: ${createdAt}</p>
        //         <p>${status}: ${updatedDate}</p>
        //     </div>
        // </div>
        // `;

        var card = ` <div id = '${id}' class="card job-card-DOM job-details">
          <div class="card-header has-background-primary">
            <div class="card-header-title is-centered">
              <p class="job-title">${company}</p>
            </div>
          </div>
          <div class="card-content">
            <p>Title: ${title}</p>
            <p>Date Applied: ${createdAt}</p>
            <p id = “status${id}“>Last Updated: ${updatedDate}</p>
          </div>
        </div>`
        return card;
    };
    //formatting the date provided with passport to a readable level
    function formatDate(toSplitDate) {
        var splitDate = toSplitDate.split("");
        var date = splitDate[5] + splitDate[6] + '/' + splitDate[8] + splitDate[9] + '/' + splitDate[0] + splitDate[1] + splitDate[2] + splitDate[3];
        return date;
    }




});
