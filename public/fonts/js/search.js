$(function () {
    // 操作localStorage
    //  var arr = ["匡威","耐克","阿迪","李宁"]
    // var jsonStr = JSON.stringify(arr);
    // console.log(jsonStr);
    // localStorage.setItem("list",jsonStr)


    // 1.历史记录渲染功能
    // (1)获取到本地历史
    // (2)获取到jsonStr,转换成数组
    // (3)渲染搜索历史列表

    render()
    // 获取本地存储
    function gethistory() {
        var jsonStr = localStorage.getItem("list") || "[]";
        console.log(jsonStr);
        // 转换成数组
        var arr = JSON.parse(jsonStr)
        console.log(arr);
        return arr;
    }
    // 根据获取到的这个数组,动态渲染到页面中
    function render() {
        var arr = gethistory();

        var htmlStr = template("one", {
            arr: arr
        })
        $(".history").html(htmlStr)
    }


    // 功能2:点击清空历史记录
    // (1)点击清空按钮(注册事件委托,)
    // (2)移除本地的数据,
    // (3)页面重新渲染

    $(".history").on("click", ".btn-empty", function () {

        //  弹出确认框
        mui.confirm("你确认要清空历史记录吗", "温馨提示", ["取消", "确定"], function (e) {
            // console.log(e);
            if (e.index === 1) {
                localStorage.removeItem("list");
                render();
            }

        })

    })


    // 功能3:点击删除单个历史记录
    // (1)给删除按钮注册事件委托
    // (2)从本地获取到对应的数组
    // (3)根据该条数据 的index ,在数组中删除该条数据
    // (4)删除过后的数组存储到本地
    // (5)重新渲染页面
    $(".history").on("click", ".btn_delete", function () {
        var index = $(this).data("index");
        //    console.log(index);
        var arr = gethistory();
        arr.splice(index, 1);
        var jsonStr = JSON.stringify(arr);

        localStorage.setItem("list", JSON.stringify(arr))
        render();

    })


    // 功能4：点击添加功能
    // (1)给搜索按钮注册点击事件
    // (2)获取到input的val,
    // (3)获取到本地的数组，然后将val添加到数组中的第一项
    // (4)转存到本地中
    // (5)重新渲染到页面
    $(".btn-search").on("click",function(){
        var text = $(".input-search").val().trim();
        $(".input-search").val("");
        if(text === ""){
           mui.toast("请输入内容") ;
           return;
        }
        var  arr = gethistory();
        // 判断是否有重复项,有的话删除,
        var index = arr.indexOf(text);
        if(index != -1){
            arr.splice(index,1)
        }
        
        // 判断长度,如果超过5个,就删除数组的最后一项,然后再添加渲染
        if(arr.length >=5){
            arr.pop();
        }

        arr.unshift(text);
        localStorage.setItem("list",JSON.stringify(arr));
        render();

        location.href = "searchList.html?key="+text;
        
    })



})