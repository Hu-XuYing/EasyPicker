$(document).ready(function () {
    var baseurl = "http://localhost:8080/reportsPicker/";
    //页面初始化
    init();

    /**
     * 打开管理面板
     */
    $('#rewrite').on('click', function () {
        openModel("#rewrite-panel");
        console.log("success");
    })

    /**
     * 课程下拉框发生改变
     */
    $("#course").on('change',function () {
        setdata('children',$(this).val());
    })
    /**
     * 初始化数据
     */
    function init() {
        $('#course').empty();
        $('#task').empty();
        setdata('parents', -1);
        setdataPanel("parents",-1);
    }

    /**
     * 设置下拉框课程/任务数据
     * @param range
     * @param parentid
     */
    function setdata(range, parentid) {
        $.ajax({
            url: baseurl + 'course/check',
            async: true,
            contentType: "application/json",
            type: 'GET',
            data: {
                "range": range,
                "contentid": parentid
            },
            success: function (res) {
                if (res.status == 0 || res.status == '0') {
                    alert('无内容');
                    return;
                }
                if (range == 'parents') {
                    clearselect('#course');
                    for (var i = 0; i < res.data.length; i++) {
                        insertToSelect("#course", res.data[i].name, res.data[i].id);
                    }
                    resetselect("#course");
                } else if (range == 'children') {
                    clearselect("#task");
                    for (var i = 0; i < res.data.length; i++) {
                        insertToSelect("#task", res.data[i].name, res.data[i].id);
                    }
                    resetselect("#task");
                }

            },
            error: function () {
                alert("网络错误");
            }
        })
    }

    /**
     * 设置管理面板数据
     * @param range
     * @param parentid
     */
    function setdataPanel(range, parentid) {
        $.ajax({
            url: baseurl + 'course/check',
            async: true,
            contentType: "application/json",
            type: 'GET',
            data: {
                "range": range,
                "contentid": parentid
            },
            success: function (res) {
                if (res.status == 0 || res.status == '0') {
                    alert('无内容');
                    return;
                }
                if (range == 'parents') {
                    clearpanel('#coursePanel');
                    for (var i = 0; i < res.data.length; i++) {
                        insertToPanel("#coursePanel", res.data[i].name, res.data[i].id,'course');
                    }
                } else if (range == 'children') {
                    clearpanel("#taskPanel");
                    for (var i = 0; i < res.data.length; i++) {
                        insertToPanel("#taskPanel", res.data[i].name, res.data[i].id,'task');
                    }
                }
                $('input[type="radio"]').unbind('click');
                $('input[type="radio"]').on('click',function () {
                    setdataPanel('children',$(this).val());
                })

            },
            error: function () {
                alert("网络错误");
            }
        })
    }

    /**
     * 向下拉选择框插入数据
     * @param selectid
     * @param value
     * @param id
     */
    function insertToSelect(selectid, value, id) {
        $(selectid).append('<option value="' + id + '">' + value + '</option>');
    }

    /**
     * 清空下拉选择框
     * @param selectid
     */
    function clearselect(selectid) {
        $(selectid).empty();
        $(selectid).selected('destroy');
    }

    /**
     * 重置下拉选择框
     * @param selectid
     */
    function resetselect(selectid) {
        $(selectid).selected({
            btnStyle: 'secondary'
        });
    }

    /**
     * 向管理面板插入数据
     * @param panelid
     * @param value
     * @param id
     * @param type 判断是任务还是课程 task/course
     */
    function insertToPanel(panelid, value, id,type) {
        var $li='';
        switch (type) {
            case "task":
                $li='<span class="am-badge am-badge-success am-radius am-margin-top-sm am-text-default" key="'+id+'">'+value+'<i class="am-icon-trash-o del"></i></span>';
                break;
            case "course":
                $li='<label class="am-radio-inline">' +
                    '<input type="radio" name="radio10" value="'+id+'" data-am-ucheck>'+value +
                    '<i class="am-margin-right-sm am-icon-trash-o del"></i>' +
                    '</label>';
                break;
            default:
                break;
        }
        $(panelid).append($li);
    }

    /**
     * 清空管理面板数据
     * @param selectid
     */
    function clearpanel(panelid) {
        $(panelid).empty();
    }

    /**
     * 关闭指定弹出层
     * @param {String} id 弹出层id
     */
    function closeModel(id) {
        $(id).modal('close');
    }

    /**
     * 打开指定弹出层
     * @param {String} id 弹出层id
     * @param {boolean} close 设置点击遮罩层是否可以关闭
     */
    function openModel(id, close) {
        $(id).modal({
            closeViaDimmer: close//设置点击遮罩层无法关闭
        });
        $(id).modal('open');
    }

})
