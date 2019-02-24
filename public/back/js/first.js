$(function () {
    var currenPage = 1;
    var pageSize = 5;
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

    // 3.表单的校验功能
    $("#form-add").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },

        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message: '用户名不能为空'
                    }
                }
            }
        }
    })

    // 4.注册表单校验成功事件，取消默认发送方式，用ajax方式发送请求
    $('#form-add').on('success.form.bv', function( e ){
        e.preventDefault(); // 阻止默认的提交

        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form-add").serialize(),
            dataType:"json",
            success:function(info){
                // console.log(info);
                // 隐藏模态框
                $("#addCategory").modal('hide');
                // 重新渲染表单
                render();

                //重置表单
                $("#form-add").data('bootstrapValidator').resetForm(true)
                
            }   
        })
    })

})