export function enableGesture(element) {
    let contexts = Object.create(null);

    // 定义为symbol防止和touch的identifier冲突
    let MOUSE_SYMBOL = Symbol("mouse");
    // 鼠标模式
    if(document.ontouchstart !== null)
        element.addEventListener('mousedown', (event) => {
            contexts[MOUSE_SYMBOL] = Object.create(null);
            // console.log(contexts[MOUSE_SYMBOL])

            start(event, contexts[MOUSE_SYMBOL])

            let mousemove = event => {
                move(event, contexts[MOUSE_SYMBOL])
                // console.log(event.clientX, event.clientY);
            }

            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL])
                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseend)
            }

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseend)
        })

    document.addEventListener('touchstart', event => {
        // console.log(event.changedTouches[0])
        for (let touch of event.changedTouches[0]) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier])
        }
    })

    document.addEventListener('touchmove', event => {
        for (let touch of event.changedTouches[0]) {
            contexts[touch.identifier] = Object.create(null);
            move(touch, contexts[touch.identifier])
        }
    })

    document.addEventListener('touchend', event => {
        for (let touch of event.changedTouches[0]) {
            end(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })

    document.addEventListener('touchcancel', event => {
        for (let touch of event.changedTouches[0]) {
            cancel(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })


    let start = (point, context) => {
        element.dispatchEvent(Object.assign(new CustomEvent('start'), {
            startX:point.clientX,
            startY:point.clientY,
            clientX:point.clientX,
            clientY:point.clientY
         }))
        
        // console.log('start', point.clientX, point.clientY);
        context.startX = point.clientX;
        context.startY = point.clientY;

        // 判断flick事件
        context.moves = [];

        // 区分三个点击类型
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;

        // 点击超过0.5S才算press,press move 一定距离之后会变成 Pan 
        context.timeoutHandler = setTimeout(()=>{
            // 如果是点击事件就不能move
            if(context.isPan)
                return;
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            element.dispatchEvent(Object.assign(new CustomEvent('pressstart'), {}))
        },500)
    }

    let move = (point, context) => {
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        // console.log('move', dx, dy);

        // 距离超过100
        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            
            if(context.isPress)
                element.dispatchEvent(Object.assign(new CustomEvent('presscancel'), {}))
            
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            console.log('panstart');
            element.dispatchEvent(Object.assign(new CustomEvent('panstart'), {
                startX:context.startX,
                startY:context.startY,
                clientX:point.clientX,
                clientY:point.clientY
            }))
        }

        

        
        if(context.isPan){
            // 添加时间和位置
            context.moves.push({
                dx,dy,
                t:Date.now()
            })
            // 时间差小于300ms 的算 flick
            context.moves = context.moves.filter(record => Date.now() - record.t < 300)
            console.log('pan');
            element.dispatchEvent(Object.assign(new CustomEvent('pan'), {
                startX:context.startX,
                startY:context.startY,
                clientX:point.clientX,
                clientY:point.clientY
            }))
        }
    }

    let end = (point, context) => {
       
        if(context.isPan){
            
            let dx = point.clientX - context.startX;
            let dy = point.clientY - context.startY;
            let record = context.moves[0];
            // 速度=距离/时间
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2 ) / (Date.now() - record.t) 
            console.log(speed)

            let isFlick = speed > 3
            // 速度大于3的算flick事件
            // if(isFlick) {
            //     element.dispatchEvent(Object.assign(new CustomEvent('flick'), {
            //         startX:context.startX,
            //         startY:context.startY,
            //         clientX:point.clientX,
            //         clientY:point.clientY,
            //         speed: speed
            //     }))
            // }
           
            element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
                startX:context.startX,
                startY:context.startY,
                clientX:point.clientX,
                clientY:point.clientY,
                speed: speed,
                isFlick: isFlick
            }))
            console.log('panend');
        }

        if(context.isTap){
            // element.dispatchEvent(new CustomEvent('tap', { }))
            element.dispatchEvent(Object.assign(new CustomEvent('tap'), { }))
            
        }

        if(context.isPress)
            element.dispatchEvent(Object.assign(new CustomEvent('pressend'), { }))

            // element.dispatchEvent(new CustomEvent('pressend', { }))


        clearTimeout(context.timeoutHandler)
    }

    let cancel = (point, context) => {   
        // element.dispatchEvent(new CustomEvent('cancel', { }))
        element.dispatchEvent(Object.assign(new CustomEvent('cancel'), { }))
        
        clearTimeout(context.timeoutHandler)
    }
}