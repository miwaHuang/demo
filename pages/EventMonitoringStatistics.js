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
          <form id="FormSearch" class="tab-pane active">
            <div class="row search-content">
              <div class="col-md-12">
                <div class="form-horizontal">
                </div>
              </div>
            </div>
            <div class="row search-btns">
              <div class="col-md-12">
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
                  <a aria-expanded="false" data-toggle="tab" title="災害與發生地點比較" role="tab" id="TrendChartTab" href="#tab4">
                    <span class="font-16 text">
                      災害與發生地點比較
                    </span>
                  </a>
                </li>
                 <li class="TAB_item next">
                  <a aria-expanded="false" data-toggle="tab" title="監看記錄" role="tab" id="TrendChartTab" href="#tab5">
                    <span class="font-16 text">
                      監看記錄
                    </span>
                  </a>
                </li>
              </ul>

              <!-- Tab 內容 -->
              <div class="tab-content" style="display:flex;flex-direction:column;width:100%;height:100%">
                <!-- Tab 1: 事件統計表 -->
                <div role="tabpanel" class="tab-pane active" id="tab1">
                  <div class="col-sm-12">
                    <div>
                      查詢結果：
                      <span id="ResultText" style="color: #5cb85c; font-weight: bold"></span>
                    </div>
                    <div style="margin-bottom: 15px">
                      查詢時間：
                      <span id="ResultTime" style="color: #666"></span>
                    </div>
                    <!-- EasyUI DataGrid -->
                    <table id="${tableId}" class="EMSDataGrid"></table>
                  </div>
                </div>

                <!-- Tab 2: 處理分析 -->
                <div role="tabpanel" class="tab-pane" id="tab2">
                  <div class="col-sm-12">
                    <h4>處理分析</h4>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="panel panel-info">
                          <div class="panel-heading">
                            <h5 class="panel-title">處理狀態分佈</h5>
                          </div>
                          <div class="panel-body">
                            <canvas id="statusChart" width="300" height="200"></canvas>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="panel panel-success">
                          <div class="panel-heading">
                            <h5 class="panel-title">響應時間分析</h5>
                          </div>
                          <div class="panel-body">
                            <canvas id="responseTimeChart" width="300" height="200"></canvas>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Tab 3: 趨勢圖表 -->
                <div role="tabpanel" class="tab-pane" id="tab3">
                  <div class="col-sm-12">
                    <h4>趨勢圖表</h4>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="panel panel-warning">
                          <div class="panel-heading">
                            <h5 class="panel-title">事件趨勢圖</h5>
                          </div>
                          <div class="panel-body">
                            <canvas id="trendChart" width="600" height="300"></canvas>
                          </div>
                        </div>
                      </div>
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
    this.BootTabsStructEvent();
    this.loadData();
    this.initCharts();
    this.initTabEvents();
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
    });
  },
  initCharts: function () {
    // 處理狀態分佈圖 - 使用簡單的HTML顯示
    const statusContainer = document.getElementById("statusChart");
    if (statusContainer) {
      statusContainer.innerHTML = `
        <div class="chart-container">
          <div class="chart-item">
            <span class="chart-label">已完成</span>
            <div class="progress">
              <div class="progress-bar progress-bar-success" style="width: 45%">45%</div>
            </div>
          </div>
          <div class="chart-item">
            <span class="chart-label">處理中</span>
            <div class="progress">
              <div class="progress-bar progress-bar-warning" style="width: 25%">25%</div>
            </div>
          </div>
          <div class="chart-item">
            <span class="chart-label">待處理</span>
            <div class="progress">
              <div class="progress-bar progress-bar-danger" style="width: 30%">30%</div>
            </div>
          </div>
        </div>
      `;
    }

    // 響應時間分析圖 - 使用簡單的條形圖
    const responseTimeContainer = document.getElementById("responseTimeChart");
    if (responseTimeContainer) {
      responseTimeContainer.innerHTML = `
        <div class="chart-container">
          <div class="chart-item">
            <span class="chart-label">0-5分鐘</span>
            <div class="progress">
              <div class="progress-bar progress-bar-info" style="width: 24%">12件</div>
            </div>
          </div>
          <div class="chart-item">
            <span class="chart-label">5-10分鐘</span>
            <div class="progress">
              <div class="progress-bar progress-bar-info" style="width: 50%">25件</div>
            </div>
          </div>
          <div class="chart-item">
            <span class="chart-label">10-15分鐘</span>
            <div class="progress">
              <div class="progress-bar progress-bar-info" style="width: 36%">18件</div>
            </div>
          </div>
          <div class="chart-item">
            <span class="chart-label">15-30分鐘</span>
            <div class="progress">
              <div class="progress-bar progress-bar-info" style="width: 16%">8件</div>
            </div>
          </div>
          <div class="chart-item">
            <span class="chart-label">30分鐘以上</span>
            <div class="progress">
              <div class="progress-bar progress-bar-info" style="width: 6%">3件</div>
            </div>
          </div>
        </div>
      `;
    }

    // 事件趨勢圖 - 使用簡單的表格顯示
    const trendContainer = document.getElementById("trendChart");
    if (trendContainer) {
      trendContainer.innerHTML = `
        <table class="table table-striped">
          <thead>
            <tr>
              <th>月份</th>
              <th>事件數量</th>
              <th>趨勢</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1月</td><td>15</td><td><span class="text-muted">-</span></td></tr>
            <tr><td>2月</td><td>22</td><td><i class="fa fa-arrow-up text-success"></i></td></tr>
            <tr><td>3月</td><td>18</td><td><i class="fa fa-arrow-down text-danger"></i></td></tr>
            <tr><td>4月</td><td>25</td><td><i class="fa fa-arrow-up text-success"></i></td></tr>
            <tr><td>5月</td><td>30</td><td><i class="fa fa-arrow-up text-success"></i></td></tr>
            <tr><td>6月</td><td>28</td><td><i class="fa fa-arrow-down text-danger"></i></td></tr>
            <tr><td>7月</td><td>35</td><td><i class="fa fa-arrow-up text-success"></i></td></tr>
            <tr><td>8月</td><td>32</td><td><i class="fa fa-arrow-down text-danger"></i></td></tr>
            <tr><td>9月</td><td>28</td><td><i class="fa fa-arrow-down text-danger"></i></td></tr>
            <tr><td>10月</td><td>24</td><td><i class="fa fa-arrow-down text-danger"></i></td></tr>
            <tr><td>11月</td><td>20</td><td><i class="fa fa-arrow-down text-danger"></i></td></tr>
            <tr><td>12月</td><td>18</td><td><i class="fa fa-arrow-down text-danger"></i></td></tr>
          </tbody>
        </table>
      `;
    }
  },
  loadData: function () {
    const $table = $(`#${this.tableId}`);
    const startTime = new Date().getTime();

    // 模擬資料載入
    const mockData = [
      {
        eventId: "EVT001",
        eventType: "火災",
        location: "台北市中山區",
        status: "已完成",
        reportTime: "2024-01-15 14:30",
        responseTime: "2024-01-15 14:45",
        responseDuration: 15,
        result: "成功",
      },
      {
        eventId: "EVT002",
        eventType: "交通事故",
        location: "新北市板橋區",
        status: "處理中",
        reportTime: "2024-01-15 16:20",
        responseTime: "2024-01-15 16:35",
        responseDuration: 15,
        result: "進行中",
      },
      {
        eventId: "EVT003",
        eventType: "醫療緊急",
        location: "台中市西區",
        status: "已完成",
        reportTime: "2024-01-15 18:10",
        responseTime: "2024-01-15 18:18",
        responseDuration: 8,
        result: "成功",
      },
      // 更多模擬資料...
    ];

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
          { field: "eventId", title: "事件編號", width: 100, align: "center" },
          {
            field: "eventType",
            title: "事件類型",
            width: 100,
            align: "center",
          },
          { field: "location", title: "發生地點", width: 150, align: "left" },
          {
            field: "status",
            title: "處理狀態",
            width: 100,
            align: "center",
            formatter: function (value) {
              switch (value) {
                case "已完成":
                  return '<span style="color: green;">已完成</span>';
                case "處理中":
                  return '<span style="color: orange;">處理中</span>';
                case "待處理":
                  return '<span style="color: red;">待處理</span>';
                default:
                  return value;
              }
            },
          },
          {
            field: "reportTime",
            title: "通報時間",
            width: 150,
            align: "center",
          },
          {
            field: "responseTime",
            title: "響應時間",
            width: 150,
            align: "center",
          },
          {
            field: "responseDuration",
            title: "響應時間(分鐘)",
            width: 120,
            align: "center",
          },
          {
            field: "result",
            title: "處理結果",
            width: 100,
            align: "center",
            formatter: function (value) {
              switch (value) {
                case "成功":
                  return '<span style="color: green;">成功</span>';
                case "失敗":
                  return '<span style="color: red;">失敗</span>';
                case "進行中":
                  return '<span style="color: blue;">進行中</span>';
                default:
                  return value;
              }
            },
          },
        ],
      ],
      onLoadSuccess: function (data) {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;

        $("#ResultText").text(`共 ${data.total || data.rows.length} 筆資料`);
        $("#ResultTime").text(`${duration} ms`);
      },
    });
  },
};

// 註冊到 window 供全域使用
if (typeof window !== "undefined") {
  window.EventMonitoringStatisticsPage = EventMonitoringStatisticsPage;
}
