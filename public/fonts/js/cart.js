$(function(){
    // 已进入页面发送ajax请求,渲染页面
    render();
    function render(){

        $.ajax({
            type:"get",
            url:"/cart/queryCart",
            dataType:"json",
            success:function(info){
                // 判断是否登录
                if(info.error ==400){
                    location.href = "login.html?href="+location.href;
                }


                // console.log(info);
              var htmlStr = template("cartTpl",{list:info})
                $("#cartList").html(htmlStr);
            }
        })
    }

    // 点击删除按钮,注册事件委托
    $("#cartList").on("click",".btn_delete",function(){
        // 删除数据
        //  获取到id,发送ajax请求
        var id = $(this).data("id");
        
        $.ajax({
            type:"get",
            url:"/cart/deleteCart",
            dataType:"json",
            data:{
                id:[id]
            },
            success:function(info){
                if(info.success){
                    render();
                }
            }
        })
    })
})