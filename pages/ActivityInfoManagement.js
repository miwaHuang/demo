// 活動資訊管理頁面元件

const ActivityInfoManagementPage = {
  // 生成 HTML 內容
  getContent: function () {
    // 檢查依賴項是否存在
    var utils = window.CommonDataUtils || CommonDataUtils;

    if (typeof RegionalData === "undefined") {
      return '<div class="alert alert-danger">錯誤：RegionalData 未定義</div>';
    }

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
         活動資訊管理
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
                     <!-- 執行事項 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">執行事項</label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="Q_PLANNED_ACTION" name="Q_PLANNED_ACTION" placeholder="執行事項關鍵字查詢">
                        </div>
                      </div>
                      <!-- 區域 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">區域</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_REGION" name="Q_REGION">
                            <option value="">全部</option>
                            ${utils.generateOptions(RegionalData.regions)}
                          </select>
                        </div>
                      </div>
                      <!-- 實施方式 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">實施方式</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_IMPLEMENT_TYPE" name="Q_IMPLEMENT_TYPE">
                            <option value="">全部</option>
                            ${utils.generateOptions(window.ActivityImplementTypeData)}
                          </select>
                        </div>
                      </div>
                      
                     <!-- 工作類別 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">工作類別</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_WORK_TYPE" name="Q_WORK_TYPE">
                            <option value="">全部</option>
                            ${utils.generateOptions(window.ActivityWorkTypeData)}
                          </select>
                        </div>
                      </div>
                      <!-- 活動類別 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">活動類別</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_ACTIVITY_TYPE" name="Q_ACTIVITY_TYPE">
                            <option value="">全部</option>
                            ${utils.generateOptions(window.ActivityTypeData)}
                          </select>
                        </div>
                      </div>
                      <!-- 活動辦理進度 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">活動辦理進度</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_ACTIVITY_STATUS" name="Q_ACTIVITY_STATUS">
                            <option value="" selected>全部</option>
                            ${window.ActivityStatusData ? window.ActivityStatusData.map((s) => `<option value="${s.code}">${s.name}</option>`).join("") : ""}
                          </select>
                        </div>
                      </div>                  

               

                     <!-- 活動日期(起) -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">活動日期(起)</label>
                        <div class="col-sm-7">
                          <div class="input-group padding-none">
                            <div class="input-group-addon">
                              <i class="zmdi zmdi-calendar-note"></i>
                            </div>
                            <input type="text" class="form-control" id="Q_ACTIVITY_DATE_S" name="Q_ACTIVITY_DATE_S" data-type="date" autocomplete="off" />
                          </div>
                        </div>
                      </div>
                      <!-- 活動日期(訖) -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">活動日期(訖)</label>
                        <div class="col-sm-7">
                          <div class="input-group padding-none">
                            <div class="input-group-addon">
                              <i class="zmdi zmdi-calendar-note"></i>
                            </div>
                            <input type="text" class="form-control" id="Q_ACTIVITY_DATE_E" name="Q_ACTIVITY_DATE_E" data-type="date" autocomplete="off" />
                          </div>
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
                ${ButtonComponent.search()} 
                ${ButtonComponent.clear()}
                ${ButtonComponent.btnImport("btnImport", "匯出")}
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
                  <div class="btn-toolbar" style="margin-bottom: 10px;">
                  <div class="btn-group">
                      ${ButtonComponent.add("btnAdd", "新增")}
                      ${ButtonComponent.edit("btnEdit", "修改")}
                      ${ButtonComponent.view("btnView", "檢視")}
                    </div>
                    ${ButtonComponent.delete("btnDelete", "刪除")}
                    ${ButtonComponent.btnImport("btnbtnImport", "匯出")}
                  </div>
                  <!-- EasyUI DataGrid -->
                <!-- EasyUI DataGrid -->
                  <div style="height:100%">
                    <table id="${tableId}" class="EMSDataGrid"></table>
                  </div>
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
      'input[type="text"][data-type="date"]:not([date-inited])',
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

    // 儲存資料到實例變數中
    this.allData = sampleData;

    // 更新查詢結果
    // 實施方式統計
    const implementStats = {};
    sampleData.forEach((item) => {
      const implementTypeCode = item.implementType;
      const implementTypeData = window.ActivityImplementTypeData || [];
      const implementTypeItem = implementTypeData.find(
        (d) => d.code === implementTypeCode,
      );
      const implementTypeName = implementTypeItem
        ? implementTypeItem.name
        : implementTypeCode || "未分類";
      implementStats[implementTypeName] =
        (implementStats[implementTypeName] || 0) + 1;
    });

    // 建立類統計文字
    const statsText = Object.entries(implementStats)
      .map(([type, count]) => `${type}${count}筆`)
      .join("、");

    const resultText = `共 ${sampleData.length} 筆資料 (${statsText})`;
    $("#ResultText").text(resultText);

    // 更新查詢時間
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours(),
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    $("#ResultTime").text(timeStr);

    // 初始化或重新載入 DataGrid
    if ($table.data("datagrid")) {
      // 已存在，重新載入資料
      $table.datagrid("loadData", {
        total: sampleData.length,
        rows: sampleData.slice(0, 20),
      });

      // 更新分頁器
      const pager = $table.datagrid("getPager");
      pager.pagination({
        total: sampleData.length,
        pageNumber: 1,
        pageSize: 20,
      });
    } else {
      // 首次初始化
      $table.datagrid({
        data: {
          total: sampleData.length,
          rows: sampleData.slice(0, 20),
        },
        fit: true,
        fitColumns: false,
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        pageSize: 20,
        pageList: [10, 20, 30, 50],
        frozenColumns: [
          [
            {
              field: "activityDate",
              title: "活動日期",
              width: 180,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                const start = row.activityDateStart;
                const end = row.activityDateEnd;
                if (!start || !end) return "";
                // 顯示 yy-MM-dd ~ yy-MM-dd

                const display = start + "~" + end;
                return '<span title="' + display + '">' + display + "</span>";
              },
            },
            {
              field: "REGION_LABEL",
              title: "區域",
              width: 70,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                return value || "";
              },
            },
            {
              field: "plannedAction",
              title: "執行事項",
              width: 220,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                if (!value) return "";
                // 內容靠左顯示，超出寬度顯示省略號，tooltip顯示完整內容
                return (
                  '<div style="text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="' +
                  value +
                  '">' +
                  value +
                  "</div>"
                );
              },
            },
          ],
        ],
        columns: [
          [
            {
              field: "implementType",
              title: "實施方式",
              width: 100,
              align: "center",
              rowspan: 2,
              formatter: function (value) {
                return window.getActivityImplementTypeName
                  ? window.getActivityImplementTypeName(value)
                  : value;
              },
            },
            {
              field: "workType",
              title: "工作類別",
              width: 80,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                var arr = window.ActivityWorkTypeData || [];
                var item = arr.find(function (d) {
                  return d.code === value;
                });
                return item ? item.name : value;
              },
            },
            {
              field: "activityType",
              title: "活動類別",
              width: 80,
              align: "center",
              rowspan: 2,
              formatter: function (value) {
                var arr = window.ActivityTypeData || [];
                var item = arr.find(function (d) {
                  return d.code === value;
                });
                return item ? item.name : value;
              },
            },
            {
              field: "handleType",
              title: "辦理方式",
              width: 80,
              align: "center",
              rowspan: 2,
              formatter: function (value) {
                return window.getActivityHandleTypeName
                  ? window.getActivityHandleTypeName(value)
                  : value;
              },
            },
            {
              field: "activityStatus",
              title: "辦理進度",
              width: 80,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                var arr = window.ActivityStatusData || [];
                var item = arr.find(function (d) {
                  return d.code === value;
                });
                return item ? item.name : value;
              },
            },
            {
              field: "isInternational",
              title: "國際活動",
              width: 80,
              align: "center",
              rowspan: 2,
              formatter: function (v) {
                return v === 1 ? "是" : "否";
              },
            },
            {
              field: "venue",
              title: "舉辦地點",
              width: 200,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                if (!value) return "";
                // 內容靠左顯示，超出寬度顯示省略號，tooltip顯示完整內容
                return (
                  '<div style="text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="' +
                  value +
                  '">' +
                  value +
                  "</div>"
                );
              },
            },
            { title: "辦理時間", colspan: 2, align: "center" },
            {
              field: "documentStatus",
              title: "文件狀態",
              width: 80,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                var arr = window.DocumentStatusData || [];
                var item = arr.find(function (d) {
                  return d.code === value;
                });
                return item ? item.name : value;
              },
            },
            {
              field: "contactName",
              title: "聯絡人員",
              width: 100,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                const contactPhone = row.CONTACT_PHONE || "";
                const titleText =
                  value + (contactPhone ? " / " + contactPhone : "");
                return '<span title="' + titleText + '">' + value + "</span>";
              },
            },

            {
              field: "IS_DELETED",
              title: "是否<br/>刪除",
              width: 55,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                if (value === "Y") {
                  const reason = row.DELETE_REASON || "未提供原因";
                  return (
                    '<span style="color: red;" title="' + reason + '">是</span>'
                  );
                } else {
                  return "<span>否</span>";
                }
              },
            },
          ],
          [
            {
              field: "actualDays",
              title: "天",
              width: 60,
              align: "center",
              formatter: function (value) {
                const num = parseFloat(value);
                return num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
              },
            },
            { field: "actualHours", title: "小時", width: 60, align: "center" },
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
          // 停用編輯相關按鈕
          $("#btnEdit, #btnView, #btnDelete").prop("disabled", true);

          // 設置行號列標題為"項次"
          setTimeout(() => {
            const $panel = $table.datagrid("getPanel");
            $panel.addClass("with-frozen-divider");
            $panel.find(".datagrid-view").addClass("with-frozen-divider");
            const $headerRownumber = $panel
              .find(".datagrid-header .datagrid-header-rownumber")
              .first();

            if ($headerRownumber.length > 0) {
              const $cell = $headerRownumber.find(".datagrid-cell").first();
              const $target = $cell.length > 0 ? $cell : $headerRownumber;

              $target.empty().text("項次").css({
                "text-align": "center",
                "font-weight": "normal",
              });
            }
          }, 50);
        },
        onBeforeLoad: function (param) {
          console.log("準備載入分頁資料，參數:", param);

          // 攔截分頁參數並手動處理資料載入
          if (ActivityInfoManagementPage.allData && param.page && param.rows) {
            const allData = ActivityInfoManagementPage.allData;
            const pageNumber = param.page;
            const pageSize = param.rows;

            // 計算分頁資料
            const start = (pageNumber - 1) * pageSize;
            const end = start + pageSize;
            const pageData = allData.slice(start, end);

            console.log(
              `onBeforeLoad處理 - 第${pageNumber}頁，每頁${pageSize}筆，從第${
                start + 1
              }筆到第${Math.min(end, allData.length)}筆，實際載入${
                pageData.length
              }筆`,
            );

            // 阻止預設的載入行為並載入我們的資料
            setTimeout(() => {
              $table.datagrid("loadData", {
                total: allData.length,
                rows: pageData,
              });
            }, 0);

            return false; // 阻止預設載入
          }
        },
        onChangePageSize: function (pageSize) {
          console.log(`更改每頁筆數為: ${pageSize}`);
          const table = $(this);
          const allData = ActivityInfoManagementPage.allData || [];

          // 計算新的資料
          const newData = {
            total: allData.length,
            rows: allData.slice(0, pageSize),
          };

          console.log(
            `載入資料 - 總共${allData.length}筆，顯示前${pageSize}筆，實際載入${newData.rows.length}筆`,
          );

          // 載入新資料
          table.datagrid("loadData", newData);

          // 手動重置分頁器到第一頁
          setTimeout(() => {
            const pager = table.datagrid("getPager");
            pager.pagination({
              total: allData.length,
              pageNumber: 1,
              pageSize: pageSize,
            });
          }, 100);
        },
        onSelectPage: function (pageNumber, pageSize) {
          console.log(`切換到第 ${pageNumber} 頁，每頁 ${pageSize} 筆`);
          const table = $(this);
          const allData = ActivityInfoManagementPage.allData || [];

          // 計算起始和結束位置
          const start = (pageNumber - 1) * pageSize;
          const end = start + pageSize;
          const pageData = allData.slice(start, end);

          const newData = {
            total: allData.length,
            rows: pageData,
          };

          console.log(
            `載入第${pageNumber}頁資料 - 從第${start + 1}筆到第${Math.min(
              end,
              allData.length,
            )}筆，實際載入${pageData.length}筆`,
          );

          // 載入分頁資料
          table.datagrid("loadData", newData);
        },
      });
    }
  },

  // 手動處理分頁資料
  getPagedData: function (allData, pageNumber, pageSize) {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    const pagedData = allData.slice(start, end);

    console.log(
      `getPagedData: 第${pageNumber}頁, 每頁${pageSize}筆, 取第${
        start + 1
      }-${Math.min(end, allData.length)}筆, 實際傳回${pagedData.length}筆`,
    );

    return {
      total: allData.length,
      rows: pagedData,
    };
  },

  // 生成範例資料
  generateSampleData: function () {
    const sampleData = [];
    const workTypes = window.ActivityWorkTypeData || [];
    const handleTypes = window.ActivityHandleTypeData || [];
    const activityTypes = window.ActivityTypeData || [];
    const implementTypes = window.ActivityImplementTypeData || [];
    const activityStatuses = window.ActivityStatusData || [];
    const regions = window.RegionalData ? window.RegionalData.regions : [];

    for (let i = 1; i <= 20; i++) {
      const randomDate = new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      );
      const startDate = randomDate;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10) + 1);

      const formattedStart = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
      const formattedEnd = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

      const workType =
        workTypes.length > 0
          ? workTypes[Math.floor(Math.random() * workTypes.length)].code
          : "WT" + i;
      const handleType =
        handleTypes.length > 0
          ? handleTypes[Math.floor(Math.random() * handleTypes.length)].code
          : "HT" + i;
      const activityType =
        activityTypes.length > 0
          ? activityTypes[Math.floor(Math.random() * activityTypes.length)].code
          : "AT" + i;
      const implementType =
        implementTypes.length > 0
          ? implementTypes[Math.floor(Math.random() * implementTypes.length)]
              .code
          : "IT" + i;
      const activityStatus =
        activityStatuses.length > 0
          ? activityStatuses[
              Math.floor(Math.random() * activityStatuses.length)
            ].code
          : "AS" + i;
      const region =
        regions.length > 0
          ? regions[Math.floor(Math.random() * regions.length)].name
          : ["北部", "中部", "南部", "東部"][Math.floor(Math.random() * 4)];

      const isDeleted = i <= 2 ? "Y" : "N";
      const deleteReason = isDeleted === "Y" ? "測試資料" : null;

      sampleData.push({
        activityDate: formattedStart, // 保留原有欄位
        activityDateStart: formattedStart,
        activityDateEnd: formattedEnd,
        plannedAction: `執行事項 ${i}`,
        COUNTY_LABEL: region,
        REGION_LABEL: region,
        workType: workType,
        handleType: handleType,
        activityType: activityType,
        implementType: implementType,
        activityStatus: activityStatus,
        isInternational: Math.random() > 0.5 ? 1 : 0,
        venue: `舉辦地點 ${i}`,
        actualDays: ((Math.floor(Math.random() * 20) + 1) * 0.5).toFixed(1),
        actualHours: Math.floor(Math.random() * 24) + 1,
        IS_DELETED: isDeleted,
        DELETE_REASON: deleteReason,
        contactName: `聯絡人${i}`,
        CONTACT_PHONE: `091234567${i}`,
        documentStatus: ["preparing", "agenda", "organizing", "completed"][
          Math.floor(Math.random() * 4)
        ],
      });
    }

    return sampleData;
  },

  // 清除表單
  clearForm: function () {
    const $content = $("#EventReportManagementContent");
    const $form = $content.find("form");

    // 重置表單
    $form[0].reset();

    // 設定預設日期
    this.setDefaultDates();

    // 清空查詢摘要
    $("#QueryText").text("");
    $("#ResultText").text("");
    $("#ResultTime").text("");
  },

  // 設定預設日期（當月1號至今天）
  setDefaultDates: function () {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    $("#Q_ACTIVITY_DATE_S").val(formatDate(firstDay));
    $("#Q_ACTIVITY_DATE_E").val(formatDate(today));
  },

  // 動態載入 ActivityInfoForm
  loadActivityInfoForm: function (callback) {
    if (typeof ActivityInfoForm !== "undefined") {
      // 已載入，直接執行回調
      if (callback) callback();
      return;
    }

    // 動態載入 ActivityInfoForm.js
    const script = document.createElement("script");
    script.src = "pages/ActivityInfoForm.js";
    script.onload = function () {
      if (callback) callback();
    };
    script.onerror = function () {
      $.messager.alert("錯誤", "無法載入活動資訊表單元件", "error");
    };
    document.head.appendChild(script);
  },

  // CRUD 操作
  addRecord: function () {
    // 載入 ActivityInfoForm.js 並顯示新增表單
    this.loadActivityInfoForm(() => {
      ActivityInfoForm.show("add");
    });
  },

  editRecord: function () {
    const $table = $(`#${this.tableId}`);
    const selected = $table.datagrid("getSelected");
    if (!selected) {
      $.messager.alert("提示", "請先選擇要編輯的記錄！", "warning");
      return;
    }

    // 載入 ActivityInfoForm.js 並顯示編輯表單
    this.loadActivityInfoForm(() => {
      ActivityInfoForm.show("edit", selected);
    });
  },

  viewRecord: function () {
    const $table = $(`#${this.tableId}`);
    const selected = $table.datagrid("getSelected");
    if (!selected) {
      $.messager.alert("提示", "請先選擇要檢視的記錄！", "warning");
      return;
    }

    // 載入 ActivityInfoForm.js 並顯示檢視表單
    this.loadActivityInfoForm(() => {
      ActivityInfoForm.show("view", selected);
    });
  },

  deleteRecord: function () {
    const self = this;
    const $table = $(`#${this.tableId}`);
    const selected = $table.datagrid("getSelected");

    if (!selected) {
      return;
    }

    // 使用 CommonData 的刪除原因選項
    const deleteReasons = window.DeleteReasonData || [];

    // 建立 EasyUI 風格的對話框HTML
    const deleteReasonHtml = `
      <div class="messager-body panel-body panel-body-noborder window-body">
        <div class="messager-icon messager-question"></div>
        <div style="margin-left: 40px;">
          <div style="margin-bottom: 10px;">
            <span style="font-weight: bold; font-size: 16px;">確定要刪除此筆資料嗎？</span><br/>
            執行事項：${selected.plannedAction}<br/>
          </div>
          <div style="margin-bottom: 15px;">
            <label for="deleteReason" style="display: inline-block; width: 85px; vertical-align: top; white-space: nowrap;"><span style="color: red;">*</span><strong>刪除原因：</strong></label>
            <select id="deleteReason" class="textbox-text" style="width: 220px; padding: 5px; border: 1px solid #ccc; display: inline-block;" required>
              ${deleteReasons
                .map(
                  (reason) =>
                    `<option value="${reason.code}">${reason.name}</option>`,
                )
                .join("")}
            </select>
          </div>
          <div id="otherReasonContainer" style="margin-bottom: 15px; display: none;">
            <label for="otherReasonText" style="display: inline-block; width: 85px; vertical-align: top; white-space: nowrap;"><span style="color: red;">*</span><strong>其他原因：</strong></label>
            <input type="text" id="otherReasonText" class="textbox-text" style="width: 220px; padding: 5px; border: 1px solid #ccc; display: inline-block;"  maxlength="100">
          </div>
        </div>
        <div style="clear:both;"></div>
        <div class="messager-button" style="text-align: center; padding-top: 15px;">
          <a href="javascript:void(0)" class="l-btn l-btn-small" id="deleteConfirmBtn" style="margin-left: 10px;">
            <span class="l-btn-left">
              <span class="l-btn-text">確定</span>
            </span>
          </a>
          <a href="javascript:void(0)" class="l-btn l-btn-small" id="deleteCancelBtn" style="margin-left: 10px;">
            <span class="l-btn-left">
              <span class="l-btn-text">取消</span>
            </span>
          </a>
        </div>
      </div>
    `;

    // 建立 EasyUI 風格的模態對話框
    const $dialogContainer = $(
      '<div class="panel window messager-window" style="display: none; width: 400px;"></div>',
    );
    const $dialogHeader = $(`
      <div class="panel-header panel-header-noborder window-header">
        <div class="panel-title">請確認</div>
        <div class="panel-tool">
          <a class="panel-tool-close" href="javascript:void(0)"></a>
        </div>
      </div>
    `);

    $dialogContainer.append($dialogHeader);
    $dialogContainer.append(deleteReasonHtml);
    $("body").append($dialogContainer);

    // 計算居中位置
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const dialogWidth = 400;
    const dialogHeight = 280;

    $dialogContainer.css({
      display: "block",
      position: "fixed",
      left: (windowWidth - dialogWidth) / 2 + "px",
      top: (windowHeight - dialogHeight) / 2 + "px",
      "z-index": 9002,
    });

    // 加入遮罩
    const $overlay = $(
      '<div class="window-mask" style="display: block; z-index: 9001;"></div>',
    );
    $("body").append($overlay);

    // 綁定下拉選單變更事件
    $("#deleteReason").on("change", function () {
      const selectedValue = $(this).val();
      const $otherContainer = $("#otherReasonContainer");
      const $otherInput = $("#otherReasonText");

      if (selectedValue === "other") {
        $otherContainer.show();
        $otherInput.focus();
      } else {
        $otherContainer.hide();
        $otherInput.val("").css("border-color", "#ccc");
      }
    });

    // 綁定確定按鈕事件
    $("#deleteConfirmBtn").on("click", function () {
      const selectedReason = $("#deleteReason").val();
      const otherReasonText = $("#otherReasonText").val().trim();

      // 重置邊框顏色
      $("#deleteReason").css("border-color", "#ccc");
      $("#otherReasonText").css("border-color", "#ccc");

      if (!selectedReason || selectedReason === "") {
        // 高亮必填欄位
        $("#deleteReason").css("border-color", "#ff4444");
        $.messager.alert(
          "提示",
          "刪除原因為必填項目，請選擇刪除原因！",
          "warning",
        );
        return;
      }

      // 如果選擇其他原因，檢查文字輸入
      if (selectedReason === "other" && !otherReasonText) {
        $("#otherReasonText").css("border-color", "#ff4444");
        $.messager.alert("提示", "請輸入其他原因！", "warning");
        $("#otherReasonText").focus();
        return;
      }

      // 執行刪除邏輯
      let reasonText = $("#deleteReason option:selected").text();
      if (selectedReason === "other") {
        reasonText = otherReasonText;
      }
      console.log("刪除資料:", {
        record: selected,
        reason: selectedReason,
        reasonText: reasonText,
      });

      // 顯示成功訊息
      $.messager.show({
        title: "成功",
        msg: `<i class="fa fa-check-circle" style="color: #5cb85c; margin-right: 5px;"></i>刪除成功`,
        timeout: 3000,
        showType: "fade",
        style: {
          right: "",
          bottom: "",
          top: ($(window).height() - 150) / 2,
          left: ($(window).width() - 300) / 2,
        },
      });

      // 關閉對話框
      $dialogContainer.remove();
      $overlay.remove();

      // 實際應該呼叫 API 並重新查詢
      // self.searchData();
    });

    // 綁定取消和關閉按鈕事件
    $("#deleteCancelBtn, .panel-tool-close").on("click", function () {
      $dialogContainer.remove();
      $overlay.remove();
    });
  },

  exportData: function () {
    const $content = $("#EventReportManagementContent");
    const queryText = $("#QueryText").text();
    alert(
      "功能（待實作）\n\n將匯出符合以下條件的資料：\n" +
        (queryText || "全部資料"),
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
  // 將元件掛到 window 物件
  window.ActivityInfoManagementPage = ActivityInfoManagementPage;
}
