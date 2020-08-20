
var page = require('webpage').create();
page.open('https://www.baidu.com/', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    var body = page.evaluate(function(){
        return "abc";
    })
    console.log(body)
    page.render('baidu.png');
  }
  phantom.exit();
});