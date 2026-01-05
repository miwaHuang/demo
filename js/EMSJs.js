$(document).ready(function () {
    if (isIE()) {
        if (!isIE(10) && !isIE(11) && !isIE(12)) {
            alert('很抱歉，系統不支援您的瀏覽器版本，建議您使用IE10(含)以上或Google Chrome瀏覽器。');
        }
    }

    EMSInputAutoOff();
    EMSDataGridInit();
    EMSDateYearSelectInit();
});
//var htmlencoder = require('htmlencode');
function EMSisMobileDevice() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
function isIE(ver) {
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
    return b.getElementsByTagName('i').length === 1
}
function EMSInputAutoOff() {
    $('input').attr("autocomplete", "off");
}
function EMSDataGridInit() {
    $.extend($.fn.datagrid.defaults, {
        loader: function (_6c5, _6c6, _6c7) {
            var opts = $(this).datagrid("options");
            var search_query = getSerialzeData(opts.defaultSearchForm);
            var datagrid = this.id;
            if (opts.LoadSearch == "False" && opts.FirstLoadPage) {
                opts.FirstLoadPage = false;
                return false;
            }

            search_query.push({ name: "NowPage", value: opts.pageNumber });
            search_query.push({ name: "PageSize", value: opts.pageSize });
            search_query.push({ name: "FirstSearch", value: opts.FirstSearchQuery });
            search_query.push({ name: "sortCol", value: opts.sortName });
            search_query.push({ name: "sortMode", value: opts.sortOrder });

            // 補上原本load功能, 將_6e5轉成[{name:'key',value:'value'}]
            if (typeof _6c5 === `object`) {
                const queryParam = Object.entries(_6c5).map(([key, value]) => ({ name: key, value: value }));
                search_query = [...search_query, ...queryParam];
            } // if

            if (!opts.url) {
                return false;
            }

            if ($('#' + datagrid).parents('.datagrid-wrap').find('.EMSSearchNoData').length == 0) {
                const noDataDom = '<div><div class="EMSSearchNoData"><div class="ResultText"><i class="fa fa-file"></i><div>Data Not Found<br />找不到符合條件的資料</div></div></div></div>';
                $('#' + datagrid).parents('.datagrid-wrap').append(noDataDom);
                //$('#' + datagrid).parents('.datagrid-wrap').append($('#' + datagrid).parents('.datagrid-box').find('.EMSSearchNoData').parents('div').html());
            } // if
            if ($('#' + datagrid).parents('.datagrid-wrap').find('.EMSSearchError').length == 0) {
                const searchErrDom = '<div><div class="EMSSearchError"><div class="ResultText"><i class="fa fa-times-circle"></i><div>Get Data Fail<br />資料取得失敗</div></div></div></div>';
                $('#' + datagrid).parents('.datagrid-wrap').append(searchErrDom);
                //$('#' + datagrid).parents('.datagrid-wrap').append($('#' + datagrid).parents('.datagrid-box').find('.EMSSearchError').parents('div').html());
            } // if

            $('#' + datagrid).parents('.datagrid-wrap').find('.EMSSearchNoData').hide();
            $('#' + datagrid).parents('.datagrid-wrap').find('.EMSSearchError').hide();

            $.ajax({
                type: opts.method, url: opts.url, data: search_query, dataType: "json", success: function (data) {
                    _6c6(data);
                    opts.FirstSearchQuery = false;
                    opts.queryParams.reload = null;
                }, error: function () {
                    $('#' + datagrid).parents('.datagrid-wrap').find('.EMSSearchNoData').hide();
                    $('#' + datagrid).parents('.datagrid-wrap').find('.EMSSearchError').show();
                    //強制登出
                    alert('請重新登入系統');
                    window.parent.location = "Account/Logout";
                }
            });
        }
    });
    $.extend($.fn.datagrid.methods, {
        ClearSort: function (jq) {
            return jq.each(function () {
                var panel = $(this).datagrid("getPanel");
                panel.find("div").removeClass("datagrid-sort-asc datagrid-sort-desc");
            });
        },
        editCell: function (jq, param) {
            return jq.each(function () {
                var opts = $(this).datagrid('options');
                var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
                for (var i = 0; i < fields.length; i++) {
                    var col = $(this).datagrid('getColumnOption', fields[i]);
                    col.editor1 = col.editor;
                    if (fields[i] != param.field) {
                        col.editor = null;
                    }
                }
                $(this).datagrid('beginEdit', param.index);
                for (var i = 0; i < fields.length; i++) {
                    var col = $(this).datagrid('getColumnOption', fields[i]);
                    col.editor = col.editor1;
                }
            });
        },
    });
}
function FirstSearchDataGridList(datagrid_id) {
    $('#' + datagrid_id).datagrid("options").FirstSearchQuery = true;
    $('#' + datagrid_id).datagrid("options").sortName = null;
    $('#' + datagrid_id).datagrid("options").sortOrder = null;
    $('#' + datagrid_id).datagrid("ClearSort");
    $('#' + datagrid_id).datagrid('reload');
}
function EMSDateYearSelectInit() {
    $.datepicker._generateMonthYearHeader_original = $.datepicker._generateMonthYearHeader;

    $.datepicker._generateMonthYearHeader = function (inst, dm, dy, mnd, mxd, s, mn, mns) {
        var header = $($.datepicker._generateMonthYearHeader_original(inst, dm, dy, mnd, mxd, s, mn, mns)),
            years = header.find('.ui-datepicker-year');

        years.html(Array.prototype.reverse.apply(years.children()));

        return $('<div />').append(header).html();
    }
}
function DataGridgetWidth(percent) {
    return parseInt(document.body.clientWidth * (percent * 0.01));
}
function getSerialzeData(container_id) {
    var form_cont = $('#' + container_id).find('input,select,textarea').serializeArray();
    return form_cont;
}
function PageFormAjax_Error(xhr, status, error) {
    if (xhr.status == "500")
        $.messager.alert('系統錯誤', '發生錯誤，可能情形：<br />1.傳輸的資料包含不允許的內容!<br />2.程式發生錯誤<br />若重新送出仍出現此訊息請聯繫系統客服').window({ width: 390 });
}
function EMS_SearchDataGrid(datagrid_id) {
    $('#' + datagrid_id).datagrid("options").FirstSearchQuery = true;
    $('#' + datagrid_id).datagrid("options").sortName = null;
    $('#' + datagrid_id).datagrid("options").sortOrder = null;
    $('#' + datagrid_id).datagrid("ClearSort");
    $('#' + datagrid_id).datagrid('reload');
    $('.form-abs-arrow').trigger("tabsShrink");
}
function EMS_getDataGridRows(datagrid_id) {
    return $('#' + datagrid_id).datagrid('getRows');
}
function EMS_getDataGridRow(datagrid_id, row_index) {
    return $('#' + datagrid_id).datagrid('getRows')[row_index];
}
function EMS_getDataGridSelectRow(datagrid_id) {
    return $('#' + datagrid_id).datagrid('getSelected');
}
function EMS_getDataGridSelectRowIndex(datagrid_id) {
    var SelectRow = EMS_getDataGridSelectRow(datagrid_id);
    if (SelectRow == null || SelectRow == undefined)
        return -1;
    else
        return $('#' + datagrid_id).datagrid('getRowIndex', SelectRow);
}
function PageFormNonAjax(block_bool, url, data_form_id, success_fn, error_fn) {
    if (block_bool)
        EMS_Loading();

    $.ajax({
        url: url,
        type: 'POST',
        data: getSerialzeData(data_form_id),
        cache: false,
        async: false,
        success: function (data) {
            if (success_fn != null && success_fn != undefined)
                success_fn(data);
        },
        error: function (xhr, status, error) {
            if (error_fn != null && error_fn != undefined)
                error_fn(xhr, status, error);
            else if (error_fn == null || error_fn == undefined)
                PageFormAjax_Error(xhr, status, error);
        },
        complete: function () {
            if (block_bool)
                EMS_Loaded();
        }
    });
}
function PageFormAjax(block_bool, url, data_form_id, success_fn, error_fn, complete_fn) {
    if (block_bool)
        EMS_Loading();

    $.ajax({
        url: url,
        type: 'POST',
        data: getSerialzeData(data_form_id),
        cache: false,
        async: true,
        success: function (data) {
            if (success_fn != null && success_fn != undefined)
                success_fn(data);
        },
        error: function (xhr, status, error) {
            if (error_fn != null && error_fn != undefined)
                error_fn(xhr, status, error);
            else if (error_fn == null || error_fn == undefined)
                PageFormAjax_Error(xhr, status, error);
        },
        complete: function () {
            if (block_bool)
                EMS_Loaded();
            if (complete_fn != null && complete_fn != undefined)
                complete_fn();
        }
    });
}
function PageDataAjax(block_bool, url, trans_data, success_fn, error_fn, complete_fn) {
    if (block_bool)
        EMS_Loading();
    $.ajax({
        url: url,
        type: 'POST',
        data: trans_data,
        cache: false,
        async: true,
        success: function (data) {
            if (success_fn != null && success_fn != undefined)
                success_fn(data);
        },
        error: function (xhr, status, error) {
            if (error_fn != null && error_fn != undefined)
                error_fn(xhr, status, error);
            else if (error_fn == null || error_fn == undefined)
                PageFormAjax_Error(xhr, status, error);
        },
        complete: function () {
            if (block_bool)
                EMS_Loaded();
            if (complete_fn != null && complete_fn != undefined)
                complete_fn();
        }
    });
}
function PageDataAjaxByGet(block_bool, url, trans_data, success_fn, error_fn, complete_fn) {
    if (block_bool)
        EMS_Loading();
    $.ajax({
        url: url,
        type: 'GET',
        data: trans_data,
        cache: false,
        async: true,
        success: function (data) {
            if (success_fn != null && success_fn != undefined)
                success_fn(data);
        },
        error: function (xhr, status, error) {
            if (error_fn != null && error_fn != undefined)
                error_fn(xhr, status, error);
            else if (error_fn == null || error_fn == undefined)
                PageFormAjax_Error(xhr, status, error);
        },
        complete: function () {
            if (block_bool)
                EMS_Loaded();
            if (complete_fn != null && complete_fn != undefined)
                complete_fn();
        }
    });
}
function ConvertArray(DetailTable, DetailTableId, ConvertAry) {
    var DetailRows = $('#' + DetailTableId).datagrid('getRows');
    var DetailFields = $('#' + DetailTableId).datagrid('getColumnFields');
    for (var i = 0; i < DetailRows.length; i++) {
        for (var j = 0; j < DetailFields.length; j++) {
            ConvertAry.push({ "name": DetailTable + "[" + i + "]." + DetailFields[j], "value": DetailRows[i][DetailFields[j]] });
        }
    }
    return ConvertAry;
}
function ConvertArray_Selected(DetailTable, DetailTableId, ConvertAry) {
    var DetailRows = $('#' + DetailTableId).datagrid('getSelections');
    var DetailFields = $('#' + DetailTableId).datagrid('getColumnFields');
    for (var i = 0; i < DetailRows.length; i++) {
        for (var j = 0; j < DetailFields.length; j++) {
            ConvertAry.push({ "name": DetailTable + "[" + i + "]." + DetailFields[j], "value": DetailRows[i][DetailFields[j]] });
        }
    }
    return ConvertAry;
}
function ConvertToTransData(prefix, obj) {
    var result = [];
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            result.push(...ConvertToTransData(`${prefix}[${i}]`, obj[i]));
        } // for
    } // if
    else if (obj && typeof obj === 'object') {
        for (var key in obj) {
            result.push(...ConvertToTransData(`${prefix}.${key}`, obj[key]));
        } // for
    } // else if
    else {
        result.push({ name: prefix, value: obj });
    } // else
    return result;
} // ConvertToTransData()
function EMS_Loading() {
    $.blockUI({
        css: {
            'z-index': '9999',
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}
function EMS_Block_Loading(target) {
    $('#' + target).block({
        css: {
            width: '300px',
            'z-index': '9999',
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}
function EMS_Loaded() {
    $.unblockUI();
}
function EMS_Block_Loaded(target) {
    $('#' + target).unblock();
}
function EMS_POST_ReloadSelect(url, trans_data, target_selector, default_value, loaded_fn) {
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        async: true,
        data: trans_data,
        success: function (data) {
            var options = "";
            var selected = "";
            if (data.DataList != undefined && data.DataList.length > 0) {
                $.each(data.DataList, function (index, item) {
                    selected = (default_value != undefined && default_value == item.Value) ? "selected" : "";
                    options += "<option value='" + item.Value + "' " + selected + " >" + item.Text + "</option>";
                });
                target_selector.html(options);
                if (loaded_fn != null && loaded_fn != undefined)
                    loaded_fn(data);
            }
        },
        error: function (xhr, status, error) {
            PageFormAjax_Error(xhr, status, error);
        },
        complete: function () {
        }
    });
}
function EMS_POST_ReloadSelectGroup(url, trans_data, target_selector, default_value, loaded_fn) {
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        async: true,
        data: trans_data,
        success: function (data) {
            const options = [];
            if (data.DataList != undefined && data.DataList.length > 0) {
                $.each(data.DataList,
                    function (groupIdx, group) {
                        const groupOpts = [];
                        $.each(group.OptionList, function (optIdx, opt) {
                            groupOpts.push(`<option value='${opt.Value}' ${(default_value && default_value == opt.Value) ? `selected` : ``}>${opt.Text}</option>`);
                        });

                        if (!group.GroupName && group.OptionList != null && group.OptionList.length == 1) {
                            options.push(`${groupOpts.join()}`);
                        } // if
                        else {
                            const groupOpt = `<optgroup label="${group.GroupName || ''}">${groupOpts.join()}</optgroup>`;
                            options.push(groupOpt);
                        } // else
                    });
                target_selector.html(options.join());
                if (loaded_fn != null && loaded_fn != undefined)
                    loaded_fn(data);
            }
        },
        error: function (xhr, status, error) {
            PageFormAjax_Error(xhr, status, error);
        },
        complete: function () {
        }
    });
}
function EMS_POST_ReloadSelect_Zero(url, trans_data, target_selector, default_value, loaded_fn) {
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        async: true,
        data: trans_data,
        success: function (data) {
            var options = "";
            var selected = "";
            if (data.DataList != undefined && data.DataList.length > 0) {
                $.each(data.DataList, function (index, item) {
                    selected = (default_value != undefined && default_value == item.Value) ? "selected" : "";
                    options += "<option value='" + item.Value + "' " + selected + " >" + item.Text + "</option>";
                });
                target_selector.html(options);
                if (loaded_fn != null && loaded_fn != undefined)
                    loaded_fn(data);
            }
            else {
                options += "<option value=''>請選擇</option>";
                target_selector.html(options);
                if (loaded_fn != null && loaded_fn != undefined)
                    loaded_fn(data);
            }
        },
        error: function (xhr, status, error) {
            PageFormAjax_Error(xhr, status, error);
        },
        complete: function () {
        }
    });
}
function EMS_ReloadSelect(url, target_select_id, default_value, loaded_fn) {
    $.ajax({
        url: url,
        type: 'GET',
        cache: false,
        async: true,
        success: function (data) {
            var options = "";
            var selected = "";
            if (data.DataList != undefined && data.DataList.length > 0) {
                $.each(data.DataList, function (index, item) {
                    selected = (default_value != undefined && default_value == item.Value) ? "selected" : "";
                    options += "<option value='" + item.Value + "' " + selected + " >" + item.Text + "</option>";
                });
                $('#' + target_select_id).html(options);
                if (loaded_fn != null && loaded_fn != undefined)
                    loaded_fn(data);
            }
        },
        error: function (xhr, status, error) {
            PageFormAjax_Error(xhr, status, error);
        },
        complete: function () {
        }
    });
}
function EMS_ReloadSelectNonAsync(url, target_select_id, default_value, loaded_fn) {
    $.ajax({
        url: url,
        type: 'GET',
        cache: false,
        async: false,
        success: function (data) {
            var options = "";
            var selected = "";
            if (data.DataList != undefined && data.DataList.length > 0) {
                $.each(data.DataList, function (index, item) {
                    selected = (default_value != undefined && default_value == item.Value) ? "selected" : "";
                    options += "<option value='" + item.Value + "' " + selected + " >" + item.Text + "</option>";
                });
                $('#' + target_select_id).html(options);
                if (loaded_fn != null && loaded_fn != undefined)
                    loaded_fn(data);
            }
        },
        error: function (xhr, status, error) {
            PageFormAjax_Error(xhr, status, error);
        },
        complete: function () {
        }
    });
}
function EMS_ReloadSelectBySelector(url, target_select, default_value, loaded_fn) {
    $.ajax({
        url: url,
        type: 'GET',
        cache: false,
        async: true,
        success: function (data) {
            var options = "";
            var selected = "";
            if (data.DataList != undefined && data.DataList.length > 0) {
                $.each(data.DataList, function (index, item) {
                    selected = (default_value != undefined && default_value == item.Value) ? "selected" : "";
                    options += "<option value='" + item.Value + "' " + selected + " >" + item.Text + "</option>";
                });
                target_select.html(options);
                if (loaded_fn != null && loaded_fn != undefined)
                    loaded_fn(data);
            }
        },
        error: function (xhr, status, error) {
            PageFormAjax_Error(xhr, status, error);
        },
        complete: function () {
        }
    });
}
function EMS_OpenDialog(dialog_id, url, onload_fn) {
    var Random = Math.random(1, 2);

    PageDataAjax(false, "../Base/PageLoadValid", null, function (response) {
        if (response.LoadTF == "Y") {
            OpenEMSDialog(dialog_id, url, onload_fn);
        }
        else {
            alert('請重新登入系統');
            window.parent.location = "Account/Logout";
        }
    }, function () {
        $.messager.alert('緊急醫療管理系統', "功能開啟發生錯誤");
    });
}
function getEMSLoadingCss() {
    var Css = '<div class="loader" id="loader">' +
        '<div class="loadbg"></div>' +
        '<div class="load_icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.88 179.88">' +
        '<text x="30" y="110" dx="0,0.1,0.1" class="line" style="font-size:4.5em">EMS</text>' +
        '</svg>' +
        '</div>' +
        '<div class="load_icon one">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.88 179.88">' +
        '<circle class="circle two" cx="89.94" cy="89.94" r="86.44" />' +
        '</svg>' +
        '</div>' +
        '<div class="load_icon two">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.88 179.88">' +
        '<circle class="circle one" cx="89.94" cy="89.94" r="79.56" />' +
        '</svg>' +
        '</div>' +
        '</div>';

    //Css = '<div class="EMSLoading"></div>';

    return Css;
}
function AppendHtmlFunc(jElement, html) {
    if (jElement && typeof jElement.html == 'function') jElement.html(html);
} // AppendHtmlFunc()
function OpenEMSDialog(dialog_id, url, onload_fn) {
    const $dialog = $(`#${dialog_id}`);
    $dialog.off('shown.bs.modal');
    $dialog.one('shown.bs.modal', function () {
        $dialog.attr('data-url', url);
        $dialog.find('.modal-body').html(getEMSLoadingCss());
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            async: true,
            success: function (response) {
                if (this.append) this.append($dialog.find('.modal-body'), response);
                if (onload_fn != null && onload_fn != undefined)
                    onload_fn();
            }.bind({ append: AppendHtmlFunc }),
            error: function (xhr, status, error) {
                $.messager.alert(`錯誤`, error, `error`);
            }
        });
    });
    $dialog.modal('show');
    $dialog.off('hidden.bs.modal');
    $dialog.on('hidden.bs.modal', function (e) {
        const targetId = e.target.id;
        if (targetId == dialog_id) {
            $dialog.find('.modal-body').html(getEMSLoadingCss());
            $dialog.off('hidden.bs.modal');
        } // if
    });
}
function OpenEMSDialogNoURL(dialog_id, onload_fn) {
    $('#' + dialog_id).off('shown.bs.modal');
    $('#' + dialog_id).modal('show');
    $('#' + dialog_id).on('shown.bs.modal', function () {
        if (onload_fn != null && onload_fn != undefined)
            onload_fn();
    });
    $('#' + dialog_id).off('hidden.bs.modal');
    $('#' + dialog_id).on('hidden.bs.modal', function () {
        //$('#' + dialog_id).find('.modal-body').html(getEMSLoadingCss());
    });
}
function EMS_CloseDialog(confirm_bool, dialog_id) {
    if (confirm_bool) {
        $.messager.confirm('系統提示', '確定要關閉本視窗?', function (r) {
            if (r) {
                $('#' + dialog_id).find('.modal-header .opendate').remove();
                $('#' + dialog_id).modal('hide');
            }
        });
    }
    else {
        $('#' + dialog_id).find('.modal-header .opendate').remove();
        $('#' + dialog_id).modal('hide');
    }
}
function EMS_ReloadDialog(confirm_bool, dialog_id, onload_fn) {
    var dialog_url = $('#' + dialog_id).attr('data-url');

    if ($.trim(dialog_url) == "") {
        $.messager.alert('系統提示', '無法重新整理');
    }

    if (confirm_bool) {
        $.messager.confirm('系統提示', '確定要重新整理?', function (r) {
            if (r) {
                EMS_ReloadDialog_Fn(dialog_id, dialog_url, onload_fn);
            }
        });
    }
    else {
        EMS_ReloadDialog_Fn(dialog_id, dialog_url, onload_fn);
    }
}
function EMS_ReloadDialog_Fn(dialog_id, url, onload_fn) {
    PageDataAjax(false, '../Base/PageLoadValid', null, function (response) {
        if (response.LoadTF == "Y") {
            $('#' + dialog_id).find('.modal-body').html(getEMSLoadingCss());
            $.ajax({
                url: url,
                type: 'GET',
                cache: false,
                async: true,
                success: function (response) {
                    if (this.append) this.append($('#' + dialog_id).find('.modal-body'), response);
                    //$('#' + dialog_id).find('.modal-body').html(response);
                    if (onload_fn != null && onload_fn != undefined)
                        onload_fn();
                }.bind({ append: AppendHtmlFunc })
            });
        }
        else {
            alert('請重新登入系統');
            parent.window.location = "../Account/Logout";
        }
    }, function () {
        $.messager.alert('系統提示', "功能開啟發生錯誤");
    });
}
function EMS_OutputFile_Success(reponse) {
    if (reponse.Result) {
        if (reponse.Filecode != null && reponse.Filecode != "")
            window.location = "../Download/" + reponse.Filetype + "?ori_file=" + encodeURIComponent(reponse.Filename) + "&newname=" + reponse.Filecode;
        else
            window.location = "../Download/" + reponse.Filetype + "?ori_file=" + encodeURIComponent(reponse.Filename);
    }
    else {
        $.messager.alert('系統提示', reponse.Message).window({ width: 320 });
    }
}
function EMSTrack(TRACK_ID) {
    PageDataAjax(false, '../Other/EMSTrack', new Array({ 'name': 'TrackID', 'value': TRACK_ID }), function (response) {

    });
}
//查詢條件文字化顯示，formname=查詢功能表名稱，target=要寫入文字的id
function QueryText(formname, target) {
    var TransData = getSerialzeData(formname);
    var form = $('#' + formname);
    var Ｑtext = "";
    if (TransData != null && TransData.length > 0) {
        for (var i = 0; i < TransData.length; i++) {

            if (TransData[i].name != "" && TransData[i].value != "" && $('#' + formname).find('label').eq(i).text() != "" && $('#' + formname).find('label').eq(i).text() != null) {
                if (Ｑtext != "") { Ｑtext += "、"; }
                if (form.find('#' + TransData[i].name).find('option:selected').text() != "")
                    Ｑtext += $('#' + formname).find('label').eq(i).text() + '【' + form.find('#' + TransData[i].name).find('option:selected').text() + '】';
                else
                    Ｑtext += $('#' + formname).find('label').eq(i).text() + '【' + TransData[i].value + '】';
            }
        }
        if (Ｑtext == "")
            Ｑtext = "無查詢條件";
        $('#' + target).text(Ｑtext);
    }
    else {
        $('#' + target).text("無查詢條件");
    }
}
// 查詢條件文字化顯示
// formId = 查詢功能表 ID
// targetId = 要寫入文字的元素 ID
// 條件名稱使用外層第一個 form-group 下的第一個 label 內容
// 支援: input[type="text"], input[type="number"], input[type="date"], select
function QueryTextByFormGroup(formId, targetId) {
    const transData = getSerialzeData(formId);
    const $form = $(`#${formId}`);
    const $targetElm = $(`#${targetId}`);
    const conditions = [];
    if (!transData || transData.length == 0) {
        $targetElm.text(`無查詢條件`);
        return;
    } // if

    for (const tmpData of transData) {
        const name = tmpData.name;
        const value = tmpData.value;
        const $inputElm = $form.find(`[name="${name}"]`);
        const $label = $inputElm.closest('.form-group').find('label:first');
        if (name == `__RequestVerificationToken`) continue;
        if (!name) continue;
        if (!value) continue;
        if ($inputElm.length == 0) continue;
        if ($label.length == 0) continue;
        const label = $label.text().trim();

        if ($inputElm.is(`input[type="text"], input[type="number"], input[type="date"]`)) {
            conditions.push(`${label}【${value}】`)
        } // if
        else if ($inputElm.is(`select`)) {
            const $selected = $inputElm.find(`option:selected`);
            if ($selected.length == 0) continue;
            const selectedText = $selected.text();
            conditions.push(`${label}【${selectedText}】`)
        } // if
    } // for

    $targetElm.text(conditions.length == 0 ? `無查詢條件` : conditions.join(`、`));
} // QueryTextByFormGroup()
//查詢結果時間顯示，target=要寫入文字的id，timetype=時間格式
function ShowNowTime(target, timetype) {
    var NowDate = new Date();
    var YY = NowDate.getFullYear();
    var MM = NowDate.getMonth() + 1;
    if (MM < 10) { MM = '0' + MM; }
    var DD = NowDate.getDate();
    if (DD < 10) { DD = '0' + DD; }
    var h = NowDate.getHours();
    if (h < 10) { h = '0' + h; }
    var m = NowDate.getMinutes();
    if (m < 10) { m = '0' + m; }
    var s = NowDate.getSeconds();
    if (s < 10) { s = '0' + s; }

    if (timetype == "A") {
        $('#' + target).text(YY + '-' + MM + '-' + DD + ' ' + h + ':' + m);
    }
    else if (timetype == "B") {
        $('#' + target).text('統計時間：' + YY + '/' + MM + '/' + DD + '/ ' + h + ':' + m + ':' + s);
    }
    else if (timetype == "C") {
        $('#' + target).text(YY + '年' + MM + '月' + DD + '日 ' + h + ':' + m);
    }
    else
        $('#' + target).text(YY + '/' + MM + '/' + DD + ' ' + h + ':' + m + ':' + s);
}

