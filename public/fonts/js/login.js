$(function () {


    $("#loginBtn").on("click", function () {
        //点击登录按钮,发送ajax
        var username = $("#username").val().trim();
        $("#username").val("");
        var password = $("#password").val().trim();
        $("#password").val("");
        if (username == "") {
            mui.toast("请输入用户名");
            return;
        }
        if (password == "") {
            mui.toast("请输入密码");
            return;
        }
        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: username,
                password: password
            },
            dataType: "json",
            success: function (info) {
                // console.log(info);
                // 判断url是否下带了数据,如果有,则返回上一页,没有则返回用户中心

                if (info.error) {
                    mui.toast("用户名或密码错误")
                }
                if (info.success) {

                    if (location.search.indexOf("href") != -1) {
                        // ?href=http://localhost:3000/fonts/product.html?proid=8
                        console.log(location.search.replace("?href=", ""));
                        var url = location.search.replace("?href=", "");
                        location.href = url;

                    } else {
                        location.href = "user.html";
                    }
                }


            }
        })
    })
})