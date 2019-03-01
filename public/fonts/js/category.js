$(function(){
    // 发送ajax
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(info){
            console.log(info)
            var htmlStr = template("one",info);
            $(".main-left ul").html(htmlStr);
            render(info.rows[0].id)
        }
    })

    // 点击按钮,左侧实现切换按钮
    $(".main-left ul").on("click", "a",function(){
        //切换current类
        $(".main-left ul a").removeClass("current");
        $(this).addClass("current");
        var id = $(this).data("index");
        render(id);
    })

    //发送ajax,渲染右边的二级目录
  
    function render(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            dataType:"json",
            data:{
                id:id
            },
            success:function(info){
                // console.log(info);
                var htmlStr = template("two",info);
                $(".main-right ul").html(htmlStr)
            }
        })
    }
})