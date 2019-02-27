$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render()
    function render(){
        // 发送ajax请求
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr = template("second",info);
                $("tbody").html(htmlStr);

                // 实现分页
                $("#pagination").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page,
                        render();
                    }
                })
            }
        })
    }

    // 2.点击添加分类，弹出模态框
    $(".btnsecond").on("click",function(){
        $("#add").modal("show");
        // 发送ajax请求，获取一级分类的数据
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100,
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr = template("two",info)
               $(".dropdown-menu").html(htmlStr) ;

              
            }
        })
    })


    // 给下拉菜单里面的a注册点击事件
    $(".dropdown-menu").on("click","a",function(){
        $("#dropdownText").text($(this).text());

        // 获取到categoryId,赋值给隐藏域的val
        var id = $(this).data('id');
        // console.log(id);
     
      $('[name="categoryId"]').val(id);
     
    //   动态更新表单状态
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID")
        

    })

    // 实现图片预览
    $("#fileupload").fileupload({
        dataType:"json",
        done:function(e,data){
            // console.log(data);
            var imgUrl = data.result.picAddr;
            // console.log(imgUrl);
            // 赋值给img的url
            $("#imgBox img").attr("src",imgUrl)
            
            // 将路径赋值给隐藏域的input的val
            $('[name="brandLogo"]').val(imgUrl);

            // 只要隐藏域有值了,就更新成成功状态
            $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID")
        }
    })

    
    // 做表单校验
    $("#form").bootstrapValidator({
        // 1.指定不校验的类型
        excluded: [],


        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },

        //   3.指定校验字段
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请添加一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类"
                    }
                }

            },
            brandLogo:{
                validators: {
                    notEmpty: {
                      message: '请选择图片'
                    }
                  }
            }
        }
    })


    // 在表单校验成功事件后,阻止默认行为 ,发送ajax请求,
    $("#form").on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
                // console.log(info);
                if(info.success){
                    $("#add").modal("hide");
                    currentPage = 1;
                    render();

                    // 重置下表单
                    $("#form").data("bootstrapValidator").resetForm(true);
                    // bottom和img手动重置
                    $("#dropdownText").text("请选择一级分类");
                    $("#imgBox img").attr("src","./images/none.png")
                }
                
            }
        })
    })
})