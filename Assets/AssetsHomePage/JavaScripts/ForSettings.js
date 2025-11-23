let LanguageIndex = 1;
function ImplementSettingsOption(LanguageIndex) {
    if (LanguageIndex === '0') {
        document.getElementById('titleWindow').textContent = "Pengaturan";
        document.getElementById('descriptionWindow').textContent = "Selamat datang di Pengaturan, untuk mengubah tampilan bahasa silakan pilih opsi yang diinginkan di bawah.";
        document.getElementById('Terapkan').textContent = "Terapkan";
    } else if (LanguageIndex === '1') {
        document.getElementById('titleWindow').textContent = "Settings";
        document.getElementById('descriptionWindow').textContent = "Welcome to Settings, to change the language please select your desired options below.";
        document.getElementById('Terapkan').textContent = "Apply";
    }
}
function WindowForSettings() {
    const TemplateTitle = `
        <div>
            <img src="/Assets/AssetsIcon/setting.svg" style=" width: 50px;">
            <h1 id="titleWindow" style="padding: 0%;"></h1>
        </div>
        <p id="descriptionWindow"></p>`;
    const TemplateContent = `
              <select id="language">
                <option value="0">Indonesia</option>
                <option value="1">English</option>
              </select>
              <button class="ButtonApply" id="Terapkan" type="button"></button>
    `;

    document.body.insertBefore(createWindow(TemplateTitle, TemplateContent), document.body.children[1]);
    ImplementSettingsOption(LanguageIndex.toString());

    document.getElementById('language').value = LanguageIndex;

    const LanguageOption = document.getElementById('language');
    LanguageOption.addEventListener('change', function () {
        LanguageIndex = parseInt(LanguageOption.value);
        ImplementSettingsOption(LanguageOption.value);
        console.log('Language option changed to: ' + LanguageOption.value);
    });
    setTimeout(() => {document.querySelector('.messageButtom-Window').classList.remove('gone');}, 100);

    const TerapkanButton = document.getElementById('Terapkan');
    TerapkanButton.addEventListener('click', function (e) {
        if (e.target.closest('.ButtonApply')) {
            userLang = document.getElementById('language').value;
            if (localStorage.getItem('cookieConsent') == 'accepted') {
                localStorage.setItem('preferredLanguage', userLang);
            }
            else {
                console.log('Your preferences wont be saved because cookies are not accepted.');
            }
            LanguageApply(dataLanguage);
            console.log('Language changed to: ' + userLang);
            if (window.location.pathname === "/" || window.location.pathname === "/Projects/") StartProject(userLang);         
            document.querySelector('.messageButtom-Window').classList.add('gone');
            setTimeout(() => {
                document.querySelector('.messageButtom-Background').remove();
            }, 1000);
        }
    });
}


document.addEventListener('DOMContentLoaded', async function () {
    LanguageIndex = parseInt(localStorage.getItem('preferredLanguage')) || 0;
    document.getElementById('SettingsNav').addEventListener('click', function () {
        WindowForSettings();
    });  
});
