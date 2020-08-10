import {createElement, Text, Wrapper} from "./createElement";
import {Timeline, Animation} from "./animation.js"
import {ease, linear} from "./cubicBezier.js"
import {enableGesture} from "./gesture.js"


export class Carousel {
    constructor(config){
        // console.log(config)
        this.children = [];
        this.attributes = new Map();
        this.properies = new Map();
    }

    setAttribute(name, value){ // attribute
        this[name] = value
        // this.root.setAttribute(name, value)
    }

    appendChild(child){ // children
        this.children.push(child)
    }

    render(){
        let timeline = new Timeline;
        timeline.start();

        let position = 0;

        let nextPicStopHandler = null;

        let children = this.data.map((url, currentPosition) =>{
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition + 1 ) % this.data.length;

            let offset= 0;

            let onStart = ()=>{
                timeline.pause();
                clearTimeout(nextPicStopHandler);

                let currentElement = children[currentPosition];
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1])
                
                offset = currentTransformValue + 500 * currentPosition;
                console.log(currentTransformValue,500 * currentPosition, "offset",offset)
            }

            let onPan = event => {
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let dx = event.clientX - event.startX;

                console.log("dx", dx)

                let currentTransformValue = - 500 * currentPosition + offset + dx;
                let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

             

                lastElement.style.transform = `translateX(${lastTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;
            }   

            let onPanend = event => {
                console.log("进来panend")
                let direction = 0;
                let dx = event.clientX - event.startX;

                if(dx + offset > 250) {
                    direction = 1;
                } else if(dx + offset < -250) {
                    direction = -1;
                }
                console.log("direction",direction)
                console.log("dx + offset",dx + offset)

                timeline.reset()
                timeline.start()

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let lastAnimation = new Animation(lastElement.style, "transform", -500 - 500 * lastPosition + offset + dx, -500-500*lastPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                let currentAnimation = new Animation(currentElement.style, "transform", -500 * currentPosition + offset + dx, -500-500*currentPosition+ direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                let nextAnimation = new Animation(nextElement.style, "transform", 500 - 500 * nextPosition + offset + dx, -500*nextPosition+ direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                
                timeline.add(lastAnimation)
                timeline.add(currentAnimation)
                timeline.add(nextAnimation)

                position = (position - direction + this.data.length) % this.data.length;
                nextPicStopHandler = setTimeout(nextPic, 3000)
                
            }

            let element  = <img src={url}  onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true} />
            element.style.transform = "translateX(0px)";
            element.addEventListener("dragstart", event => event.preventDefault());

            console.log("element",element)


            return element;
        })

        let nextpic = () => {
            // 先计算出下一张的位置
            let nextPosition = (position + 1) % this.data.length;
            // console.log(nextPosition)
            // 一次移动两张
            let current = children[position];
            let next = children[nextPosition];
          
            let currentAnimation = new Animation(current.style, "transform", -500 * position, -500-500*position, 500, 0, ease, v => `translateX(${v}px)`);
            let nextAnimation = new Animation(next.style, "transform", 500 - 500 * nextPosition, -500*nextPosition, 500, 0, ease, v => `translateX(${v}px)`);

            timeline.add(currentAnimation)
            timeline.add(nextAnimation)

            // transition生效需要时间，所以需要加个setTimeout时间间隔
            position = nextPosition
            
            // 循环
            nextPicStopHandler = setTimeout(nextpic, 2000)
        }

        // nextpic(); // 第一张没有了显示时间
        // 第一张显示2秒
        nextPicStopHandler = setTimeout(nextpic, 2000)
        
        return <div class="carousel">
            {children}
        </div>;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}