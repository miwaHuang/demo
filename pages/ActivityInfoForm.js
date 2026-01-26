// ActivityInfoForm.js - 活動資訊表單頁面
// 支援新增、編輯、檢視三種模式

const ActivityInfoForm = {
  // 表單模式
  mode: "add", // add, edit, view
  currentData: null,

  // 生成表單 HTML
  getContent: function (mode = "add", data = null) {
    this.mode = mode;
    this.currentData = data;

    const formId = "ActivityInfoForm";
    const isReadonly = mode === "view";
    const readonlyAttr = isReadonly ? "readonly" : "";
    const disabledAttr = isReadonly ? "disabled" : "";

    // 取得當前時間
    const now = new Date();
    const currentDateTime = now.toISOString().slice(0, 16);

    return /*html*/ `
      <div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="reportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="width: 1500px; max-width: 95vw;">
          <div class="modal-content" style="height: 100%; overflow: auto;">
            <div class="modal-header">
              <h4 class="modal-title" id="reportModalLabel">${
                mode === "add" ? "新增" : mode === "edit" ? "編輯" : "檢閱"
              } 活動資訊</h4>
              <br/>

              <button type="button" class="close" data-dismiss="modal" aria-label="關閉">
                <span aria-hidden="true">&times;</span>
              </button>
              <div class="auto-info">
                <small class="text-muted">
                  <div id="createTimeDisplay">建立日期：${
                    mode === "add"
                      ? new Date().toISOString().slice(0, 16).replace("T", " ")
                      : data && data.CREATE_TIME
                        ? new Date(data.CREATE_TIME)
                            .toISOString()
                            .slice(0, 16)
                            .replace("T", " ")
                        : new Date()
                            .toISOString()
                            .slice(0, 16)
                            .replace("T", " ")
                  }</div>
                </small>
              </div>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-danger" onclick="handleCancel()">關閉</button>
              ${
                mode !== "view"
                  ? `<button type="button" class="btn btn-success" onclick="handleSubmit()">儲存</button>`
                  : ""
              }
            </div>
            <div class="modal-body" >
            <form id="${formId}">
              <!-- 基本資訊 -->
              <div class="form-section">
                <div class="section-title"> 基本資訊</div>
                <div class="section-content">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="required">預訂執行事項</label>
                        <input type="text" class="form-control" name="PLANNED_ACTION" placeholder="請輸入預訂執行事項" required ${
                          mode === "view" ? "readonly" : ""
                        } />
                        <div class="error-message">請輸入預訂執行事項</div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">區域</label>
                        <select class="form-control" name="REGION" required ${
                          mode === "view" ? "disabled" : ""
                        }>
                          <option value="">請選擇</option>
                          ${window.RegionalData ? window.RegionalData.regions.map((r) => `<option value="${r.code}" ${data && data.REGION_LABEL === r.name ? "selected" : ""}>${r.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇區域</div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">工作類別</label>
                        <select class="form-control" name="WORK_TYPE" required ${
                          mode === "view" ? "disabled" : ""
                        }>
                          <option value="">請選擇</option>
                          ${window.ActivityWorkTypeData ? window.ActivityWorkTypeData.map((w) => `<option value="${w.code}" ${data && data.workType === w.code ? "selected" : ""}>${w.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇工作類別</div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">活動類別</label>
                        <select class="form-control" name="ACTIVITY_TYPE" required ${
                          mode === "view" ? "disabled" : ""
                        }>
                          <option value="">請選擇</option>
                          ${window.ActivityTypeData ? window.ActivityTypeData.map((a) => `<option value="${a.code}" ${data && data.activityType === a.code ? "selected" : ""}>${a.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇活動類別</div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">辦理方式</label>
                        <select class="form-control" name="HANDLE_TYPE" required ${
                          mode === "view" ? "disabled" : ""
                        }>
                          <option value="">請選擇</option>
                          ${window.ActivityHandleTypeData ? window.ActivityHandleTypeData.map((h) => `<option value="${h.code}" ${data && data.handleType === h.code ? "selected" : ""}>${h.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇辦理方式</div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">實施方式</label>
                        <select class="form-control" name="IMPLEMENT_TYPE" required ${
                          mode === "view" ? "disabled" : ""
                        }>
                          <option value="">請選擇</option>
                          ${window.ActivityImplementTypeData ? window.ActivityImplementTypeData.map((i) => `<option value="${i.code}" ${data && data.implementType === i.code ? "selected" : ""}>${i.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇實施方式</div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">活動辦理進度</label>
                        <select class="form-control" name="ACTIVITY_STATUS" required ${
                          mode === "view" ? "disabled" : ""
                        }>
                          <option value="">請選擇</option>
                          ${window.ActivityStatusData ? window.ActivityStatusData.map((s) => `<option value="${s.code}" ${data && data.activityStatus === s.code ? "selected" : ""}>${s.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇活動辦理進度</div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label>是否國際活動</label>
                        <select class="form-control" name="IS_INTERNATIONAL" ${
                          mode === "view" ? "disabled" : ""
                        }>
                          <option value="0" ${data && data.isInternational === 0 ? "selected" : ""}>否</option>
                          <option value="1" ${data && data.isInternational === 1 ? "selected" : ""}>是</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 時間資訊 -->
              <div class="form-section">
                <div class="section-title"> 時間資訊</div>
                <div class="section-content">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">活動日期(起)</label>
                        <input type="date" class="form-control" name="ACTIVITY_DATE_S" required ${
                          mode === "view" ? "readonly" : ""
                        } />
                        <div class="error-message">請選擇活動日期(起)</div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">活動日期(迄)</label>
                        <input type="date" class="form-control" name="ACTIVITY_DATE_E" required ${
                          mode === "view" ? "readonly" : ""
                        } />
                        <div class="error-message">請選擇活動日期(迄)</div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label>實際辦理天數</label>
                        <input type="number" step="0.1" class="form-control" name="ACTUAL_DAYS" value="0" min="0" ${
                          mode === "view" ? "readonly" : ""
                        } />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label>實際辦理小時</label>
                        <input type="number" class="form-control" name="ACTUAL_HOURS" value="0" min="0" ${
                          mode === "view" ? "readonly" : ""
                        } />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 地點資訊 -->
              <div class="form-section">
                <div class="section-title"> 地點資訊</div>
                <div class="section-content">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="required">舉辦地點</label>
                        <input type="text" class="form-control" name="VENUE" placeholder="請輸入舉辦地點" required ${
                          mode === "view" ? "readonly" : ""
                        } />
                        <div class="error-message">請輸入舉辦地點</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 狀態資訊 -->
              <div class="form-section">
                <div class="section-title"> 狀態資訊</div>
                <div class="section-content">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>是否刪除</label>
                        <select class="form-control" name="IS_DELETED" ${
                          mode === "view" ? "disabled" : ""
                        }>
                          <option value="N" ${data && data.IS_DELETED === "N" ? "selected" : ""}>否</option>
                          <option value="Y" ${data && data.IS_DELETED === "Y" ? "selected" : ""}>是</option>
                        </select>
                      </div>
                    </div>
                    ${
                      data && data.IS_DELETED === "Y"
                        ? `
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>刪除原因</label>
                        <input type="text" class="form-control" name="DELETE_REASON" value="${data.DELETE_REASON || ""}" ${
                          mode === "view" ? "readonly" : ""
                        } />
                      </div>
                    </div>
                    `
                        : ""
                    }
                  </div>
                </div>
              </div>

              <!-- 隱藏欄位 -->
              <input type="hidden" name="CREATE_TIME" value="${
                mode === "add"
                  ? new Date().toISOString()
                  : data && data.CREATE_TIME
                    ? data.CREATE_TIME
                    : new Date().toISOString()
              }" />

            </form>
          </div>
        </div>
      </div>
    `;
  },

  // 顯示表單
  show: function (mode = "add", data = null) {
    const content = this.getContent(mode, data);
    $("#reportModal").remove();
    $("body").append(content);

    // 設置表單值
    this.setFormData(data);

    // 初始化日期選擇器
    this.initDatePickers();

    // 綁定事件
    this.bindEvents();

    // 顯示模態框
    $("#reportModal").modal("show");
  },

  // 設置表單資料
  setFormData: function (data) {
    if (!data) return;

    const form = $("#ActivityInfoForm");

    // 設置基本欄位
    form
      .find("[name='PLANNED_ACTION']")
      .val(data.PLANNED_ACTION || data.plannedAction || "");
    form.find("[name='REGION']").val(data.REGION || data.region || "");
    form.find("[name='WORK_TYPE']").val(data.WORK_TYPE || data.workType || "");
    form
      .find("[name='ACTIVITY_TYPE']")
      .val(data.ACTIVITY_TYPE || data.activityType || "");
    form
      .find("[name='HANDLE_TYPE']")
      .val(data.HANDLE_TYPE || data.handleType || "");
    form
      .find("[name='IMPLEMENT_TYPE']")
      .val(data.IMPLEMENT_TYPE || data.implementType || "");
    form
      .find("[name='ACTIVITY_STATUS']")
      .val(data.ACTIVITY_STATUS || data.activityStatus || "");
    form
      .find("[name='IS_INTERNATIONAL']")
      .val(
        data.IS_INTERNATIONAL !== undefined
          ? data.IS_INTERNATIONAL
          : data.isInternational || 0,
      );
    form.find("[name='VENUE']").val(data.VENUE || data.venue || "");
    form
      .find("[name='ACTUAL_DAYS']")
      .val(data.ACTUAL_DAYS || data.actualDays || 0);
    form
      .find("[name='ACTUAL_HOURS']")
      .val(data.ACTUAL_HOURS || data.actualHours || 0);
    form.find("[name='IS_DELETED']").val(data.IS_DELETED || "N");
    form.find("[name='DELETE_REASON']").val(data.DELETE_REASON || "");

    // 設置日期欄位
    if (data.ACTIVITY_DATE_S || data.activityDateStart) {
      const startDate = data.ACTIVITY_DATE_S || data.activityDateStart;
      form.find("[name='ACTIVITY_DATE_S']").val(startDate.split("T")[0]); // 移除時間部分
    }
    if (data.ACTIVITY_DATE_E || data.activityDateEnd) {
      const endDate = data.ACTIVITY_DATE_E || data.activityDateEnd;
      form.find("[name='ACTIVITY_DATE_E']").val(endDate.split("T")[0]); // 移除時間部分
    }

    // 如果是刪除狀態，觸發刪除原因欄位顯示
    if (data.IS_DELETED === "Y") {
      form.find("[name='IS_DELETED']").trigger("change");
    }
  },

  // 初始化日期選擇器
  initDatePickers: function () {
    $("#reportModal .datepicker").datepicker({
      dateFormat: "yy-mm-dd",
      changeMonth: true,
      changeYear: true,
      yearRange: "2000:c",
      showButtonPanel: true,
    });
  },

  // 綁定事件
  bindEvents: function () {
    const self = this;

    // 儲存按鈕
    $("#reportModal .btn-success")
      .off("click")
      .on("click", function () {
        self.save();
      });

    // 關閉按鈕
    $("#reportModal .btn-danger")
      .off("click")
      .on("click", function () {
        $("#reportModal").modal("hide");
      });

    // 刪除狀態變更
    $("#reportModal select[name='IS_DELETED']")
      .off("change")
      .on("change", function () {
        const isDeleted = $(this).val();
        const $statusSection = $(this).closest(".section-content");
        const $deleteReasonRow = $statusSection.find(".row");

        if (isDeleted === "Y") {
          // 動態添加刪除原因欄位
          if ($deleteReasonRow.find("[name='DELETE_REASON']").length === 0) {
            const deleteReasonHtml = `
              <div class="col-md-6">
                <div class="form-group">
                  <label>刪除原因</label>
                  <input type="text" class="form-control" name="DELETE_REASON" />
                </div>
              </div>
            `;
            $deleteReasonRow.append(deleteReasonHtml);
          }
        } else {
          // 移除刪除原因欄位
          $deleteReasonRow
            .find("[name='DELETE_REASON']")
            .closest(".col-md-6")
            .remove();
        }
      });

    // 日期驗證：確保結束日期不早於開始日期
    $(
      "#reportModal input[name='ACTIVITY_DATE_S'], #reportModal input[name='ACTIVITY_DATE_E']",
    )
      .off("change")
      .on("change", function () {
        const startDate = $("#reportModal input[name='ACTIVITY_DATE_S']").val();
        const endDate = $("#reportModal input[name='ACTIVITY_DATE_E']").val();

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
          $.messager.alert("錯誤", "活動日期(迄)不能早於活動日期(起)", "error");
          $(this).val("");
        }
      });
  },

  // 儲存資料
  save: function () {
    const formData = this.getFormData();

    // 驗證資料
    if (!this.validateForm(formData)) {
      return;
    }

    // 模擬儲存
    console.log("儲存活動資訊:", formData);

    // 顯示成功訊息
    $.messager.show({
      title: "成功",
      msg: `<i class="fa fa-check-circle" style="color: #5cb85c; margin-right: 5px;"></i>儲存成功`,
      timeout: 3000,
      showType: "fade",
    });

    // 關閉模態框
    $("#reportModal").modal("hide");

    // 重新載入資料（如果在父頁面中有重新載入的方法）
    if (
      window.ActivityInfoManagementPage &&
      window.ActivityInfoManagementPage.searchData
    ) {
      window.ActivityInfoManagementPage.searchData();
    }
  },

  // 取得表單資料
  getFormData: function () {
    const form = $("#ActivityInfoForm");
    const data = {};

    form.find("input, select, textarea").each(function () {
      const $field = $(this);
      const name = $field.attr("name");
      const value = $field.val();

      if (name) {
        data[name] = value;
      }
    });

    return data;
  },

  // 驗證表單
  validateForm: function (data) {
    if (!data.PLANNED_ACTION || data.PLANNED_ACTION.trim() === "") {
      $.messager.alert("錯誤", "請輸入預訂執行事項", "error");
      return false;
    }

    if (!data.REGION || data.REGION === "") {
      $.messager.alert("錯誤", "請選擇區域", "error");
      return false;
    }

    if (!data.WORK_TYPE || data.WORK_TYPE === "") {
      $.messager.alert("錯誤", "請選擇工作類別", "error");
      return false;
    }

    if (!data.ACTIVITY_TYPE || data.ACTIVITY_TYPE === "") {
      $.messager.alert("錯誤", "請選擇活動類別", "error");
      return false;
    }

    if (!data.ACTIVITY_DATE_S || data.ACTIVITY_DATE_S === "") {
      $.messager.alert("錯誤", "請選擇活動日期(起)", "error");
      return false;
    }

    return true;
  },
};

// 註冊到 window 供全域使用
if (typeof window !== "undefined") {
  window.ActivityInfoForm = ActivityInfoForm;
}
