
import {createElement, Text, Wrapper} from "./createElement";
import {Carousel} from "./carousel.js";
import {Panel} from "./panel.js";
import {TabPanel} from "./TabPanel.js";
import {ListView} from "./ListView.js";


let component = <Carousel data={
    [
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    ]
}>
</Carousel>
console.log(component)
component.mountTo(document.body)

// let panel = <Panel title="this is panel">
//     <div>this is contant</div>
// </Panel>

// let panel = <TabPanel>
//     <span title="title1">this is contant1</span>
//     <span title="title2">this is contant2</span>
//     <span title="title3">this is contant3</span>
//     <span title="title4">this is contant4</span>
//     <span title="title5">this is contant5</span>
// </TabPanel>
// panel.mountTo(document.body)
// window.panel = panel;

// 扩展 Carousel + View
// let panel = <CarouselView>
//     <span>this is contant1</span>
//     <span>this is contant2</span>
//     <span>this is contant3</span>
//     <span>this is contant4</span>
// </CarouselView>

// let data = [
//     {title:"蓝猫",url:"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"},
//     {title:"Ju猫white",url:"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg"},
//     {title:"hua猫",url: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"},
//     {title:"ju猫",url: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"}
// ]
// let list = <ListView data={data}>
//     {record => <figure>
//         <img src={record.url}/>
//         <figcaption>{record.title}</figcaption>
//     </figure>}
// </ListView>
// list.mountTo(document.body)
