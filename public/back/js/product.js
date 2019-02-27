$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  //定义一个数组
  var picArr = [];

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("one", info);
        $("tbody").html(htmlStr);
        //    分页
        $("#pagination").bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),

          // 给页码注册点击事件
          onPageClicked: function (a, b, c, page) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }


  // 2.点击添加按钮，弹出模态框，并发送ajax请求
  $(".addPro").on("click", function () {
    $("#modalpro").modal("show");
    // 发送了ajax请求
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100,
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template("two", info);
        $(".dropdown-menu").html(htmlStr)
      }
    })
  })

  // 3.点击下拉菜单，给每个a注册点击事件(事件委托)
  $(".dropdown-menu").on("click", "a", function () {
    var text = $(this).text();
    // 修改按钮的文字
    $("#btnText").text(text);
    // 将id赋值给隐藏域
    $('[name="brandId"]').val($(this).data("id"));
    // 更新校验状态
    $("#form").data('bootstrapValidator').updateStatus("brandId", "VALID")
  })

  // 4.实现本地预览
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      console.log(data);
      var result = data.result; //获取的结果
      var picUrl = result.picAddr; //获取到图片的路径
      picArr.unshift(result);
      $("#imgBox").prepend('<img style="height: 100px;" src="' + picUrl + '" alt="">');

      //判断上传的张图片的个数超过三个的时候
      if (picArr.length > 3) {
        // 删除数组的最后一项,图片结构的最后一张也删除
        picArr.pop();
        // 删除img结构
        // console.log($("#imgBox img:last"));
        $("#imgBox img:last").remove();

      }
      // 更新状态
      if (picArr.length === 3) {
        $("#form").data("bootstrapValidator").updateStatus("picStatus", 'VALID') // 
      }
    }
  })



  // 5.添加表单校验功能
  $("#form").bootstrapValidator({
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置字段列表
    fields: {
      // 二级目录
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      // 商品名称
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      // 商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      // 商品库存
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "商品库存必须要是非零开头的数字"
          }
        }
      },
      // 商品尺码
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            message: "尺码格式,必须是xx-xx格式,xx是两位数",
            regexp: /^\d{2}-\d{2}$/
          }
        }
      },
      // 商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      // 商品现价
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      // 标记图片是否上传满三张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }

        }
      }

    }

  })


  // 表单校验成功事件中,阻止默认行为,发送ajax请求
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();//阻止浏览器的默认行为

    // 获取到表单的基本数据
    var basics = $("#form").serialize();
    //除了基本数据,还需要拼接上图片
    basics += "&picArr=" +JSON.stringify(picArr);
    // 发送ajax
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:basics,
      dataType:"json",
      success:function(info){
        // console.log(info);
        
        if(info.success){
          // 重置表单
          $("#form").data("bootstrapValidator").resetForm(true)
          // 重新渲染
          render();
          // 清空数组
          picArr = [];
          // 重置按钮的文本 
          $("#btnText").text("i请选择二级目录") 
          // 重置清空图片
          $("#imgBox img").remove();
          // 隐藏模态框
          $("#modalpro").modal("hide")

        }
      }
    })

  })
})