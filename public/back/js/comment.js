
    // 进度条功能
    // NProgress.start() ;
    // NProgress.done() 

    // 在发送第一个ajax请求的时候,开启进度条
    // 在全部的ajax完成时,关闭进度条

    $(document).ajaxStart(function(){
        // 开启进度条
        NProgress.start();
    })

    $(document).ajaxStop(function(){
        // 关闭进度条
        NProgress.done();
    })


    // 功能的共能
    // 1.左侧二级菜单栏的切换
    // 2.左侧整个菜单栏的切换
    // 3.公共的退出
    $(function(){
        //1.左侧二级菜单栏的切换
         $(".aside .category").on("click",function(){
            //  让下一个兄弟原始,切换显示
            $(this).next().stop().slideToggle();
         });


        // 2.左侧整个菜单栏的切换 
        $(".topbar .pull-left").on("click",function(){
            $(".aside").toggleClass("hidemenu");
            $(".topbar").toggleClass("hidemenu");
            $(".main").toggleClass("hidemenu");
        })

        //  3.公共的退出
        $(".topbar .pull-right").on("click",function(){
            $('#modellogout').modal('show')
        })


        // 4.点击模态框,表示确认退出
        // 发送ajax请求,,请求服务器销毁用户登录状态
        $("#modellogout .modal-footer .btn-primary").on("click",function(){
            $.ajax({
                type:"get",
                url:'/employee/employeeLogout',
                dataType:"json",
                success:function(info){
                    if(info.success){
                        location.href = "login.html";
                    }
                }
            })
        })
    })
