# 每周总结 class1

## Dev工具
### Server
- build:webpack babel vue jsx postcss
- watch:fsevent
- mock:postman
- http:ws

### Client
- debugger:vscode devtool
- source map


### 工具浏览

#### 1、babel使用
打开babel官网 https://babeljs.io/

全局安装babel
npm install -g @babel/core @babel/cli @babel/preset-env

项目安装babel
npm install --save-dev @babel/core @babel/cli @babel/preset-env

创建文件夹babel,创建文件demo.js

vue-next:https://github.com/vuejs/vue-next/tree/master/packages/compiler-sfc/__tests__

https://github.com/vuejs/vue-next/blob/master/packages/compiler-sfc/__tests__/compileTemplate.spec.ts


#### 2、npm的使用

创建文件夹npm-demo
npm init
npm install npm
创建文件main.js


#### 3、fsevent ———— MAC
mkdir watcher 
touch watcher.js
npm install fsevents

文档：https://github.com/fsevents/fsevents/

https://webpack.js.org/configuration/devtool/#root

#### 4、debugger
https://developer.chrome.com/devtools/docs/debugger-protocol

1、vscode

#### 5、source map
http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html


# class2(2020-08-08)
## 单元测试——工具
课程安排：
1、mocha：https://mochajs.org/
2、nyc：https://www.npmjs.com/package/nyc
3、jest

### 1、mocha
mkdir test-demo
cd test-demo
npm init

npm install --save-dev mocha
mkdir test 
mkdir src

           — — — src _ _ _ add.js
test-demo |     
          |_ _ _ test _ _ _ add.test.js 

node 升级为current版本
在package.json中加上 "type": "module"
可以用import 来引用 文件中的export

mkdir .nycrc

package.json
    ----   
    "scripts": {
        "test": "mocha",
        "coverage": "nyc mocha"
    },

使用babel
npm install --save-dev babel-loader @babel/core @babel/presets-env

mkdir dist
babel ./src/add.js > ./dist/add.js

2、ava
https://github.com/avajs/ava

npm install -save-dev ava

    package.json
            ----   
            "scripts": {
                "test": "ava",
                "coverage": "nyc ava"
            },
npm run test