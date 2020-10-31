




 dragula([document.querySelector('#applied-DOM'), 
        document.querySelector('#phone-DOM'),
        document.querySelector('#interviewing-DOM'),
        document.querySelector('#offer-DOM'),
        document.querySelector('#rejected-DOM')])
    
// var drake = dragula([document.querySelector('#left'), document.querySelector('#right')]);


//     drake.on('drop', function(el, target, source, sibling){
//         // do something
//       });

    

// });
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
