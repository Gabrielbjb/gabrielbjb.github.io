function ImplementLanguageOption(LanguageIndex) {
    if (LanguageIndex === '0') {
        document.getElementById('titleWindow').textContent = "Simpan Kue Disini?";
        document.getElementById('descriptionWindow').textContent = "Halo! Kami memahami bahwa privasi Anda sangat penting. Karena itu, kami berkomitmen untuk bersikap se-transparan mungkin. Website ini menggunakan cookie untuk menyimpan preferensi Anda—seperti pilihan bahasa dan pengaturan tampilan langsung di browser Anda. Tenang saja, data ini bersifat lokal dan tidak dapat diakses oleh pengembang atau pihak lain.";
        document.getElementById('accept').textContent = "Terima";
        document.getElementById('reject').textContent = "Tolak";
    } else if (LanguageIndex === '1') {
        document.getElementById('titleWindow').textContent = "Save Cookies Here?";
        document.getElementById('descriptionWindow').textContent = "Hello! We understand that your privacy is very important. Therefore, we are committed to being as transparent as possible. This website uses cookies to store your preferences—such as language choices and display settings—directly in your browser. Rest assured, this data is local and cannot be accessed by developers or third parties.";
        document.getElementById('accept').textContent = "Accept";
        document.getElementById('reject').textContent = "Reject";
    }
}
function WindowForCookie() {
    const TemplateTitle = `
        <div>
            <img src="/Assets/AssetsIcon/cookie.svg" style=" width: 50px;">
            <h1 id="titleWindow" style="padding: 0%;"></h1>
        </div>
        <p id="descriptionWindow"></p>`;
    const TemplateContent = `
            <button class="buttonCookie" id="accept" type="button"></button>
            <button class="buttonCookie" id="reject" type="button"></button>
            <select id="language">
            <option value="0">Indonesia</option>
            <option value="1">English</option>
            </select>
    `;

    document.body.insertBefore(createWindow(TemplateTitle, TemplateContent), document.body.children[1]);
    ImplementLanguageOption('0');
    const LanguageOption = document.getElementById('language');
    LanguageOption.addEventListener('change', function () {
        ImplementLanguageOption(LanguageOption.value);
    });
    
    setTimeout(() => {document.querySelector('.messageButtom-Window').classList.remove('gone');}, 100);
    document.addEventListener('click', function (e) {
        if (e.target.closest('.buttonCookie')) {
            if (e.target.id === 'accept') {
                localStorage.setItem('cookieConsent', 'accepted');
                localStorage.setItem('preferredLanguage', document.getElementById('language').value);
            } else if (e.target.id === 'reject') {
                console.log('Cookies rejected by user.');
            } else {
                location.reload();
                return;
            }
            document.querySelector('.messageButtom-Window').classList.add('gone');
            setTimeout(() => {
                document.querySelector('.messageButtom-Background').remove();
            }, 1000);
            console.log('Cookie consent window closed.');
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('cookieConsent') == 'rejected' || localStorage.getItem('cookieConsent') == null) {
        WindowForCookie();
    }
});