$(function () {




    // 1. 用户名不能为空
    // 2. 用户密码不能为空
    // 3. 用户密码长度为6 - 12 位

    // 进行表单校验初始化
    $("#form-login").bootstrapValidator({

        // 显示图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },

        //    指定校验guize
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"用户密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"户密码长度为6 - 12 位"
                    },
                    callback:{
                        message:"用户密码不正确"
                    }
                }
            }
        }
    })


    //2.使用submit按钮,会进行表单提交,此时表单校验会立即进行校验
    // (1) 校验成功,此时会默认提交,发生页面跳转,注册表单校验成功事件
    // (2)校验失败,自动拦截提交

    $("#form-login").on("success.form.bv",function(e){
        e.preventDefault();
        // 阻止默认提交
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$("#form-login").serialize(),
            dataType:"json",
            success:function(res){
                // console.log(res);
               


                if(res.error ===1000){
                    // 调用插件的实例方法,更新username字段状态失败状态
                    // UpdateStatus(field,status,validator)
                    // 参数1:需要更新的字段
                    // 参数2:需要更新成的状态 VALID(成功) INVALID(失败)
                    // 参数3:配置校验的规则,将来会用配置的规则的message进行提示

                    $("#form-login").data("bootstrapValidator").updateStatus("username","INVALID","callback")
                }else if(res.error ===1001 ){
                   
                    $("#form-login").data("bootstrapValidator").updateStatus("password","INVALID","callback")

                }else if(res.success){
                    location.href = "index.html"
                }
            }
        })
    })



    // 3.点击按钮,重置表单
    // reset按钮,本省就可以重置内容,此时只需要重置状态即可
        // resetForm(false):只重置状态
        // resetForm(true):不仅重置状态,也重置内容
    $("[type=reset]").on("click",function(){
        $("#form-login").data("bootstrapValidator").resetForm()
    })

})


// 进度条功能
