# 每周总结

## Proxy双向代理

### Proxy基本概念

Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。

MDN：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    语法：const p = new Proxy(target, handler)
    参数：
      target
        要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
      handler
        一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

### Proxy DEMO

    <script>
        let handlers = []

        let object = {
            a: 1,
            b: 2
        }

        function reactive(obj) {
            return new Proxy(obj, {
                get(obj, prop){
                    console.log(obj, prop)
                    return obj[prop];
                },
                set(obj, prop,val){
                    obj[prop] = val
                    for(let handler of handlers){
                        handler()
                    }
                    console.log(obj, prop, val)
                    return obj[prop];

                }
            })
        }

        function effect(handler){
            handler()
            handlers.push(handler)
            
        }

        let proxy = new reactive(object)

        let  dummy;

        effect(() => dummy = proxy.a)
        console.log(dummy)
        
        proxy.a = 2;
        console.log(dummy)

    </script>
    
    
## Range


## 对象 与 组件

## ßComponent
- State
- Children

### Attribute VS Property
- Attribute 强调描述性
- Property 强调从属关系

    需要注意区分
    $("input").attr()
    $("input").val()

### lifeCycle

#### children

- content型children 与 Template 的children

## 组件
    carousel

        state
            activeIndex

        property
            loop time imglist autoplay color forward autoplay

        attribute
            startIndex loop time imglist autoplay color forward
        children
            2种
        event
            change click hover swipe resize dbclick
        method
            next() prev() goto() play() stop()

        config
            mode: "useRAF" "useTimeout"

            setInterval(tick, 16)
            setTimeout()
    carouselView
