let dataGlobal = [];
function StartProject(language) {
    document.querySelectorAll('.slide').forEach(function(pilihan) {
        pilihan.remove();
    });
    const mainContainer = document.querySelector('.slider-container');
    let combinedHTML = '';
    for (let i = 0; i < dataGlobal.length; i++) {

        let LanguageorAppList = '';
        for (let j = 0; j < dataGlobal[i].SoftwareUses.length; j++) {
            LanguageorAppList += `<img style="margin: 4px; width: 25px; " src="/Assets/AssetsIcon/${dataGlobal[i].SoftwareUses[j]}.svg" alt="${dataGlobal[i].SoftwareUses[j]}">`;
        }


        let HtmlButtonResult = '';

        if (dataGlobal[i].URLTry !== null) {
            let TryTextHTML = '';
            let TryIconHTML = '';
            if (dataGlobal[i][language].TryText != null) {
                TryTextHTML = dataGlobal[i][language].TryText;
            } else if (language === "1") {
                TryTextHTML = 'Try Now';
            } else if (language === "0") {
                TryTextHTML = 'Coba Sekarang';
            }
            if (dataGlobal[i].iconTry != null) {
                TryIconHTML = dataGlobal[i].iconTry;
            } else {
                TryIconHTML = '/Assets/AssetsIcon/net.svg';
            }
            HtmlButtonResult += `
                    <a href="${dataGlobal[i].URLTry}" class="buttonLink" target="_blank">
                        <img style="margin: 4px; width: 25px;" src="/Assets/AssetsIcon/${TryIconHTML}" alt="try">
                        <p style="font-size: 12px; margin: 0px; font-weight: bold;">${TryTextHTML}</p>
                    </a>`;
        }
        if (dataGlobal[i].URLSourceCode != null) {
            let SourceTextHTML = '';
            let SourceIconHTML = '';
            if (dataGlobal[i][language].SourceText != null) {
                SourceTextHTML = dataGlobal[i][language].SourceText;
            } else if (language === "1") {
                SourceTextHTML = 'Source Code';
            } else if (language === "0") {
                SourceTextHTML = 'Kode Sumber';
            }
            if (dataGlobal[i].iconSourceCode != null) {
                SourceIconHTML = dataGlobal[i].iconSourceCode;
            } else {
                SourceIconHTML = '/Assets/AssetsIcon/github.svg';
            }
            HtmlButtonResult += `
                    <a href="${dataGlobal[i].URLSourceCode}" class="buttonLink" target="_blank">
                        <img style="margin: 4px; width: 25px;" src="${SourceIconHTML}" alt="net">
                        <p style="font-size: 12px; margin: 0px; font-weight: bold;">${SourceTextHTML}</p>
                    </a>`;
        }
        if (dataGlobal[i].URLMoreDetails != null) {
            let MoreDetailsTextHTML = '';
            if (dataGlobal[i].MoreDetailsText != null) {
                MoreDetailsTextHTML = dataGlobal[i][language].MoreDetailsText;
            } else if (language === "1") {
                MoreDetailsTextHTML = 'More Details';
            } else if (language === "0") {
                MoreDetailsTextHTML = 'Detail Lebih Lanjut';
            }
            HtmlButtonResult += `
                    <a href="${dataGlobal[i].URLMoreDetails}" class="buttonLink" target="_blank">
                        <img style="margin: 4px; width: 25px;" src="/Assets/AssetsIcon/moreInfo.svg" alt="net">
                        <p style="font-size: 12px; margin: 0px; font-weight: bold;">${MoreDetailsTextHTML}</p>
                    </a>`;
        }

        // for platform icons
        let PlatformList = '';
        if (dataGlobal[i].Platforms.length > 0) {

            for (let k = 0; k < dataGlobal[i].Platforms.length; k++) {
                PlatformList += `<img style="margin: 4px; width: 25px;" src="/Assets/AssetsIcon/${dataGlobal[i].Platforms[k]}.svg" alt="${dataGlobal[i].Platforms[k]}">`;
            }
        }

        let SoftwareUsesTextHTML = '';
        if (dataGlobal[i].SoftwareUses.length > 0) {
            if (dataGlobal[i][language].SoftwareUsesText != null) {
                SoftwareUsesTextHTML = dataGlobal[i][language].SoftwareUsesText;
            } else {
                if (language === "1") {
                    SoftwareUsesTextHTML = 'Languages';
                } else if (language === "0") {
                    SoftwareUsesTextHTML = 'Bahasa';
                }
            }
        }

        let PlatformTextHTML = '';
        if (dataGlobal[i].Platforms.length > 0) {
            if (dataGlobal[i][language].PlatformsText != null) {
                PlatformTextHTML = dataGlobal[i][language].PlatformsText;
            } else {
                if (language === "1") {
                    PlatformTextHTML = 'Platforms';
                } else if (language === "0") {
                    PlatformTextHTML = 'Platform';
                }
            }
        }
        let tileHTML = `
                    <div class="slide" href="https://gabrielbjb.my.id?language=1" style="text-decoration: none;">
                    <div>
                        <div class="box" style="background-image: url(/Assets/AssetsProject/${dataGlobal[i][language].ThumbnailImage});height: 200px;background-position: center;background-size: cover;border-top-left-radius: 10px;border-top-right-radius: 10px;"></div>
                    </div>
                    <div class="descriptionbox">
                        <div>
                          <p style="margin-bottom: 5px;" class="description">${dataGlobal[i][language].Description}</p>
                          <div style="display: flex; flex-wrap: wrap; justify-content: flex-start; gap: 40px;">

                            <table style="width: 100%; border-collapse: collapse;">
                              <tbody>
                                <tr>
                                  <th style="width: 50%; color: white; text-align: left;">${SoftwareUsesTextHTML}</th>
                                  <th style="width: 50%; color: white; text-align: left;">${PlatformTextHTML}</th>
                                </tr>
                                <tr>
                                  <td style="vertical-align: top;">
                                    <div style="display: flex; flex-wrap: wrap;">
                                      ${LanguageorAppList}
                                    </div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <div style="display: flex; flex-wrap: wrap;">
                                      ${PlatformList}
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div>
                            ${HtmlButtonResult}
                        </div>
                    </div>
                    </div>`;
        combinedHTML += tileHTML;
    }
    mainContainer.innerHTML += combinedHTML;
}

fetch('/Assets/AssetsHomePage/JSON/ProjectList.json').then(response => {
        if (!response.ok) {
            throw new Error('Jaringan bermasalah atau file tidak ditemukan');
        }
        return response.json();
    }).then(data => {
        dataGlobal = data;
        StartProject(LanguageIndex);
    }).catch(error => {
        console.error('Terjadi kesalahan saat fetch:', error);
    });