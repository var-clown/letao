$(function () {
    // 获取到地址栏的关键字
    var name = getUrl("key");

    // 1.将关键字赋值给input
    $(".input-search").val(name)
    // 2.一进入页面,根据搜索关键字发送了ajax请求
    render();

    function render() {
        // 展示的是lodding的盒子
        $('.main-product').html('<div class="loading"></div>');
        var pramObj = {}
        // 必须传的三个参数
        pramObj.proName = $(".input-search").val(),
            pramObj.page = 1;
        pramObj.pageSize = 100;
        // 可传参数,根据是否要排序,决定是否传参
        // 根据a是否有高亮,觉点是否要排序
        var $current = $(".sort a.current");
        if ($current.length === 1) {
            //   此时有a高亮,则要进行传参
            // 判断是要价格进行排序还是库存进行排序//
            var sortName = $current.data("type"); //获取排序的类型

            var sortValue = $current.find("i").hasClass("fa fa-angle-down") ? 2 : 1;
            pramObj[sortName] = sortValue;
        }
        // console.log(pramObj);

        // 发送ajax请求
        setTimeout(function () {
            $.ajax({
                type: "get",
                url: "/product/queryProduct",
                dataType: "json",
                data: pramObj,
                success: function (info) {
                    console.log(info);
                    var htmlStr = template("one", info);
                    $(".main .main-product").html(htmlStr)
                }
            })
        }, 1500)

    }

    // 3.点击btn搜索按钮,发送ajax请求
    $(".btn-search").on("click", function () {
        render();
    })

    // 4.先实现点击切换高亮效果
    // (1)点击当前的如果没有,添加current类名
    // (2)判断当前的a有没有这个类名,如果有,那么切换上下箭头
    $(".sort a[data-type]").on("click", function () {
        if ($(this).hasClass("current")) {
            // 有current这个类,切换箭头(有就删,没有就添加)
            $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down")
        } else {
            // 没有这个类,添加这个类
            $(this).addClass("current").siblings().removeClass("current");
        }
        render();
    })

})