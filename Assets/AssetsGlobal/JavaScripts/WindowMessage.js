// Template Message Window
function createWindow(TemplateTitle, TemplateContent) {
  let WindowContent = document.createElement('div');
  WindowContent.className = 'messageButtom-Background';
  WindowContent.innerHTML = `
  <div class="messageButtom-Window gone">
    ${TemplateTitle}
    <div style="gap: 20px;display: flex;margin-top: 15px;">
      ${TemplateContent}
    </div>
  </div>
  `;
  return WindowContent;
}