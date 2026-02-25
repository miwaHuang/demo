// EventMonitoringStatistics.js - 事件監控統計表頁面

const EventMonitoringStatisticsPage = {
  // 生成 HTML 內容
  getContent: function () {
    const timestamp = Date.now();
    const formId = `FormSearch`;
    const tableId = `EventMonitoringStatisticsTable${timestamp}`;

    // 儲存 ID 供其他方法使用
    this.formId = formId;
    this.tableId = tableId;

    return /*html*/ `

   <div id="EventMonitoringStatisticsContent" class="content">
  <div>
    <!-- 麵包屑導航 -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)" onclick="location.reload()">首頁</a></li>
        <li class="breadcrumb-item">REMOC管理</li>
        <li class="breadcrumb-item">統計分析報表</li>
        <li class="breadcrumb-item active" aria-current="page">事件監控統計表</li>
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
          <form id="FormSearch" class="active">
            <div class="row search-content">
              <div class="col-md-12">
                <div class="form-horizontal">
                      <!-- 區域 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">區域</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="searchRegion">
                            <option value="" selected>全部</option>
                            ${
                              window.RegionalData
                                ? window.RegionalData.regions
                                    .map(
                                      (region) =>
                                        `<option value="${region.code}">${region.name}</option>`,
                                    )
                                    .join("")
                                : ""
                            }
                          </select>
                        </div>
                      </div>

                      <!-- 事件分級 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">事件分級</label>
                        <div class="col-sm-7">
                          <select class="form-control" id="searchEventLevel">
                            <option value="">全部監看事件(含應變)</option>
                            <option value="RESPONSE" selected>應變事件</option>
                          </select>
                        </div>
                      </div>

                      <!-- 月份起 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">月份(起)</label>
                        <div class="col-sm-7">
                          <input type="month" class="form-control" id="searchYearMonthStart" value="2024-01">
                        </div>
                      </div>

                      <!-- 月份迄 -->
                      <div class="form-group">
                        <label class="col-sm-5 control-label">月份(迄)</label>
                        <div class="col-sm-7">
                          <input type="month" class="form-control" id="searchYearMonthEnd" value="2024-01">
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
              <!-- Tab 導航 -->
              <ul class="nav nav-pills">
                <li class="TAB_item active">
                  <a aria-expanded="true" data-toggle="tab" title="災害事件" role="tab" id="EventStatsTab" href="#tab1">
                    <span class="font-16 text">
                      災害事件
                    </span>
                  </a>
                </li>
                <li class="TAB_item next">
                  <a aria-expanded="false" data-toggle="tab" title="災類統計" role="tab" id="ProcessAnalysisTab" href="#tab2">
                    <span class="font-16 text">
                      災類統計
                    </span>
                  </a>
                </li>
                <li class="TAB_item next">
                  <a aria-expanded="false" data-toggle="tab" title="地區統計" role="tab" id="TrendChartTab" href="#tab3">
                    <span class="font-16 text">
                      地區統計
                    </span>
                  </a>
                </li>
                <li class="TAB_item next">
                  <a aria-expanded="false" data-toggle="tab" title="EMS災類與發生地比較" role="tab" id="TrendChartTab" href="#tab4">
                    <span class="font-16 text">
                      EMS災類與發生地比較
                    </span>
                  </a>
                </li>
                <li class="TAB_item next">
                  <a aria-expanded="false" data-toggle="tab" title="災防會災類與發生地比較" role="tab" id="TrendChartTab" href="#tab5">
                    <span class="font-16 text">
                      災防會災類與發生地比較
                    </span>
                  </a>
                </li>
                 <li class="TAB_item next">
                  <a aria-expanded="false" data-toggle="tab" title="監看記錄" role="tab" id="TrendChartTab" href="#tab6">
                    <span class="font-16 text">
                      監看記錄
                    </span>
                  </a>
                </li>
              </ul>

              <!-- Tab 內容 -->
              <div id="MEDA300RemindCont" class="tab-content" style="display:flex;flex-direction:column;width:100%;height:100%">
                <!-- Tab 1: 事件統計表 -->
                <div role="tabpanel" class="tab-pane active" id="tab1">
                  <div class="col-sm-12">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        查詢條件：
                        <span id="QueryCondition" style="color: #337ab7"></span>
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
                      ${ButtonComponent.btnImport("btnExport", "匯出")}
                    </div>
                    <!-- EasyUI DataGrid -->
                    <table id="${tableId}" class="EMSDataGrid"></table>
                  </div>
                </div>

                <!-- Tab 2: 災類統計 -->
                <div role="tabpanel" class="tab-pane" id="tab2">
                  <div class="col-sm-12">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        查詢條件：
                        <span id="QueryConditionTab2" style="color: #337ab7"></span>
                      </div>
                      <div>
                        查詢時間：
                        <span id="ResultTimeTab2" style="color: #666"></span>
                      </div>
                    </div>
                    <!-- 災類統計表格 -->
                    <table id="DisasterTypeStatsTable" class="EMSDataGrid"></table>
                  </div>
                </div>

                <!-- Tab 3: 地區統計 -->
                <div role="tabpanel" class="tab-pane" id="tab3">
                  <div class="col-sm-12">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        查詢條件：
                        <span id="QueryConditionTab3" style="color: #337ab7"></span>
                      </div>
                      <div>
                        查詢時間：
                        <span id="ResultTimeTab3" style="color: #666"></span>
                      </div>
                    </div>
                    <!-- 地區統計表格 -->
                    <table id="RegionStatsTable" class="EMSDataGrid"></table>
                  </div>
                </div>

                <!-- Tab 4: EMS災類與發生地區比較 -->
                <div role="tabpanel" class="tab-pane" id="tab4">
                  <div class="col-sm-12">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        查詢條件：
                        <span id="QueryConditionTab4" style="color: #337ab7"></span>
                      </div>
                      <div>
                        查詢時間：
                        <span id="ResultTimeTab4" style="color: #666"></span>
                      </div>
                    </div>
                    <!-- 災類與發生地區比較表格 -->
                    <table id="DisasterLocationComparisonTable" class="EMSDataGrid"></table>
                  </div>
                </div>

                <!-- Tab 5: 災防會災類與發生地區比較 -->
                <div role="tabpanel" class="tab-pane" id="tab5">
                  <div class="col-sm-12">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        查詢條件：
                        <span id="QueryConditionTab5" style="color: #337ab7"></span>
                      </div>
                      <div>
                        查詢時間：
                        <span id="ResultTimeTab5" style="color: #666"></span>
                      </div>
                    </div>
                    <table id="DisasterPreventionLocationComparisonTable" class="EMSDataGrid"></table>
                  </div>
                </div>

                <!-- Tab 6: 監看記錄 -->
                <div role="tabpanel" class="tab-pane" id="tab6">
                  <div class="col-sm-12">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        查詢條件：
                        <span id="QueryConditionTab6" style="color: #337ab7"></span>
                      </div>
                      <div>
                        查詢時間：
                        <span id="ResultTimeTab6" style="color: #666"></span>
                      </div>
                    </div>
                    <!-- 監看記錄表格 -->
                    <table id="MonitoringRecordsTable" class="EMSDataGrid"></table>
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

  // 初始化頁面
  init: function () {
    this.BootTabsStructEvent();
    // 設置預設區域為全部
    $("#searchRegion").val("");
    // 設置預設事件分級為應變事件
    $("#searchEventLevel").val("RESPONSE");
    this.loadData("", "RESPONSE");
    this.initTabEvents();
    this.initSearchEvents();
  },

  // 初始化可收合面板事件
  BootTabsStructEvent: function () {
    const $content = $("#EventMonitoringStatisticsContent");
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

  // 初始化Tab事件
  initTabEvents: function () {
    const $content = $("#EventMonitoringStatisticsContent");
    const $tabItems = $content.find(".TAB_item a");
    const self = window.EventMonitoringStatisticsPage;

    $tabItems.on("click", function (e) {
      e.preventDefault();

      // 移除所有active狀態
      $content.find(".TAB_item").removeClass("active prev next");

      // 設置當前點擊的tab為active
      $(this).parent().addClass("active");

      // 設置其他tab的狀態
      const $allTabs = $content.find(".TAB_item");
      const activeIndex = $allTabs.index($content.find(".TAB_item.active"));

      $allTabs.each(function (index) {
        if (index < activeIndex) {
          $(this).addClass("prev");
        } else if (index > activeIndex) {
          $(this).addClass("next");
        }
      });

      // 切換tab內容
      const targetId = $(this).attr("href");
      $content.find(".tab-pane").removeClass("active");
      $content.find(targetId).addClass("active");

      // 如果切換到 tab2，載入災類統計
      if (targetId === "#tab2") {
        if (typeof self.loadDisasterTypeStats === "function") {
          self.loadDisasterTypeStats();
        } else {
          console.error("loadDisasterTypeStats not found on self", self);
        }
      }

      // 如果切換到 tab3，載入地區統計
      if (targetId === "#tab3") {
        if (typeof self.loadRegionStats === "function") {
          self.loadRegionStats();
        } else {
          console.error("loadRegionStats not found on self", self);
        }
      }

      // 如果切換到 tab4，載入災類與發生地區比較
      if (targetId === "#tab4") {
        if (typeof self.loadDisasterLocationComparison === "function") {
          self.loadDisasterLocationComparison();
        } else {
          console.error(
            "loadDisasterLocationComparison not found on self",
            self,
          );
        }
      }

      // 如果切換到 tab5，載入災防會災類與發生地區比較
      if (targetId === "#tab5") {
        if (
          typeof self.loadDisasterPreventionLocationComparison === "function"
        ) {
          self.loadDisasterPreventionLocationComparison();
        } else {
          console.error(
            "loadDisasterPreventionLocationComparison not found on self",
            self,
          );
        }
      }

      // 如果切換到 tab6，載入監看記錄
      if (targetId === "#tab6") {
        if (typeof self.loadMonitoringRecords === "function") {
          self.loadMonitoringRecords();
        } else {
          console.error("loadMonitoringRecords not found on self", self);
        }
      }

      // 確保查詢列表始終可見
      $(".subpage-box").show();
      $(".tab-struct.form-abs-left").show();
    });
  },

  // 初始化查詢事件
  initSearchEvents: function () {
    const self = this;

    // 查詢按鈕事件
    $("#btnSearch").on("click", function () {
      self.performSearch();
    });

    // 清除按鈕事件
    $("#btnClear").on("click", function () {
      // 設置為全部區域
      $("#searchRegion").val("");
      $("#searchEventLevel").val("RESPONSE");
      $("#searchYearMonthStart").val("2024-01");
      $("#searchYearMonthEnd").val("2024-01");
      self.loadData();
      $("#QueryCondition").text("區域: 全部、事件分級: 應變事件");
    });

    // 匯出按鈕事件
    $("#btnExport").on("click", function () {
      self.exportData();
    });

    // 匯入按鈕事件 - 移除動作
    // $("#btnImport").on("click", function () {
    //   self.importData();
    // });
  },

  // 執行查詢
  performSearch: function () {
    let region = $("#searchRegion").val();
    const eventLevel = $("#searchEventLevel").val();
    const yearMonthStart = $("#searchYearMonthStart").val();
    const yearMonthEnd = $("#searchYearMonthEnd").val();

    // 記錄查詢時間
    const now = new Date();
    const queryTime =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0") +
      " " +
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0");

    // 更新查詢條件顯示
    let conditionText = "";
    if (region && window.RegionalData) {
      const regionName =
        window.RegionalData.regions.find((r) => r.code === region)?.name ||
        region;
      conditionText += `區域: ${regionName}`;
    } else {
      conditionText += "區域: 全部";
    }

    // 新增事件分級顯示
    if (conditionText) conditionText += "、";
    if (eventLevel === "RESPONSE") {
      conditionText += "事件分級: 應變事件";
    } else {
      conditionText += "事件分級: 全部監看事件(含應變)";
    }

    if (yearMonthStart || yearMonthEnd) {
      if (conditionText) conditionText += "、";
      if (yearMonthStart && yearMonthEnd) {
        conditionText += `月份: ${yearMonthStart} ~ ${yearMonthEnd}`;
      } else if (yearMonthStart) {
        conditionText += `月份: 自 ${yearMonthStart}`;
      } else {
        conditionText += `月份: 至 ${yearMonthEnd}`;
      }
    }
    if (!conditionText) conditionText = "全部資料";

    $("#QueryCondition").text(conditionText);
    $("#ResultTime").text(queryTime);

    // 重新載入資料
    this.loadData(region, eventLevel, yearMonthStart, yearMonthEnd);

    // 如果當前在 tab2，重新載入災類統計
    if ($("#tab2").hasClass("active")) {
      this.loadDisasterTypeStats();
    }

    // 如果當前在 tab3，重新載入地區統計
    if ($("#tab3").hasClass("active")) {
      this.loadRegionStats();
    }

    // 如果當前在 tab4，重新載入災類與發生地區比較
    if ($("#tab4").hasClass("active")) {
      this.loadDisasterLocationComparison();
    }

    // 如果當前在 tab5，重新載入災防會災類與發生地區比較
    if ($("#tab5").hasClass("active")) {
      this.loadDisasterPreventionLocationComparison();
    }

    // 如果當前在 tab6，重新載入監看記錄
    if ($("#tab6").hasClass("active")) {
      this.loadMonitoringRecords();
    }
  },

  // 匯出資料
  exportData: function () {
    const $table = $(`#${this.tableId}`);
    const data = $table.datagrid("getData");

    if (!data || !data.rows || data.rows.length === 0) {
      alert("沒有資料可匯出");
      return;
    }

    // 建立CSV內容
    const headers = ["發生時間", "發生地", "事件名稱", "事件摘要", "傷亡人數"];
    let csvContent = headers.join(",") + "\n";

    data.rows.forEach((row) => {
      const rowData = [
        row.occurrenceTime || "",
        row.location || "",
        row.eventName || "",
        row.summary || "",
        row.casualties || 0,
      ];
      csvContent += rowData.map((field) => `"${field}"`).join(",") + "\n";
    });

    // 下載CSV檔案
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `事件監控統計表_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // 匯入資料
  importData: function () {
    // 建立隱藏的檔案輸入元素
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls";
    input.style.display = "none";

    input.onchange = function (e) {
      const file = e.target.files[0];
      if (file) {
        // 這裡可以添加檔案處理邏輯
        alert(
          `已選擇檔案: ${file.name}\n檔案大小: ${(file.size / 1024).toFixed(2)} KB\n\n匯入功能開發中...`,
        );
      }
    };

    // 觸發檔案選擇對話框
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  },

  // EMS災害種類與災防會災害種類對應關係
  getDisasterPreventionMapping: function () {
    return {
      T: "01", // 風災 -> 風災
      W: "03", // 水災 -> 水災
      E: "04", // 震災（含土壤液化）-> 震災（含土壤液化）
      N: "", // 其他自然災害 -> (無)
      A: "10", // 空難 -> 空難
      O: "11", // 海難 -> 海難
      R: "15", // 寒害 -> 寒害
      1: "", // 動植物疫災 -> (無)
      B: "05", // 生物病原災害 -> 生物病原災害
      F: "06", // 火災 -> 火災
      D: "", // 毒性化學物質災害 -> (無)
      C: "12", // 陸上交通事故 -> 陸上交通事故
      M: "18", // 工業管線災害 -> 公用氣體與油料管線
      L: "", // 停電 -> (無)
      K: "", // 重大暴力或恐怖攻擊 -> (無)
      G: "", // 群眾聚集 -> (無)
      H: "13", // 社會矚目事件 -> 其他
      P: "", // 其他人為技術災害 -> (無)
      U: "16", // 爆炸 -> 爆炸
      V: "17", // 公用氣體與油料管線、輸電線路災害 -> 公用氣體與油料管線、輸電線路災害
      2: "09", // 輻射災害 -> 輻射
      3: "", // 懸浮微粒物質災害 -> (無)
      I: "", // 土石流災害 -> (無)
      Q: "14", // 旱災 -> 旱災
      S: "", // 火山災害 -> (無)
      Y: "07", // 森林火災 -> 森林火災
      J: "", // 停水 -> (無)
      X: "19", // 礦災 -> 礦災
    };
  },

  // 載入災類統計
  loadDisasterTypeStats: function () {
    // 複製查詢條件和時間到 tab2
    $("#QueryConditionTab2").text($("#QueryCondition").text());
    $("#ResultTimeTab2").text($("#ResultTime").text());

    // 確保 currentData 存在
    if (!this.currentData) {
      this.currentData = [];
    }

    // 統計災類（按EMS災害種類和災防會災害種類）
    const emsCounts = {}; // EMS災害種類統計
    const preventionCounts = {}; // 災防會災害種類統計
    let total = this.currentData.length;

    this.currentData.forEach((item) => {
      const emsType = item.disasterType;
      if (!emsCounts[emsType]) {
        emsCounts[emsType] = 0;
      }
      emsCounts[emsType]++;
    });

    // 獲取災害種類名稱映射
    const disasterTypeMap = {};
    if (window.DisasterData && window.DisasterData.disasterType) {
      Object.values(window.DisasterData.disasterType).forEach((category) => {
        category.forEach((item) => {
          disasterTypeMap[item.code] = item.name;
        });
      });
    }

    // 獲取災防會災害種類名稱映射
    const disasterPreventionMap = {};
    if (
      window.DisasterPreventionData &&
      Array.isArray(window.DisasterPreventionData)
    ) {
      window.DisasterPreventionData.forEach((item) => {
        disasterPreventionMap[item.code] = item.name;
      });
    }

    // 獲取對應關係並統計災防會災害種類件數
    const mappingRelation = this.getDisasterPreventionMapping();
    Object.keys(emsCounts).forEach((emsCode) => {
      const preventionCode = mappingRelation[emsCode];
      if (preventionCode) {
        if (!preventionCounts[preventionCode]) {
          preventionCounts[preventionCode] = 0;
        }
        preventionCounts[preventionCode] += emsCounts[emsCode];
      }
    });

    // 計算災防會災害種類總數
    let preventionTotal = 0;
    Object.values(preventionCounts).forEach((count) => {
      preventionTotal += count;
    });

    // 轉換為表格資料 - 只顯示有資料的災害種類
    const tableData = Object.keys(emsCounts)
      .filter((code) => emsCounts[code] > 0)
      .map((code) => {
        const emsCount = emsCounts[code];
        const emsPercentage =
          total > 0 ? Math.round((emsCount / total) * 100) : 0;
        const disasterPreventionCode = mappingRelation[code] || "";
        const disasterPreventionName = disasterPreventionCode
          ? disasterPreventionMap[disasterPreventionCode]
          : "";
        const preventionCount = disasterPreventionCode
          ? preventionCounts[disasterPreventionCode]
          : 0;
        const preventionPercentage =
          preventionTotal > 0 && preventionCount > 0
            ? Math.round((preventionCount / preventionTotal) * 100)
            : 0;

        return {
          disasterType: disasterTypeMap[code] || code,
          emsCount: emsCount,
          emsPercentage: emsPercentage + "%",
          disasterPreventionType: disasterPreventionName,
          preventionCount: preventionCount,
          preventionPercentage:
            preventionPercentage > 0 ? preventionPercentage + "%" : "-",
          count: emsCount,
          percentage: emsPercentage + "%",
        };
      })
      .sort((a, b) => b.emsCount - a.emsCount); // 按EMS件數從大到小排序

    // 初始化表格
    $("#DisasterTypeStatsTable").datagrid({
      data: tableData,
      fit: true,
      fitColumns: true,
      singleSelect: true,
      rownumbers: true,
      frozenColumns: [
        [
          {
            field: "disasterType",
            title: "EMS災害種類",
            width: 160,
            align: "center",
          },
          {
            field: "emsCount",
            title: "EMS件數",
            width: 80,
            align: "center",
          },
          {
            field: "emsPercentage",
            title: "EMS百分比",
            width: 90,
            align: "center",
          },
        ],
      ],
      columns: [
        [
          {
            field: "disasterPreventionType",
            title: "災防會災害種類",
            width: 160,
            align: "center",
            formatter: function (value) {
              return value || "-";
            },
          },
          {
            field: "preventionCount",
            title: "災防會件數",
            width: 90,
            align: "center",
            formatter: function (value) {
              return value > 0 ? value : "-";
            },
          },
          {
            field: "preventionPercentage",
            title: "災防會百分比",
            width: 100,
            align: "center",
          },
        ],
      ],
      onLoadSuccess: function () {
        // 設置行號列標題為"項次"
        setTimeout(() => {
          const $panel = $("#DisasterTypeStatsTable").datagrid("getPanel");
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
    });
  },

  // 載入地區統計
  loadRegionStats: function () {
    // 複製查詢條件和時間到 tab3
    $("#QueryConditionTab3").text($("#QueryCondition").text());
    $("#ResultTimeTab3").text($("#ResultTime").text());

    // 確保 currentData 存在
    if (!this.currentData) {
      this.currentData = [];
    }

    // 統計發生地點
    const stats = {};
    let total = this.currentData.length;
    this.currentData.forEach((item) => {
      const location = item.location;
      if (!stats[location]) {
        stats[location] = 0;
      }
      stats[location]++;
    });

    // 轉換為表格資料 - 只顯示有資料的發生地點
    let locationKeys = Object.keys(stats).filter(
      (location) => stats[location] > 0,
    );

    // 按countyByRegion排序地點
    if (
      window.RegionalData &&
      window.RegionalData.countyByRegion &&
      window.RegionalData.regions
    ) {
      // 建立縣市到區域的映射
      const countyToRegion = {};
      Object.keys(window.RegionalData.countyByRegion).forEach((regionCode) => {
        window.RegionalData.countyByRegion[regionCode].forEach((county) => {
          countyToRegion[county.name] = regionCode;
        });
      });

      // 建立區域順序映射
      const regionOrder = {};
      window.RegionalData.regions.forEach((region, index) => {
        regionOrder[region.code] = index;
      });

      // 自定義排序
      locationKeys.sort((a, b) => {
        const regionA = countyToRegion[a] || "99";
        const regionB = countyToRegion[b] || "99";
        const orderA =
          regionOrder[regionA] !== undefined ? regionOrder[regionA] : 999;
        const orderB =
          regionOrder[regionB] !== undefined ? regionOrder[regionB] : 999;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        // 同區域內，按countyByRegion中的順序
        const counties = window.RegionalData.countyByRegion[regionA] || [];
        const indexA = counties.findIndex((c) => c.name === a);
        const indexB = counties.findIndex((c) => c.name === b);
        return indexA - indexB;
      });
    } else {
      // 如果沒有RegionalData，按字母順序排序
      locationKeys.sort();
    }

    const tableData = locationKeys
      .map((location) => {
        const count = stats[location];
        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
        return {
          location: location,
          count: count,
          percentage: percentage + "%",
        };
      })
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.location.localeCompare(b.location, "zh-Hant");
      });

    // 初始化表格
    $("#RegionStatsTable").datagrid({
      data: tableData,
      fit: true,
      fitColumns: true,
      singleSelect: true,
      rownumbers: true,
      columns: [
        [
          {
            field: "location",
            title: "災害發生地",
            width: 200,
            align: "center",
          },
          {
            field: "count",
            title: "件數",
            width: 100,
            align: "center",
          },
          {
            field: "percentage",
            title: "百分比",
            width: 100,
            align: "center",
          },
        ],
      ],
      onLoadSuccess: function () {
        // 設置行號列標題為"項次"
        setTimeout(() => {
          const $panel = $("#RegionStatsTable").datagrid("getPanel");
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
    });
  },

  // 載入災害與發生地點比較
  loadDisasterLocationComparison: function () {
    // 複製查詢條件和時間到 tab4
    $("#QueryConditionTab4").text($("#QueryCondition").text());
    $("#ResultTimeTab4").text($("#ResultTime").text());

    // 確保 currentData 存在
    if (!this.currentData) {
      this.currentData = [];
    }

    // 獲取所有災害種類和地點
    const disasterTypes = new Set();
    const locations = new Set();

    this.currentData.forEach((item) => {
      disasterTypes.add(item.disasterType);
      locations.add(item.location);
    });

    // 轉換為陣列並排序
    const disasterTypeList = Array.from(disasterTypes).sort();
    let locationList = Array.from(locations);

    // 按countyByRegion排序地點
    if (
      window.RegionalData &&
      window.RegionalData.countyByRegion &&
      window.RegionalData.regions
    ) {
      // 建立縣市到區域的映射
      const countyToRegion = {};
      Object.keys(window.RegionalData.countyByRegion).forEach((regionCode) => {
        window.RegionalData.countyByRegion[regionCode].forEach((county) => {
          countyToRegion[county.name] = regionCode;
        });
      });

      // 建立區域順序映射
      const regionOrder = {};
      window.RegionalData.regions.forEach((region, index) => {
        regionOrder[region.code] = index;
      });

      // 自定義排序（台灣優先，其餘按區域順序）
      locationList.sort((a, b) => {
        if (a === "台灣" && b !== "台灣") {
          return -1;
        }
        if (a !== "台灣" && b === "台灣") {
          return 1;
        }

        const regionA = countyToRegion[a] || "99";
        const regionB = countyToRegion[b] || "99";
        const orderA =
          regionOrder[regionA] !== undefined ? regionOrder[regionA] : 999;
        const orderB =
          regionOrder[regionB] !== undefined ? regionOrder[regionB] : 999;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        // 同區域內，按countyByRegion中的順序
        const counties = window.RegionalData.countyByRegion[regionA] || [];
        const indexA = counties.findIndex((c) => c.name === a);
        const indexB = counties.findIndex((c) => c.name === b);
        return indexA - indexB;
      });
    } else {
      // 如果沒有RegionalData，台灣優先，其餘按字母順序
      locationList.sort((a, b) => {
        if (a === "台灣" && b !== "台灣") {
          return -1;
        }
        if (a !== "台灣" && b === "台灣") {
          return 1;
        }
        return a.localeCompare(b, "zh-Hant");
      });
    }

    // 建立交叉統計資料
    const stats = {};
    this.currentData.forEach((item) => {
      const key = `${item.location}_${item.disasterType}`;
      if (!stats[key]) {
        stats[key] = 0;
      }
      stats[key]++;
    });

    // 獲取災害種類名稱映射
    const disasterTypeMap = {};
    if (window.DisasterData && window.DisasterData.disasterType) {
      Object.values(window.DisasterData.disasterType).forEach((category) => {
        category.forEach((item) => {
          disasterTypeMap[item.code] = item.name;
        });
      });
    }

    // 建立表格資料
    const tableData = locationList.map((location) => {
      const row = { location: location };
      disasterTypeList.forEach((disasterType) => {
        const key = `${location}_${disasterType}`;
        row[disasterType] = stats[key] || 0;
      });
      return row;
    });

    // 建立表格欄位
    const columns = [
      {
        field: "location",
        title: "發生地\\災類",
        width: 120,
        align: "center",
      },
    ];

    disasterTypeList.forEach((disasterType) => {
      columns.push({
        field: disasterType,
        title: disasterTypeMap[disasterType] || disasterType,
        width: 100,
        align: "center",
        formatter: function (value) {
          return value > 0 ? value : "-";
        },
      });
    });

    // 初始化表格
    $("#DisasterLocationComparisonTable").datagrid({
      data: tableData,
      fit: true,
      fitColumns: true,
      singleSelect: true,
      rownumbers: true,
      columns: [columns],
      onLoadSuccess: function () {
        // 設置行號列標題為"項次"
        setTimeout(() => {
          const $panel = $("#DisasterLocationComparisonTable").datagrid(
            "getPanel",
          );
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
    });
  },

  // 載入災防會災類與發生地點比較
  loadDisasterPreventionLocationComparison: function () {
    // 複製查詢條件和時間到 tab5
    $("#QueryConditionTab5").text($("#QueryCondition").text());
    $("#ResultTimeTab5").text($("#ResultTime").text());

    // 確保 currentData 存在
    if (!this.currentData) {
      this.currentData = [];
    }

    // 獲取所有災防會災類和地點
    const preventionTypes = new Set();
    const locations = new Set();

    this.currentData.forEach((item) => {
      if (item.disasterPreventionType) {
        preventionTypes.add(item.disasterPreventionType);
      }
      locations.add(item.location);
    });

    // 轉換為陣列並排序
    const preventionTypeList = Array.from(preventionTypes).sort();
    let locationList = Array.from(locations);

    // 按countyByRegion排序地點
    if (
      window.RegionalData &&
      window.RegionalData.countyByRegion &&
      window.RegionalData.regions
    ) {
      const countyToRegion = {};
      Object.keys(window.RegionalData.countyByRegion).forEach((regionCode) => {
        window.RegionalData.countyByRegion[regionCode].forEach((county) => {
          countyToRegion[county.name] = regionCode;
        });
      });

      const regionOrder = {};
      window.RegionalData.regions.forEach((region, index) => {
        regionOrder[region.code] = index;
      });

      locationList.sort((a, b) => {
        if (a === "台灣" && b !== "台灣") {
          return -1;
        }
        if (a !== "台灣" && b === "台灣") {
          return 1;
        }

        const regionA = countyToRegion[a] || "99";
        const regionB = countyToRegion[b] || "99";
        const orderA =
          regionOrder[regionA] !== undefined ? regionOrder[regionA] : 999;
        const orderB =
          regionOrder[regionB] !== undefined ? regionOrder[regionB] : 999;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        const counties = window.RegionalData.countyByRegion[regionA] || [];
        const indexA = counties.findIndex((c) => c.name === a);
        const indexB = counties.findIndex((c) => c.name === b);
        return indexA - indexB;
      });
    } else {
      locationList.sort((a, b) => {
        if (a === "台灣" && b !== "台灣") {
          return -1;
        }
        if (a !== "台灣" && b === "台灣") {
          return 1;
        }
        return a.localeCompare(b, "zh-Hant");
      });
    }

    // 建立交叉統計資料
    const stats = {};
    this.currentData.forEach((item) => {
      if (!item.disasterPreventionType) {
        return;
      }
      const key = `${item.location}_${item.disasterPreventionType}`;
      if (!stats[key]) {
        stats[key] = 0;
      }
      stats[key]++;
    });

    // 災防會災類名稱映射
    const preventionTypeMap = {};
    if (Array.isArray(window.DisasterPreventionData)) {
      window.DisasterPreventionData.forEach((item) => {
        preventionTypeMap[item.code] = item.name;
      });
    }

    // 建立表格資料
    const tableData = locationList.map((location) => {
      const row = { location: location };
      preventionTypeList.forEach((preventionType) => {
        const key = `${location}_${preventionType}`;
        row[preventionType] = stats[key] || 0;
      });
      return row;
    });

    // 建立表格欄位
    const columns = [
      {
        field: "location",
        title: "發生地\\災類",
        width: 120,
        align: "center",
      },
    ];

    preventionTypeList.forEach((preventionType) => {
      columns.push({
        field: preventionType,
        title: preventionTypeMap[preventionType] || preventionType,
        width: 100,
        align: "center",
        formatter: function (value) {
          return value > 0 ? value : "-";
        },
      });
    });

    // 初始化表格
    $("#DisasterPreventionLocationComparisonTable").datagrid({
      data: tableData,
      fit: true,
      fitColumns: true,
      singleSelect: true,
      rownumbers: true,
      columns: [columns],
      onLoadSuccess: function () {
        setTimeout(() => {
          const $panel = $(
            "#DisasterPreventionLocationComparisonTable",
          ).datagrid("getPanel");
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
    });
  },

  // 載入監看記錄
  loadMonitoringRecords: function () {
    const self = this;

    if (!this.currentData || this.currentData.length === 0) {
      console.warn("No data available for monitoring records");
      $("#MonitoringRecordsTable").datagrid({
        data: [],
        columns: [[]],
      });
      return;
    }

    // 更新查詢條件和時間
    const regionText = $("#searchRegion option:selected").text() || "全部";
    const startMonth = $("#searchYearMonthStart").val();
    const endMonth = $("#searchYearMonthEnd").val();
    const queryCondition = `區域: ${regionText}、月份: ${startMonth} ~ ${endMonth}`;
    const resultTime = new Date().toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    $("#QueryConditionTab6").text(queryCondition);
    $("#ResultTimeTab6").text(resultTime);

    // 取得區域資料
    const regions = window.RegionalData ? window.RegionalData.regions : [];

    // 按區域分組統計
    const regionStats = {};

    // 初始化所有區域
    regions.forEach((region) => {
      regionStats[region.code] = {
        regionCode: region.code,
        regionName: region.name,
        totalEvents: 0,
        emergencyEvents: 0,
        smsSent: 0,
        phoneCalls: 0,
      };
    });

    // 統計資料
    this.currentData.forEach((item) => {
      if (regionStats[item.region]) {
        regionStats[item.region].totalEvents++;
        if (item.isEmergencyEvent === true) {
          regionStats[item.region].emergencyEvents++;
        }
        regionStats[item.region].smsSent += item.smsSent || 0;
        regionStats[item.region].phoneCalls += item.phoneCalls || 0;
      }
    });

    // 轉換為陣列並排序（按區域代碼）
    const statsArray = Object.values(regionStats).sort((a, b) => {
      return a.regionCode.localeCompare(b.regionCode);
    });

    // 初始化 DataGrid
    $("#MonitoringRecordsTable").datagrid({
      data: statsArray,
      fit: true,
      fitColumns: true,
      singleSelect: true,
      rownumbers: true,
      pagination: false,
      striped: true,
      columns: [
        [
          {
            field: "regionName",
            title: "區域",
            width: 100,
            align: "center",
          },
          {
            field: "totalEvents",
            title: "監看事件數",
            width: 100,
            align: "center",
          },
          {
            field: "emergencyEvents",
            title: "應變事件數",
            width: 100,
            align: "center",
          },
          {
            field: "smsSent",
            title: "傳發簡訊次數",
            width: 100,
            align: "center",
          },
          {
            field: "phoneCalls",
            title: "電話通報次數",
            width: 100,
            align: "center",
          },
        ],
      ],
      onLoadSuccess: function () {
        console.log("Monitoring records loaded");

        // 修正項次標題
        setTimeout(function () {
          const $headerRownumber = $(".datagrid-header-rownumber").first();

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
    });
  },

  loadData: function (
    regionFilter,
    eventLevelFilter,
    yearMonthStartFilter,
    yearMonthEndFilter,
  ) {
    const $table = $(`#${this.tableId}`);
    const startTime = new Date().getTime();

    // 模擬資料載入
    let mockData = [
      {
        eventName: "中山區火災事件",
        occurrenceTime: "2024-01-15 14:30:00",
        location: "台北市",
        region: "01", // 台北區
        summary: "中山區某大樓發生火災，已控制火勢",
        disasterType: "F", // 火災
        disasterPreventionType: "06", // 災防會-火災
        casualties: 0,
        isEmergencyEvent: true,
        smsSent: 8,
        phoneCalls: 5,
      },
      {
        eventName: "板橋交通事故",
        occurrenceTime: "2024-01-15 16:20:00",
        location: "新北市",
        region: "01", // 台北區
        summary: "板橋區發生嚴重交通事故，多車相撞",
        disasterType: "C", // 陸上交通事故
        disasterPreventionType: "12", // 災防會-陸上交通事故
        casualties: 3,
        isEmergencyEvent: true,
        smsSent: 12,
        phoneCalls: 8,
      },
      {
        eventName: "西區醫療緊急事件",
        occurrenceTime: "2024-01-15 18:10:00",
        location: "台中市",
        region: "03", // 中區
        summary: "台中西區發生醫療緊急事件，患者心臟驟停",
        disasterType: "H", // 社會矚目事件
        disasterPreventionType: "13", // 災防會-其他
        casualties: 1,
        isEmergencyEvent: false,
        smsSent: 4,
        phoneCalls: 3,
      },
      {
        eventName: "桃園工業管線災害",
        occurrenceTime: "2024-01-16 09:45:00",
        location: "桃園市",
        region: "02", // 北區
        summary: "桃園中壢工業區發生管線破裂，造成局部停水",
        disasterType: "M", // 工業管線災害
        disasterPreventionType: "18", // 災防會-公用氣體與油料管線
        casualties: 0,
        isEmergencyEvent: true,
        smsSent: 10,
        phoneCalls: 6,
      },
      {
        eventName: "高雄水災事件",
        occurrenceTime: "2024-01-16 15:30:00",
        location: "高雄市",
        region: "05", // 高屏區
        summary: "高雄三民區因豪雨造成積水災害",
        disasterType: "W", // 水災
        disasterPreventionType: "03", // 災防會-水災
        casualties: 2,
        isEmergencyEvent: true,
        smsSent: 15,
        phoneCalls: 9,
      },
      {
        eventName: "全國性重大事件",
        occurrenceTime: "2024-01-17 10:00:00",
        location: "台灣",
        region: "01", // 台北區
        summary: "全國性緊急應變事件通報",
        disasterType: "H", // 社會矚目事件
        disasterPreventionType: "13", // 災防會-其他
        casualties: 0,
        isEmergencyEvent: true,
        smsSent: 10,
        phoneCalls: 8,
      },
      {
        eventName: "全國性重大事件",
        occurrenceTime: "2024-01-17 10:00:00",
        location: "台灣",
        region: "02", // 台北區
        summary: "全國性緊急應變事件通報",
        disasterType: "H", // 社會矚目事件
        disasterPreventionType: "13", // 災防會-其他
        casualties: 1,
        isEmergencyEvent: true,
        smsSent: 20,
        phoneCalls: 12,
      },
    ];

    // 應用篩選條件
    if (regionFilter) {
      mockData = mockData.filter((item) => item.region === regionFilter);
    }

    // 應用事件分級篩選
    if (eventLevelFilter === "RESPONSE") {
      mockData = mockData.filter((item) => item.isEmergencyEvent === true);
    }

    if (yearMonthStartFilter || yearMonthEndFilter) {
      mockData = mockData.filter((item) => {
        const itemDate = new Date(item.occurrenceTime);
        const itemYearMonth = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, "0")}`;

        if (yearMonthStartFilter && yearMonthEndFilter) {
          return (
            itemYearMonth >= yearMonthStartFilter &&
            itemYearMonth <= yearMonthEndFilter
          );
        } else if (yearMonthStartFilter) {
          return itemYearMonth >= yearMonthStartFilter;
        } else if (yearMonthEndFilter) {
          return itemYearMonth <= yearMonthEndFilter;
        }
        return true;
      });
    }

    // 保存當前資料供災類統計使用
    this.currentData = mockData;

    // 初始化 EasyUI DataGrid
    $table.datagrid({
      data: mockData,
      fit: true,
      fitColumns: true,
      singleSelect: true,
      rownumbers: true,
      pagination: true,
      pageSize: 20,
      columns: [
        [
          {
            field: "region",
            title: "區域",
            width: 100,
            align: "center",
            formatter: function (value) {
              if (!value || !window.RegionalData) return "";
              const region = window.RegionalData.regions.find(
                (r) => r.code === value,
              );
              return region ? region.name : value;
            },
          },
          {
            field: "occurrenceTime",
            title: "發生時間",
            width: 150,
            align: "center",
            formatter: function (value) {
              if (!value) return "";
              const date = new Date(value);
              return (
                date.getFullYear() +
                "-" +
                String(date.getMonth() + 1).padStart(2, "0") +
                "-" +
                String(date.getDate()).padStart(2, "0") +
                " " +
                String(date.getHours()).padStart(2, "0") +
                ":" +
                String(date.getMinutes()).padStart(2, "0")
              );
            },
          },
          {
            field: "location",
            title: "發生地",
            width: 120,
            align: "center",
          },
          {
            field: "eventName",
            title: "事件名稱",
            width: 200,
            align: "left",
          },
          {
            field: "summary",
            title: "事件摘要",
            width: 300,
            align: "left",
          },
          {
            field: "casualties",
            title: "傷亡人數",
            width: 100,
            align: "center",
            formatter: function (value) {
              return value > 0 ? `<span >${value}</span>` : "0";
            },
          },
        ],
      ],
      onLoadSuccess: function (data) {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;

        // 統計災類
        const disasterStats = {};
        const rows = data.rows || [];
        rows.forEach((row) => {
          const type = row.disasterType;
          if (!disasterStats[type]) {
            disasterStats[type] = 0;
          }
          disasterStats[type]++;
        });

        // 獲取災害種類名稱映射
        const disasterTypeMap = {};
        if (window.DisasterData && window.DisasterData.disasterType) {
          Object.values(window.DisasterData.disasterType).forEach(
            (category) => {
              category.forEach((item) => {
                disasterTypeMap[item.code] = item.name;
              });
            },
          );
        }

        // 建立災類統計文字
        let resultText = `共 ${data.total || data.rows.length} 筆資料`;
        if (Object.keys(disasterStats).length > 0) {
          const statsText = Object.keys(disasterStats)
            .map((code) => {
              const name = disasterTypeMap[code] || code;
              const count = disasterStats[code];
              return `${name}${count}筆`;
            })
            .join("、");
          resultText += ` (${statsText})`;
        }

        $("#ResultText").text(resultText);

        // 初始化查詢條件顯示（只在第一次載入時）
        if (!$("#QueryCondition").text()) {
          let conditionText = "";
          const region = $("#searchRegion").val();
          const eventLevel = $("#searchEventLevel").val();
          const yearMonthStart = $("#searchYearMonthStart").val();
          const yearMonthEnd = $("#searchYearMonthEnd").val();
          if (region && window.RegionalData) {
            const regionName =
              window.RegionalData.regions.find((r) => r.code === region)
                ?.name || region;
            conditionText += `區域: ${regionName}`;
          } else {
            conditionText += "區域: 全部";
          }

          // 新增事件分級顯示
          if (conditionText) conditionText += "、";
          if (eventLevel === "RESPONSE") {
            conditionText += "事件分級: 應變事件";
          } else {
            conditionText += "事件分級: 全部監看事件(含應變)";
          }

          if (yearMonthStart || yearMonthEnd) {
            if (conditionText) conditionText += "、";
            if (yearMonthStart && yearMonthEnd) {
              conditionText += `月份: ${yearMonthStart} ~ ${yearMonthEnd}`;
            } else if (yearMonthStart) {
              conditionText += `月份: 自 ${yearMonthStart}`;
            } else {
              conditionText += `月份: 至 ${yearMonthEnd}`;
            }
          }
          if (!conditionText) conditionText = "全部資料";
          $("#QueryCondition").text(conditionText);
        }

        // 初始化查詢時間顯示（只在第一次載入時）
        if (!$("#ResultTime").text()) {
          const now = new Date();
          const queryTime =
            now.getFullYear() +
            "-" +
            String(now.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(now.getDate()).padStart(2, "0") +
            " " +
            String(now.getHours()).padStart(2, "0") +
            ":" +
            String(now.getMinutes()).padStart(2, "0");
          $("#ResultTime").text(queryTime);
        }

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
    });
  },

  // 載入監看記錄
  loadMonitoringRecords: function () {
    const self = this;

    if (!this.currentData || this.currentData.length === 0) {
      console.warn("No data available for monitoring records");
      $("#MonitoringRecordsTable").datagrid({
        data: [],
        columns: [[]],
      });
      return;
    }

    // 更新查詢條件和時間
    const regionText = $("#searchRegion option:selected").text() || "全部";
    const startMonth = $("#searchYearMonthStart").val();
    const endMonth = $("#searchYearMonthEnd").val();
    const queryCondition = `區域: ${regionText}、月份: ${startMonth} ~ ${endMonth}`;
    const resultTime = new Date().toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    $("#QueryConditionTab6").text(queryCondition);
    $("#ResultTimeTab6").text(resultTime);

    // 取得區域資料
    const regions = window.RegionalData ? window.RegionalData.regions : [];

    // 按區域分組統計
    const regionStats = {};

    // 初始化所有區域
    regions.forEach((region) => {
      regionStats[region.code] = {
        regionCode: region.code,
        regionName: region.name,
        totalEvents: 0,
        emergencyEvents: 0,
        smsSent: 0,
        phoneCalls: 0,
      };
    });

    // 統計資料
    this.currentData.forEach((item) => {
      if (regionStats[item.region]) {
        regionStats[item.region].totalEvents++;
        if (item.isEmergencyEvent === true) {
          regionStats[item.region].emergencyEvents++;
        }
        regionStats[item.region].smsSent += item.smsSent || 0;
        regionStats[item.region].phoneCalls += item.phoneCalls || 0;
      }
    });

    // 轉換為陣列並排序（按區域代碼）
    const statsArray = Object.values(regionStats).sort((a, b) => {
      return a.regionCode.localeCompare(b.regionCode);
    });

    // 初始化 DataGrid
    $("#MonitoringRecordsTable").datagrid({
      data: statsArray,
      fit: true,
      fitColumns: true,
      singleSelect: true,
      rownumbers: true,
      pagination: false,
      striped: true,
      columns: [
        [
          {
            field: "regionName",
            title: "區域",
            width: 100,
            align: "center",
          },
          {
            field: "totalEvents",
            title: "監看事件數",
            width: 100,
            align: "center",
          },
          {
            field: "emergencyEvents",
            title: "應變事件數",
            width: 100,
            align: "center",
          },
          {
            field: "smsSent",
            title: "傳發簡訊次數",
            width: 100,
            align: "center",
          },
          {
            field: "phoneCalls",
            title: "電話通報次數",
            width: 100,
            align: "center",
          },
        ],
      ],
      onLoadSuccess: function () {
        console.log("Monitoring records loaded");

        // 修正項次標題
        setTimeout(function () {
          const $headerRownumber = $(".datagrid-header-rownumber").first();

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
    });
  },
};

// 註冊到 window 供全域使用
if (typeof window !== "undefined") {
  window.EventMonitoringStatisticsPage = EventMonitoringStatisticsPage;
}
