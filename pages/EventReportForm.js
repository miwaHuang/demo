// EventReportForm.js - 事件消息表單頁面
// 支援新增、編輯、檢視三種模式

const EventReportForm = {
  // 表單模式
  mode: "add", // add, edit, view
  currentData: null,

  // 動態欄位計數器
  locationCounter: 1,

  // 生成表單 HTML
  getContent: function (mode = "add", data = null) {
    this.mode = mode;
    this.currentData = data;
    this.locationCounter = 1;

    const formId = "EventReportForm";
    const isReadonly = mode === "view";
    const readonlyAttr = isReadonly ? "readonly" : "";
    const disabledAttr = isReadonly ? "disabled" : "";

    // 取得當前時間
    const now = new Date();
    const currentDateTime = now.toISOString().slice(0, 16);

    // 取得REMOC資訊（這裡使用台北區作為預設值）
    let remocInfo = { code: "TPE_REMOC", name: "台北區REMOC" };
    if (
      typeof REMOCData !== "undefined" &&
      REMOCData.remocInfo &&
      REMOCData.remocInfo.length > 0
    ) {
      remocInfo = REMOCData.remocInfo[0];
    }

    return /*html*/ `
      <div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="reportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="width: 1500px; max-width: 95vw;">
          <div class="modal-content" style="height: 100%; overflow: auto;">
            <div class="modal-header">
              <h4 class="modal-title" id="reportModalLabel">${
                mode === "add" ? "新增" : mode === "edit" ? "修改" : "檢視"
              } 監看紀錄</h4>
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
              <!-- 基本通報資訊 -->
              <div class="form-section">
                <div class="section-title"> 基本通報資訊</div>
                <div class="section-content">
                  <div class="row">
                   <div class="col-md-2">
                        <div class="form-group">
                            <label>區域</label>
                            <input type="text" class="form-control" name="REGION" value="${
                              data && data.REGION
                                ? data.REGION
                                : typeof remocInfo !== "undefined" &&
                                    remocInfo.name
                                  ? remocInfo.name
                                  : ""
                            }" readonly />
                        </div>
                    </div>
                    
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">EMS是否開案</label>
                        <div style="display: flex; gap: 16px; align-items: center;">
                          <label style="margin: 0;">
                            <input type="radio" name="IS_CASE_OPEN" value="Y" ${
                              mode === "view" ? "disabled" : ""
                            } required /> 是
                          </label>
                          <label style="margin: 0;">
                            <input type="radio" name="IS_CASE_OPEN" value="N" ${
                              mode === "view" ? "disabled" : ""
                            } required /> 否
                          </label>
                        </div>
                        <div class="error-message">請選擇是否開案</div>
                      </div>
                    </div>
                  
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="required">事件名稱</label>
                        <input type="text" class="form-control" name="INCIDENT_NAME" placeholder="例：台鐵XX號脫軌事故" required ${
                          mode === "view" ? "readonly" : ""
                        } />
                        <div class="error-message">請輸入事件名稱</div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">發生日期</label>
                        <input type="date" class="form-control" name="SOURCE_TIME_DATE" required ${
                          mode === "view" ? "readonly" : ""
                        } />
                        <div class="error-message">請選擇日期</div>
                      </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">發生時間</label>
                        <input type="time" class="form-control" name="SOURCE_TIME_TIME" required ${
                          mode === "view" ? "readonly" : ""
                        } />                       
                        <div class="error-message">請選擇時間</div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>事件分級</label>
                        <div style="display: flex; align-items: center; gap: 12px;">
                          <label class="emergency-switch">
                            <input type="checkbox" id="IS_EMERGENCY_EVENT" name="IS_EMERGENCY_EVENT" value="Y" ${
                              mode === "view" ? "disabled" : ""
                            } />
                            <span class="slider"></span>
                          </label>
                          <span id="eventLevelLabel" style="min-width: 60px;">非應變事件</span>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">災害屬性</label>
                        <div id="disasterAttrRadioGroup" style="display: flex; flex-wrap: nowrap; gap: 16px; align-items: center;">
                          <!-- 災害屬性選項由 JavaScript 動態產生 -->
                        </div>
                        <div class="error-message">請選擇災害屬性</div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="required">EMS災害種類</label>
                        <select class="form-control" name="DISASTER_TYPE" required ${
                          mode === "view" ? "disabled" : ""
                        }>
                          <option value="">請選擇</option>
                          <!-- 選項由JavaScript動態產生 -->
                        </select>
                        <div class="error-message">請選擇災害種類</div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="required">災防會災害種類</label>
                        <select class="form-control" name="DISASTER_PREVENTION_TYPE" required ${
                          mode === "view" ? "disabled" : ""
                        }>
                          <option value="">請選擇</option>
                          ${
                            typeof DisasterPreventionData !== "undefined"
                              ? CommonDataUtils.generateOptions(
                                  DisasterPreventionData,
                                )
                              : ""
                          }
                        </select>
                        <div class="error-message">請選擇災害種類</div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="required">訊息來源</label>
                        <input type="text" class="form-control" name="SOURCE_TYPE" placeholder="請輸入事件來源" required ${
                          mode === "view" ? "readonly" : ""
                        } />
                        <div class="error-message">請輸入訊息來源</div>
                      </div>
                    </div> 
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">訊息來源日期</label>
                        <input type="date" class="form-control" name="SOURCE_TIME_DATE_NEW" required ${
                          mode === "view" ? "readonly" : ""
                        } />
                        <div class="error-message">請選擇日期</div>
                      </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">訊息來源時間</label>
                        <input type="time" class="form-control" name="SOURCE_TIME_TIME_NEW" required ${
                          mode === "view" ? "readonly" : ""
                        } />                       
                        <div class="error-message">請選擇時間</div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">監看人員</label>
                        <input type="text" class="form-control" name="REPORTER" placeholder="請輸入姓名" required ${
                          mode === "view" ? "readonly" : ""
                        } />
                        <div class="error-message">請輸入監看人員</div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="required">聯絡電話</label>
                        <input type="tel" class="form-control" name="CONTACT_PHONE" placeholder="請輸入電話號碼" required ${
                          mode === "view" ? "readonly" : ""
                        } />
                        <div class="error-message">請輸入</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="required">事件摘要</label>
                        <textarea class="form-control" name="INCIDENT_SUMMARY" placeholder="請簡述事件概要，包含時間、地點、原因、影響範圍等關鍵資訊..." required ${
                          mode === "view" ? "readonly" : ""
                        } style="height: 50px;"></textarea>
                        <div class="error-message">請輸入事件摘要</div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>處置作為概述</label>
                        <textarea class="form-control" name="ACTION_SUMMARY" placeholder="請敘述 REMOC 目前處置進度。" ${
                          mode === "view" ? "readonly" : ""
                        } style="height: 50px;"></textarea>
                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>

              <!-- 事故發生地 -->
              <div class="form-section">
                <div class="section-title">事故發生地</div>
                <div class="section-content">
                  <div class="row align-items-center">
                    <div class="col-sm-10">
                      <div id="locationList">
                        <div class="dynamic-item">
                          <div class="form-group">
                            <label class="required">縣市 (鄉鎮市區)</label>
                            <input type="text" class="form-control location-city" placeholder="如：新北市板橋區" ${
                              mode === "view" ? "readonly" : "required"
                            } />
                            <div class="error-message">請輸入縣市</div>
                          </div>
                          <div class="form-group">
                            <label>詳細發生地</label>
                            <input type="text" class="form-control location-detail" placeholder="如：文化路二段XX號前" ${
                              mode === "view" ? "readonly" : ""
                            } />
                          </div>
                          <div class="form-group">
                            <label>&nbsp;</label>
                            ${
                              mode !== "view"
                                ? '<button type="button" class="btn-remove-location" title="移除" style="color:#d9534f;display:flex;align-items:center;" onclick="removeLocationItem(this)"><i class="fa fa-trash fa-lg"></i></button>'
                                : ""
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                      <div class="col-sm-2 ">
                      ${
                        mode !== "view"
                          ? '<button type="button" class="btn btn-primary btn-add-location w-100 " style="margin-top:35px;" onclick="addLocationItem()">＋ 新增發生地</button>'
                          : ""
                      }
                    </div>
                  </div>
                </div>
              </div>

              <!-- 簡訊/電話通報數 -->
              <div class="form-section">
                <div class="section-title"> 簡訊/電話通報數</div>
                <div class="section-content">
                
                    <div class="row">
                      <div class="col-md-6">
                        <fieldset>
                          <legend>簡訊通報數</legend>
                          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
                            <div class="form-group">
                              <label class="required">衛福部</label>
                              <input type="number" class="form-control" name="MOH_SMS" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                            <div class="form-group">
                              <label  class="required">衛生局</label>
                              <input type="number" class="form-control" name="LOCAL_SMS" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                            <div class="form-group">
                              <label class="required">責任醫院</label>
                              <input type="number" class="form-control" name="HOSPITAL_SMS" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                            <div class="form-group">
                              <label class="required">指揮中心</label>
                              <input type="number" class="form-control" name="COMMAND_SMS" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-6">
                        <fieldset>
                          <legend>電話通報數</legend>
                          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
                            <div class="form-group">
                              <label class="required">衛福部</label>
                              <input type="number" class="form-control" name="MOH_PHONE" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                            <div class="form-group">
                              <label class="required">衛生局</label>
                              <input type="number" class="form-control" name="LOCAL_PHONE" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                            <div class="form-group">
                              <label class="required">責任醫院</label>
                              <input type="number" class="form-control" name="HOSPITAL_PHONE" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                            <div class="form-group">
                              <label class="required">指揮中心</label>
                              <input type="number" class="form-control" name="COMMAND_PHONE" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    
                 
                </div>
              </div>

              <!-- EMC 系統傷患統計 -->
              <div class="form-section">
                <div class="section-title">${
                  data && data.MSG_SOURCE === "EMS"
                    ? "醫療檢傷人數"
                    : "事件傷亡人數"
                }</div>
                <div class="section-content">
                  ${
                    data && data.MSG_SOURCE === "EMS"
                      ? `
                    <!-- 醫療檢傷人數 -->
                    <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px;">
                      <div class="form-group">
                        <label >一級</label>
                        <input type="number" class="form-control emc-input" name="EMC_TRIAGE1" value="0" min="0" readonly />
                      </div>
                      <div class="form-group">
                        <label >二級</label>
                        <input type="number" class="form-control emc-input" name="EMC_TRIAGE2" value="0" min="0" readonly />
                      </div>
                      <div class="form-group">
                        <label >三級</label>
                        <input type="number" class="form-control emc-input" name="EMC_TRIAGE3" value="0" min="0" readonly />
                      </div>
                      <div class="form-group">
                        <label >四級</label>
                        <input type="number" class="form-control emc-input" name="EMC_TRIAGE4" value="0" min="0" readonly />
                      </div>
                      <div class="form-group">
                        <label >五級</label>
                        <input type="number" class="form-control emc-input" name="EMC_TRIAGE5" value="0" min="0" readonly />
                      </div>
                      <div class="form-group">
                        <label >未填</label>
                        <input type="number" class="form-control emc-input" name="EMC_UNFILLED" value="0" min="0" readonly />
                      </div>
                      <div class="form-group">
                        <label>檢傷總人數</label>
                        <input type="number" class="form-control" name="EMC_TOTAL_ADMITTED" value="0" min="0" readonly />
                      </div>
                      <div class="form-group">
                        <label >死亡</label>
                        <input type="number" class="form-control" name="EMC_TOTAL_DEATH" value="0" min="0" readonly />
                      </div>
                    </div>
                  `
                      : `
                    <!-- 事件傷亡人數 -->
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="required" style="color:var(--danger)">死亡</label>
                          <input type="number" class="form-control" name="NEWS_DEATH" value="0" min="0" style="color:var(--danger)" ${
                            mode === "view" ? "readonly" : ""
                          } />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="required">傷病</label>
                          <input type="number" class="form-control" name="NEWS_INJURY" value="0" min="0" ${
                            mode === "view" ? "readonly" : ""
                          } />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="required" >失蹤</label>
                          <input type="number" class="form-control" name="NEWS_MISSING" value="0" min="0" ${
                            mode === "view" ? "readonly" : ""
                          } />
                        </div>
                      </div>
                    </div>
                  `
                  }
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
                        <input type="text" class="form-control" name="OTHER_REASON" placeholder="請輸入其他原因" ${readonlyAttr} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `
                  : ""
              }
              
              <!-- 隱藏欄位 -->
              <input type="hidden" name="REMOC_CODE" value="${
                remocInfo.code
              }" />
              <input type="hidden" name="REMOC_NAME" value="${
                remocInfo.name
              }" />
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

  // 生成選項 HTML
  generateOptions: function (dataArray) {
    if (!dataArray || !Array.isArray(dataArray)) {
      return '<option value="">無資料</option>';
    }
    return dataArray
      .map((item) => `<option value="${item.code}">${item.name}</option>`)
      .join("");
  },

  // 顯示表單
  show: function (mode = "add", data = null) {
    const content = this.getContent(mode, data);

    // 移除現有表單
    $("#reportModal").remove();

    // 添加到頁面
    $("body").append(content);

    // 顯示Bootstrap modal
    $("#reportModal").modal({
      backdrop: "static",
      keyboard: false,
    });

    // 初始化表單
    this.initForm(data);
  },

  // 初始化表單
  initForm: function (data) {
    const self = this;

    // 載入災害屬性選項 (radio button)
    const disasterAttrRadioGroup = document.getElementById(
      "disasterAttrRadioGroup",
    );
    if (disasterAttrRadioGroup) {
      let attributes = [];
      if (
        typeof DisasterData !== "undefined" &&
        DisasterData.disasterTypeAttr
      ) {
        attributes = DisasterData.disasterTypeAttr;
      } else {
        console.warn("無法載入災害屬性資料，請確認 CommonData.js 是否正確載入");
      }

      disasterAttrRadioGroup.innerHTML = attributes
        .map(
          (attr) =>
            `<label style="margin-right:12px;"><input type="radio" name="DISASTER_ATTR" value="${
              attr.code
            }" ${
              self.mode === "view" ? "disabled" : ""
            } required onchange="updateDisasterTypesRadio(this)"> ${
              attr.name
            }</label>`,
        )
        .join("");
    }

    // 初始化事件來源時間為當前時間
    if (this.mode === "add") {
      const sourceTimeHidden = document.querySelector(
        'input[name="SOURCE_TIME"]',
      );
      const sourceDateInput = document.querySelector(
        'input[name="SOURCE_TIME_DATE"]',
      );
      const sourceTimeInput = document.querySelector(
        'input[name="SOURCE_TIME_TIME"]',
      );
      if (sourceTimeHidden && sourceDateInput && sourceTimeInput) {
        const now = new Date();
        const dateStr = now.toISOString().split("T")[0];
        const timeStr = now.toTimeString().slice(0, 5);
        sourceTimeHidden.value = `${dateStr} ${timeStr}:00`;
        sourceDateInput.value = dateStr;
        sourceTimeInput.value = timeStr;
      }
    }
    // 初始化事件分級 Switch
    const isEmergencyCheckbox = document.getElementById("IS_EMERGENCY_EVENT");

    if (isEmergencyCheckbox) {
      // 更新 label 文本的函數
      const updateEventLevelLabel = () => {
        const labelElement = document.getElementById("eventLevelLabel");
        if (labelElement) {
          labelElement.textContent = isEmergencyCheckbox.checked
            ? "應變事件"
            : "非應變事件";
        }
      };

      // 如果資料中有該欄位，設定checkbox狀態
      if (data && data.IS_EMERGENCY_EVENT === "Y") {
        isEmergencyCheckbox.checked = true;
      } else {
        isEmergencyCheckbox.checked = false;
      }

      // 初始化 label 顯示
      updateEventLevelLabel();

      // 綁定 checkbox 變更事件
      isEmergencyCheckbox.addEventListener("change", updateEventLevelLabel);

      // View模式下禁用交互
      if (this.mode === "view") {
        isEmergencyCheckbox.disabled = true;
      }
    }

    // 設定建立日期顯示 (新增模式才需要即時更新)
    if (this.mode === "add") {
      const updateCreateTime = () => {
        const createTimeDisplay = document.getElementById("createTimeDisplay");
        if (createTimeDisplay) {
          createTimeDisplay.textContent = `建立日期：${new Date()
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")}`;
        }
      };

      // 每秒更新建立時間
      const timeInterval = setInterval(updateCreateTime, 1000);

      // 在關閉時清除定時器
      const originalClose = EventReportForm.close;
      EventReportForm.close = function () {
        clearInterval(timeInterval);
        originalClose.call(this);
      };
    }

    // 綁定數字輸入框的自動計算
    setTimeout(() => {
      bindAutoCalculation();
    }, 100);

    // EMC檢傷人數自動加總
    const emcTriageInputs = [
      "EMC_T1_COUNT",
      "EMC_T2_COUNT",
      "EMC_T3_COUNT",
      "EMC_T4_COUNT",
      "EMC_T5_COUNT",
      "EMC_UNKNOWN_COUNT",
    ];

    // 計算EMC檢傷總計
    function calculateEMCTriageTotal() {
      let total = 0;
      emcTriageInputs.forEach((inputId) => {
        const value = parseInt($(`#${inputId}`).val()) || 0;
        total += value;
      });
      $("#EMC_TRIAGE_TOTAL").val(total);
    }

    // 綁定EMC檢傷欄位變更事件（如果是可編輯模式）
    if (self.mode !== "view") {
      emcTriageInputs.forEach((inputId) => {
        $(`#${inputId}`).on("input", calculateEMCTriageTotal);
      });
    }

    // 災害屬性變更時更新災害種類
    if (disasterAttrSelect) {
      disasterAttrSelect.addEventListener("change", function () {
        const attrValue = this.value;
        const typeSelect = document.querySelector(
          'select[name="DISASTER_TYPE"]',
        );

        if (!typeSelect) return;

        // 清空現有選項
        typeSelect.innerHTML = '<option value="">請選擇災害種類</option>';

        if (!attrValue) {
          typeSelect.innerHTML = '<option value="">請先選擇災害屬性</option>';
          return;
        }

        // 取得災害種類資料
        let types = [];
        if (
          typeof DisasterData !== "undefined" &&
          DisasterData.disasterType &&
          DisasterData.disasterType[attrValue]
        ) {
          types = DisasterData.disasterType[attrValue];
        } else {
          console.warn(
            "無法載入災害種類資料，請確認 CommonData.js 是否正確載入",
          );
        }

        // 添加選項
        types.forEach((type) => {
          const option = document.createElement("option");
          option.value = type.code;
          option.textContent = type.name;
          typeSelect.appendChild(option);
        });
      });
    }

    // 如果是編輯或檢視模式，載入資料
    if (data && (this.mode === "edit" || this.mode === "view")) {
      this.loadData(data);
    }

    // 設定預設事件來源時間為當前時間
    if (this.mode === "add") {
      const now = new Date();
      $("#MESSAGE_TIME").val(now.toISOString().slice(0, 16));
      // 初始化消息來源時間為當前時間
      const dateStr = now.toISOString().split("T")[0];
      const timeStr = now.toTimeString().slice(0, 5);
      $('[name="SOURCE_TIME_DATE_NEW"]').val(dateStr);
      $('[name="SOURCE_TIME_TIME_NEW"]').val(timeStr);
    }

    // 初始計算總計
    calculateEMCTriageTotal();

    // 綁定刪除相關事件
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
  },

  // 載入資料到表單
  loadData: function (data) {
    if (!data) return;

    // 載入基本欄位
    $("#EVENT_NAME").val(data.DISASTER_NAME || "");
    // 災害屬性 (radio)
    if (data.DISASTER_ATTR) {
      const radios = document.getElementsByName("DISASTER_ATTR");
      Array.from(radios).forEach((radio) => {
        if (radio.value === data.DISASTER_ATTR) {
          radio.checked = true;
          updateDisasterTypesRadio(radio);
        }
      });
    }
    $("#DISASTER_TYPE").val(data.DISASTER_TYPE || "");

    // 載入事件來源時間
    if (data.SOURCE_TIME) {
      const date = new Date(data.SOURCE_TIME);
      if (EventReportForm.mode === "view") {
        const dateStr = date.toISOString().split("T")[0];
        const timeStr = date.toTimeString().slice(0, 5);
        $('[name="SOURCE_TIME_DATE"]').val(dateStr);
        $('[name="SOURCE_TIME_TIME"]').val(timeStr);
      } else {
        const dateStr = date.toISOString().split("T")[0];
        const timeStr = date.toTimeString().slice(0, 5);
        $('[name="SOURCE_TIME"]').val(`${dateStr} ${timeStr}:00`);
        $('[name="SOURCE_TIME_DATE"]').val(dateStr);
        $('[name="SOURCE_TIME_TIME"]').val(timeStr);
      }
    }

    // 載入消息來源時間
    if (data.SOURCE_TIME_NEW_DATE && data.SOURCE_TIME_NEW_TIME) {
      $('[name="SOURCE_TIME_DATE_NEW"]').val(data.SOURCE_TIME_NEW_DATE);
      $('[name="SOURCE_TIME_TIME_NEW"]').val(data.SOURCE_TIME_NEW_TIME);
    }

    // 載入傷亡統計
    $("#REMOC_DEATH_COUNT").val(data.DEATH_COUNT || 0);
    $("#REMOC_INJURED_COUNT").val(data.CASUALTY_INJURED || 0);
    $("#REMOC_MISSING_COUNT").val(data.CASUALTY_MISSING || 0);

    // 載入檢傷統計
    $("#EMC_T1_COUNT").val(data.TRIAGE_LEVEL_1 || 0);
    $("#EMC_T2_COUNT").val(data.TRIAGE_LEVEL_2 || 0);
    $("#EMC_T3_COUNT").val(data.TRIAGE_LEVEL_3 || 0);
    $("#EMC_T4_COUNT").val(data.TRIAGE_LEVEL_4 || 0);
    $("#EMC_T5_COUNT").val(data.TRIAGE_LEVEL_5 || 0);
    $("#EMC_UNKNOWN_COUNT").val(data.TRIAGE_LEVEL_UNKNOWN || 0);

    // 載入聯絡統計
    $('[name="MOH_SMS"]').val(data.MOH_SMS || 0);
    $('[name="LOCAL_SMS"]').val(data.LOCAL_SMS || 0);
    $('[name="HOSPITAL_SMS"]').val(data.HOSPITAL_SMS || 0);
    $('[name="COMMAND_SMS"]').val(data.COMMAND_SMS || 0);
    $('[name="MOH_PHONE"]').val(data.MOH_PHONE || 0);
    $('[name="LOCAL_PHONE"]').val(data.LOCAL_PHONE || 0);
    $('[name="HOSPITAL_PHONE"]').val(data.HOSPITAL_PHONE || 0);
    $('[name="COMMAND_PHONE"]').val(data.COMMAND_PHONE || 0);

    // 載入災害種類（需要先設定災害屬性）
    if (data.DISASTER_ATTR) {
      $("#DISASTER_ATTR").val(data.DISASTER_ATTR).trigger("change");
      setTimeout(() => {
        if (data.DISASTER_TYPE) {
          $("#DISASTER_TYPE").val(data.DISASTER_TYPE);
        }
      }, 100);
    }

    // 載入刪除資訊
    $('[name="IS_DELETED"]').val(data.IS_DELETED || "N");
    $('[name="DELETE_REASON"]').val(
      data.DELETE_REASON || data.deleteReason || "",
    );
    $('[name="OTHER_REASON"]').val(data.OTHER_REASON || data.otherReason || "");

    // 如果刪除原因是其他，顯示其他原因欄位
    if (data.DELETE_REASON === "other") {
      $("#otherReasonContainer").show();
    }
  },

  // 新增發生地
  addLocation: function () {
    this.locationCounter++;
    const isReadonly = this.mode === "view";
    const readonlyAttr = isReadonly ? "readonly" : "";
    const disabledAttr = isReadonly ? "disabled" : "";

    const locationHtml = `
      <div class="dynamic-item" data-index="${this.locationCounter}">
        <div class="form-group" style="flex: 1;">
          <label>縣市(鄉鎮市區)</label>
          <select class="form-control location-county" name="LOCATION_COUNTY[]" ${disabledAttr}>
            <option value="">請選擇縣市</option>
            ${
              typeof CountyData !== "undefined" && CountyData.counties
                ? CommonDataUtils.generateOptions(CountyData.counties)
                : ""
            }
          </select>
        </div>
        <div class="form-group" style="flex: 2;">
          <label>詳細發生地</label>
          <input type="text" class="form-control" name="LOCATION_DETAIL[]" 
                 placeholder="詳細門牌或路段座標" ${readonlyAttr}>
        </div>
        ${
          !isReadonly
            ? '<button type="button" class="btn-remove-location" onclick="EventReportForm.removeLocation(this)">刪除</button>'
            : ""
        }
      </div>
    `;

    $("#location-container").append(locationHtml);
  },

  // 移除發生地
  removeLocation: function (button) {
    if ($("#location-container .dynamic-item").length > 1) {
      $(button).closest(".dynamic-item").remove();
    } else {
      alert("至少需要保留一個發生地");
    }
  },

  // 表單驗證
  validateForm: function () {
    let isValid = true;

    // 隱藏所有錯誤訊息
    $(".error-message").hide();

    // 檢查必填欄位
    $("#EventReportForm [required]").each(function () {
      const $field = $(this);
      // radio button 特殊處理
      if ($field.attr("type") === "radio") {
        const name = $field.attr("name");
        const checked = $("input[name='" + name + "']:checked").length > 0;
        if (!checked) {
          $field.closest(".form-group").find(".error-message").show();
          isValid = false;
        }
      } else {
        const value = $field.val().trim();
        if (!value) {
          $field.siblings(".error-message").show();
          $field.css("border-color", "#e74c3c");
          isValid = false;
        } else {
          $field.css("border-color", "#ddd");
        }
      }
    });

    return isValid;
  },

  // 收集表單資料
  collectFormData: function () {
    const formData = {};

    // 收集基本欄位
    $(
      "#EventReportForm input, #EventReportForm select, #EventReportForm textarea",
    ).each(function () {
      const $field = $(this);
      const name = $field.attr("name");

      if (name && !name.includes("[]")) {
        formData[name] = $field.val();
      }
    });

    // 組合事件來源時間
    if (formData.SOURCE_TIME_DATE && formData.SOURCE_TIME_TIME) {
      formData.SOURCE_TIME = `${formData.SOURCE_TIME_DATE} ${formData.SOURCE_TIME_TIME}:00`;
      delete formData.SOURCE_TIME_DATE;
      delete formData.SOURCE_TIME_TIME;
    }

    // 收集發生地資料
    formData.locations = [];
    $("#location-container .dynamic-item").each(function () {
      const county = $(this).find(".location-county").val();
      const detail = $(this).find('[name="LOCATION_DETAIL[]"]').val();

      if (county || detail) {
        formData.locations.push({
          county: county,
          detail: detail,
        });
      }
    });

    return formData;
  },

  // 儲存表單
  save: function () {
    if (!this.validateForm()) {
      $.messager.alert("提示", "請填寫所有必填欄位！", "warning");
      return;
    }

    const formData = this.collectFormData();

    // 這裡應該呼叫後端 API 儲存資料
    console.log("儲存資料:", formData);

    // 模擬儲存成功
    $.messager.show({
      title: "成功",
      msg: `<i class="fa fa-check-circle" style="color: #5cb85c; margin-right: 5px;"></i>${
        this.mode === "add" ? "新增" : "更新"
      }成功`,
      timeout: 2000,
      showType: "fade",
      style: {
        right: "",
        bottom: "",
        top: ($(window).height() - 150) / 2,
        left: ($(window).width() - 300) / 2,
      },
    });

    this.close();

    // 重新整理父頁面的表格
    if (
      typeof EventReportManagementPage !== "undefined" &&
      EventReportManagementPage.searchData
    ) {
      EventReportManagementPage.searchData();
    }
  },

  // 取消
  cancel: function () {
    if (confirm("確定要取消嗎？未儲存的變更將會遺失。")) {
      if (confirm("確認取消？\n\n資料尚未儲存，確定要離開嗎？")) {
        this.close();
      }
    }
  },

  // 關閉表單
  close: function () {
    $("#reportModal").modal("hide");
    setTimeout(() => {
      $("#reportModal").remove();
    }, 300);
  },
};

