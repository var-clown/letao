$(function(){
    // 1.进度条功能
    // NProgress.start();
    // NProgress.done()
    //ajax全局事件
    $(document).ajaxStart(function(){
        NProgress.start();
    })

    $(document).ajaxStop(function(){
        NProgress.done();
    })
})