let dataExperience;
fetch('/Assets/AssetsHomePage/JSON/ListofExperience.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Jaringan bermasalah atau file tidak ditemukan');
      }
      return response.json();
    })
    .then(data => {
      dataExperience = data;
    })
    .catch(error => {
      console.error('Terjadi kesalahan saat fetch:', error);
    });

document.addEventListener('click', function (e) {
    const buttons = document.querySelectorAll('.buttonSVG');
    if (!dataExperience) return;
    buttons.forEach(button => button.classList.remove('active'));
    document.getElementById('ListOfExperience').innerHTML = '';
    if (e.target.closest('.buttonSVG')) {
        e.target.closest('.buttonSVG').classList.add('active');
        const selectedTag = e.target.closest('.buttonSVG').querySelector('img').getAttribute('alt');
        dataExperience.forEach(Experience => {
            if (Experience["id"] === selectedTag) {
                let IndexOfExperience = 0;
                let ListOfExperienceHTML = "";
                Experience["experienceName"].forEach(element => {
                    let ConfidenceOfExperience = Number(Experience["confidence"][IndexOfExperience]) * 10;
                    ListOfExperienceHTML += `
                    <div style="margin: 0 auto; margin: 30px;"> 
                    <div> 
                        <p style="text-align: justify; margin: 0;">${element}</p>
                    </div> 
                    <div style=" display: flex; ">
                        <div style="width: 100%; background: rgba(255, 255, 255, 0.1); height: 20px; border-radius: 4px; overflow: hidden;"> 
                            <div class="ConfidenceShow" data-width="${ConfidenceOfExperience}" style="width: 0%; background-color: gold; height: 100%;"></div>
                        </div>
                        <p style="margin-bottom: 0px; margin-left: 10px;">${ConfidenceOfExperience}%</p>
                    </div>
                    </div>
                    `;
                    IndexOfExperience++;
                });
                document.getElementById('ListOfExperience').innerHTML = ListOfExperienceHTML;
                requestAnimationFrame(() => {
                            document.querySelectorAll('.ConfidenceShow').forEach(bar => {
                                const targetWidth = bar.getAttribute('data-width');
                                bar.style.width = targetWidth + '%';
                            });
                        });

                return;
            }
        });
    }   
});