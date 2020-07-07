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

### Proxy DEMO 01

    <script>
        let object = {
            a: 1,
            b: 2
        }

        let proxy = new Proxy(object, {
            get(obj, prop){
                console.log(obj, prop)
                return obj[prop];
            },
            defineProperty(obj, prop, desc){
                console.log(arguments)
                return Object.defineProperty(obj, prop, desc)
            }
        })
    </script>
    
### Proxy DEMO 02

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
    
### Proxy DEMO 03


    <script>
        let handlers = new Map()

        let useReactivities = [];

        let object = {
            a: 1,
            b: 2
        }

        function reactive(obj) {
            return new Proxy(obj, {
                get(obj, prop){
                    useReactivities.push([obj, prop])
                    return obj[prop];
                },
                set(obj, prop,val){
                    obj[prop] = val
                    if(handlers.get(obj))
                        if(handlers.get(obj).get(prop))
                            for(let handler of handlers.get(obj).get(prop)){
                                handler()
                            }
                    console.log(obj, prop, val)
                    return obj[prop];

                }
            })
        }

        function effect(handler){
            useReactivities = [];
            handler()

            console.log(useReactivities)
            for(let useReactivity of useReactivities){
                let [obj, prop] = useReactivity
                console.log([obj, prop])

                if(!handlers.has(obj)){
                    handlers.set(obj, new Map())
                }

                if(!handlers.get(obj).has(prop)){
                    handlers.get(obj).set(prop,[])
                }

                handlers.get(obj).get(prop).push(handler)
            }
        }

        let proxy = new reactive(object)

        console.log(proxy)

        let  dummy;

        effect(() => dummy = proxy.a)
        console.log(dummy) // 1
        
        proxy.a = 2;
        console.log(dummy) // 2

    </script>
 
 
### Proxy DEMO 04

    
## Range & 组件