// 全域函數：災害種類聯動
// Radio 版災害屬性聯動
function updateDisasterTypesRadio(radio) {
  const attrCode = radio.value;
  const form = radio.form || document.querySelector("#reportModal form");
  const typeSelect = form.querySelector('select[name="DISASTER_TYPE"]');

  // 清空現有選項
  typeSelect.innerHTML = '<option value="">請選擇災害種類</option>';

  if (!attrCode) {
    typeSelect.innerHTML = '<option value="">請先選擇災害屬性</option>';
    return;
  }

  // 取得災害種類資料
  let types = [];
  if (
    typeof DisasterData !== "undefined" &&
    DisasterData.disasterType &&
    DisasterData.disasterType[attrCode]
  ) {
    types = DisasterData.disasterType[attrCode];
  } else {
    console.warn("無法載入災害種類資料，請確認 CommonData.js 是否正確載入");
  }

  // 根據災害屬性載入對應的災害種類
  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.code;
    option.textContent = type.name;
    typeSelect.appendChild(option);
  });
}
function updateDisasterTypes(attrSelect) {
  const attrCode = attrSelect.value;
  const typeSelect = attrSelect.form.querySelector(
    'select[name="DISASTER_TYPE"]',
  );

  // 清空現有選項
  typeSelect.innerHTML = '<option value="">請選擇災害種類</option>';

  if (!attrCode) {
    typeSelect.innerHTML = '<option value="">請先選擇災害屬性</option>';
    return;
  }

  // 取得災害種類資料
  let types = [];
  if (
    typeof DisasterData !== "undefined" &&
    DisasterData.disasterType &&
    DisasterData.disasterType[attrCode]
  ) {
    types = DisasterData.disasterType[attrCode];
  } else {
    console.warn("無法載入災害種類資料，請確認 CommonData.js 是否正確載入");
  }

  // 根據災害屬性載入對應的災害種類
  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.code;
    option.textContent = type.name;
    typeSelect.appendChild(option);
  });
}

