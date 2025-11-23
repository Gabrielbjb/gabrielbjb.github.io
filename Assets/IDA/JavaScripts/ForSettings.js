let ThemeMode = 0;
let WindowsMode = 10;
let LanguageIndex = 0;
function ImplementSettingsOption(LanguageIndex) {
    if (LanguageIndex === '0') {
        document.getElementById('titleWindow').textContent = "Pengaturan";
        document.getElementById('descriptionWindow').textContent = "Selamat datang di Pengaturan, untuk mengubah tampilan bahasa, tema, dan mode Windows, silakan pilih opsi yang diinginkan di bawah.";
        document.getElementById('Terapkan').textContent = "Terapkan";
        document.getElementById('Light').textContent = "Terang";
        document.getElementById('Dark').textContent = "Gelap";
    } else if (LanguageIndex === '1') {
        document.getElementById('titleWindow').textContent = "Settings";
        document.getElementById('descriptionWindow').textContent = "Welcome to Settings, to change the language, theme, and Windows mode, please select your desired options below.";
        document.getElementById('Terapkan').textContent = "Apply";
        document.getElementById('Light').textContent = "Light";
        document.getElementById('Dark').textContent = "Dark";
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
              <select id="WindowsMode">
                <option value="10">Windows 10</option>
                <option value="11">Windows 11</option>
              </select>
              <select id="ThemeMode">
                <option id="Light" value="0">Light</option>
                <option id="Dark" value="1">Dark</option>
              </select>
              <button class="ButtonApply" id="Terapkan" type="button"></button>
    `;

    document.body.insertBefore(createWindow(TemplateTitle, TemplateContent), document.body.children[1]);
    ImplementSettingsOption(LanguageIndex.toString());

    document.getElementById('language').value = LanguageIndex;
    document.getElementById('WindowsMode').value = WindowsMode;
    document.getElementById('ThemeMode').value = ThemeMode;

    const LanguageOption = document.getElementById('language');
    LanguageOption.addEventListener('change', function () {
        LanguageIndex = parseInt(LanguageOption.value);
        ImplementSettingsOption(LanguageOption.value);
    });
    setTimeout(() => {document.querySelector('.messageButtom-Window').classList.remove('gone');}, 100);

    const TerapkanButton = document.getElementById('Terapkan');
    TerapkanButton.addEventListener('click', function (e) {
        if (e.target.closest('.ButtonApply')) {
            userLang = document.getElementById('language').value;
            if (localStorage.getItem('cookieConsent') == 'accepted') {
                localStorage.setItem('preferredLanguage', document.getElementById('language').value);
                localStorage.setItem('WindowsMode', document.getElementById('WindowsMode').value);
                localStorage.setItem('ThemeMode', document.getElementById('ThemeMode').value);
            }
            else {
                console.log('Your preferences wont be saved because cookies are not accepted.');
            }
            LanguageApply(dataLanguage);

            const langEnDiv = document.getElementById('lang-en');
            const langIdDiv = document.getElementById('lang-id');
            if (langEnDiv && langIdDiv) {
                if (LanguageIndex === 0) {
                    langIdDiv.style.display = 'block';
                    langEnDiv.style.display = 'none';
                } else if (LanguageIndex === 1) {
                    langIdDiv.style.display = 'none';
                    langEnDiv.style.display = 'block';
                }
            }
            const WindowsOption = document.getElementById('WindowsMode');
            const ThemeOption = document.getElementById('ThemeMode');
            WindowsMode = parseInt(WindowsOption.value);
            ThemeMode = parseInt(ThemeOption.value);
            ThemeApply();
            document.querySelector('.messageButtom-Window').classList.add('gone');
            setTimeout(() => {
                document.querySelector('.messageButtom-Background').remove();
            }, 1000);
        }
    });
}
async function DetectWindows10() {
    if (navigator.userAgentData === undefined) {
        return 11;
    }
    const ua = await navigator.userAgentData.getHighEntropyValues(["platformVersion"]);
    if (ua.platform === "Windows") {
        const majorVersion = parseInt(ua.platformVersion.split('.')[0]);
        return majorVersion >= 13 ? 11 : 10;
    }
    return 11;
}

function ThemeApply() {
    const StoreLogo = document.querySelector('.store-badge');
    const rightwindow = document.querySelector('.right-fixed');
    const ferrylogo = document.querySelector('.ferrylogo');

    const isDark = ThemeMode === 1;
    const theme = isDark ? 'dark' : 'light';
    const lang = ['ID', 'EN'][LanguageIndex] || 'EN';

    let contentDOM = [document.body];

    if (!StoreLogo || !rightwindow || !ferrylogo) {
        // None
    } else { 
        StoreLogo.src = `/Assets/IDA/Images/download${isDark ? 'Dark' : 'Light'}${lang}.svg`;
        ferrylogo.src = `/Assets/IDA/Images/Icons/${WindowsMode}/ferryIcon.svg`;
        if (Object.keys(dataGlobal).length != 0) {
            changeImage(LanguageIndex, WindowsMode, ThemeMode, (lastSectionId === null) ? 'HomePage' : lastSectionId);
        }
        contentDOM.push(rightwindow);
    }
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDark ? '#272727' : '#0099ff');
    }
    
    contentDOM.forEach(el => {
        el.classList.toggle('dark-mode', isDark);
        el.classList.toggle('light-mode', !isDark);
    });
}


document.addEventListener('DOMContentLoaded', async function () {
    if (localStorage.getItem('cookieConsent') == 'accepted') {
        LanguageIndex = parseInt(localStorage.getItem('preferredLanguage')) || 0;
        ThemeMode = parseInt(localStorage.getItem('ThemeMode')) || 0;
        if (!localStorage.getItem('WindowsMode')) {
            WindowsMode = await DetectWindows10();
            localStorage.setItem('WindowsMode', WindowsMode);
        } else {
            WindowsMode = parseInt(localStorage.getItem('WindowsMode'));
        }
    } else {
        WindowsMode = await DetectWindows10();
    }
    document.getElementById('SettingsNav').addEventListener('click', function () {
        WindowForSettings();
    });
    ThemeApply();       
});
