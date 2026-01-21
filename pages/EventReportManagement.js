// EventReportManagement.js - 事件通報與管理頁面

const EventReportManagementPage = {
  // 生成 HTML 內容
  getContent: function () {
    // 檢查依賴項是否存在
    if (typeof CommonDataUtils === "undefined") {
      return '<div class="alert alert-danger">錯誤：CommonDataUtils 未定義</div>';
    }
    if (typeof DisasterData === "undefined") {
      return '<div class="alert alert-danger">錯誤：DisasterData 未定義</div>';
    }
    if (typeof CountyData === "undefined") {
      return '<div class="alert alert-danger">錯誤：CountyData 未定義</div>';
    }
    if (typeof REMOCData === "undefined") {
      return '<div class="alert alert-danger">錯誤：REMOCData 未定義</div>';
    }
    if (typeof RegionalData === "undefined") {
      return '<div class="alert alert-danger">錯誤：RegionalData 未定義</div>';
    }
    if (typeof ButtonComponent === "undefined") {
      return '<div class="alert alert-danger">錯誤：ButtonComponent 未定義</div>';
    }

    const timestamp = Date.now();
    const formId = `FormSearch`;
    const tableId = `EventReportTable${timestamp}`;

    // 儲存 ID 供其他方法使用
    this.formId = formId;
    this.tableId = tableId;

    return /*html*/ `
   <style>
     /* 凍結窗格分隔線加粗 */
     .datagrid-frozen .datagrid-btable {
       border-right: 3px solid #ccc !important;
     }
     .datagrid-frozen-panel {
       border-right: 3px solid #ccc !important;
     }
     .datagrid-view2 .datagrid-header,
     .datagrid-view2 .datagrid-body {
       border-left: 3px solid #ccc !important;
     }
   </style>
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
                      <!-- 編號 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">災害編號</label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="Q_EVENT_NO" name="Q_EVENT_NO" placeholder="請輸入災害編號">
                        </div>
                      </div>

                      <!-- 名稱 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">災害名稱</label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="Q_EVENT_NAME" name="Q_EVENT_NAME" placeholder="請輸入災害名稱">
                        </div>
                      </div>

                      <!-- 災害屬性 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">災害屬性</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_DISASTER_ATTR" name="Q_DISASTER_ATTR">
                            <option value="">全部</option>
                            ${CommonDataUtils.generateOptions(
                              DisasterData.disasterTypeAttr,
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

                  

                      <!-- 發生日期 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">發生日期(起)</label>
                        <div class="col-sm-7">
                          <div class="input-group padding-none">
                            <div class="input-group-addon">
                              <i class="zmdi zmdi-calendar-note"></i>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              id="Q_HAPPEN_TIME_S"
                              name="Q_HAPPEN_TIME_S"
                              data-type="date"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-5 control-label">發生日期(訖)</label>
                        <div class="col-sm-7">
                          <div class="input-group padding-none">
                            <div class="input-group-addon">
                              <i class="zmdi zmdi-calendar-note"></i>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              id="Q_HAPPEN_TIME_E"
                              name="Q_HAPPEN_TIME_E"
                              data-type="date"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                      </div>

                      <!-- 區域 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">區域</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_REGION" name="Q_REGION">
                            <option value="">全部</option>
                            ${CommonDataUtils.generateOptions(
                              RegionalData.regions,
                            )}
                          </select>
                        </div>
                      </div>

                      <!-- 發生地 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">發生地</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_LOCATION" name="Q_LOCATION">
                            <option value="">全部</option>
                            <option value="TW">台灣</option>
                            ${CommonDataUtils.generateOptions(
                              CountyData.counties,
                            )}
                          </select>
                        </div>
                      </div>

                      <!--事件來源 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">事件來源</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="Q_SOURCE" name="Q_SOURCE">
                            <option value="">全部</option>
                            ${
                              typeof MessageSourceData !== "undefined"
                                ? CommonDataUtils.generateOptions(
                                    MessageSourceData,
                                  )
                                : ""
                            }
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
                 ${ButtonComponent.exportLightPurple()}
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
                    ${ButtonComponent.add("btnAdd", "新增")}
                    ${ButtonComponent.edit("btnEdit", "修改")}
                    ${ButtonComponent.view("btnView", "檢視")}
                    ${ButtonComponent.delete("btnDelete", "刪除")}
                    ${ButtonComponent.exportLightPurple("btnExportLightPurple")}
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
    // 統計災害種類
    const disasterStats = {};
    sampleData.forEach((item) => {
      const disasterType = item.DISASTER_TYPE || "未分類";
      disasterStats[disasterType] = (disasterStats[disasterType] || 0) + 1;
    });

    // 建立災害種類統計文字
    const statsText = Object.entries(disasterStats)
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
              field: "HAPPEN_TIME_LABEL",
              title: "發生日期",
              width: 100,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                if (!value) return "";
                // 只顯示日期部分 (yyyy-MM-dd)
                const dateOnly = value.split(" ")[0];
                return '<span title="' + value + '">' + dateOnly + "</span>";
              },
            },
            {
              field: "DISASTER_NO_LABEL",
              title: "災害編號",
              width: 100,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return value;
                }
                return "-";
              },
            },
            {
              field: "DISASTER_TYPE",
              title: "災害種類",
              width: 80,
              align: "center",
              rowspan: 2,
            },
            {
              field: "DISASTER_NAME",
              title: "災害名稱",
              width: 210,
              align: "center", // 表頭置中
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
              field: "REGION_LABEL",
              title: "區域",
              width: 80,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                if (
                  typeof CommonDataUtils !== "undefined" &&
                  row.COUNTY_LABEL
                ) {
                  // 依照範例資料 COUNTY_LABEL 取得對應 code
                  var county =
                    typeof CountyData !== "undefined" &&
                    CountyData.counties.find(
                      (c) => c.name === row.COUNTY_LABEL,
                    );
                  var code = county ? county.code : "";
                  return CommonDataUtils.getRegionByCounty(code) || "";
                }
                return "";
              },
            },
            {
              field: "COUNTY_LABEL",
              title: "發生地",
              width: 80,
              align: "center",
              rowspan: 2,
            },
            {
              title: "事件",
              colspan: 2,
            },
            {
              title: "醫療檢傷人數",
              colspan: 7,
            },
            {
              field: "DEATH_COUNT",
              title: "死亡",
              width: 40,
              align: "center",
              rowspan: 2,
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return value || "0";
                }
                return "-";
              },
            },
            {
              title: "事件傷亡人數",
              colspan: 3,
            },
            {
              title: "簡訊通報數",
              colspan: 4,
            },
            {
              title: "電話通報數",
              colspan: 4,
            },
            {
              field: "REPORTER",
              title: "監看<br/>人員",
              width: 55,
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
              field: "MSG_SOURCE",
              title: "來源",
              width: 120,
              align: "center",
            },
            {
              field: "MSG_CREATE_TIME",
              title: "建立日期",
              width: 100,
              align: "center",
              formatter: function (value, row, index) {
                if (!value) return "";
                // 只顯示日期部分 (yyyy-MM-dd)
                const dateOnly = value.split(" ")[0];
                return '<span title="' + value + '">' + dateOnly + "</span>";
              },
            },
            {
              field: "TRIAGE_LEVEL_1",
              title: "一",
              width: 40,
              align: "center",
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return value || "0";
                }
                return "-";
              },
            },
            {
              field: "TRIAGE_LEVEL_2",
              title: "二",
              width: 40,
              align: "center",
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return value || "0";
                }
                return "-";
              },
            },
            {
              field: "TRIAGE_LEVEL_3",
              title: "三",
              width: 40,
              align: "center",
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return value || "0";
                }
                return "-";
              },
            },
            {
              field: "TRIAGE_LEVEL_4",
              title: "四",
              width: 40,
              align: "center",
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return value || "0";
                }
                return "-";
              },
            },
            {
              field: "TRIAGE_LEVEL_5",
              title: "五",
              width: 40,
              align: "center",
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return value || "0";
                }
                return "-";
              },
            },
            {
              field: "TRIAGE_LEVEL_UNKNOWN",
              title: "未",
              width: 40,
              align: "center",
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return value || "0";
                }
                return "-";
              },
            },
            {
              field: "TRIAGE_TOTAL",
              title: "總",
              width: 40,
              align: "center",
              styler: function (value, row, index) {
                return "font-weight: bold;";
              },
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return value || "0";
                }
                return "-";
              },
            },
            {
              field: "CASUALTY_DEATH",
              title: "死亡",
              width: 50,
              align: "center",
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return "-";
                }
                return value || "0";
              },
            },
            {
              field: "CASUALTY_INJURED",
              title: "傷病",
              width: 40,
              align: "center",
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return "-";
                }
                return value || "0";
              },
            },
            {
              field: "CASUALTY_MISSING",
              title: "失蹤",
              width: 40,
              align: "center",
              formatter: function (value, row, index) {
                if (row.MSG_SOURCE === "EMS") {
                  return "-";
                }
                return value || "0";
              },
            },
            {
              field: "MOH_SMS",
              title: "衛福部",
              width: 50,
              align: "center",
            },
            {
              field: "BUREAU_SMS",
              title: "衛生局",
              width: 50,
              align: "center",
            },
            {
              field: "HOSPITAL_SMS",
              title: "責任醫院",
              width: 68,
              align: "center",
            },
            {
              field: "COMMAND_SMS",
              title: "指揮中心",
              width: 68,
              align: "center",
            },
            {
              field: "MOH_PHONE",
              title: "衛福部",
              width: 50,
              align: "center",
            },
            {
              field: "BUREAU_PHONE",
              title: "衛生局",
              width: 50,
              align: "center",
            },
            {
              field: "HOSPITAL_PHONE",
              title: "責任醫院",
              width: 68,
              align: "center",
            },
            {
              field: "COMMAND_PHONE",
              title: "指揮中心",
              width: 68,
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
          // 停用編輯相關按鈕
          $("#btnEdit, #btnView, #btnDelete").prop("disabled", true);

          // 設置行號列標題為"項次"
          setTimeout(() => {
            const $panel = $table.datagrid("getPanel");
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
          if (EventReportManagementPage.allData && param.page && param.rows) {
            const allData = EventReportManagementPage.allData;
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
          const allData = EventReportManagementPage.allData || [];

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
          const allData = EventReportManagementPage.allData || [];

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
    return [
      {
        COUNTY_LABEL: "台北市",
        HAPPEN_TIME_LABEL: "2026-01-05 10:30",
        DISASTER_TYPE: "地震",
        DISASTER_NO_LABEL: "E1150105-001",
        DISASTER_NAME: "台北市信義區規模6.2地震災害緊急救護應變事件處理",
        MSG_SOURCE: "EMS",
        MSG_CREATE_TIME: "2026-01-05 10:35",
        TRIAGE_LEVEL_1: 2,
        TRIAGE_LEVEL_2: 3,
        TRIAGE_LEVEL_3: 5,
        TRIAGE_LEVEL_4: 3,
        TRIAGE_LEVEL_5: 2,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 15,
        DEATH_COUNT: 0,
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 15,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 2,
        HOSPITAL_SMS: 3,
        COMMAND_SMS: 4,
        MOH_PHONE: 1,
        BUREAU_PHONE: 2,
        HOSPITAL_PHONE: 3,
        COMMAND_PHONE: 4,
        IS_DELETED: "N",
        DELETE_REASON: "",
        REPORTER: "王小明",
        CONTACT_PHONE: "0912345678",
      },
      {
        COUNTY_LABEL: "新北市",
        HAPPEN_TIME_LABEL: "2026-01-04 15:45",
        DISASTER_TYPE: "交通事故",
        DISASTER_NO_LABEL: "C1150104-002",
        DISASTER_NAME: "新北市板橋區重大車禍事件",
        MSG_SOURCE: "消防局救護派遣系統",
        MSG_CREATE_TIME: "2026-01-04 15:50",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 3,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 8,
        DEATH_COUNT: 1,
        CASUALTY_DEATH: 1,
        CASUALTY_INJURED: 7,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
        IS_DELETED: "Y",
        DELETE_REASON: "資料重複",
        REPORTER: "林美玉",
        CONTACT_PHONE: "0987654321",
      },
      {
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
        CASUALTY_DEATH: 1,
        CASUALTY_INJURED: 7,
        CASUALTY_MISSING: 0,
        MOH_SMS: 0,
        BUREAU_SMS: 0,
        HOSPITAL_SMS: 0,
        COMMAND_SMS: 0,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
        IS_DELETED: "Y",
        DELETE_REASON: "資料重複",
        REPORTER: "張志強",
        CONTACT_PHONE: "0955123456",
      },
      {
        COUNTY_LABEL: "台中市",
        HAPPEN_TIME_LABEL: "2026-01-03 09:00",
        DISASTER_TYPE: "演習",
        DISASTER_NO_LABEL: "G1150103-001",
        DISASTER_NAME: "台中市大型活動救護演習",
        MSG_SOURCE: "消防局LINE",
        MSG_CREATE_TIME: "2026-01-03 09:05",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 0,
        TRIAGE_LEVEL_3: 0,
        TRIAGE_LEVEL_4: 0,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 0,
        DEATH_COUNT: 0,
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 0,
        CASUALTY_MISSING: 0,
        MOH_SMS: 0,
        BUREAU_SMS: 0,
        HOSPITAL_SMS: 0,
        COMMAND_SMS: 0,
        MOH_PHONE: 0,
        BUREAU_PHONE: 0,
        HOSPITAL_PHONE: 0,
        COMMAND_PHONE: 0,
        REPORTER: "李大仁",
        CONTACT_PHONE: "0911223344",
      },
      {
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
        CASUALTY_DEATH: 2,
        CASUALTY_INJURED: 3,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 2,
        HOSPITAL_SMS: 3,
        COMMAND_SMS: 4,
        MOH_PHONE: 1,
        BUREAU_PHONE: 2,
        HOSPITAL_PHONE: 3,
        COMMAND_PHONE: 4,
        IS_DELETED: "N",
        DELETE_REASON: "",
        REPORTER: "陳美華",
        CONTACT_PHONE: "0933445566",
      },
      {
        COUNTY_LABEL: "桃園市",
        HAPPEN_TIME_LABEL: "2026-01-01 18:20",
        DISASTER_TYPE: "寒害",
        DISASTER_NO_LABEL: "R1150101-001",
        DISASTER_NAME: "桃園市寒害事件",
        MSG_SOURCE: "消防局無線電",
        MSG_CREATE_TIME: "2026-01-01 18:25",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 4,
        TRIAGE_LEVEL_4: 3,
        TRIAGE_LEVEL_5: 2,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 12,
        DEATH_COUNT: 0,
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 12,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
        IS_DELETED: "N",
        DELETE_REASON: "",
        REPORTER: "吳俊賢",
        CONTACT_PHONE: "0977889900",
      },
      {
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
        CASUALTY_DEATH: 1,
        CASUALTY_INJURED: 6,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
        REPORTER: "周怡君",
        CONTACT_PHONE: "0922113344",
      },
      {
        COUNTY_LABEL: "金門縣",
        HAPPEN_TIME_LABEL: "2026-01-12 14:00",
        DISASTER_TYPE: "火災",
        DISASTER_NO_LABEL: "F1150112-001",
        DISASTER_NAME: "金門縣金城鎮住宅火災",
        MSG_SOURCE: "網路新聞",
        MSG_CREATE_TIME: "2026-01-12 14:05",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 1,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 4,
        DEATH_COUNT: 0,
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 4,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
        REPORTER: "許志明",
      },
      {
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
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 6,
        CASUALTY_MISSING: 0,
        MOH_SMS: 0,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
        REPORTER: "黃子軒",
      },
      {
        COUNTY_LABEL: "彰化縣",
        HAPPEN_TIME_LABEL: "2025-12-27 11:30",
        DISASTER_TYPE: "火災",
        DISASTER_NO_LABEL: "F1141227-002",
        DISASTER_NAME: "彰化縣和美鎮倉儲火警",
        MSG_SOURCE: "網路新聞",
        MSG_CREATE_TIME: "2025-12-27 11:35",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 1,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 4,
        DEATH_COUNT: 0,
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 4,
        CASUALTY_MISSING: 0,
        MOH_SMS: 0,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
        REPORTER: "簡佩珊",
      },
      {
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
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 9,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
        REPORTER: "林信宏",
      },
      {
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
        CASUALTY_DEATH: 1,
        CASUALTY_INJURED: 17,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 2,
        HOSPITAL_SMS: 2,
        COMMAND_SMS: 2,
        MOH_PHONE: 1,
        BUREAU_PHONE: 2,
        HOSPITAL_PHONE: 2,
        COMMAND_PHONE: 2,
      },
      {
        COUNTY_LABEL: "屏東縣",
        HAPPEN_TIME_LABEL: "2025-12-24 10:00",
        DISASTER_TYPE: "演習",
        DISASTER_NO_LABEL: "G1141224-001",
        DISASTER_NAME: "屏東縣大規模災害演練",
        MSG_SOURCE: "網路新聞",
        MSG_CREATE_TIME: "2025-12-24 10:05",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 0,
        TRIAGE_LEVEL_3: 0,
        TRIAGE_LEVEL_4: 0,
        TRIAGE_LEVEL_5: 0,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 0,
        DEATH_COUNT: 0,
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 0,
        CASUALTY_MISSING: 0,
        MOH_SMS: 0,
        BUREAU_SMS: 0,
        HOSPITAL_SMS: 0,
        COMMAND_SMS: 0,
        MOH_PHONE: 0,
        BUREAU_PHONE: 0,
        HOSPITAL_PHONE: 0,
        COMMAND_PHONE: 0,
      },
      {
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
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 5,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
      },
      {
        COUNTY_LABEL: "南投縣",
        HAPPEN_TIME_LABEL: "2025-12-22 14:50",
        DISASTER_TYPE: "地震",
        DISASTER_NO_LABEL: "E1141222-002",
        DISASTER_NAME: "南投縣埔里鎮地震事件",
        MSG_SOURCE: "網路新聞",
        MSG_CREATE_TIME: "2025-12-22 14:55",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 4,
        TRIAGE_LEVEL_4: 3,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 11,
        DEATH_COUNT: 0,
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 11,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
      },
      {
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
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 7,
        CASUALTY_MISSING: 0,
        MOH_SMS: 0,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
      },
      {
        COUNTY_LABEL: "基隆市",
        HAPPEN_TIME_LABEL: "2025-12-20 21:15",
        DISASTER_TYPE: "火災",
        DISASTER_NO_LABEL: "F1141220-003",
        DISASTER_NAME: "基隆市仁愛區住宅火災",
        MSG_SOURCE: "網路新聞",
        MSG_CREATE_TIME: "2025-12-20 21:20",
        TRIAGE_LEVEL_1: 1,
        TRIAGE_LEVEL_2: 2,
        TRIAGE_LEVEL_3: 2,
        TRIAGE_LEVEL_4: 2,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 8,
        DEATH_COUNT: 1,
        CASUALTY_DEATH: 1,
        CASUALTY_INJURED: 7,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 2,
      },
      {
        COUNTY_LABEL: "新竹縣",
        HAPPEN_TIME_LABEL: "2025-12-19 09:30",
        DISASTER_TYPE: "其他",
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
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 0,
        CASUALTY_MISSING: 0,
        MOH_SMS: 0,
        BUREAU_SMS: 0,
        HOSPITAL_SMS: 0,
        COMMAND_SMS: 0,
        MOH_PHONE: 0,
        BUREAU_PHONE: 0,
        HOSPITAL_PHONE: 0,
        COMMAND_PHONE: 0,
      },
      {
        COUNTY_LABEL: "澎湖縣",
        HAPPEN_TIME_LABEL: "2025-12-18 15:20",
        DISASTER_TYPE: "交通事故",
        DISASTER_NO_LABEL: "C1141218-001",
        DISASTER_NAME: "澎湖縣馬公市港區交通事故",
        MSG_SOURCE: "網路新聞",
        MSG_CREATE_TIME: "2025-12-18 15:25",
        TRIAGE_LEVEL_1: 0,
        TRIAGE_LEVEL_2: 1,
        TRIAGE_LEVEL_3: 1,
        TRIAGE_LEVEL_4: 1,
        TRIAGE_LEVEL_5: 1,
        TRIAGE_LEVEL_UNKNOWN: 0,
        TRIAGE_TOTAL: 4,
        DEATH_COUNT: 0,
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 4,
        CASUALTY_MISSING: 0,
        MOH_SMS: 0,
        BUREAU_SMS: 1,
        HOSPITAL_SMS: 1,
        COMMAND_SMS: 1,
        MOH_PHONE: 1,
        BUREAU_PHONE: 1,
        HOSPITAL_PHONE: 1,
        COMMAND_PHONE: 1,
      },
      {
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
        CASUALTY_DEATH: 0,
        CASUALTY_INJURED: 13,
        CASUALTY_MISSING: 0,
        MOH_SMS: 1,
        BUREAU_SMS: 2,
        HOSPITAL_SMS: 2,
        COMMAND_SMS: 2,
        MOH_PHONE: 1,
        BUREAU_PHONE: 2,
        HOSPITAL_PHONE: 2,
        COMMAND_PHONE: 1,
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

    $("#Q_HAPPEN_TIME_S").val(formatDate(firstDay));
    $("#Q_HAPPEN_TIME_E").val(formatDate(today));
  },

  // 動態載入 EventReportForm
  loadEventReportForm: function (callback) {
    if (typeof EventReportForm !== "undefined") {
      // 已載入，直接執行回調
      if (callback) callback();
      return;
    }

    // 動態載入 EventReportForm.js
    const script = document.createElement("script");
    script.src = "pages/EventReportForm.js";
    script.onload = function () {
      if (callback) callback();
    };
    script.onerror = function () {
      $.messager.alert("錯誤", "無法載入事件表單元件", "error");
    };
    document.head.appendChild(script);
  },

  // CRUD 操作
  addRecord: function () {
    // 載入 EventReportForm.js 並顯示新增表單
    this.loadEventReportForm(() => {
      EventReportForm.show("add");
    });
  },

  editRecord: function () {
    const $table = $(`#${this.tableId}`);
    const selected = $table.datagrid("getSelected");
    if (!selected) {
      $.messager.alert("提示", "請先選擇要編輯的記錄！", "warning");
      return;
    }

    // 載入 EventReportForm.js 並顯示編輯表單
    this.loadEventReportForm(() => {
      EventReportForm.show("edit", selected);
    });
  },

  viewRecord: function () {
    const $table = $(`#${this.tableId}`);
    const selected = $table.datagrid("getSelected");
    if (!selected) {
      $.messager.alert("提示", "請先選擇要檢視的記錄！", "warning");
      return;
    }

    // 載入 EventReportForm.js 並顯示檢視表單
    this.loadEventReportForm(() => {
      EventReportForm.show("view", selected);
    });
  },

  deleteRecord: function () {
    const self = this;
    const $table = $(`#${this.tableId}`);
    const selected = $table.datagrid("getSelected");

    if (!selected) {
      return;
    }

    // 刪除理由選項
    const deleteReasons = [
      { value: "", text: "請選擇" },
      { value: "data_duplicate", text: "資料重複" },
      { value: "input_error", text: "輸入錯誤" },
      { value: "test_data", text: "測試資料" },
      { value: "system_error", text: "系統錯誤" },
      { value: "cancelled_event", text: "事件取消" },
      { value: "other", text: "其他原因" },
    ];

    // 建立 EasyUI 風格的對話框HTML
    const deleteReasonHtml = `
      <div class="messager-body panel-body panel-body-noborder window-body">
        <div class="messager-icon messager-question"></div>
        <div style="margin-left: 40px;">
          <div style="margin-bottom: 10px;">
            <span style="font-weight: bold; font-size: 16px;">確定要刪除此筆資料嗎？</span><br/>
            災害名稱：${selected.DISASTER_NAME}<br/>
          </div>
          <div style="margin-bottom: 15px;">
            <label for="deleteReason" style="display: inline-block; width: 85px; vertical-align: top; white-space: nowrap;"><span style="color: red;">*</span><strong>刪除理由：</strong></label>
            <select id="deleteReason" class="textbox-text" style="width: 220px; padding: 5px; border: 1px solid #ccc; display: inline-block;" required>
              ${deleteReasons
                .map(
                  (reason) =>
                    `<option value="${reason.value}">${reason.text}</option>`,
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
          "刪除理由為必填項目，請選擇刪除理由！",
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
          DisasterData.disasterType,
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