// 全域函數：新增發生地點
function addLocationItem() {
  const locationList = document.getElementById("locationList");
  const div = document.createElement("div");
  div.className = "dynamic-item";
  div.innerHTML = `
    <div class="form-group">
      <label class="required">縣市 (鄉鎮市區)</label>
      <input type="text" class="form-control location-city" placeholder="如：新北市板橋區" required>
      <div class="error-message">請輸入縣市</div>
    </div>
    <div class="form-group">
      <input type="text" class="form-control location-detail" placeholder="詳細發生地">
    </div>
    <div class="form-group">
      <button type="button" class="btn-remove-location" title="移除" style="background:none;border:none;padding:0;margin:0;color:#d9534f;display:flex;align-items:center;" onclick="removeLocationItem(this)"><i class="fa fa-trash fa-lg"></i></button>
    </div>
  `;
  locationList.appendChild(div);
}

// 全域函數：移除發生地點
function removeLocationItem(button) {
  const locationList = document.getElementById("locationList");
  // 至少保留一個地點欄位
  if (locationList.children.length > 1) {
    button.closest(".dynamic-item").remove();
  } else {
    $.messager.alert("提示", "至少需要一個事故發生地", "info");
  }
}

// 全域函數：表單提交處理
function handleSubmit() {
  const form = document.querySelector("#reportModal form");
  if (!form) return;

  // 驗證必填欄位
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    const errorMsg = field.parentNode.querySelector(".error-message");
    if (!field.value.trim()) {
      if (errorMsg) errorMsg.style.display = "block";
      field.style.borderColor = "var(--danger)";
      isValid = false;
    } else {
      if (errorMsg) errorMsg.style.display = "none";
      field.style.borderColor = "var(--border)";
    }
  });

  if (!isValid) {
    $.messager.alert("驗證錯誤", "請填寫所有必填欄位", "error");
    return;
  }

  // 收集表單資料
  const formData = new FormData(form);
  const data = {};

  // 基本欄位
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  // 組合事件來源時間
  if (data.SOURCE_TIME_DATE && data.SOURCE_TIME_TIME) {
    data.SOURCE_TIME = `${data.SOURCE_TIME_DATE} ${data.SOURCE_TIME_TIME}:00`;
    delete data.SOURCE_TIME_DATE;
    delete data.SOURCE_TIME_TIME;
  }

  // 收集發生地點資料
  const locations = [];
  const locationItems = document.querySelectorAll(
    "#locationList .dynamic-item",
  );
  locationItems.forEach((item) => {
    const city = item.querySelector(".location-city").value.trim();
    const detail = item.querySelector(".location-detail").value.trim();
    if (city || detail) {
      locations.push({ city, detail });
    }
  });
  data.LOCATIONS = JSON.stringify(locations);

  console.log("表單數據：", data);

  // 根據模式進行不同處理
  if (EventReportForm.mode === "add") {
    $.messager.alert("成功", "儲存成功", "info", () => {
      EventReportForm.close();
    });
  } else if (EventReportForm.mode === "edit") {
    $.messager.alert("成功", "儲存成功", "info", () => {
      EventReportForm.close();
    });
  } else {
    EventReportForm.close();
  }
}

