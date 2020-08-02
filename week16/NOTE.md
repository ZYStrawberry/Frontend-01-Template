# 每周总结

## 手势

### 点击类型
- tap 点击
- pan 点击以后移动
- flick(swiper) 快速点击移动
- press 长时间点击之后松开

### 关于手势的一些问题
- 系统手势会被占用，如何处理？
- 多指操作？双指操作，三指操作
- 暂时不考虑左右键

### 实现（监听、识别、分发）
#### 一、监听
##### 1、监听鼠标事件
- mousedown 
- mousemove 
- mouseup

    let element = document.body;
    element.addEventListener('mousedown', (event) => {
            let mousemove = event => {
                console.log(event.clientX, event.clientY);
            }
            let mouseend = event => {
                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseend)
            }
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseend)
    })

##### 2、监听触摸(touch)事件
- touchstart
- touchmove
- touchend
- touchcancel

###### tips:
（1）、changedTouches是一个TouchList,包含了每一个touch的identifier,screenX,screenY等等参数

（2）、touchcancel和touchend有且只有一个会发生

###### 代码：
    document.addEventListener('touchstart', event => {
        console.log(event.changedTouches[0])
    })

    document.addEventListener('touchmove', event => {

    })

    document.addEventListener('touchend', event => {

    })

    document.addEventListener('touchcancel', event => {

    })

##### 3、主要框架代码：
    let element = document.body;

    element.addEventListener('mousedown', (event) => {

        start(event)

        let mousemove = event => {
            move(event)
            console.log(event.clientX, event.clientY);
        }

        let mouseend = event => {
            end(event)
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseend)
        }

        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseend)
    })

    document.addEventListener('touchstart', event => {
        console.log(event.changedTouches[0])
        for (let touch of event.changedTouches[0]) {
            start(touch)
        }
    })

    document.addEventListener('touchmove', event => {
        for (let touch of event.changedTouches[0]) {
            move(touch)
        }
    })

    document.addEventListener('touchend', event => {
        for (let touch of event.changedTouches[0]) {
            end(touch)
        }
    })

    document.addEventListener('touchcancel', event => {
        for (let touch of event.changedTouches[0]) {
            cancel(touch)
        }
    })


    let start = (point, context) => {
        console.log('start', point.clientX, point.clientY);
    }

    let move = (point, context) => {
        console.log('move', point.clientX, point.clientY);
    }

    let end = (point, context) => {
        console.log('end', point.clientX, point.clientY);
    }

    let cancel = (point, context) => {
        console.log('cancel', point.clientX, point.clientY);
    }

#### 二、识别 
##### 区分各种点击类型的顺序
- tap 点击
- pan 点击以后移动 - panstart panmove panend
- flick(swiper) 快速点击移动
- press 点击之后超过0.5S松开 - pressstart pressend

1、计算时间差
2、计算移动距离
3、计算移动速度


#### 三、分发Event
参考：
https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events

使用：
    element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
        startX:context.startX,
        startY:context.startY,
        clientX:point.clientX,
        clientY:point.clientY,
        speed: speed,
        isFlick: isFlick
    }))