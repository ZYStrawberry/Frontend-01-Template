let element = document.body;

export function enableGesture(element) {


    // let contexts = new Map();
    let contexts = Object.create(null);

    let MOUSE_SYMBOL = Symbol("mouse");

    if(!document.ontouchstart !== null ) 
        element.addEventListener('mousedown', (event) => {
            contexts[MOUSE_SYMBOL] = Object.create(null);
            start(event, contexts[MOUSE_SYMBOL])
            let mousemove = event => {
                move(event, contexts[MOUSE_SYMBOL])
                // console.log(event.clientX, event.clientY);
            }
            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL])
                document.addEventListener('mousemove', mousemove)
                document.addEventListener('mouseup', mouseend)
            }
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseend)
        })

    element.addEventListener('touchstart', event => {
        for (let touch of event.changedTouches) {
            contexts[touch.indentifier] = Object.create(null);
            start(touch, contexts[touch.indentifier])
        }
    })

    element.addEventListener('touchmove', event => {
        for (let touch of event.changedTouches) {

            move(touch, contexts[touch.indentifier])
        }
    })

    element.addEventListener('touchend', event => {
        for (let touch of event.changedTouches) {

            end(touch, contexts[touch.indentifier])
            delete contexts[touch.indentifier]

        }
    })

    element.addEventListener('touchcancel', event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.indentifier])

            delete contexts[touch.indentifier]
        }
    })

    // tap
    // pan - panstart panmove panend
    // flick(swiper)
    // press - pressstart pressend


    let start = (point, context) => {
        context.startX = point.clientX,context.startY = point.clientY;
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.timeoutHandler = setTimeout(() => {
            if (context.isPan)
                return;
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
        }, 500)

        // console.log(point.clientX, point.clientY);
        console.log('start');
    }

    let move = (point, context) => {
        let dx = point.startX - context.clientX;
        let dy = point.startY - context.clientY;
        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            console.log('pantart');
        }



        
        if (context.isPan){
            context.move.push({
                dx,dy,
                t:Date.now()
            })
            context.moves = context.moves.filter(recoed => Date.now() - record.t > 300)
            console.log("pan")
            
        }
        // console.log('move');

        // console.log(point.clientX, point.clientY); 
    }

    let end = (point, context) => {
        if(context,isPan) {
            let dx = point.startX - context.clientX;
            let dy = point.startY - context.clientY;
            let record = context.moves[0];
            Math.sqrt((reord.dx - dx)**2 + (record.dy - dy) **2) / (Date.now() - )
        }
        console.log('end');
        if (context.isTap) {
            console.log('tap')
        }
        if (context.isPan) {
            console.log('pan')
        }
        if (context.isPress) {
            console.log('press')

        }
        clearTimeout(context.timeoutHandler)
        // console.log(point.clientX, point.clientY);
    }

    let cancel = (point, context) => {
        console.log('cancel');
        clearTimeout(context.timeoutHandler)

        // console.log(point.clientX, point.clientY);
    }

}