// EventReportForm.js - 事件通報表單頁面
// 支援新增、編輯、檢視三種模式

const EventReportForm = {
  // 表單模式
  mode: "add", // add, edit, view
  currentData: null,

  // 動態欄位計數器
  locationCounter: 1,

  // 通報來源選項
  reportSources: [
    { code: "NEWS", name: "新聞" },
    { code: "LINE", name: "Line" },
    { code: "PHONE", name: "電話" },
    { code: "119", name: "119轉報" },
    { code: "EMAIL", name: "電子郵件" },
    { code: "FAX", name: "傳真" },
    { code: "OTHER", name: "其他" },
  ],

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
      <style>
        :root {
            --primary: #2c3e50;
            --accent: #3498db;
            --danger: #e74c3c;
            --success: #27ae60;
            --bg: #f4f7f6;
            --card: #ffffff;
            --border: #ccd1d9;
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          z-index: 9998;
        }
        
        .modal-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          box-sizing: border-box;
          font-family: "PingFang TC", "Microsoft JhengHei", sans-serif;
        }

        .event-form-container {
          background: var(--card);
          width: 100%;
          max-width: 900px;
          max-height: 85vh;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid #ccd1d9;
        }
        
        .form-header {
          background: linear-gradient(135deg, #2c5aa0 0%, #1e3c72 100%);
          color: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: none;
          flex-shrink: 0;
          position: relative;
        }
        
        .form-header h2 {
          margin: 0;
          font-size: 1.3rem;
          color: white;
          font-weight: 500;
          flex: 1;
        }
        
        .modal-close {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 5px;
          line-height: 1;
          transition: opacity 0.3s ease;
        }
        
        .modal-close:hover {
          opacity: 0.7;
        }
        
        .auto-info {
          text-align: right;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.9);
          line-height: 1.3;
          margin-right: 40px;
        }
        
        .form-body {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }
        
        .section-title {
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          font-size: 1rem;
          border-bottom: 2px solid #eef2f3;
          padding-bottom: 6px;
        }
        
        .form-section {
          margin-bottom: 20px;
        }
        
        .section-content {
          margin-top: 12px;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 15px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-group label {
          font-size: 14px;
          color: #444;
          margin-bottom: 4px;
          font-weight: 600;
        }
        
        .form-group label.required::after {
          content: " *";
          color: var(--danger);
        }
        
        .form-control {
          padding: 8px 10px;
          border: 1px solid var(--border);
          border-radius: 4px;
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.3s ease;
        }
        
        .form-control:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }
        
        .form-control:disabled,
        .form-control[readonly] {
          background-color: #f8f9fa;
          color: #6c757d;
          cursor: not-allowed;
        }
        
        /* 動態發生地樣式 */
        .location-container {
          background: #f9f9f9;
          padding: 12px;
          border-radius: 4px;
          border: 1px solid #eee;
          margin-bottom: 15px;
        }
        
        .dynamic-item {
          display: grid;
          grid-template-columns: 200px 1fr 50px;
          gap: 10px;
          margin-bottom: 10px;
          align-items: flex-end;
        }
        
        .btn-add-location {
          background: #fff;
          border: 1px dashed var(--accent);
          color: var(--accent);
          padding: 8px;
          text-align: center;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        
        .btn-add-location:hover {
          background: var(--accent);
          color: white;
        }
        
        .btn-remove-location {
          background: #fff0f0;
          color: var(--danger);
          border: 1px solid #ffccd5;
          padding: 9px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-remove-location:hover {
          background: var(--danger);
          color: white;
        }
        
        /* 統計區塊樣式 */
        .stats-container {
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #e6e9ed;
          margin-bottom: 12px;
        }
        
        .stats-fieldset {
          border: 1px solid #d1d9e1;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 10px;
          background: #fff;
        }
        
        .stats-legend {
          font-size: 0.85rem;
          font-weight: bold;
          color: var(--accent);
          padding: 0 10px;
          background: white;
        }
        
        /* REMOC填報區塊 */
        .remoc-section {
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 15px;
          border-left: 3px solid var(--accent);
        }
        
        .remoc-title {
          color: #495057;
          margin-bottom: 15px;
          font-weight: 600;
          font-size: 1rem;
        }
        
        /* EMC系統區塊 */
        .emc-section {
          padding: 12px;
          border-radius: 4px;
          border-left: 3px solid var(--success);
        }
        
        .emc-title {
          color: #495057;
          margin-bottom: 15px;
          font-weight: 600;
          font-size: 1rem;
        }
        
        /* 檢傷分級網格 */
        .triage-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-bottom: 12px;
        }
        
        .triage-total-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          border-top: 1px solid #dee2e6;
          padding-top: 12px;
        }
        
        .total-field .form-control {
          font-weight: bold;
        }
        
        .total-success .form-control {
          background-color: #e8f5e8;
          border: 2px solid var(--success);
        }
        
        .total-danger .form-control {
          background-color: #f8f9fa;
          border: 2px solid var(--danger);
        }
        
        /* 文本區域 */
        textarea.form-control {
          height: 80px;
          resize: vertical;
          line-height: 1.5;
        }
        
        /* 按鈕樣式 */
        .form-actions {
          text-align: center;
          padding: 15px 20px;
          background: #f8f9fa;
          border-top: 1px solid #e0e6ed;
          flex-shrink: 0;
        }
        
        .btn {
          padding: 12px 24px;
          margin: 0 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          min-width: 120px;
        }
        
        .btn-success {
          background: var(--primary);
          color: white;
        }
        
        .btn-success:hover {
          background: #1a252f;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .btn-secondary {
          background: #6c757d;
          color: white;
        }
        
        .btn-secondary:hover {
          background: #545b62;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        /* 小提示文字 */
        .text-muted {
          color: #6c757d;
          font-size: 14px;
          margin-top: 3px;
          display: block;
        }
        
        /* 錯誤訊息 */
        .error-message {
          color: var(--danger);
          font-size: 14px;
          margin-top: 5px;
          display: none;
        }
        
        /* 特殊網格佈局 */
        .grid-2-1-1 {
          grid-template-columns: 2fr 1fr 1fr;
        }
        
        .grid-1-1-1-1 {
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
        }
        
        .grid-1-1 {
          grid-template-columns: 1fr 1fr;
        }
        
        .grid-full {
          grid-template-columns: 1fr;
        }
        
        /* 響應式設計 */
        @media (max-width: 768px) {
          .modal-container {
            padding: 10px;
          }
          
          .event-form-container {
            max-width: none;
            max-height: 95vh;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .dynamic-item {
            grid-template-columns: 1fr;
          }
          
          .triage-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .triage-total-row {
            grid-template-columns: 1fr;
          }
          
          .form-header {
            padding: 12px 15px;
          }
          
          .form-header h2 {
            font-size: 1.1rem;
          }
          
          .form-body {
            padding: 15px;
          }
        }
        
        /* Fieldset 樣式 */
        fieldset {
          border: 2px solid #e0e6ed;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 10px;
          background: #fff;
        }
        
        fieldset legend {
          font-weight: 600;
          color: var(--primary);
          padding: 0 10px;
          font-size: 14px;
          background: white;
        }
      </style>
      
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="event-form-container">
          <div class="form-header">
            <h2>${
              mode === "add" ? "新增" : mode === "edit" ? "編輯" : "檢閱"
            } 事件</h2>
            <button type="button" class="modal-close" onclick="handleCancel()" title="關閉">✕</button>
            <div class="auto-info">
              <div>消息來源：${remocInfo.name}</div>
              <div id="createTimeDisplay">建立日期：${
                mode === "add"
                  ? new Date().toLocaleString("zh-TW", { hour12: false })
                  : data && data.CREATE_TIME
                  ? new Date(data.CREATE_TIME).toLocaleString("zh-TW", {
                      hour12: false,
                    })
                  : new Date().toLocaleString("zh-TW", { hour12: false })
              }</div>
            </div>
          </div>
          
          <div class="form-body">
            <form id="${formId}">
              <!-- 基本通報資訊 -->
              <div class="form-section">
                <div class="section-title">📍 基本通報資訊</div>
                <div class="section-content">
                  <div class="form-row grid-1-1">
                    <div class="form-group">
                      <label class="required">事件名稱</label>
                      <input type="text" class="form-control" name="INCIDENT_NAME" placeholder="例：台鐵XX號脫軌事故" required ${
                        mode === "view" ? "readonly" : ""
                      } />
                      <div class="error-message">請輸入事件名稱</div>
                    </div>
                    <div class="form-group">
                      <label class="required">填報人員</label>
                      <input type="text" class="form-control" name="REPORTER" placeholder="姓名/代號" required ${
                        mode === "view" ? "readonly" : ""
                      } />
                      <div class="error-message">請輸入填報人員</div>
                    </div>
                  </div>
                  
                  <div class="form-row grid-1-1-1-1">
                    <div class="form-group">
                      <label class="required">消息來源時間</label>
                      <input type="datetime-local" class="form-control" name="SOURCE_TIME" required ${
                        mode === "view" ? "readonly" : ""
                      } />
                      <div class="error-message">請選擇時間</div>
                    </div>
                    <div class="form-group">
                      <label class="required">通報來源</label>
                      <select class="form-control" name="SOURCE_TYPE" required ${
                        mode === "view" ? "disabled" : ""
                      }>
                        <option value="">請選擇</option>
                        <option value="新聞">新聞媒體</option>
                        <option value="Line">Line 群組</option>
                        <option value="電話">電話通報</option>
                        <option value="119">119 轉報</option>
                      </select>
                      <div class="error-message">請選擇通報來源</div>
                    </div>
                    <div class="form-group">
                      <label class="required">災害屬性</label>
                      <select class="form-control" name="DISASTER_ATTR" onchange="updateDisasterTypes(this)" required ${
                        mode === "view" ? "disabled" : ""
                      }>
                        <option value="">請選擇</option>
                        <!-- 選項由JavaScript動態產生 -->
                      </select>
                      <div class="error-message">請選擇災害屬性</div>
                    </div>
                    <div class="form-group">
                      <label class="required">災害種類</label>
                      <select class="form-control" name="DISASTER_TYPE" required ${
                        mode === "view" ? "disabled" : ""
                      }>
                        <option value="">請選擇</option>
                        <!-- 選項由JavaScript動態產生 -->
                      </select>
                      <div class="error-message">請選擇災害種類</div>
                    </div>
                  </div>
                  
                  <div class="form-row grid-full">
                    <div class="form-group">
                      <label class="required">事件摘要</label>
                      <textarea class="form-control" name="INCIDENT_SUMMARY" placeholder="請簡述事件概要，包含時間、地點、原因、影響範圍等關鍵資訊..." required ${
                        mode === "view" ? "readonly" : ""
                      }></textarea>
                      <div class="error-message">請輸入事件摘要</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 事故發生地 -->
              <div class="form-section">
                <div class="section-title">🗺️ 事故發生地 (多筆新增)</div>
                <div class="section-content">
                  <div class="location-container">
                    <div id="locationList">
                      <div class="dynamic-item">
                        <div class="form-group">
                          <label>縣市 (鄉鎮市區)</label>
                          <input type="text" class="form-control location-city" placeholder="如：新北市板橋區" ${
                            mode === "view" ? "readonly" : ""
                          } />
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
                              ? '<button type="button" class="btn-remove-location" onclick="removeLocationItem(this)">✕</button>'
                              : ""
                          }
                        </div>
                      </div>
                    </div>
                    ${
                      mode !== "view"
                        ? '<div class="btn-add-location" onclick="addLocationItem()">＋ 新增發生地欄位</div>'
                        : ""
                    }
                  </div>
                </div>
              </div>

              <!-- 聯絡統計與傷情 -->
              <div class="form-section">
                <div class="section-title">📊 聯絡統計與傷情</div>
                <div class="section-content">
                  <div class="remoc-section">
                    <div class="row" style="display: flex; gap: 15px; margin-bottom: 15px;">
                      <div style="flex: 1;">
                        <fieldset>
                          <legend>中央 (部/署) 聯絡</legend>
                          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <div class="form-group">
                              <label>傳發簡訊</label>
                              <input type="number" class="form-control" name="CENTRAL_SMS" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                            <div class="form-group">
                              <label>電話聯絡</label>
                              <input type="number" class="form-control" name="CENTRAL_PHONE" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div style="flex: 1;">
                        <fieldset>
                          <legend>地方 (衛生局、責任醫院、救災救護指揮中心) 聯絡</legend>
                          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <div class="form-group">
                              <label>傳發簡訊</label>
                              <input type="number" class="form-control" name="LOCAL_SMS" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                            <div class="form-group">
                              <label>電話聯絡</label>
                              <input type="number" class="form-control" name="LOCAL_PHONE" value="0" min="0" ${
                                mode === "view" ? "readonly" : ""
                              } />
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    
                    <!-- 新聞傷亡統計 -->
                    <div class="stats-container">
                      <div class="form-row" style="border-bottom: 1px dashed #ddd; padding-bottom: 15px; margin-bottom: 15px;">
                        <div class="form-group">
                          <label style="color:var(--danger)">死亡 (新聞)</label>
                          <input type="number" class="form-control" name="NEWS_DEATH" value="0" min="0" style="color:var(--danger)" ${
                            mode === "view" ? "readonly" : ""
                          } />
                        </div>
                        <div class="form-group">
                          <label>傷病 (新聞)</label>
                          <input type="number" class="form-control" name="NEWS_INJURY" value="0" min="0" ${
                            mode === "view" ? "readonly" : ""
                          } />
                        </div>
                        <div class="form-group">
                          <label>失蹤 (新聞)</label>
                          <input type="number" class="form-control" name="NEWS_MISSING" value="0" min="0" ${
                            mode === "view" ? "readonly" : ""
                          } />
                        </div>
                      </div>
                    </div>

                    <div class="form-row grid-full">
                      <div class="form-group">
                        <label>📝 處置作為概述</label>
                        <textarea class="form-control" name="ACTION_SUMMARY" placeholder="請敘述 REMOC 目前處置進度，例如：&#10;1. 已與該縣市衛生局對口聯繫。&#10;2. 通知該區責任醫院啟動大傷。&#10;3. 監測病床與收容量資訊中..." ${
                          mode === "view" ? "readonly" : ""
                        }></textarea>
                        <span class="text-muted">詳述目前處置進度與後續規劃</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- EMC 系統傷患統計 -->
              <div class="form-section">
                <div class="section-title">📊 EMC 系統傷患統計</div>
                <div class="section-content">
                  <div class="emc-section">
                    <div class="emc-title">緊急醫療管理系統統計數據</div>
                    
                    <div class="triage-grid">
                      <div class="form-group">
                        <label>檢傷一級</label>
                        <input type="number" class="form-control emc-input" name="EMC_TRIAGE1" value="0" min="0" ${
                          mode === "view" ? "readonly" : ""
                        } />
                      </div>
                      <div class="form-group">
                        <label>檢傷二級</label>
                        <input type="number" class="form-control emc-input" name="EMC_TRIAGE2" value="0" min="0" ${
                          mode === "view" ? "readonly" : ""
                        } />
                      </div>
                      <div class="form-group">
                        <label>檢傷三級</label>
                        <input type="number" class="form-control emc-input" name="EMC_TRIAGE3" value="0" min="0" ${
                          mode === "view" ? "readonly" : ""
                        } />
                      </div>
                      <div class="form-group">
                        <label>檢傷四級</label>
                        <input type="number" class="form-control emc-input" name="EMC_TRIAGE4" value="0" min="0" ${
                          mode === "view" ? "readonly" : ""
                        } />
                      </div>
                      <div class="form-group">
                        <label>檢傷五級</label>
                        <input type="number" class="form-control emc-input" name="EMC_TRIAGE5" value="0" min="0" ${
                          mode === "view" ? "readonly" : ""
                        } />
                      </div>
                    </div>

                    <div class="triage-total-row">
                      <div class="form-group total-field total-success">
                        <label>送醫總數</label>
                        <input type="number" class="form-control" name="EMC_TOTAL_ADMITTED" value="0" min="0" readonly />
                  
                      </div>
                      <div class="form-group total-field total-danger">
                        <label>死亡總數</label>
                        <input type="number" class="form-control" name="EMC_TOTAL_DEATH" value="0" min="0" ${
                          mode === "view" ? "readonly" : ""
                        } />
                     
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
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

          <div class="form-actions">
            <button type="button" class="btn btn-success" onclick="handleSubmit()">${
              mode === "view" ? "關閉" : mode === "add" ? "新增" : "更新"
            }</button>
            <button type="button" class="btn btn-secondary" onclick="handleCancel()">取消</button>
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
    $("#eventReportFormModal").remove();

    // 添加到頁面
    $("body").append(`<div id="eventReportFormModal">${content}</div>`);

    // 初始化表單
    this.initForm(data);
  },

  // 初始化表單
  initForm: function (data) {
    const self = this;

    // 載入災害屬性選項
    const disasterAttrSelect = document.querySelector(
      'select[name="DISASTER_ATTR"]'
    );
    if (disasterAttrSelect) {
      // 使用 CommonData.js 的資料
      let attributes = [];
      if (
        typeof DisasterData !== "undefined" &&
        DisasterData.disasterTypeAttr
      ) {
        attributes = DisasterData.disasterTypeAttr;
      } else {
        console.warn("無法載入災害屬性資料，請確認 CommonData.js 是否正確載入");
      }

      attributes.forEach((attr) => {
        const option = document.createElement("option");
        option.value = attr.code;
        option.textContent = attr.name;
        disasterAttrSelect.appendChild(option);
      });
    }

    // 初始化消息來源時間為當前時間
    const sourceTimeInput = document.querySelector('input[name="SOURCE_TIME"]');
    if (sourceTimeInput && this.mode === "add") {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      sourceTimeInput.value = now.toISOString().slice(0, 16);
    }

    // 設定建立日期顯示 (新增模式才需要即時更新)
    if (this.mode === "add") {
      const updateCreateTime = () => {
        const createTimeDisplay = document.getElementById("createTimeDisplay");
        if (createTimeDisplay) {
          createTimeDisplay.textContent = `建立日期：${new Date().toLocaleString(
            "zh-TW",
            { hour12: false }
          )}`;
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
          'select[name="DISASTER_TYPE"]'
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
            "無法載入災害種類資料，請確認 CommonData.js 是否正確載入"
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

    // 設定預設消息來源時間為當前時間
    if (this.mode === "add") {
      const now = new Date();
      $("#MESSAGE_TIME").val(now.toISOString().slice(0, 16));
    }

    // 初始計算總計
    calculateEMCTriageTotal();
  },

  // 載入資料到表單
  loadData: function (data) {
    if (!data) return;

    // 載入基本欄位
    $("#EVENT_NAME").val(data.DISASTER_NAME || "");
    $("#DISASTER_ATTR").val(data.DISASTER_ATTR || "");
    $("#DISASTER_TYPE").val(data.DISASTER_TYPE || "");

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
    $("#CENTRAL_SMS").val(data.MOH_SMS || 0);
    $("#CENTRAL_PHONE").val(data.MOH_PHONE || 0);
    $("#LOCAL_SMS").val(data.LOCAL_SMS || 0);
    $("#LOCAL_PHONE").val(data.LOCAL_PHONE || 0);

    // 載入災害種類（需要先設定災害屬性）
    if (data.DISASTER_ATTR) {
      $("#DISASTER_ATTR").val(data.DISASTER_ATTR).trigger("change");
      setTimeout(() => {
        if (data.DISASTER_TYPE) {
          $("#DISASTER_TYPE").val(data.DISASTER_TYPE);
        }
      }, 100);
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
      const value = $field.val().trim();

      if (!value) {
        $field.siblings(".error-message").show();
        $field.css("border-color", "#e74c3c");
        isValid = false;
      } else {
        $field.css("border-color", "#ddd");
      }
    });

    return isValid;
  },

  // 收集表單資料
  collectFormData: function () {
    const formData = {};

    // 收集基本欄位
    $(
      "#EventReportForm input, #EventReportForm select, #EventReportForm textarea"
    ).each(function () {
      const $field = $(this);
      const name = $field.attr("name");

      if (name && !name.includes("[]")) {
        formData[name] = $field.val();
      }
    });

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
      this.close();
    }
  },

  // 關閉表單
  close: function () {
    $("#eventReportFormModal").remove();
  },
};

