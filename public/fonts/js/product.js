$(function () {
    var proId = getUrl("proid");
    // console.log(proId);

    render();

    function render() {
        // 发送ajax
        $.ajax({
            type: "get",
            url: "/product/queryProductDetail",
            data: {
                id: proId
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("one", info)
                $(".lt_main .mui-scroll").html(htmlStr);

                // 初始化轮播图
                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                });

                // 初始化数字框
                mui(".mui-numbox").numbox()
            }

        })
    }

    // 1.给尺码添加可选功能(事件委托)
    $(".lt_main").on("click",".lt_size span",function(){
        // 点击span添加current类名
        $(this).addClass("current").siblings().removeClass("current")
        
    })


    // 2.点击添加按钮,添加购物车的功能
    $("#addCart").on("click",function(){
        
        var size = $(".lt_size span.current").text();
        if(!size){
            mui.toast("请选择尺码");
            return;
        }
        var num = $(".mui-numbox-input").val();
        // 发送ajax
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                productId:proId,
                num: num,
                size:size 
            },
            dataType:"json",
            success:function(info){
                if(info.error === 400){
                    // 没有登录,跳转到登录页
                    location.href = "login.html?href="+location.href;
                }

                if(info.success){
                    // 已登录,加入购物车,给用户提示添加成功
                    mui.confirm("加入成功","温馨提示",["去购物车","继续浏览"],function(e){
                        if(e.index ==0){
                            location.href = "car.html";
                        }
                    })
                }
                
            }
        })
        
    })

})