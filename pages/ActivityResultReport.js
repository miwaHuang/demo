// REMOCREMOC年度報表頁面

const ActivityResultReportPage = {
  // 生成 HTML 內容
  getContent: function () {
    const currentYear = new Date().getFullYear();
    const startYear = 2026;
    const yearOptions = Array.from(
      { length: Math.max(currentYear - startYear + 1, 1) },
      (_, index) => {
        const year = startYear + index;
        return `<option value="${year}"${
          year === currentYear ? " selected" : ""
        }>${year}</option>`;
      },
    ).join("");

    return /*html*/ `
	 <div id="ActivityResultReportContent" class="content">
	<div>
		<!-- 麵包屑導航 -->
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item">REMOC管理</li>
				<li class="breadcrumb-item">統計分析報表</li>
				<li class="breadcrumb-item active" aria-current="page">REMOC年度報表</li>
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
									<!-- 年度 -->
									<div class="form-group">
										<label class="col-sm-5 control-label">年度</label>
										<div class="col-sm-7">
											<select class="form-control" id="searchYear">
												${yearOptions}
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
						<!-- Tab 導航 -->
						<ul class="nav nav-pills">
							<li class="TAB_item active">
								<a aria-expanded="true" data-toggle="tab" title="總表" role="tab" href="#tabSummary">
									<span class="font-16 text">總表</span>
								</a>
							</li>
              <li class="TAB_item next">
                <a aria-expanded="false" data-toggle="tab" title="台北區" role="tab" href="#tabTaipei">
                  <span class="font-16 text">台北區</span>
                </a>
              </li>
              <li class="TAB_item next">
                <a aria-expanded="false" data-toggle="tab" title="北區" role="tab" href="#tabNorth">
                  <span class="font-16 text">北區</span>
                </a>
              </li>
              <li class="TAB_item next">
                <a aria-expanded="false" data-toggle="tab" title="中區" role="tab" href="#tabCentral">
                  <span class="font-16 text">中區</span>
                </a>
              </li>
              <li class="TAB_item next">
                <a aria-expanded="false" data-toggle="tab" title="南區" role="tab" href="#tabSouth">
                  <span class="font-16 text">南區</span>
                </a>
              </li>
              <li class="TAB_item next">
                <a aria-expanded="false" data-toggle="tab" title="高屏區" role="tab" href="#tabKaoping">
                  <span class="font-16 text">高屏區</span>
                </a>
              </li>
              <li class="TAB_item next">
                <a aria-expanded="false" data-toggle="tab" title="東區" role="tab" href="#tabEast">
                  <span class="font-16 text">東區</span>
                </a>
              </li>
						</ul>

						<!-- Tab 內容 -->
						<div class="tab-content" style="display:flex;flex-direction:column;width:100%;height:100%">
							<div role="tabpanel" class="tab-pane active" id="tabSummary">
								<div class="col-sm-12">
									<div style="display: flex; justify-content: space-between; align-items: center;">
										<div>
											查詢結果：
											<span id="SummaryQueryYear" style="color: #337ab7"></span>
										</div>
										<div>
											查詢時間： 
											<span id="SummaryResultTime" style="color: #666"></span>
										</div>
									</div>
									<div class="btn-toolbar" style="margin: 10px 0;">
										${ButtonComponent.btnImport("btnSummaryExport", "匯出")}
									</div>
									<table id="SummaryTable" class="EMSDataGrid"></table>
								</div>
							</div>
              <div role="tabpanel" class="tab-pane" id="tabTaipei">
                <div class="col-sm-12">
                  <table id="TaipeiTestTable" class="EMSDataGrid"></table>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="tabNorth">
                <div class="col-sm-12">
                  <table id="NorthTestTable" class="EMSDataGrid"></table>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="tabCentral">
                <div class="col-sm-12">
                  <table id="CentralTestTable" class="EMSDataGrid"></table>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="tabSouth">
                <div class="col-sm-12">
                  <table id="SouthTestTable" class="EMSDataGrid"></table>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="tabKaoping">
                <div class="col-sm-12">
                  <table id="KaopingTestTable" class="EMSDataGrid"></table>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="tabEast">
                <div class="col-sm-12">
                  <table id="EastTestTable" class="EMSDataGrid"></table>
                </div>
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
    const currentYear = new Date().getFullYear();
    $("#searchYear").val(String(currentYear));
    this.BootTabsStructEvent();
    this.initTabEvents();
    this.initSearchEvents();
    this.loadSummaryData();
    this.renderRegionTestTables();
  },

  // 初始化Tab事件
  initTabEvents: function () {
    const $content = $("#ActivityResultReportContent");
    const $tabItems = $content.find(".TAB_item a");
    const self = this;

    $tabItems.on("click", function (e) {
      e.preventDefault();

      $content.find(".TAB_item").removeClass("active prev next");
      $(this).parent().addClass("active");

      const $allTabs = $content.find(".TAB_item");
      const activeIndex = $allTabs.index($content.find(".TAB_item.active"));

      $allTabs.each(function (index) {
        if (index < activeIndex) {
          $(this).addClass("prev");
        } else if (index > activeIndex) {
          $(this).addClass("next");
        }
      });

      const targetId = $(this).attr("href");
      $content.find(".tab-pane").removeClass("active");
      $content.find(targetId).addClass("active");

      const tabTableMap = {
        "#tabTaipei": "#TaipeiTestTable",
        "#tabNorth": "#NorthTestTable",
        "#tabCentral": "#CentralTestTable",
        "#tabSouth": "#SouthTestTable",
        "#tabKaoping": "#KaopingTestTable",
        "#tabEast": "#EastTestTable",
      };

      const tableSelector = tabTableMap[targetId];
      if (tableSelector) {
        const $table = $(tableSelector);
        if ($table.length > 0 && !$table.hasClass("datagrid-f")) {
          self.renderRegionTestTable(tableSelector);
        }
      }

      self.resizeTabTable(targetId);

      $(".subpage-box").show();
      $(".tab-struct.form-abs-left").show();
    });
  },

  // 依分頁調整表格尺寸
  resizeTabTable: function (targetId) {
    const tableMap = {
      "#tabSummary": "#SummaryTable",
      "#tabTaipei": "#TaipeiTestTable",
      "#tabNorth": "#NorthTestTable",
      "#tabCentral": "#CentralTestTable",
      "#tabSouth": "#SouthTestTable",
      "#tabKaoping": "#KaopingTestTable",
      "#tabEast": "#EastTestTable",
    };

    const tableSelector = tableMap[targetId];
    if (!tableSelector) return;

    const $table = $(tableSelector);
    if ($table.length === 0) return;

    setTimeout(() => {
      try {
        $table.datagrid("resize");
      } catch (error) {
        // datagrid 尚未初始化
      }
    }, 50);
  },

  // 初始化可收合面板事件
  BootTabsStructEvent: function () {
    const $content = $("#ActivityResultReportContent");
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

  // 初始化查詢事件
  initSearchEvents: function () {
    const self = this;

    $("#btnSearch").on("click", function () {
      self.loadSummaryData();
    });

    $("#btnClear").on("click", function () {
      const currentYear = new Date().getFullYear();
      $("#searchYear").val(String(currentYear));
      self.loadSummaryData();
    });

    $("#btnSummaryExport").on("click", function () {
      self.exportSummaryData();
    });
  },

  // 載入總表資料
  loadSummaryData: function () {
    const selectedYear = $("#searchYear").val();
    const queryYearText = selectedYear ? `${selectedYear} 年度` : "";
    const resultTime = new Date().toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    $("#SummaryQueryYear").text(queryYearText);
    $("#SummaryResultTime").text(resultTime);

    const regions = window.RegionalData ? window.RegionalData.regions : [];

    const mockEvents = [
      { year: 2026, month: 1, region: "01", isEmergencyEvent: true },
      { year: 2026, month: 2, region: "01", isEmergencyEvent: false },
      { year: 2026, month: 3, region: "02", isEmergencyEvent: false },
      { year: 2026, month: 4, region: "02", isEmergencyEvent: true },
      { year: 2026, month: 5, region: "03", isEmergencyEvent: false },
      { year: 2026, month: 6, region: "04", isEmergencyEvent: true },
      { year: 2026, month: 7, region: "05", isEmergencyEvent: true },
      { year: 2026, month: 8, region: "06", isEmergencyEvent: false },
      { year: 2026, month: 9, region: "01", isEmergencyEvent: true },
      { year: 2026, month: 10, region: "02", isEmergencyEvent: false },
      { year: 2026, month: 11, region: "03", isEmergencyEvent: true },
      { year: 2026, month: 12, region: "04", isEmergencyEvent: false },
    ];

    const mockActivities = [
      { year: 2026, month: 1, region: "01", implementType: "education" },
      { year: 2026, month: 2, region: "01", implementType: "training" },
      { year: 2026, month: 3, region: "02", implementType: "seminar" },
      { year: 2026, month: 4, region: "02", implementType: "drill" },
      { year: 2026, month: 5, region: "03", implementType: "education" },
      { year: 2026, month: 6, region: "03", implementType: "other" },
      { year: 2026, month: 7, region: "04", implementType: "training" },
      { year: 2026, month: 8, region: "05", implementType: "seminar" },
      { year: 2026, month: 9, region: "05", implementType: "drill" },
      { year: 2026, month: 10, region: "06", implementType: "other" },
      { year: 2026, month: 11, region: "01", implementType: "education" },
      { year: 2026, month: 12, region: "02", implementType: "training" },
    ];

    const statsByRegion = {};
    regions.forEach((region) => {
      statsByRegion[region.code] = {
        regionName: region.name,
        monitoringCount: 0,
        emergencyCount: 0,
        educationCount: 0,
        seminarCount: 0,
        drillTrainingCount: 0,
        otherCount: 0,
      };
    });

    const filteredEvents = selectedYear
      ? mockEvents.filter((item) => String(item.year) === String(selectedYear))
      : mockEvents;

    const filteredActivities = selectedYear
      ? mockActivities.filter(
          (item) => String(item.year) === String(selectedYear),
        )
      : mockActivities;

    filteredEvents.forEach((event) => {
      const row = statsByRegion[event.region];
      if (!row) return;
      if (event.isEmergencyEvent) {
        row.emergencyCount += 1;
      } else {
        row.monitoringCount += 1;
      }
    });

    filteredActivities.forEach((activity) => {
      const row = statsByRegion[activity.region];
      if (!row) return;
      if (activity.implementType === "education") {
        row.educationCount += 1;
      } else if (activity.implementType === "seminar") {
        row.seminarCount += 1;
      } else if (
        activity.implementType === "training" ||
        activity.implementType === "drill"
      ) {
        row.drillTrainingCount += 1;
      } else {
        row.otherCount += 1;
      }
    });

    const tableData = regions.map((region) => statsByRegion[region.code]);

    $("#SummaryTable").datagrid({
      data: tableData,
      width: "100%",
      fit: true,
      fitColumns: true,
      nowrap: true,
      singleSelect: true,
      rownumbers: true,
      pagination: false,
      striped: true,
      columns: [
        [
          { field: "regionName", title: "區域", width: 1, align: "center" },
          {
            field: "monitoringCount",
            title: "監看次數",
            width: 1,
            align: "center",
          },
          {
            field: "emergencyCount",
            title: "應變次數",
            width: 1,
            align: "center",
          },
          {
            field: "educationCount",
            title: "教育訓練/課程",
            width: 1,
            align: "center",
          },
          {
            field: "seminarCount",
            title: "研討會/協調會",
            width: 1,
            align: "center",
          },
          {
            field: "drillTrainingCount",
            title: "演習/組訓",
            width: 1,
            align: "center",
          },
          { field: "otherCount", title: "其他", width: 1, align: "center" },
        ],
      ],
      onLoadSuccess: function () {
        setTimeout(() => {
          const $panel = $("#SummaryTable").datagrid("getPanel");
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

    this.renderRegionMonthlyTables(filteredEvents, filteredActivities);
  },

  // 渲染各區月度統計表（已移除）
  renderRegionMonthlyTables: function () {},

  // 匯出總表資料
  exportSummaryData: function () {
    const data = $("#SummaryTable").datagrid("getData");
    if (!data || !data.rows || data.rows.length === 0) {
      alert("沒有資料可匯出");
      return;
    }

    const headers = [
      "區域",
      "監看次數",
      "應變次數",
      "教育訓練/課程",
      "研討會/協調會",
      "演習/組訓",
      "其他",
    ];
    let csvContent = headers.join(",") + "\n";

    data.rows.forEach((row) => {
      const rowData = [
        row.regionName || "",
        row.monitoringCount || 0,
        row.emergencyCount || 0,
        row.educationCount || 0,
        row.seminarCount || 0,
        row.drillTrainingCount || 0,
        row.otherCount || 0,
      ];
      csvContent += rowData.map((field) => `"${field}"`).join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `REMOCREMOC年度報表_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // 渲染各區表格
  renderRegionTestTables: function () {
    this.renderRegionTestTable("#TaipeiTestTable");
    this.renderRegionTestTable("#NorthTestTable");
    this.renderRegionTestTable("#CentralTestTable");
    this.renderRegionTestTable("#SouthTestTable");
    this.renderRegionTestTable("#KaopingTestTable");
    this.renderRegionTestTable("#EastTestTable");
  },

  // 渲染單一區表格
  renderRegionTestTable: function (tableSelector) {
    const tableData = Array.from({ length: 12 }, (_, index) => ({
      month: `${index + 1}月`,
      monitoringCount: Math.floor(Math.random() * 10),
      emergencyCount: Math.floor(Math.random() * 10),
      educationCount: Math.floor(Math.random() * 10),
      seminarCount: Math.floor(Math.random() * 10),
      drillTrainingCount: Math.floor(Math.random() * 10),
      otherCount: Math.floor(Math.random() * 10),
    }));

    $(tableSelector).datagrid({
      data: tableData,
      width: "100%",
      fit: false,
      height: 420,
      fitColumns: false,
      nowrap: true,
      singleSelect: true,
      rownumbers: true,
      pagination: false,
      striped: true,
      columns: [
        [
          { field: "month", title: "月份", width: 120, align: "center" },
          {
            field: "monitoringCount",
            title: "監看次數",
            width: 120,
            align: "center",
          },
          {
            field: "emergencyCount",
            title: "應變次數",
            width: 120,
            align: "center",
          },
          {
            field: "educationCount",
            title: "教育訓練/課程",
            width: 150,
            align: "center",
          },
          {
            field: "seminarCount",
            title: "研討會/協調會",
            width: 150,
            align: "center",
          },
          {
            field: "drillTrainingCount",
            title: "演習/組訓",
            width: 120,
            align: "center",
          },
          { field: "otherCount", title: "其他", width: 100, align: "center" },
        ],
      ],
      onLoadSuccess: function () {
        setTimeout(() => {
          const $panel = $(tableSelector).datagrid("getPanel");
          $panel.css({ width: "100%", "max-width": "100%" });
          $panel.parent().css({ width: "100%", "max-width": "100%" });
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
};

// 註冊到 window 供全域使用
if (typeof window !== "undefined") {
  window.ActivityResultReportPage = ActivityResultReportPage;
}