// 全域函數：災害種類聯動
function updateDisasterTypes(attrSelect) {
  const attrCode = attrSelect.value;
  const typeSelect = attrSelect.form.querySelector(
    'select[name="DISASTER_TYPE"]'
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
      <input type="text" class="form-control location-city" placeholder="縣市 (鄉鎮市區)">
    </div>
    <div class="form-group">
      <input type="text" class="form-control location-detail" placeholder="詳細發生地">
    </div>
    <div class="form-group">
      <button type="button" class="btn-remove-location" onclick="removeLocationItem(this)">✕</button>
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
    $.messager.alert("提示", "至少需要保留一個發生地欄位", "info");
  }
}

// 全域函數：表單提交處理
function handleSubmit() {
  const form = document.querySelector("#eventReportFormModal form");
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

  // 收集發生地點資料
  const locations = [];
  const locationItems = document.querySelectorAll(
    "#locationList .dynamic-item"
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
    $.messager.alert("成功", "事件報告已新增", "info", () => {
      EventReportForm.close();
    });
  } else if (EventReportForm.mode === "edit") {
    $.messager.alert("成功", "事件報告已更新", "info", () => {
      EventReportForm.close();
    });
  } else {
    EventReportForm.close();
  }
}

// 全域函數：取消處理
function handleCancel() {
  EventReportForm.close();
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
    document.querySelector('[name="EMC_TRIAGE1"]')?.value || 0
  );
  const triage2 = parseInt(
    document.querySelector('[name="EMC_TRIAGE2"]')?.value || 0
  );
  const triage3 = parseInt(
    document.querySelector('[name="EMC_TRIAGE3"]')?.value || 0
  );
  const triage4 = parseInt(
    document.querySelector('[name="EMC_TRIAGE4"]')?.value || 0
  );
  const triage5 = parseInt(
    document.querySelector('[name="EMC_TRIAGE5"]')?.value || 0
  );

  const totalAdmitted = triage1 + triage2 + triage3 + triage4 + triage5;
  const totalAdmittedInput = document.querySelector(
    '[name="EMC_TOTAL_ADMITTED"]'
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