//取得Cookie中特定值
function GetCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(`;`).shift();
    return null;
} // GetCookie()

// 判斷使用者是否使用手機瀏覽
function IsMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
} // IsMobile()
// DataGrid Resize, opt { minWidth: 100, id: tableId }
function EMSDataGridResize(opt) {
    if (opt.running) return;
    if (opt.timeOut) clearTimeout(opt.timeOut);
    const $dg = $(`#${opt.id}`);
    if ($dg.length == 0 || !$dg.data(`datagrid`)) return;
    opt.timeOut = setTimeout(function () {
        opt.running = true;
        $dg.datagrid(`resize`);
        const sourceFitColumns = $dg.datagrid(`options`).fitColumns;
        $dg.datagrid(`options`).fitColumns = $dg.datagrid(`options`).width > opt.minWidth;
        setTimeout(function () {
            if (sourceFitColumns != $dg.datagrid(`options`).fitColumns) $dg.datagrid(`resize`);
            opt.timeOut = null;
            opt.running = false;
        }, 100);
    }, 500);
} // DataGridResize()
// 設定Table因視窗變化自動resize的建
function SetDataGridResizeEvent({ id, minWidth }) {
    if (!id) return;
    if (!minWidth) return;
    const opt = { id, minWidth };
    const eventName = `resize.${id}`;
    $(window).on(eventName, function () {
        const $dg = $(`#${id}`);
        if ($dg.length > 0) {
            EMSDataGridResize(opt);
        } // if
        else {
            $(window).off(eventName);
        } // else
    });
} // SetDataGridResizeEvent()
// 呼叫js function 如果它存在
function RunFunctionByName(funcName, params) {
    if (funcName && typeof window[funcName] === `function`) return window[funcName](params);
} // RunFunctionByName()
//EMS用datagrid的統一formatter
function EMSDataGridBaseFormatter(v, r, i, t) {
    if (v != null || v != undefined) return `<span title=${t || v}>${v}</span>`;
    else return `<span style="color: gray;">-</span>`;
} // EMSDataGridBaseFormatter()