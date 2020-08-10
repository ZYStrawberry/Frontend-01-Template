import {createElement, Text, Wrapper} from "./createElement";
import {Timeline, Animation} from "./animation.js"
import {ease, linear} from "./cubicBezier.js"

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

        // if(name.match(/^on([\s\S]+)$/)){
        //     let eventName = RegExp.$1.replace(/^[/s/S]/, c=>c.toLowerCase());
        //     this.addEventListener(eventName, value)
        // }

        // if(name === "enableGesture") {
        //     enableGesture(this.root)
        // }
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

                let currentTransformValue = Number(currentElement.stye.transform.match(/translateX\(([\s\S]+)px\)/)[1])
                
                offset = currentTransformValue + 500 * currentPosition;
            }

            let onPan = event => {
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let dx = event.clientX - event.startX;

                let currentTransformValue = - 500 * currentPosition + offset + dx;
                let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;


                lastElement.style.transform = `translateX(${lastTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;
            }   

            let onPanend = event => {
                let direction = 1;
                let dx = event.clientX - event.startX;

                if(dx + offset > 250) {
                    direction = 1;
                } else if(dx + offset < -250) {
                    direction = -1;
                }

                timeline.reset()
                timeline.start()

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let lastAnimation = new Animation(lastElement.style, "transform", -500 - 500 * lastPosition + offset + dx, -500-500*lastPosition + direction * 500, 500, 0, ease, v => `translateX(${v}%)`);
                let currentAnimation = new Animation(currentElement.style, "transform", -500 * currentPosition + offset + dx, -100-100*currentPosition+ direction * 500, 500, 0, ease, v => `translateX(${v}%)`);
                let nextAnimation = new Animation(nextElement.style, "transform", 500 - 500 * nextPosition + offset + dx, -100*nextPosition+ direction * 500, 500, 0, ease, v => `translateX(${v}%)`);
                
                timeline.add(lastAnimation)
                timeline.add(currentAnimation)
                timeline.add(nextAnimation)

                position = (position - direction + this.data.length) % this.data.length;
                nextPicStopHandler = setTimeout(nextPic, 3000)
                
            }

            let element  = <img src={url}  onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true} />
            element.style.transform = "translateX(0px)";
            element.addEventListener("dragstart", event => event.preventDefault())
            return element;
        })

        let nextpic = () => {
            // 先计算出下一张的位置
            let nextPosition = (position + 1) % this.data.length;
            
            // 一次移动两张
            let current = children[position];
            let next = children[nextPosition];
          
            let currentAnimation = new Animation(current.style, "transform", -100 * position, -100-100*position, 500, 0, ease, v => `translateX(${v}%)`);
            let nextAnimation = new Animation(next.style, "transform", 100 - 100 * nextPosition, -100*nextPosition, 500, 0, ease, v => `translateX(${v}%)`);

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