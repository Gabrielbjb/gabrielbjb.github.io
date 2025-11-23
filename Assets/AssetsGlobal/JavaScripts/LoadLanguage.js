let dataLanguage = {};
let userLang;
const params = new URLSearchParams(window.location.search);
const language = params.get('language');
if (language) {
    userLang = language.toString();
}else if (localStorage.getItem('preferredLanguage')) {
    userLang = localStorage.getItem('preferredLanguage').toString();
}
else {
    userLang = "0";
}

function LanguageApply(dataLanguage){
  let keyLang = Object.keys(dataLanguage[userLang]);
  keyLang.forEach(i => {
    let element = document.getElementById(i);
    if (element) element.innerHTML = dataLanguage[userLang][i];
  }); 
}


function CallLanguage(ListOfURL){
    console.log('List of URL language: ' + ListOfURL);
    let listOfFetch = [];
    for (let i = 0; i < ListOfURL.length; i++) {
        let fetchPromise = fetch(ListOfURL[i])
            .then(response => {
                if (!response.ok) throw new Error('Something is wrong or file could not be found');
                return response.json();
            });

        listOfFetch.push(fetchPromise);
    }
    Promise.all(listOfFetch)
        .then(([PageLang, lang]) => {
            dataLanguage = {
                '0': {...PageLang['0'], ...lang['0']},
                '1': {...PageLang['1'], ...lang['1']}
            };
            console.log(dataLanguage);
            LanguageApply(dataLanguage);
            try{
                StartProject(userLang); 
            }catch(e){}
            })
            .catch(error => {
                console.error('Terjadi kesalahan saat fetch Language files:', error);
        });
}
