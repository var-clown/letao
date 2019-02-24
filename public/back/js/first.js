$(function () {
    var currenPage = 1;
    var pageSize = 3;
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currenPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                // console.log(info);
                var htmlStr = template("first", info)
                $("tbody").html(htmlStr);

                // 分页
                $("#pagination").bootstrapPaginator({
                    //  设置版本号
                    bootstrapMajorVersion: 3,
                    // 显示第几页
                    currenPage: info.page,
                    // 总条数
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (event, originalEvent, type, page) {
                        currenPage = page;
                        render();

                    }
                })
            }
        })
    }

    // 2.点击添加分类按钮，弹出模态框
    $(".addBtn").on("click",function(){
        $("#addCategory").modal('show');
    })

})