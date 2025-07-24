$(document).ready(function () {
     

    let canvas = document.getElementById("myCanvas")
    console.log('bbcc');


    let context = canvas.getContext("2d")
    context.lineWidth = 10
    context.lineCap = "round"

    let isMouseDown = false
    let previous = { x: 0, y: 0 }

    canvas.addEventListener("mousemove", event => {
        if (isMouseDown) {
            let { pageX: x, pageY: y } = event
            context.beginPath()
            context.moveTo(previous.x, previous.y)
            context.lineTo(x, y)
            context.stroke()

            previous = { x, y }
            console.log('mousemove');
        }
    })

    canvas.addEventListener("mousedown", event => {
        let { pageX: x, pageY: y } = event
        previous = { x, y }

        isMouseDown = true
        console.log('mousedown');
    })

    canvas.addEventListener("mouseup", event => {
        isMouseDown = false
        console.log('mouseup');
    })

});

