# 每周总结
## 组件化 | One more thing：Vue 风格的 SFC
    参考：https://vuejs.org/v2/guide/single-file-components.html
    课程目标：尝试使用SFC来实现组件化

### 代码：
- 新增carousel.view、myloader.js
- 引用parser.js、createElment.js

### 思路：
 通过parser方法来拆分出carousel.view中的template内容和script内容；
 template内容使用createElement.js生成dom

## 动画animation
    参考：
    https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation

    http://en.wikipedia.org/wiki/Newton’s_method

    https://cubic-bezier.com/#.25,.1,.25,1
### 类的设计
- 从使用出发，设计动画类所需要的参数
    let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
    let animation2 = new Animation(object2, property2, start, end, duration, delay, timingFunction)

- 多个动画的时候需要一个时间线
    let timeline = new Timeline;

- 动画所需要的方法

    timeline.add(animation)
    timeline.add(animation2)

    timeline.start()
    timeline.pause()
    timeline.resume()
    timeline.stop()

- 动画的代码实现，三选一
    setTimeout
    serInterval
    requestAnimationFrame