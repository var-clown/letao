$(function(){
    // 已进入页面需要发送ajax请求
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        dataType:"json",
        success:function(info){
            // console.log(info);
            if(info.error === 400){
                // 表示未登录,跳转到登录页
                location.href = "login.html";
                return;
            }
            var htmlStr = template("one",info);
            $("#userInfo").html(htmlStr);
        }   
    })

    // 点击退出按钮,
    $("#logout").on("click",function(){
        $.ajax({
            type:"get",
            url:"/user/logout",
            dataType:"json",
            success:function(info){
                if(info.success){
                    location.href = "login.html"
                }
            }
        })
    })
})