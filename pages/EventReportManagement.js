// EventReportManagement.js - 事件通報與管理頁面

const EventReportManagementPage = {
  // 生成 HTML 內容
  getContent: function () {
    const timestamp = Date.now();
    const formId = `FormSearch`;
    const tableId = `EventReportTable${timestamp}`;

    // 儲存 ID 供其他方法使用
    this.formId = formId;
    this.tableId = tableId;

    return /*html*/ `
   <div id="EventReportManagementContent" class="content">
  <div>
    <!-- 麵包屑導航 -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">REMOC管理</li>
        <li class="breadcrumb-item">事件通報與管理</li>
        <li class="breadcrumb-item active" aria-current="page">
          事件監看紀錄登錄
        </li>
      </ol>
    </nav>
    <div class="subpage-box">
      <div
        class="tab-struct form-abs-left tab-shrink"
        data-toggle="tab-container"
      >
        <div class="form-abs-arrow">
          <i class="fa fa-angle-double-left"></i>
          <i class="fa fa-angle-double-right"></i>
          <span>查詢列表</span>
        </div>
        <ul class="nav nav-tabs">
          <li class="active">
            <a
              aria-expanded="true"
              data-toggle="tab"
              role="tab"
              id="Form_Search"
              href="#FormSearch"
            >
              <span class="text">查詢列表</span>
            </a>
          </li>
        </ul>
        <div class="tab-content" style="padding: 15px 5px !important">
          <form id="FormSearch" class="tab-pane active">
            <div class="row search-content">
              <div class="col-md-12">
                <div class="form-horizontal">
                 <!-- 區域 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">區域</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_REGION" name="Q_REGION">
                            <option value="">全部</option>
                            ${CommonDataUtils.generateOptions(
                              CountyData.counties,
                              false
                            )}
                          </select>
                        </div>
                      </div>

                      <!-- 編號 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">編號</label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="Q_EVENT_NO" name="Q_EVENT_NO" placeholder="請輸入事件編號">
                        </div>
                      </div>

                      <!-- 名稱 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">名稱</label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="Q_EVENT_NAME" name="Q_EVENT_NAME" placeholder="請輸入事件名稱">
                        </div>
                      </div>

                      <!-- 災害屬性 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">災害屬性</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_DISASTER_ATTR" name="Q_DISASTER_ATTR">
                            <option value="">全部</option>
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
                            <option value="">全部</option>
                          </select>
                        </div>
                      </div>

                      <!-- 發生地 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">發生地</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_LOCATION" name="Q_LOCATION">
                            <option value="">全部</option>
                            ${CommonDataUtils.generateOptions(
                              CountyData.counties
                            )}
                          </select>
                        </div>
                      </div>

                      <!-- 訊息來源 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">訊息來源</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_SOURCE" name="Q_SOURCE">
                            <option value="">全部</option>
                            <option value="ems">EMS</option>
                            <option value="remoc">REMOC</option>
                          </select>
                        </div>
                      </div>

                      <!-- 是否刪除 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">是否刪除</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_IS_DELETED" name="Q_IS_DELETED">
                            <option value="">全部</option>
                            <option value="N" selected>否</option>
                            <option value="Y">是</option>
                          </select>
                        </div>
                      </div>
                </div>
              </div>
            </div>
            <div class="row search-btns">
              <div class="col-md-12">
                ${ButtonComponent.search()} ${ButtonComponent.clear()}
                ${ButtonComponent.export()}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="body">
      <div class="col-sm-12 panel panel-none padding-left-35" style="height:100%;">
        <div class="panel-body" style="height:100%">
          <div class="form-horizontal" style="height:100%">
            <div id="SearchAreaDefault" class="tab-struct aid-case-tab" data-toggle="tab-container" style="height: 100%;">
              <div id="MEDA300RemindCont" class="tab-content" style="display:flex;flex-direction:column;width:100%;height:100%">
                <div class="col-sm-12">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      查詢條件：
                      <span id="QueryText" style="color: #337ab7"></span>
                    </div>
                    <div>
                      查詢時間：
                      <span id="ResultTime" style="color: #666"></span>
                    </div>
                  </div>
                  <div style="margin-bottom: 5px">
                    查詢結果：
                    <span id="ResultText" style="color: #5cb85c; font-weight: bold"></span>
                  </div>
                  <div class="btn-group" role="group" style="margin-bottom: 10px">
                    ${ButtonComponent.add("btnAdd", "新增")}
                    ${ButtonComponent.edit("btnEdit", "修改")}
                    ${ButtonComponent.view("btnView", "檢視")}
                    ${ButtonComponent.delete("btnDelete", "刪除")}
                  </div>
                  <!-- EasyUI DataGrid -->
                <!-- EasyUI DataGrid -->
                  <table id="${tableId}" class="EMSDataGrid"></table>
                </div>
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
    const $content = $("#EventReportManagementContent");
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
    const $content = $("#EventReportManagementContent");
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
    console.log("searchData 函數開始執行");
    const $content = $("#EventReportManagementContent");
    const $form = $content.find("form");
    const $table = $(`#${this.tableId}`);
    console.log("表格ID:", this.tableId, "找到表格元素:", $table.length > 0);

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
    console.log("生成範例資料:", sampleData.length, "筆");
    console.log("範例資料內容:", sampleData);

    // 儲存資料到實例變數中
    this.allData = sampleData;

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
              field: "rowNumber",
              title: "項次",
              width: 60,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                var panel = $table.datagrid("getPanel");
                var pager = panel.find("div.datagrid-pager");
                var pageNumber = 1;
                var pageSize = 20;
                if (pager.length) {
                  pageNumber = pager.pagination("options").pageNumber || 1;
                  pageSize = pager.pagination("options").pageSize || 20;
                }
                return (pageNumber - 1) * pageSize + index + 1;
              },
            },
            {
              field: "REGION",
              title: "區域",
              width: 80,
              align: "center",
              rowspan: 2,
            },
            {
              field: "COUNTY_LABEL",
              title: "發生地",
              width: 80,
              align: "center",
              rowspan: 2,
            },
            {
              field: "HAPPEN_TIME_LABEL",
              title: "發生日期",
              width: 140,
              align: "center",
              rowspan: 2,
            },
            {
              field: "DISASTER_TYPE",
              title: "災害種類",
              width: 100,
              align: "center",
              rowspan: 2,
            },
            {
              field: "DISASTER_NO_LABEL",
              title: "災害編號",
              width: 130,
              align: "center",
              rowspan: 2,
            },
            {
              field: "DISASTER_NAME",
              title: "災害名稱",
              width: 250,
              align: "left",
              rowspan: 2,
            },
            {
              title: "訊息",
              colspan: 2,
            },
            {
              title: "醫療檢傷人數",
              colspan: 7,
            },
            {
              field: "DEATH_COUNT",
              title: "死亡",
              width: 60,
              align: "center",
              rowspan: 2,
            },
          ],
          [
            {
              field: "MSG_SOURCE",
              title: "來源",
              width: 80,
              align: "center",
            },
            {
              field: "MSG_CREATE_TIME",
              title: "建立時間",
              width: 140,
              align: "center",
            },
            {
              field: "TRIAGE_LEVEL_1",
              title: "一",
              width: 50,
              align: "center",
            },
            {
              field: "TRIAGE_LEVEL_2",
              title: "二",
              width: 50,
              align: "center",
            },
            {
              field: "TRIAGE_LEVEL_3",
              title: "三",
              width: 50,
              align: "center",
            },
            {
              field: "TRIAGE_LEVEL_4",
              title: "四",
              width: 50,
              align: "center",
            },
            {
              field: "TRIAGE_LEVEL_5",
              title: "五",
              width: 50,
              align: "center",
            },
            {
              field: "TRIAGE_LEVEL_UNKNOWN",
              title: "未",
              width: 50,
              align: "center",
            },
            {
              field: "TRIAGE_TOTAL",
              title: "總",
              width: 60,
              align: "center",
              styler: function (value, row, index) {
                return "font-weight: bold;";
              },
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
        REGION: "北區",
        COUNTY_LABEL: "台北市",
        HAPPEN_TIME_LABEL: "2026-01-05 10:30",
        DISASTER_TYPE: "地震",
        DISASTER_NO_LABEL: "E1150105-001",
        DISASTER_NAME: "台北市信義區地震災害事件",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2026-01-05 10:35",
        TRIAGE_LEVEL_1: 2,
        TRIAGE_LEVEL_2: 3,
        TRIAGE_LEVEL_3: 5,
        TRIAGE_LEVEL_4: 3,
        TRIAGE_LEVEL_5: 2,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 15,
        DEATH_COUNT: 0,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "新北市",
        HAPPEN_TIME_LABEL: "2026-01-04 15:45",
        DISASTER_TYPE: "交通事故",
        DISASTER_NO_LABEL: "C1150104-002",
        DISASTER_NAME: "新北市板橋區重大車禍事件",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2026-01-04 15:50",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 3,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 8,
        DEATH_COUNT: 1,
      },
      {
        REGION: "中區",
        COUNTY_LABEL: "台中市",
        HAPPEN_TIME_LABEL: "2026-01-03 09:00",
        DISASTER_TYPE: "演習",
        DISASTER_NO_LABEL: "G1150103-001",
        DISASTER_NAME: "台中市大型活動救護演習",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2026-01-03 09:05",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 0,
        TRIAGE_LEVEL_3: 0,
        TRIAGE_LEVEL_4: 0,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 0,
        DEATH_COUNT: 0,
      },
      {
        REGION: "南區",
        COUNTY_LABEL: "高雄市",
        HAPPEN_TIME_LABEL: "2026-01-02 23:15",
        DISASTER_TYPE: "火災",
        DISASTER_NO_LABEL: "F1150102-003",
        DISASTER_NAME: "高雄市前鎮區住宅火災",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2026-01-02 23:20",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 5,
        DEATH_COUNT: 2,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "桃園市",
        HAPPEN_TIME_LABEL: "2026-01-01 18:20",
        DISASTER_TYPE: "寒害",
        DISASTER_NO_LABEL: "R1150101-001",
        DISASTER_NAME: "桃園市寒害事件",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2026-01-01 18:25",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 4,
        TRIAGE_LEVEL_4: 3,
        TRIAGE_LEVEL_5: 2,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 12,
        DEATH_COUNT: 0,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "新竹市",
        HAPPEN_TIME_LABEL: "2025-12-30 08:45",
        DISASTER_TYPE: "火災",
        DISASTER_NO_LABEL: "F1141230-002",
        DISASTER_NAME: "新竹市東區工廠火災",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-30 08:50",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 7,
        DEATH_COUNT: 1,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "宜蘭縣",
        HAPPEN_TIME_LABEL: "2025-12-29 10:00",
        DISASTER_TYPE: "測試",
        DISASTER_NO_LABEL: "G1141229-001",
        DISASTER_NAME: "宜蘭縣緊急救護系統測試",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-29 10:05",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 0,
        TRIAGE_LEVEL_3: 0,
        TRIAGE_LEVEL_4: 0,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 0,
        DEATH_COUNT: 0,
      },
      {
        REGION: "南區",
        COUNTY_LABEL: "嘉義市",
        HAPPEN_TIME_LABEL: "2025-12-28 16:20",
        DISASTER_TYPE: "交通事故",
        DISASTER_NO_LABEL: "C1141228-001",
        DISASTER_NAME: "嘉義市東區機車連環車禍",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-28 16:25",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 6,
        DEATH_COUNT: 0,
      },
      {
        REGION: "中區",
        COUNTY_LABEL: "彰化縣",
        HAPPEN_TIME_LABEL: "2025-12-27 11:30",
        DISASTER_TYPE: "火災",
        DISASTER_NO_LABEL: "F1141227-002",
        DISASTER_NAME: "彰化縣和美鎮倉儲火警",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-27 11:35",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 1,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 4,
        DEATH_COUNT: 0,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "苗栗縣",
        HAPPEN_TIME_LABEL: "2025-12-26 08:15",
        DISASTER_TYPE: "地震",
        DISASTER_NO_LABEL: "E1141226-001",
        DISASTER_NAME: "苗栗縣頭份市地震災害",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-26 08:20",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 3,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 9,
        DEATH_COUNT: 0,
      },
      {
        REGION: "東區",
        COUNTY_LABEL: "花蓮縣",
        HAPPEN_TIME_LABEL: "2025-12-25 13:45",
        DISASTER_TYPE: "交通事故",
        DISASTER_NO_LABEL: "C1141225-003",
        DISASTER_NAME: "花蓮縣花蓮市遊覽車翻覆事故",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-25 13:50",
        TRIAGE_LEVEL_1: 2,
        TRIAGE_LEVEL_2: 4,
        TRIAGE_LEVEL_3: 6,
        TRIAGE_LEVEL_4: 4,
        TRIAGE_LEVEL_5: 2,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 18,
        DEATH_COUNT: 1,
      },
      {
        REGION: "南區",
        COUNTY_LABEL: "屏東縣",
        HAPPEN_TIME_LABEL: "2025-12-24 10:00",
        DISASTER_TYPE: "演習",
        DISASTER_NO_LABEL: "G1141224-001",
        DISASTER_NAME: "屏東縣大規模災害演練",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-24 10:05",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 0,
        TRIAGE_LEVEL_3: 0,
        TRIAGE_LEVEL_4: 0,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 0,
        DEATH_COUNT: 0,
      },
      {
        REGION: "東區",
        COUNTY_LABEL: "台東縣",
        HAPPEN_TIME_LABEL: "2025-12-23 19:30",
        DISASTER_TYPE: "寒害",
        DISASTER_NO_LABEL: "R1141223-001",
        DISASTER_NAME: "台東縣卑南鄉寒流事件",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-23 19:35",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 1,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 5,
        DEATH_COUNT: 0,
      },
      {
        REGION: "中區",
        COUNTY_LABEL: "南投縣",
        HAPPEN_TIME_LABEL: "2025-12-22 14:50",
        DISASTER_TYPE: "地震",
        DISASTER_NO_LABEL: "E1141222-002",
        DISASTER_NAME: "南投縣埔里鎮地震事件",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-22 14:55",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 4,
        TRIAGE_LEVEL_4: 3,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 11,
        DEATH_COUNT: 0,
      },
      {
        REGION: "中區",
        COUNTY_LABEL: "雲林縣",
        HAPPEN_TIME_LABEL: "2025-12-21 07:40",
        DISASTER_TYPE: "交通事故",
        DISASTER_NO_LABEL: "C1141221-001",
        DISASTER_NAME: "雲林縣斗六市重大車禍",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-21 07:45",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 7,
        DEATH_COUNT: 0,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "基隆市",
        HAPPEN_TIME_LABEL: "2025-12-20 21:15",
        DISASTER_TYPE: "火災",
        DISASTER_NO_LABEL: "F1141220-003",
        DISASTER_NAME: "基隆市仁愛區住宅火災",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-20 21:20",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 8,
        DEATH_COUNT: 1,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "新竹縣",
        HAPPEN_TIME_LABEL: "2025-12-19 09:30",
        DISASTER_TYPE: "測試",
        DISASTER_NO_LABEL: "G1141219-002",
        DISASTER_NAME: "新竹縣竹北市緊急救護測試",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-19 09:35",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 0,
        TRIAGE_LEVEL_3: 0,
        TRIAGE_LEVEL_4: 0,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 0,
        DEATH_COUNT: 0,
      },
      {
        REGION: "離島",
        COUNTY_LABEL: "澎湖縣",
        HAPPEN_TIME_LABEL: "2025-12-18 15:20",
        DISASTER_TYPE: "交通事故",
        DISASTER_NO_LABEL: "C1141218-001",
        DISASTER_NAME: "澎湖縣馬公市港區交通事故",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-18 15:25",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 1,
        TRIAGE_LEVEL_4: 1,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 4,
        DEATH_COUNT: 0,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "台北市",
        HAPPEN_TIME_LABEL: "2025-12-17 12:10",
        DISASTER_TYPE: "地震",
        DISASTER_NO_LABEL: "E1141217-002",
        DISASTER_NAME: "台北市大安區地震",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-17 12:15",
        TRIAGE_LEVEL_1: 2,
        TRIAGE_LEVEL_2: 3,
        TRIAGE_LEVEL_3: 4,
        TRIAGE_LEVEL_4: 3,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 13,
        DEATH_COUNT: 0,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "新北市",
        HAPPEN_TIME_LABEL: "2025-12-16 08:00",
        DISASTER_TYPE: "演習",
        DISASTER_NO_LABEL: "G1141216-001",
        DISASTER_NAME: "新北市新店區災害防救演習",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-16 08:05",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 0,
        TRIAGE_LEVEL_3: 0,
        TRIAGE_LEVEL_4: 0,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 0,
        DEATH_COUNT: 0,
      },
      {
        REGION: "中區",
        COUNTY_LABEL: "彰化縣",
        HAPPEN_TIME_LABEL: "2025-12-15 11:30",
        DISASTER_TYPE: "火災",
        DISASTER_NO_LABEL: "F1141215-002",
        DISASTER_NAME: "彰化縣和美鎮倉儲火警",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-15 11:35",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 1,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 4,
        DEATH_COUNT: 0,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "苗栗縣",
        HAPPEN_TIME_LABEL: "2025-12-14 08:15",
        DISASTER_TYPE: "地震",
        DISASTER_NO_LABEL: "E1141214-001",
        DISASTER_NAME: "苗栗縣頭份市地震災害",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-14 08:20",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 3,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 9,
        DEATH_COUNT: 0,
      },
      {
        REGION: "東區",
        COUNTY_LABEL: "花蓮縣",
        HAPPEN_TIME_LABEL: "2025-12-13 13:45",
        DISASTER_TYPE: "交通事故",
        DISASTER_NO_LABEL: "C1141213-003",
        DISASTER_NAME: "花蓮縣花蓮市遊覽車翻覆事故",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-13 13:50",
        TRIAGE_LEVEL_1: 2,
        TRIAGE_LEVEL_2: 4,
        TRIAGE_LEVEL_3: 6,
        TRIAGE_LEVEL_4: 4,
        TRIAGE_LEVEL_5: 2,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 18,
        DEATH_COUNT: 1,
      },
      {
        REGION: "南區",
        COUNTY_LABEL: "屏東縣",
        HAPPEN_TIME_LABEL: "2025-12-12 10:00",
        DISASTER_TYPE: "演習",
        DISASTER_NO_LABEL: "G1141212-001",
        DISASTER_NAME: "屏東縣大規模災害演練",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-12 10:05",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 0,
        TRIAGE_LEVEL_3: 0,
        TRIAGE_LEVEL_4: 0,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 0,
        DEATH_COUNT: 0,
      },
      {
        REGION: "東區",
        COUNTY_LABEL: "台東縣",
        HAPPEN_TIME_LABEL: "2025-12-11 19:30",
        DISASTER_TYPE: "寒害",
        DISASTER_NO_LABEL: "R1141211-001",
        DISASTER_NAME: "台東縣卑南鄉寒流事件",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-11 19:35",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 1,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 5,
        DEATH_COUNT: 0,
      },
      {
        REGION: "中區",
        COUNTY_LABEL: "南投縣",
        HAPPEN_TIME_LABEL: "2025-12-10 14:50",
        DISASTER_TYPE: "地震",
        DISASTER_NO_LABEL: "E1141210-002",
        DISASTER_NAME: "南投縣埔里鎮地震事件",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-10 14:55",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 4,
        TRIAGE_LEVEL_4: 3,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 11,
        DEATH_COUNT: 0,
      },
      {
        REGION: "中區",
        COUNTY_LABEL: "雲林縣",
        HAPPEN_TIME_LABEL: "2025-12-09 07:40",
        DISASTER_TYPE: "交通事故",
        DISASTER_NO_LABEL: "C1141209-001",
        DISASTER_NAME: "雲林縣斗六市重大車禍",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-09 07:45",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 7,
        DEATH_COUNT: 0,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "基隆市",
        HAPPEN_TIME_LABEL: "2025-12-08 21:15",
        DISASTER_TYPE: "火災",
        DISASTER_NO_LABEL: "F1141208-003",
        DISASTER_NAME: "基隆市仁愛區住宅火災",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-08 21:20",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 8,
        DEATH_COUNT: 1,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "新竹縣",
        HAPPEN_TIME_LABEL: "2025-12-07 09:30",
        DISASTER_TYPE: "測試",
        DISASTER_NO_LABEL: "G1141207-002",
        DISASTER_NAME: "新竹縣竹北市緊急救護測試",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-07 09:35",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 0,
        TRIAGE_LEVEL_3: 0,
        TRIAGE_LEVEL_4: 0,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 0,
        DEATH_COUNT: 0,
      },
      {
        REGION: "離島",
        COUNTY_LABEL: "澎湖縣",
        HAPPEN_TIME_LABEL: "2025-12-06 15:20",
        DISASTER_TYPE: "交通事故",
        DISASTER_NO_LABEL: "C1141206-001",
        DISASTER_NAME: "澎湖縣馬公市港區交通事故",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-06 15:25",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 1,
        TRIAGE_LEVEL_4: 1,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 4,
        DEATH_COUNT: 0,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "台北市",
        HAPPEN_TIME_LABEL: "2025-12-05 12:10",
        DISASTER_TYPE: "地震",
        DISASTER_NO_LABEL: "E1141205-002",
        DISASTER_NAME: "台北市大安區地震",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2025-12-05 12:15",
        TRIAGE_LEVEL_1: 2,
        TRIAGE_LEVEL_2: 3,
        TRIAGE_LEVEL_3: 4,
        TRIAGE_LEVEL_4: 3,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 13,
        DEATH_COUNT: 0,
      },
      {
        REGION: "北區",
        COUNTY_LABEL: "新北市",
        HAPPEN_TIME_LABEL: "2025-12-04 08:00",
        DISASTER_TYPE: "演習",
        DISASTER_NO_LABEL: "G1141204-001",
        DISASTER_NAME: "新北市新店區災害防救演習",
        MSG_SOURCE: "REMOC",
        MSG_CREATE_TIME: "2025-12-04 08:05",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 0,
        TRIAGE_LEVEL_3: 0,
        TRIAGE_LEVEL_4: 0,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 0,
        DEATH_COUNT: 0,
      },
    ];
  },

  // 清除表單
  clearForm: function () {
    const $content = $("#EventReportManagementContent");
    const $form = $content.find("form");

    // 重置表單
    $form[0].reset();

    // 清空級聯下拉選單
    $("#Q_DISASTER_TYPE").html('<option value="">請先選擇災害屬性</option>');

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
    const self = this;
    const $table = $(`#${this.tableId}`);
    const selected = $table.datagrid("getSelected");

    if (!selected) {
      return;
    }

    const message = `確定要刪除此筆資料嗎？<br/><br/>災害名稱：${selected.DISASTER_NAME}<br/>災害編號：${selected.DISASTER_NO_LABEL}`;

    $.messager.confirm("確認刪除", message, function (r) {
      if (r) {
        // 這裡應該呼叫後端 API 刪除資料

        $.messager.show({
          title: "成功",
          msg: '<i class="fa fa-check-circle" style="color: #5cb85c; margin-right: 5px;"></i>資料已刪除',
          timeout: 2000,
          showType: "fade",
          style: {
            top:
              document.body.scrollTop +
              (document.documentElement.clientHeight - 150) / 2,
            left: (document.documentElement.clientWidth - 300) / 2,
          },
        });

        // 實際應該呼叫 API 並重新查詢
        // self.searchData();
      }
    });
  },

  exportData: function () {
    const $content = $("#EventReportManagementContent");
    const queryText = $("#QueryText").text();
    alert(
      "資料匯出功能（待實作）\n\n將匯出符合以下條件的資料：\n" +
        (queryText || "全部資料")
    );
  },

  // 初始化
  init: function () {
    const self = this;
    const $content = $("#EventReportManagementContent");

    // 初始化日期選擇器
    this.DatePickerInit();

    // 設定預設日期
    this.setDefaultDates();

    // 初始化可收合面板事件
    this.BootTabsStructEvent();

    // 綁定災害屬性變更事件（級聯災害種類）
    $content.find("#Q_DISASTER_ATTR").on("change", function () {
      const attrValue = $(this).val();

      if (!attrValue) {
        // 沒有選擇災害屬性時，災害種類顯示全部
        $("#Q_DISASTER_TYPE").html('<option value="">全部</option>');
      } else {
        // 有選擇災害屬性時，載入子項目並加上全部選項
        CommonDataUtils.reloadCascadingDropdown(
          attrValue,
          "Q_DISASTER_TYPE",
          DisasterData.disasterType
        );
        // 在開頭插入全部選項並設為預設選中
        $("#Q_DISASTER_TYPE").prepend('<option value="">全部</option>').val("");
      }
    });

    // 綁定按鈕事件
    $content.find("#btnSearch").on("click", () => self.searchData());
    $content.find("#btnClear").on("click", () => self.clearForm());
    $content.find("#btnExport").on("click", () => self.exportData());
    $content.find("#btnAdd").on("click", () => self.addRecord());
    $content.find("#btnEdit").on("click", () => self.editRecord());
    $content.find("#btnView").on("click", () => self.viewRecord());
    $content.find("#btnDelete").on("click", () => self.deleteRecord());

    // 執行初始查詢
    this.searchData();

    console.log("EventReportManagement 組件初始化完成");
  },
};

// 註冊到 window 供全域使用
if (typeof window !== "undefined") {
  window.EventReportManagementPage = EventReportManagementPage;
}
