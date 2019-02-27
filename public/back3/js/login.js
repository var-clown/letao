

// 做表单校验
$(function () {
    // 1.表单校验
    $("#login").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 校验字段
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"请输入用户名"
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            // 校验密码
            password:{
                validators:{
                    notEmpty:{
                        message:"请输入密码"
                    },
                    callback:{
                        message:"密码错误"
                    },
                    stringLength:{
                       min:6,
                       max:12,
                       message:"用户名长度必须在6到30之间" 
                    }
                }
            }
        }
    })

    // 2.表单校验成功事件,阻止默认事件,发送ajax请求
    $("#login").on("success.form.bv",function(e){
        // 阻止默认
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$("#login").serialize(),
            dataType:"json",
            success:function(info){
                // console.log(info);
                if(info.error == 1000){
                    $("#login").data("bootstrapValidator").updateStatus("username","INVALID","callback")
                }else if(info.error === 1001){
                    $("#login").data("bootstrapValidator").updateStatus("password","INVALID","callback")
                }else if(info.success){
                    location.href = "index.html"
                }
                
            }
        })

    })

    // 3.点击重置按钮,重置表单
    $("[type =reset]").on("click",function(){
        // 点击重置按钮,重置表单
        $("#login").data("bootstrapValidator").resetForm(true)
    })
    
})