// 全域函數：取消處理
function handleCancel() {
  if (EventReportForm.mode === "add" || EventReportForm.mode === "edit") {
    $.messager.confirm(
      "確認取消？",
      "資料尚未儲存，確定要離開嗎？",
      function (r) {
        if (r) {
          EventReportForm.close();
        }
      },
    );
  } else {
    EventReportForm.close();
  }
}

// 綁定數字輸入的自動計算
function bindAutoCalculation() {
  // REMOC檢傷數據輸入事件
  const triageInputs = document.querySelectorAll(".triage-input");
  triageInputs.forEach((input) => {
    input.addEventListener("input", calculateTriageTotals);
  });

  // EMC數據輸入事件
  const emcInputs = document.querySelectorAll(".emc-input");
  emcInputs.forEach((input) => {
    input.addEventListener("input", calculateEMCTotals);
  });

  const emcDeathInputs = document.querySelectorAll(".emc-death-input");
  emcDeathInputs.forEach((input) => {
    input.addEventListener("input", calculateEMCTotals);
  });
}

// 計算檢傷總數
function calculateTriageTotals() {
  // 這裡可以添加檢傷數據的總計計算
  // 目前設計中檢傷數據是獨立顯示的，不需要自動加總
}

// 計算EMC統計總數
function calculateEMCTotals() {
  // 計算送醫總數 (T1-T5)
  const triage1 = parseInt(
    document.querySelector('[name="EMC_TRIAGE1"]')?.value || 0,
  );
  const triage2 = parseInt(
    document.querySelector('[name="EMC_TRIAGE2"]')?.value || 0,
  );
  const triage3 = parseInt(
    document.querySelector('[name="EMC_TRIAGE3"]')?.value || 0,
  );
  const triage4 = parseInt(
    document.querySelector('[name="EMC_TRIAGE4"]')?.value || 0,
  );
  const triage5 = parseInt(
    document.querySelector('[name="EMC_TRIAGE5"]')?.value || 0,
  );

  const totalAdmitted = triage1 + triage2 + triage3 + triage4 + triage5;
  const totalAdmittedInput = document.querySelector(
    '[name="EMC_TOTAL_ADMITTED"]',
  );
  if (totalAdmittedInput) {
    totalAdmittedInput.value = totalAdmitted;
  }

  // 死亡總數需要從外部系統獲取，這裡保持為0或從其他地方更新
  const totalDeathInput = document.querySelector('[name="EMC_TOTAL_DEATH"]');
  if (totalDeathInput && !totalDeathInput.value) {
    totalDeathInput.value = 0;
  }
}

// 註冊到 window 供全域使用

if (typeof window !== "undefined") {
  window.EventReportForm = EventReportForm;
}
