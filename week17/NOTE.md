# 每周总结

### 工具链
    按照项目开发阶段分
    开发
    调试
    测试
    发布

### 工具（demo）
1、vue
官网链接:https://cn.vuejs.org/

小工具：vite

创建文件夹tool-chain
cd tool-chain
npm init
npm install @vue/cli
npm remove vue-cli  删除vue-cli
vue --version  查看版本
npm install @vue/cli -g
npm remove -g vue-cli

vue create vue-app
cd vue-app
npm run serve

2、react
官网链接:https://reactjs.org/

npx create-react-app react-app

3、angular
官网链接:https://angular.cn/

npm install -g @angular/cli
ng new my-app

### yeoman
#### 通过实现官网的例子来了解yeoman
官网链接:https://yeoman.io/authoring/

mkdir generator-best
cd generator-best
npm init

npm install --save yeoman-generator  //安装yeoman-generator

文件结构：
├───package.json
└───generators/
    ├───app/
    │   └───index.js
    └───router/
        └───index.js

根据官网的Doc,copy code to app/index.js

npm link 
mkdir best-app  // generator-name 和 name-app 中的name须一致
npm install -g yo  // 需要全局安装一下，yo指令才会被识别
cd best-app
yo best

##### yeoman 的3大核心功能
1、从用户端收集信息的能力
2、npm的能力
3、文件模板template的能力


#### 自定义命令行
mkdir console-ttoolkit
cd console-ttoolkit
npm init
mkdir index.js ———— (console.log("strawberry!"))
node ./index.js ———— strawberry!

光标移动参考链接：https://github.com/heapwolf/cdir/blob/master/cdir.js
npm install ttys

readline：https://nodejs.org/docs/latest-v13.x/api/readline.html
lr封装光标


// demo_1 —— console-toolkit/index.js
```javascript
var tty = require('tty');
var ttys = require('ttys');
var rl = require('readline');


var stdin = ttys.stdin;
var stdout = ttys.stdout;


stdout.write('hello  world!\n');
stdout.write('\033[1A'); // 光标上移
stdout.write('best \n');
```

// demo_2 —— console-toolkit/index.js
```javascript
var tty = require('tty');
var ttys = require('ttys');

var stdin = ttys.stdin;
var stdout = ttys.stdout;

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function ask(question){
    return new Promise((resolve, reject)=>{
        rl.question(question, (answer) => {
            resolve(answer)
        });
    })
}

void async function(){
    console.log(await ask("what's your name?"))
}()
```

