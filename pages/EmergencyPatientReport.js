// EmergencyPatientReport.js - 緊急醫療救護傷患通報維護組件
// 依賴檔案: CommonData.js（必須先載入）

const EmergencyPatientReportPage = {
  // 生成 HTML 內容
  getContent: function () {
    const timestamp = Date.now();
    const formId = `FormSearch`;
    const tableId = `EmergencyPatientReportTable${timestamp}`;

    // 儲存 ID 供其他方法使用
    this.formId = formId;
    this.tableId = tableId;

    return `
            <div id="EmergencyPatientReportContent" class="content">
                <!-- 麵包屑導航 -->
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-home"></i> 首頁</a></li>
                    <li><a href="#">事件通報管理</a></li>
                    <li><a href="#">緊急醫療救護通報</a></li>
                    <li class="active">緊急醫療救護傷患通報維護</li>
                </ol>

                <div class="body">
                    <div class="panel">
                        <div class="panel-body" ">
                            
                            <!-- ========== 查詢列表 ========== -->
                            <div class="subpage-box">
                                <div class="tab-struct form-abs-left tab-shrink" data-toggle="tab-container">
                                    <div class="form-abs-arrow">
                                        <i class="fa fa-angle-double-left"></i>
                                        <i class="fa fa-angle-double-right"></i>
                                        <span>查詢列表</span>
                                    </div>
                                    <ul class="nav nav-tabs">
                                        <li class="active">
                                            <a aria-expanded="true" data-toggle="tab" role="tab" id="Form_Search" href="#FormSearch">
                                                <span class="text">查詢列表</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" style="padding: 15px 5px !important;">
                                        <form id="FormSearch" class="tab-pane active">
                                            <div class="row search-content">
                                                <div class="col-md-12">
                                                    <div class="form-horizontal">
                                                        <!-- 災害編號 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">災害編號</label>
                                                            <div class="col-sm-7">
                                                                <input type="text" class="form-control" id="Q_DISASTER_NO" name="Q_DISASTER_NO" placeholder="災害編號" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 災害名稱 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">災害名稱</label>
                                                            <div class="col-sm-7">
                                                                <input type="text" class="form-control" id="Q_DISASTER_NAME" name="Q_DISASTER_NAME" placeholder="災害名稱(可打關鍵字)" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 災害屬性 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">災害屬性</label>
                                                            <div class="col-sm-7">
                                                                <select class="form-control" id="Q_DISASTER_TYPE_ATTR" name="Q_DISASTER_TYPE_ATTR">
                                                                    ${CommonDataUtils.generateOptions(
                                                                      DisasterData.disasterTypeAttr
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 災害種類 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">災害種類</label>
                                                            <div class="col-sm-7">
                                                                <select class="form-control" id="Q_DISASTER_TYPE" name="Q_DISASTER_TYPE">
                                                                    <option value="">請先選擇災害屬性</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 發生日期(起) -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">發生日期(起)</label>
                                                            <div class="col-sm-7">
                                                                <div class="input-group padding-none">
                                                                    <div class="input-group-addon">
                                                                        <i class="zmdi zmdi-calendar-note"></i>
                                                                    </div>
                                                                    <input type="text" class="form-control" id="Q_HAPPEN_TIME_S" name="Q_HAPPEN_TIME_S" data-type="date" autocomplete="off">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 發生日期(迄) -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">發生日期(迄)</label>
                                                            <div class="col-sm-7">
                                                                <div class="input-group padding-none">
                                                                    <div class="input-group-addon">
                                                                        <i class="zmdi zmdi-calendar-note"></i>
                                                                    </div>
                                                                    <input type="text" class="form-control" id="Q_HAPPEN_TIME_E" name="Q_HAPPEN_TIME_E" data-type="date" autocomplete="off">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 開案單位類別 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">開案單位類別</label>
                                                            <div class="col-sm-7">
                                                                <select class="form-control" id="Q_DEPT_CODE" name="Q_DEPT_CODE">
                                                                    ${CommonDataUtils.generateOptions(
                                                                      DepartmentData.deptTypes
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 開案單位 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">開案單位</label>
                                                            <div class="col-sm-7">
                                                                <select class="form-control" id="Q_DEPT_NO" name="Q_DEPT_NO">
                                                                    <option value="">請先選擇開案單位類別</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 開案類別 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">開案類別</label>
                                                            <div class="col-sm-7">
                                                                <select class="form-control" id="Q_TYPE_FLAG" name="Q_TYPE_FLAG">
                                                                    ${CommonDataUtils.generateOptions(
                                                                      EventData.typeFlag
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 發生地 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">發生地</label>
                                                            <div class="col-sm-7">
                                                                <select class="form-control" id="Q_COUNTY_CODE" name="Q_COUNTY_CODE">
                                                                    ${CommonDataUtils.generateOptions(
                                                                      CountyData.counties
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 是否結案 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">是否結案</label>
                                                            <div class="col-sm-7">
                                                                <select class="form-control" id="Q_LOCK_FLAG" name="Q_LOCK_FLAG">
                                                                    ${CommonDataUtils.generateOptions(
                                                                      EventData.lockFlag
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 入院日期(起) -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">入院日期(起)</label>
                                                            <div class="col-sm-7">
                                                                <div class="input-group padding-none">
                                                                    <div class="input-group-addon">
                                                                        <i class="zmdi zmdi-calendar-note"></i>
                                                                    </div>
                                                                    <input type="text" class="form-control" id="Q_AID_IN_TIME_S" name="Q_AID_IN_TIME_S" data-type="date" autocomplete="off">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 入院日期(迄) -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">入院日期(迄)</label>
                                                            <div class="col-sm-7">
                                                                <div class="input-group padding-none">
                                                                    <div class="input-group-addon">
                                                                        <i class="zmdi zmdi-calendar-note"></i>
                                                                    </div>
                                                                    <input type="text" class="form-control" id="Q_AID_IN_TIME_E" name="Q_AID_IN_TIME_E" data-type="date" autocomplete="off">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 收治單位縣市 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">收治單位縣市</label>
                                                            <div class="col-sm-7">
                                                                <select class="form-control" id="Q_AID_DEPT_COUNTY" name="Q_AID_DEPT_COUNTY">
                                                                    ${CommonDataUtils.generateOptions(
                                                                      CountyData.counties
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        
                                                        <!-- 收治單位 -->
                                                        <div class="form-group">
                                                            <label class="col-sm-5 control-label">收治單位</label>
                                                            <div class="col-sm-7">
                                                                <select class="form-control" id="Q_AID_DEPT_NO" name="Q_AID_DEPT_NO">
                                                                    <option value="">請先選擇收治單位縣市</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row search-btns">
                                                <div class="col-md-12">
                                                    <button type="button" class="btn btn-success" id="btnSearch">
                                                        <i class="fa fa-search"></i> 查詢
                                                    </button>
                                                    <button type="button" class="btn btn-gray" id="btnClear">
                                                        <i class="fa fa-eraser"></i> 清除
                                                    </button>
                                                    <button type="button" class="btn btn-success" id="btnExport">
                                                        <i class="fa fa-file-excel-o"></i> 資料匯出
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- ========== 結果顯示區 ========== -->
                            <div class="panel-body" style="height: 100%; padding: 15px;">
                                <div class="col-sm-12">
                                    <!-- 查詢摘要 -->
                                    <div>查詢條件：<span id="QueryText" style="color: #337ab7;"></span></div>
                                    <div>查詢結果：<span id="ResultText" style="color: #5cb85c; font-weight: bold;"></span></div>
                                    <div style="margin-bottom: 15px;">查詢時間：<span id="ResultTime" style="color: #666;"></span></div>
                                    
                                    <!-- 功能按鈕群組 -->
                                    <div class="btn-group" style="margin-bottom: 10px;">
                                        <button type="button" class="btn btn-primary" id="btnAdd">
                                            <i class="fa fa-plus"></i> 新增傷患通報
                                        </button>
                                        <button type="button" class="btn btn-primary" id="btnEdit" disabled>
                                            <i class="fa fa-edit"></i> 修改傷患通報
                                        </button>
                                        <button type="button" class="btn btn-primary" id="btnView" disabled>
                                            <i class="fa fa-eye"></i> 檢視傷患通報
                                        </button>
                                    </div>
                                    
                                    <div class="btn-group" style="margin-bottom: 10px;">
                                        <button type="button" class="btn btn-danger" id="btnDelete" disabled>
                                            <i class="fa fa-trash"></i> 刪除傷患通報
                                        </button>
                                    </div>
                                    
                                    <!-- EasyUI DataGrid -->
                                    <table id="${tableId}" class="EMSDataGrid"></table>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        `;
  },

  // 初始化日期選擇器
  DatePickerInit: function () {
    const $content = $("#EmergencyPatientReportContent");
    const $dateInputs = $content.find(
      'input[type="text"][data-type="date"]:not([date-inited])'
    );

    if ($dateInputs.length > 0) {
      // 設定中文化
      $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);

      $dateInputs.each(function () {
        $(this)
          .datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            yearRange: "2003:c",
            showButtonPanel: true,
          })
          .attr("date-inited", "true");
      });
    }
  },

  // 初始化可收合面板事件
  BootTabsStructEvent: function () {
    const $content = $("#EmergencyPatientReportContent");
    const tabs = $content.find(".tab-struct.form-abs-left");

    if (tabs.length == 0) return;

    $.each(tabs, function (index, item) {
      $(item)
        .find(".form-abs-arrow")
        .on("click", function () {
          $(item).toggleClass("tab-shrink");
          $(".subpage-box").toggleClass("subpage-box-block");
        });
      $(item).on("tabsShrink", function () {
        if (!$(item).hasClass("tab-shrink")) {
          $(item).addClass("tab-shrink");
          $(".subpage-box").removeClass("subpage-box-block");
        }
      });
    });
  },

  // 查詢資料
  searchData: function () {
    const $content = $("#EmergencyPatientReportContent");
    const $form = $content.find("form");
    const $table = $(`#${this.tableId}`);

    // 收集查詢條件
    const formData = {};
    const queryTextParts = [];

    $form.find("input, select").each(function () {
      const $field = $(this);
      const name = $field.attr("name");
      const value = $field.val();

      if (name && value) {
        formData[name] = value;

        // 建立查詢摘要文字
        const label = $field.closest(".form-group").find("label").text().trim();
        let displayValue = value;

        // 如果是下拉選單，顯示選中的文字
        if ($field.is("select")) {
          displayValue = $field.find("option:selected").text();
        }

        if (label && displayValue && displayValue !== "請選擇") {
          queryTextParts.push(`${label}【${displayValue}】`);
        }
      }
    });

    // 更新查詢摘要
    $("#QueryText").text(queryTextParts.join("、") || "無特定條件");

    // 模擬查詢資料（實際應該是 AJAX 呼叫）
    const sampleData = this.generateSampleData();

    // 更新查詢結果
    $("#ResultText").text(`共 ${sampleData.length} 筆資料`);

    // 更新查詢時間
    const now = new Date();
    const timeStr = `${now.getFullYear()}年${String(
      now.getMonth() + 1
    ).padStart(2, "0")}月${String(now.getDate()).padStart(2, "0")}日 ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;
    $("#ResultTime").text(timeStr);

    // 初始化或重新載入 DataGrid
    if ($table.data("datagrid")) {
      // 已存在，重新載入資料
      $table.datagrid("loadData", sampleData);
    } else {
      // 首次初始化
      $table.datagrid({
        data: sampleData,
        fit: true,
        fitColumns: false,
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        pageSize: 20,
        pageList: [10, 20, 30, 50],
        columns: [
          [
            {
              field: "TYPE_LABEL",
              title: "開案類別",
              width: 80,
              align: "center",
              formatter: function (value) {
                const typeMap = { N: "一般", E: "演習", T: "測試" };
                const labelClass = {
                  N: "label-warning",
                  E: "label-info",
                  T: "label-success",
                };
                return `<label class="label ${
                  labelClass[value] || "label-default"
                }">${typeMap[value] || value}</label>`;
              },
            },
            {
              field: "COUNTY_LABEL",
              title: "發生地",
              width: 80,
              align: "center",
            },
            {
              field: "HAPPEN_TIME_LABEL",
              title: "發生日期",
              width: 140,
              align: "center",
            },
            {
              field: "DISASTER_NO_LABEL",
              title: "災害編號",
              width: 130,
              align: "center",
            },
            {
              field: "DISASTER_NAME",
              title: "災害名稱",
              width: 300,
              align: "left",
              formatter: function (value, row) {
                if (row.LOCK_FLAG === "Y") {
                  return `<span class="text-color-red">[結案]</span>${value}`;
                }
                return value;
              },
            },
            {
              field: "PATIENT_COUNT",
              title: "傷患人數",
              width: 80,
              align: "center",
            },
            {
              field: "HOSPITAL_NAME",
              title: "收治醫院",
              width: 150,
              align: "left",
            },
            {
              field: "REPORT_UNIT",
              title: "通報單位",
              width: 150,
              align: "left",
            },
            {
              field: "UPDATE_TIME_LABEL",
              title: "資料更新時間",
              width: 140,
              align: "center",
            },
          ],
        ],
        onSelect: function (index, row) {
          // 選中資料時啟用編輯/檢視/刪除按鈕
          $("#btnEdit, #btnView, #btnDelete").prop("disabled", false);
        },
        onUnselect: function (index, row) {
          // 取消選中時停用按鈕
          $("#btnEdit, #btnView, #btnDelete").prop("disabled", true);
        },
        onLoadSuccess: function (data) {
          console.log("DataGrid 載入成功，共 " + data.length + " 筆資料");
        },
      });
    }
  },

  // 生成範例資料
  generateSampleData: function () {
    return [
      {
        TYPE_LABEL: "N",
        COUNTY_LABEL: "台北市",
        HAPPEN_TIME_LABEL: "2026-01-05 10:30",
        DISASTER_NO_LABEL: "E1150105-001",
        DISASTER_NAME: "台北市信義區地震災害事件",
        PATIENT_COUNT: 15,
        HOSPITAL_NAME: "台大醫院",
        REPORT_UNIT: "台北市消防局",
        UPDATE_TIME_LABEL: "2026-01-05 14:20",
        LOCK_FLAG: "N",
      },
      {
        TYPE_LABEL: "N",
        COUNTY_LABEL: "新北市",
        HAPPEN_TIME_LABEL: "2026-01-04 15:45",
        DISASTER_NO_LABEL: "C1150104-002",
        DISASTER_NAME: "新北市板橋區重大車禍事件",
        PATIENT_COUNT: 8,
        HOSPITAL_NAME: "亞東醫院",
        REPORT_UNIT: "新北市消防局",
        UPDATE_TIME_LABEL: "2026-01-04 18:30",
        LOCK_FLAG: "Y",
      },
      {
        TYPE_LABEL: "E",
        COUNTY_LABEL: "台中市",
        HAPPEN_TIME_LABEL: "2026-01-03 09:00",
        DISASTER_NO_LABEL: "G1150103-001",
        DISASTER_NAME: "台中市大型活動救護演習",
        PATIENT_COUNT: 0,
        HOSPITAL_NAME: "台中榮總",
        REPORT_UNIT: "台中市衛生局",
        UPDATE_TIME_LABEL: "2026-01-03 12:00",
        LOCK_FLAG: "Y",
      },
      {
        TYPE_LABEL: "N",
        COUNTY_LABEL: "高雄市",
        HAPPEN_TIME_LABEL: "2026-01-02 23:15",
        DISASTER_NO_LABEL: "F1150102-003",
        DISASTER_NAME: "高雄市前鎮區住宅火災",
        PATIENT_COUNT: 5,
        HOSPITAL_NAME: "高雄長庚",
        REPORT_UNIT: "高雄市消防局",
        UPDATE_TIME_LABEL: "2026-01-03 08:40",
        LOCK_FLAG: "N",
      },
      {
        TYPE_LABEL: "N",
        COUNTY_LABEL: "桃園市",
        HAPPEN_TIME_LABEL: "2026-01-01 18:20",
        DISASTER_NO_LABEL: "R1150101-001",
        DISASTER_NAME: "桃園市寒害事件",
        PATIENT_COUNT: 12,
        HOSPITAL_NAME: "長庚醫院",
        REPORT_UNIT: "桃園市消防局",
        UPDATE_TIME_LABEL: "2026-01-02 10:15",
        LOCK_FLAG: "Y",
      },
      {
        TYPE_LABEL: "N",
        COUNTY_LABEL: "台南市",
        HAPPEN_TIME_LABEL: "2025-12-31 14:30",
        DISASTER_NO_LABEL: "C1141231-001",
        DISASTER_NAME: "台南市永康區交通事故",
        PATIENT_COUNT: 3,
        HOSPITAL_NAME: "奇美醫院",
        REPORT_UNIT: "台南市消防局",
        UPDATE_TIME_LABEL: "2025-12-31 17:20",
        LOCK_FLAG: "Y",
      },
      {
        TYPE_LABEL: "N",
        COUNTY_LABEL: "新竹市",
        HAPPEN_TIME_LABEL: "2025-12-30 08:45",
        DISASTER_NO_LABEL: "F1141230-002",
        DISASTER_NAME: "新竹市東區工廠火災",
        PATIENT_COUNT: 7,
        HOSPITAL_NAME: "新竹馬偕醫院",
        REPORT_UNIT: "新竹市消防局",
        UPDATE_TIME_LABEL: "2025-12-30 11:30",
        LOCK_FLAG: "Y",
      },
      {
        TYPE_LABEL: "T",
        COUNTY_LABEL: "宜蘭縣",
        HAPPEN_TIME_LABEL: "2025-12-29 10:00",
        DISASTER_NO_LABEL: "G1141229-001",
        DISASTER_NAME: "宜蘭縣緊急救護系統測試",
        PATIENT_COUNT: 0,
        HOSPITAL_NAME: "宜蘭醫院",
        REPORT_UNIT: "宜蘭縣消防局",
        UPDATE_TIME_LABEL: "2025-12-29 15:00",
        LOCK_FLAG: "Y",
      },
    ];
  },

  // 清除表單
  clearForm: function () {
    const $content = $("#EmergencyPatientReportContent");
    const $form = $content.find("form");

    // 重置表單
    $form[0].reset();

    // 清空級聯下拉選單
    $("#Q_DISASTER_TYPE").html('<option value="">請先選擇災害屬性</option>');
    $("#Q_DEPT_NO").html('<option value="">請先選擇開案單位類別</option>');
    $("#Q_AID_DEPT_NO").html('<option value="">請先選擇收治單位縣市</option>');

    // 設定預設日期
    this.setDefaultDates();

    // 清空查詢摘要
    $("#QueryText").text("");
    $("#ResultText").text("");
    $("#ResultTime").text("");
  },

  // 設定預設日期（上個月至今天）
  setDefaultDates: function () {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    $("#Q_HAPPEN_TIME_S").val(formatDate(lastMonth));
    $("#Q_HAPPEN_TIME_E").val(formatDate(today));
  },

  // CRUD 操作
  addRecord: function () {
    alert(
      "新增傷患通報功能（待實作）\n\n此功能將開啟新增視窗，輸入傷患詳細資料。"
    );
  },

  editRecord: function () {
    const $table = $(`#${this.tableId}`);
    const selected = $table.datagrid("getSelected");
    if (selected) {
      alert(
        "修改傷患通報\n\n災害名稱：" +
          selected.DISASTER_NAME +
          "\n災害編號：" +
          selected.DISASTER_NO_LABEL
      );
    }
  },

  viewRecord: function () {
    const $table = $(`#${this.tableId}`);
    const selected = $table.datagrid("getSelected");
    if (selected) {
      alert(
        "檢視傷患通報\n\n災害名稱：" +
          selected.DISASTER_NAME +
          "\n災害編號：" +
          selected.DISASTER_NO_LABEL +
          "\n傷患人數：" +
          selected.PATIENT_COUNT
      );
    }
  },

  deleteRecord: function () {
    const $table = $(`#${this.tableId}`);
    const selected = $table.datagrid("getSelected");
    if (selected) {
      if (
        confirm(
          "確定要刪除此傷患通報嗎？\n\n災害名稱：" +
            selected.DISASTER_NAME +
            "\n災害編號：" +
            selected.DISASTER_NO_LABEL
        )
      ) {
        alert("刪除功能（待實作）\n\n實際系統將呼叫後端 API 刪除資料。");
        // 實際應該呼叫 API 並重新查詢
        // this.searchData();
      }
    }
  },

  exportData: function () {
    const $content = $("#EmergencyPatientReportContent");
    const queryText = $("#QueryText").text();
    alert(
      "資料匯出功能（待實作）\n\n將匯出符合以下條件的資料：\n" +
        (queryText || "全部資料")
    );
  },

  // 初始化
  init: function () {
    const self = this;
    const $content = $("#EmergencyPatientReportContent");

    // 初始化日期選擇器
    this.DatePickerInit();

    // 設定預設日期
    this.setDefaultDates();

    // 初始化可收合面板事件
    this.BootTabsStructEvent();

    // 綁定災害屬性變更事件（級聯災害種類）
    $content.find("#Q_DISASTER_TYPE_ATTR").on("change", function () {
      const attrValue = $(this).val();
      CommonDataUtils.reloadCascadingDropdown(
        attrValue,
        "Q_DISASTER_TYPE",
        DisasterData.disasterType
      );
    });

    // 綁定開案單位類別變更事件（級聯開案單位）
    $content.find("#Q_DEPT_CODE").on("change", function () {
      const deptCode = $(this).val();
      CommonDataUtils.reloadCascadingDropdown(
        deptCode,
        "Q_DEPT_NO",
        DepartmentData.departments
      );
    });

    // 綁定收治單位縣市變更事件（級聯收治單位）
    $content.find("#Q_AID_DEPT_COUNTY").on("change", function () {
      const countyCode = $(this).val();
      CommonDataUtils.reloadCascadingDropdown(
        countyCode,
        "Q_AID_DEPT_NO",
        MedicalData.aidDepartments
      );
    });

    // 綁定按鈕事件
    $content.find("#btnSearch").on("click", () => self.searchData());
    $content.find("#btnClear").on("click", () => self.clearForm());
    $content.find("#btnExport").on("click", () => self.exportData());
    $content.find("#btnAdd").on("click", () => self.addRecord());
    $content.find("#btnEdit").on("click", () => self.editRecord());
    $content.find("#btnView").on("click", () => self.viewRecord());
    $content.find("#btnDelete").on("click", () => self.deleteRecord());

    // 視窗 resize 時調整 DataGrid
    $(window).on("resize", function () {
      const $table = $(`#${self.tableId}`);
      if ($table.data("datagrid")) {
        $table.datagrid("resize");
      }
    });

    // 執行初始查詢
    this.searchData();

    console.log("EmergencyPatientReport 組件初始化完成");
  },
};

// 將組件註冊到 window 供外部呼叫
if (typeof window !== "undefined") {
  window.EmergencyPatientReportPage = EmergencyPatientReportPage;
}
