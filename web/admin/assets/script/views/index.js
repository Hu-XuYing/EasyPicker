$(document).ready(function () {
    var baseurl = "http://localhost:8080/reportsPicker/";
    var courseid=-1;//默认课程id
    //页面初始化
    init();
    //保存初始化加载时的课程信息

    /**
     * 打开管理员登录界面
     */
    $('#heart').on('click', function () {
        openModel("#admin-login");
        console.log("success");
    })

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
    }

    /**
     * 获取课程/任务数据
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