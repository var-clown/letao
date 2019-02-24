// 前端不知道用户的当前状态,但是后台知道,所有发骚那个ajax请求
$.ajax({
    type:"get",
    url: '/employee/checkRootLogin',
    dataType:"json",
    success:function(info){
        if(info.error === 400){
            location.href = "login.html"
        }
    }
})