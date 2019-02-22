
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
