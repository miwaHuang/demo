// ButtonComponent.js - 按鈕組件
// 統一管理按鈕樣式和顏色

const ButtonComponent = {
  // 按鈕顏色配置
  colors: {
    primary: "btn-primary", // 藍色 - 主要操作
    success: "btn-success", // 綠色 - 成功/查詢
    info: "btn-info", // 淺藍色 - 資訊/檢視
    warning: "btn-warning", // 橘色 - 警告/編輯
    danger: "btn-danger", // 紅色 - 危險/刪除
    default: "btn-default", // 灰白色 - 預設
    gray: "btn-gray", // 灰色 - 取消/清除
  },

  // 生成按鈕 HTML
  create: function (options) {
    const {
      id = "",
      text = "",
      color = "default",
      disabled = false,
      icon = "",
      onClick = null,
    } = options;

    const colorClass = this.colors[color] || this.colors.default;
    const disabledAttr = disabled ? "disabled" : "";
    const iconHtml = icon ? `<i class="${icon}"></i> ` : "";

    return `<button type="button" class="btn ${colorClass}" id="${id}" ${disabledAttr}>${iconHtml}${text}</button>`;
  },

  // 快捷方法 - 查詢按鈕
  search: function (id = "btnSearch") {
    return this.create({
      id: id,
      text: "查詢",
      color: "success",
    });
  },

  // 快捷方法 - 清除按鈕
  clear: function (id = "btnClear") {
    return this.create({
      id: id,
      text: "清除",
      color: "gray",
    });
  },

  // 快捷方法 - 匯出按鈕
  export: function (id = "btnExport") {
    return this.create({
      id: id,
      text: "資料匯出",
      color: "info",
    });
  },

  // 快捷方法 - 新增按鈕
  add: function (id = "btnAdd", text = "新增") {
    return this.create({
      id: id,
      text: text,
      color: "primary",
    });
  },

  // 快捷方法 - 編輯按鈕
  edit: function (id = "btnEdit", text = "修改", disabled = true) {
    return this.create({
      id: id,
      text: text,
      color: "warning",
      disabled: disabled,
    });
  },

  // 快捷方法 - 檢視按鈕
  view: function (id = "btnView", text = "檢視", disabled = true) {
    return this.create({
      id: id,
      text: text,
      color: "info",
      disabled: disabled,
    });
  },

  // 快捷方法 - 刪除按鈕
  delete: function (id = "btnDelete", text = "刪除", disabled = true) {
    return this.create({
      id: id,
      text: text,
      color: "danger",
      disabled: disabled,
    });
  },
};

// 註冊到 window
if (typeof window !== "undefined") {
  window.ButtonComponent = ButtonComponent;
}
