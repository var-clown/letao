$(function(){
    mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005,
        scrollY: true, //是否竖向滚动
        scrollX: false,
        indicators: false
    })


   
})
function getUrl(k) {
    var str = decodeURI(location.search);
    // console.log(str);
    str = str.slice(1)
    // console.log( str);
    // console.log(str.split("&"));
    var arr = str.split("&");
    var obj = {};
    arr.forEach(function (v, i) {
        var key = v.split("=")[0];
        var value = v.split("=")[1];
        obj[key] = value;
    })
    return obj[k];
}
