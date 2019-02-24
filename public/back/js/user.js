$(function () {
    var currentPage = 1; //默认当前是第一页
    var pageSize = 5; //每页的条数
    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                // console.log(info);
                var htmlStr = template("user", info);
                $("tbody").html(htmlStr);

                //   分页
               $("#pagination").bootstrapPaginator({
                //    设置版本号
                bootstrapMajorVersion:3,
                // 显示第几页
                currentPage:info.pagr,
                // 总页数
                totalPage:Math.ceil(info.total/info.size),

                // 点击页码注册点击事件
                onPageClicked:function(a,b,c,page){
                    currentPage:page,
                    render();
                }
               })
            }
        })
    }

    // 点击禁用按钮/开启按钮，发送ajax请求，修改数据库中的内容，然后重新渲染页面

    var btnId;
    var isDelet;
    $('tbody').on("click","button",function(){
        // 点击按钮，弹出模态框
        $("#statusmodel").modal('show');
        // 获取到按钮的id
        btnId = $(this).parent().data("id")

        // 获取到按钮的状态
        isDelet = $(this).hasClass("btn-danger")?0:1;
        console.log(isDelet);
        
        
    })

    // 点击模态框的确定按钮，发送ajax请求，更新状态
    $(".btnComfir").on("click",function(){
        // 发送ajax请求
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            dataType:"json",
            data:{
                id:btnId,
                isDelete:isDelet
            },
            success:function(info){
                // console.log(info);
                if(info.success){
                    // 让模态框隐藏
                    $("#statusmodel").modal('hide');
                    // 重新渲染表格
                    render();
                }
            }
        })
    })

})