export const findEdiableKey = (tableConfig: any) => {
  const res = tableConfig?.tableList.filter((item: any) => {
    return item.editable ? item : false;
  });
  const keys = {};
  res.forEach((item: any) => {
    keys[item.prop] = "";
  });
  return keys;
};
// 定义手动选中复制文本
export async function copyText(str: string) {
  try {
    await navigator.clipboard.writeText(str);
  } catch (e) {
    var textarea = document.createElement("textarea");
    // 隐藏此输入框
    textarea.style.position = "fixed";
    textarea.style.zIndex = "-10000";
    textarea.style.top = "10px";
    textarea.value = str;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("Copy", true);
    document.body.removeChild(textarea);
  }
}

// 选中复制文本
export function selectAndCopy() {
  document.addEventListener("mouseup", async function () {
    var selectedText = (window as any).getSelection().toString();
    console.log(selectedText);
  });
}
