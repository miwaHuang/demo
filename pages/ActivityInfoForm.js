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
    const plannedReadonlyAttr =
      mode === "view" || mode === "edit" ? "readonly" : "";
    const regionDisabledAttr = "disabled";

    // 取得當前時間
    const now = new Date();
    const currentDateTime = now.toISOString().slice(0, 16);

    return /*html*/ `
      <div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="reportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="width: 1500px; max-width: 95vw;">
          <div class="modal-content" style="height: 100%; overflow: auto;">
            <div class="modal-header">
              <h4 class="modal-title" id="reportModalLabel">${
                mode === "add" ? "新增" : mode === "edit" ? "修改" : "檢閱"
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
       
              ${
                mode !== "view"
                  ? `<button type="button" class="btn btn-success" onclick="handleSubmit()">儲存</button>`
                  : ""
              }
             <button type="button" class="btn btn-danger" onclick="handleCancel()">關閉</button>
            </div>
            <div class="modal-body" >
            <form id="${formId}">
              <!-- 活動內容 -->
              <div class="form-section">
                <div class="section-title">預定活動內容</div>
                <div class="section-content">

                  <div class="row">
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>區域</label>
                        <select class="form-control" name="REGION" ${regionDisabledAttr}>
                          <option value="">請選擇</option>
                          ${window.RegionalData ? window.RegionalData.regions.map((r) => `<option value="${r.code}" ${(mode === "add" && r.name === "台北區") || (data && data.REGION_LABEL === r.name) ? "selected" : ""}>${r.name}</option>`).join("") : ""}
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="required">預定執行事項</label>
                        <input type="text" class="form-control" name="PLANNED_ACTION" placeholder="請輸入執行事項" required ${readonlyAttr}/>
                        <div class="error-message">請輸入執行事項</div>
                      </div>
                    </div>               
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">活動日期(起)</label>
                        <input type="date" class="form-control" name="ACTIVITY_DATE_S" required ${readonlyAttr}/>
                        <div class="error-message">請選擇活動日期(起)</div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">活動日期(迄)</label>
                        <input type="date" class="form-control" name="ACTIVITY_DATE_E" required ${readonlyAttr} />
                        <div class="error-message">請選擇活動日期(迄)</div>
                      </div>
                    </div>
                     <div class="col-md-1">
                      <div class="form-group">
                        <label class="required">辦理天數</label>
                        <input type="number" step="0.5" class="form-control" name="PLANNED_DAYS" value="0" min="0" required ${readonlyAttr}/>
                        <div class="error-message">請輸入活動辦理天數</div>
                      </div>
                    </div>
                    <div class="col-md-1">
                      <div class="form-group">
                        <label class="required">辦理時數</label>
                        <input type="number" step="1" class="form-control" name="PLANNED_HOURS" value="0" min="0" required ${readonlyAttr}/>
                        <div class="error-message">請輸入活動辦理時數</div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="required">舉辦地點</label>
                        <input type="text" class="form-control" name="VENUE" placeholder="請輸入舉辦地點" required ${readonlyAttr}/>
                        <div class="error-message">請輸入舉辦地點</div>
                      </div>
                    </div>         
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">實施方式</label>
                        <select class="form-control" name="IMPLEMENT_TYPE" required ${disabledAttr}>
                          <option value="">請選擇</option>
                          ${window.ActivityImplementTypeData ? window.ActivityImplementTypeData.map((i) => `<option value="${i.code}" ${data && data.implementType === i.code ? "selected" : ""}>${i.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇實施方式</div>
                      </div>
                    </div>
                    
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">工作類別</label>
                        <select class="form-control" name="WORK_TYPE" required ${disabledAttr}>
                          <option value="">請選擇</option>
                          ${window.ActivityWorkTypeData ? window.ActivityWorkTypeData.map((w) => `<option value="${w.code}" ${data && data.workType === w.code ? "selected" : ""}>${w.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇工作類別</div>
                      </div>
                    </div> 
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">活動類別</label>
                        <select class="form-control" name="ACTIVITY_TYPE" required ${disabledAttr}>
                          <option value="">請選擇</option>
                          ${window.ActivityTypeData ? window.ActivityTypeData.map((a) => `<option value="${a.code}" ${data && data.activityType === a.code ? "selected" : ""}>${a.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇活動類別</div>
                      </div>
                    </div>
                      <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">辦理方式</label>
                        <select class="form-control" name="HANDLE_TYPE" required ${disabledAttr}>
                          <option value="">請選擇</option>
                          ${window.ActivityHandleTypeData ? window.ActivityHandleTypeData.map((h) => `<option value="${h.code}" ${data && data.handleType === h.code ? "selected" : ""}>${h.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇辦理方式</div>
                      </div>
                    </div>
                  
                  </div>
              
                  <div class="row">       
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">國際活動</label>
                        <select class="form-control" name="IS_INTERNATIONAL" required ${disabledAttr}>
                          <option value="">請選擇</option>
                          <option value="1" ${data && data.isInternational === 1 ? "selected" : ""}>是</option>
                          <option value="0" ${data && data.isInternational === 0 ? "selected" : ""}>否</option>
                        </select>
                        <div class="error-message">請選擇是否為國際活動</div>
                      </div>
                    </div>                  
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">聯絡人員</label>
                        <input type="text" class="form-control" name="CONTACT_NAME" placeholder="請輸入" required ${readonlyAttr} />
                        <div class="error-message">請輸入聯絡人員</div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">聯絡電話</label>
                        <input type="text" class="form-control" name="CONTACT_PHONE" placeholder="請輸入" required ${readonlyAttr} />
                        <div class="error-message">請輸入</div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>備註</label>
                        <textarea class="form-control" name="REMARKS" placeholder="請輸入備註" ${readonlyAttr} style="height: 50px;"></textarea>
                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>

              <!-- 實際執行狀況 -->
              <div class="form-section">
                <div class="section-title">實際執行狀況</div>
                <div class="section-content">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>實際執行事項</label>
                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                          <input type="text" class="form-control" name="ACTUAL_ACTION" placeholder="請輸入實際執行事項" ${readonlyAttr} style="flex: 1;" />
                          ${mode !== "view" ? '<button type="button" class="btn btn-success btn-sm" id="copyFromPlannedBtn" style="white-space: nowrap;">帶入預定活動</button>' : ""}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>活動日期(起)</label>
                        <input type="date" class="form-control" name="ACTUAL_ACTIVITY_DATE_S" ${readonlyAttr} />
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>活動日期(迄)</label>
                        <input type="date" class="form-control" name="ACTUAL_ACTIVITY_DATE_E" ${readonlyAttr} />
                      </div>
                    </div>
                       <div class="col-md-1">
                      <div class="form-group">
                        <label>辦理天數</label>
                        <input type="number" step="0.5" class="form-control" name="ACTUAL_DAYS" value="0" min="0" ${readonlyAttr} />
                      </div>
                    </div>
                    <div class="col-md-1">
                      <div class="form-group">
                        <label>辦理時數</label>
                        <input type="number" step="1" class="form-control" name="ACTUAL_HOURS" value="0" min="0" ${readonlyAttr} />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>舉辦地點</label>
                        <input type="text" class="form-control" name="ACTUAL_VENUE" placeholder="請輸入實際舉辦地點" ${readonlyAttr} />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">辦理進度</label>
                        <select class="form-control" name="ACTIVITY_STATUS" required ${disabledAttr}>
                          <option value="">請選擇</option>
                          ${window.ActivityStatusData ? window.ActivityStatusData.map((s) => `<option value="${s.code}" ${data && data.activityStatus === s.code ? "selected" : ""}>${s.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇辦理進度</div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="required">文件狀態</label>
                        <select class="form-control" name="DOCUMENT_STATUS" required ${disabledAttr}>
                          <option value="">請選擇</option>
                          ${window.DocumentStatusData ? window.DocumentStatusData.map((d) => `<option value="${d.code}" ${data && data.documentStatus === d.code ? "selected" : ""}>${d.name}</option>`).join("") : ""}
                        </select>
                        <div class="error-message">請選擇文件狀態</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 參加活動人員統計 -->
              <div class="form-section">
                <div class="section-title">參加活動人員</div>
                <div class="section-content">
                  <!-- 醫事人員類別 -->
               
                   
                    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px;">
                      <div class="form-group">
                        <label>醫師</label>
                        <input type="number" class="form-control personnel-count" name="DOCTOR_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>護士</label>
                        <input type="number" class="form-control personnel-count" name="NURSE_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>其他醫事人員</label>
                        <input type="number" class="form-control personnel-count" name="OTHER_MEDICAL_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>EMT</label>
                        <input type="number" class="form-control personnel-count" name="EMT_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>非醫事人員</label>
                        <input type="number" class="form-control personnel-count" name="NON_MEDICAL_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>人員類別人數小計</label>
                        <input type="number" class="form-control" name="MEDICAL_TOTAL" value="0" readonly />
                      </div>
                    </div>            

                  <!-- 單位類別 -->
                
            
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px;">
                      <div class="form-group">
                        <label>衛生</label>
                        <input type="number" class="form-control personnel-count" name="HEALTH_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>消防</label>
                        <input type="number" class="form-control personnel-count" name="FIRE_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>醫院</label>
                        <input type="number" class="form-control personnel-count" name="HOSPITAL_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>環保</label>
                        <input type="number" class="form-control personnel-count" name="ENVIRONMENT_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>原子能</label>
                        <input type="number" class="form-control personnel-count" name="NUCLEAR_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>其他</label>
                        <input type="number" class="form-control personnel-count" name="OTHER_UNIT_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>單位人數小計</label>
                        <input type="number" class="form-control" name="UNIT_TOTAL" value="0" readonly />
                      </div>
                    </div>
              

                  <!-- 性別 -->
                 
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                      <div class="form-group">
                        <label>男</label>
                        <input type="number" class="form-control personnel-count" name="MALE_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>女</label>
                        <input type="number" class="form-control personnel-count" name="FEMALE_COUNT" value="0" min="0" ${readonlyAttr} />
                      </div>
                      <div class="form-group">
                        <label>性別人數小計</label>
                        <input type="number" class="form-control" name="GENDER_TOTAL" value="0" readonly />
                      </div>
                    </div>
           
                </div>
              </div>

              <!-- 刪除資訊 -->
              ${
                mode === "view" && data && data.IS_DELETED === "Y"
                  ? `
              <div class="form-section">
                <div class="section-title">刪除資訊</div>
                <div class="section-content">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>是否刪除</label>
                        <select class="form-control" name="IS_DELETED" ${disabledAttr}>
                          <option value="N" ${data && data.IS_DELETED === "N" ? "selected" : ""}>否</option>
                          <option value="Y" ${data && data.IS_DELETED === "Y" ? "selected" : ""}>是</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>刪除原因</label>
                        <select class="form-control" name="DELETE_REASON" ${disabledAttr}>
                          <option value="">請選擇</option>
                          ${window.DeleteReasonData ? window.DeleteReasonData.map((d) => `<option value="${d.code}" ${data && data.deleteReason === d.code ? "selected" : ""}>${d.name}</option>`).join("") : ""}
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4" id="otherReasonContainer" style="display: none;">
                      <div class="form-group">
                        <label>其他原因</label>
                        <input type="text" class="form-control" name="OTHER_REASON" placeholder="請輸入其他原因" readonly />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `
                  : ""
              }

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

    // 設置活動內容欄位
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
      .find("[name='CONTACT_NAME']")
      .val(data.CONTACT_NAME || data.contactName || "");
    form
      .find("[name='CONTACT_PHONE']")
      .val(data.CONTACT_PHONE || data.contactPhone || "");
    form.find("[name='REMARKS']").val(data.REMARKS || data.remarks || "");
    form
      .find("[name='DOCUMENT_STATUS']")
      .val(data.DOCUMENT_STATUS || data.documentStatus || "");
    form
      .find("[name='PLANNED_DAYS']")
      .val(data.PLANNED_DAYS || data.plannedDays || 0);
    form
      .find("[name='PLANNED_HOURS']")
      .val(data.PLANNED_HOURS || data.plannedHours || 0);

    // 設置實際執行狀況欄位
    form
      .find("[name='ACTUAL_ACTION']")
      .val(data.ACTUAL_ACTION || data.actualAction || "");
    form
      .find("[name='ACTUAL_DAYS']")
      .val(data.ACTUAL_DAYS || data.actualDays || 0);
    form
      .find("[name='ACTUAL_HOURS']")
      .val(data.ACTUAL_HOURS || data.actualHours || 0);
    form
      .find("[name='ACTUAL_VENUE']")
      .val(data.ACTUAL_VENUE || data.actualVenue || "");
    form.find("[name='IS_DELETED']").val(data.IS_DELETED || "N");
    form
      .find("[name='DELETE_REASON']")
      .val(data.DELETE_REASON || data.deleteReason || "");
    form
      .find("[name='OTHER_REASON']")
      .val(data.OTHER_REASON || data.otherReason || "");

    // 設置人員統計欄位
    form
      .find("[name='DOCTOR_COUNT']")
      .val(data.DOCTOR_COUNT || data.doctorCount || 0);
    form
      .find("[name='NURSE_COUNT']")
      .val(data.NURSE_COUNT || data.nurseCount || 0);
    form
      .find("[name='OTHER_MEDICAL_COUNT']")
      .val(data.OTHER_MEDICAL_COUNT || data.otherMedicalCount || 0);
    form.find("[name='EMT_COUNT']").val(data.EMT_COUNT || data.emtCount || 0);
    form
      .find("[name='NON_MEDICAL_COUNT']")
      .val(data.NON_MEDICAL_COUNT || data.nonMedicalCount || 0);
    form
      .find("[name='MEDICAL_TOTAL']")
      .val(data.MEDICAL_TOTAL || data.medicalTotal || 0);

    form
      .find("[name='HEALTH_COUNT']")
      .val(data.HEALTH_COUNT || data.healthCount || 0);
    form
      .find("[name='FIRE_COUNT']")
      .val(data.FIRE_COUNT || data.fireCount || 0);
    form
      .find("[name='HOSPITAL_COUNT']")
      .val(data.HOSPITAL_COUNT || data.hospitalCount || 0);
    form
      .find("[name='ENVIRONMENT_COUNT']")
      .val(data.ENVIRONMENT_COUNT || data.environmentCount || 0);
    form
      .find("[name='NUCLEAR_COUNT']")
      .val(data.NUCLEAR_COUNT || data.nuclearCount || 0);
    form
      .find("[name='OTHER_UNIT_COUNT']")
      .val(data.OTHER_UNIT_COUNT || data.otherUnitCount || 0);
    form
      .find("[name='UNIT_TOTAL']")
      .val(data.UNIT_TOTAL || data.unitTotal || 0);

    form
      .find("[name='MALE_COUNT']")
      .val(data.MALE_COUNT || data.maleCount || 0);
    form
      .find("[name='FEMALE_COUNT']")
      .val(data.FEMALE_COUNT || data.femaleCount || 0);
    form
      .find("[name='GENDER_TOTAL']")
      .val(data.GENDER_TOTAL || data.genderTotal || 0);

    // 設置日期欄位
    if (data.ACTIVITY_DATE_S || data.activityDateStart) {
      const startDate = data.ACTIVITY_DATE_S || data.activityDateStart;
      form.find("[name='ACTIVITY_DATE_S']").val(startDate.split("T")[0]); // 移除時間部分
    }
    if (data.ACTIVITY_DATE_E || data.activityDateEnd) {
      const endDate = data.ACTIVITY_DATE_E || data.activityDateEnd;
      form.find("[name='ACTIVITY_DATE_E']").val(endDate.split("T")[0]); // 移除時間部分
    }
    if (data.ACTUAL_ACTIVITY_DATE_S || data.actualActivityDateStart) {
      const startDate =
        data.ACTUAL_ACTIVITY_DATE_S || data.actualActivityDateStart;
      form.find("[name='ACTUAL_ACTIVITY_DATE_S']").val(startDate.split("T")[0]);
    }
    if (data.ACTUAL_ACTIVITY_DATE_E || data.actualActivityDateEnd) {
      const endDate = data.ACTUAL_ACTIVITY_DATE_E || data.actualActivityDateEnd;
      form.find("[name='ACTUAL_ACTIVITY_DATE_E']").val(endDate.split("T")[0]);
    }

    // 如果是刪除狀態，觸發刪除原因欄位顯示
    if (data.IS_DELETED === "Y") {
      form.find("[name='IS_DELETED']").trigger("change");
    }

    // 如果刪除原因是其他，顯示其他原因欄位
    if (data.DELETE_REASON === "other") {
      $("#otherReasonContainer").show();
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
              <div class="col-md-4">
                <div class="form-group">
                  <label>刪除原因</label>
                  <select class="form-control" name="DELETE_REASON">
                    <option value="">請選擇</option>
                    ${window.DeleteReasonData ? window.DeleteReasonData.map((d) => `<option value="${d.code}">${d.name}</option>`).join("") : ""}
                  </select>
                </div>
              </div>
              <div class="col-md-4" id="otherReasonContainer" style="display: none;">
                <div class="form-group">
                  <label>其他原因</label>
                  <input type="text" class="form-control" name="OTHER_REASON" placeholder="請輸入其他原因" />
                </div>
              </div>
            `;
            $deleteReasonRow.append(deleteReasonHtml);
          }
        } else {
          // 移除刪除原因欄位
          $deleteReasonRow
            .find("[name='DELETE_REASON']")
            .closest(".col-md-4")
            .remove();
          $("#otherReasonContainer").remove();
        }
      });

    // 刪除原因變更
    $(document).on(
      "change",
      "#reportModal select[name='DELETE_REASON']",
      function () {
        const deleteReason = $(this).val();
        if (deleteReason === "other") {
          $("#otherReasonContainer").show();
        } else {
          $("#otherReasonContainer").hide();
        }
      },
    );

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

    // 活動辦理天數變更時自動計算時數
    $("#reportModal input[name='PLANNED_DAYS']")
      .off("input change")
      .on("input change", function () {
        const days = parseFloat($(this).val()) || 0;
        const hours = Math.round(days * 8); // 轉為整數
        $("#reportModal input[name='PLANNED_HOURS']").val(hours);
      });

    // 複製活動內容到實際執行狀況
    $("#reportModal #copyFromPlannedBtn")
      .off("click")
      .on("click", function () {
        // 複製執行事項
        const plannedAction = $(
          "#reportModal input[name='PLANNED_ACTION']",
        ).val();
        $("#reportModal input[name='ACTUAL_ACTION']").val(plannedAction);

        // 複製活動日期
        const activityDateS = $(
          "#reportModal input[name='ACTIVITY_DATE_S']",
        ).val();
        const activityDateE = $(
          "#reportModal input[name='ACTIVITY_DATE_E']",
        ).val();
        $("#reportModal input[name='ACTUAL_ACTIVITY_DATE_S']").val(
          activityDateS,
        );
        $("#reportModal input[name='ACTUAL_ACTIVITY_DATE_E']").val(
          activityDateE,
        );

        // 複製辦理天數和時數
        const plannedDays = $("#reportModal input[name='PLANNED_DAYS']").val();
        const plannedHours = $(
          "#reportModal input[name='PLANNED_HOURS']",
        ).val();
        $("#reportModal input[name='ACTUAL_DAYS']").val(plannedDays);
        $("#reportModal input[name='ACTUAL_HOURS']").val(plannedHours);

        // 複製舉辦地點
        const plannedVenue = $("#reportModal input[name='VENUE']").val();
        $("#reportModal input[name='ACTUAL_VENUE']").val(plannedVenue);
      });

    // 人員統計自動計算小計
    $("#reportModal .personnel-count")
      .off("input change")
      .on("input change", function () {
        // 計算醫事人員小計
        const doctorCount =
          parseInt($("#reportModal input[name='DOCTOR_COUNT']").val()) || 0;
        const nurseCount =
          parseInt($("#reportModal input[name='NURSE_COUNT']").val()) || 0;
        const otherMedicalCount =
          parseInt($("#reportModal input[name='OTHER_MEDICAL_COUNT']").val()) ||
          0;
        const emtCount =
          parseInt($("#reportModal input[name='EMT_COUNT']").val()) || 0;
        const nonMedicalCount =
          parseInt($("#reportModal input[name='NON_MEDICAL_COUNT']").val()) ||
          0;
        const medicalTotal =
          doctorCount +
          nurseCount +
          otherMedicalCount +
          emtCount +
          nonMedicalCount;
        $("#reportModal input[name='MEDICAL_TOTAL']").val(medicalTotal);

        // 計算單位小計
        const healthCount =
          parseInt($("#reportModal input[name='HEALTH_COUNT']").val()) || 0;
        const fireCount =
          parseInt($("#reportModal input[name='FIRE_COUNT']").val()) || 0;
        const hospitalCount =
          parseInt($("#reportModal input[name='HOSPITAL_COUNT']").val()) || 0;
        const environmentCount =
          parseInt($("#reportModal input[name='ENVIRONMENT_COUNT']").val()) ||
          0;
        const nuclearCount =
          parseInt($("#reportModal input[name='NUCLEAR_COUNT']").val()) || 0;
        const otherUnitCount =
          parseInt($("#reportModal input[name='OTHER_UNIT_COUNT']").val()) || 0;
        const unitTotal =
          healthCount +
          fireCount +
          hospitalCount +
          environmentCount +
          nuclearCount +
          otherUnitCount;
        $("#reportModal input[name='UNIT_TOTAL']").val(unitTotal);

        // 計算性別小計
        const maleCount =
          parseInt($("#reportModal input[name='MALE_COUNT']").val()) || 0;
        const femaleCount =
          parseInt($("#reportModal input[name='FEMALE_COUNT']").val()) || 0;
        const genderTotal = maleCount + femaleCount;
        $("#reportModal input[name='GENDER_TOTAL']").val(genderTotal);
      });
  },

  // 儲存資料
  save: function () {
    const formData = this.getFormData();

    // 驗證資料
    if (!this.validateForm(formData)) {
      return;
    }

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
      $.messager.alert("錯誤", "請輸入執行事項", "error");
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

    if (!data.VENUE || data.VENUE.trim() === "") {
      $.messager.alert("錯誤", "請輸入舉辦地點", "error");
      return false;
    }

    if (
      !data.PLANNED_DAYS ||
      data.PLANNED_DAYS === "" ||
      parseFloat(data.PLANNED_DAYS) <= 0
    ) {
      $.messager.alert("錯誤", "請輸入有效的活動辦理天數", "error");
      return false;
    }

    if (
      !data.PLANNED_HOURS ||
      data.PLANNED_HOURS === "" ||
      parseFloat(data.PLANNED_HOURS) <= 0
    ) {
      $.messager.alert("錯誤", "請輸入有效的活動辦理時數", "error");
      return false;
    }

    if (!data.CONTACT_NAME || data.CONTACT_NAME.trim() === "") {
      $.messager.alert("錯誤", "請輸入聯絡人員", "error");
      return false;
    }

    if (!data.CONTACT_PHONE || data.CONTACT_PHONE.trim() === "") {
      $.messager.alert("錯誤", "請輸入連絡電話", "error");
      return false;
    }

    if (!data.DOCUMENT_STATUS || data.DOCUMENT_STATUS === "") {
      $.messager.alert("錯誤", "請選擇文件狀態", "error");
      return false;
    }

    if (
      data.IS_INTERNATIONAL === undefined ||
      data.IS_INTERNATIONAL === null ||
      data.IS_INTERNATIONAL === ""
    ) {
      $.messager.alert("錯誤", "請選擇是否為國際活動", "error");
      return false;
    }

    return true;
  },
};

// 註冊到 window 供全域使用
if (typeof window !== "undefined") {
  window.ActivityInfoForm = ActivityInfoForm;
}
