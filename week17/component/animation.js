export class Timeline{
    constructor(){
        this.animations = new Set();

        this.requestID = null;
        this.finishedAnimations = new Set();
        this.addTimes = new Map();
        // 加上状态管理,防止多次点击
        this.state = "inited"

        this.tick = ()=>{
            let t = Date.now() - this.startTime;
            console.log(t)
            
            // 对结束的动画进行管理
            // let animations = this.animations.filter(animation => !animation.finished)
    
            for(let animation of this.animations){
                
                let {object, property,start, end, timingFunction, delay,duration,addTime, template} = animation;
                
                addTime = this.addTimes.get(animation)
                
                if(t < delay + addtime) {
                    continue;
                }
                let progression = timingFunction((t - delay - addTime) / duration); // 0-1的范围
                
                // 防止对不齐
                if(t > (duration + delay + addTime)){
                    progression =1;
                    // 加上结束标记
                    // animation.finished = true
                    this.animations.delete(animation);
                    this.finishedAnimations.add(animation)
                }
    
                // let value = start + progression * (end - start)
                // 优化为函数
                let value = animation.valueFromProgression(progression)

                // console.log(value)

                object[property] = template(value)
            }
    
            if(this.animations.size)
                this.requestID = requestAnimationFrame(this.tick);
            else 
                this.requestID = null;
        }
    }

    pause(){
        if(this.state !== "playing")
            return ;
        this.state = "paused"
        this.pauseTime = Date.now();
        if(this.requestID != null){
            cancelAnimationFrame(this.requestID)
            this.requestID = null
        }
    }

    resume(){
        if(this.state !== "paused")
            return ;
        this.state = "playing"

        this.startTime += Date.now() - this.pauseTime;

        this.tick()

    }

    start(){
        if(this.state !== "inited")
            return ;
        this.state = "playing"
        this.startTime = Date.now();
        this.tick()
    }

    restart(){
        if(this.state === "playing")
            this.pause()
        for(let animation of this.finishedAnimations)
            this.animationsadd(animation)
        
        // add
        this.finishedAnimations = new Set();
        // this.animations = [];
        this.requestID = null;
        this.state = "playing"
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tick();
    }

    reset() {
        if(this.state === "playing")
            this.pause()
        this.animations = new set();
        this.finishedAnimation = new set();
        this.addTimes = new Map();
        this.requestID = null;
        this.state = "inited"
        this.startTime = Date.now();
        this.pauseTime = null;
        this.state = "inited"
    }

    // addTime 指定开始的时间
    // 传0进来，可以达到同步的状态
    add(animation, addTime){
        this.animations.add(animation)
        if(this.state === "playing" && this.requestID === null)
            this.tick();
        
        if(this.state === "playing")
            this.animation.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime )
        else
            this.animation.set(animation, addTime !== void 0 ? addTime : 0)

    }
}

export class Animation{
    constructor(object,property, start, end, duration, delay, timingFunction, template){
        this.object = object;
        this.template = template;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration =  duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
    }
    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start)
    }
}

export class ColorAnimation{
    constructor(object, property, start, end, duration, delay, timingFunction,template){
        this.object = object;
        this.template = template || ( v =>`rgb(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration =  duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
    }
    valueFromProgression(progression) {
        return {
            r:this.start.r + progression * (this.end.r - this.start.r),
            g:this.start.g + progression * (this.end.g - this.start.g),
            b:this.start.b + progression * (this.end.b - this.start.b),
            a:this.start.a + progression * (this.end.a - this.start.a),
        }
    }
}


/*
let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
let animation2 = new Animation(object2, property2, start, end, duration, delay, timingFunction)

多个动画的时候需要一个时间线
let timeline = new Timeline;

timeline.add(animation)
timeline.add(animation2)

timeline.start()
timeline.pause()
timeline.resume()
timeline.stop()

动画三选一
setTimeout
serInterval
requestAnimationFrame

*/