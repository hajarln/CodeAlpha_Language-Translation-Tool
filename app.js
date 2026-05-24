const countries = {
    "ar-SA": "Arabe",
    "en-GB": "Anglais",
    "es-ES": "Espagnol",
    "fr-FR": "Français",
    "de-DE": "Allemand",
    "hi-IN": "Hindi (Inde)",
    "it-IT": "Italien",
    "ja-JP": "Japonais",
    "zh-CN": "Chinois (Simplifié)",
    "ru-RU": "Russe",
    "pt-PT": "Portugais",
    "tr-TR": "Turc"
};

const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const exchangeIcon = document.querySelector(".exchange");
const translateBtn = document.querySelector("#translate-btn");
const icons = document.querySelectorAll(".icons button");

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? (country_code == "en-GB" ? "selected" : "") : (country_code == "fr-FR" ? "selected" : "");
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

async function translateData() {
    let text = fromText.value.trim();
    let translateFrom = selectTag[0].value.split("-")[0];
    let translateTo = selectTag[1].value.split("-")[0];
    
    if (!text) {
        toText.value = "";
        return;
    }

    toText.placeholder = "AI analysis and translation in progress...";

    try {
        let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.responseData) {
            toText.value = data.responseData.translatedText;
        } else {
            toText.value = "Erreur lors de la récupération de la traduction.";
        }
    } catch (error) {
        console.error("Erreur de connexion à l'API :", error);
        toText.value = "Impossible de contacter le serveur de traduction.";
    }
}

translateBtn.addEventListener("click", translateData);

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;

    let icon = exchangeIcon.querySelector("i");
    if (!icon.style.transform || icon.style.transform === "rotate(0deg)") {
        icon.style.transform = "rotate(180deg)";
    } else {
        icon.style.transform = "rotate(0deg)";
    }
    icon.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        let buttonElement = target.tagName === "I" ? target.parentElement : target;

        if (buttonElement.id === "copy-to") {
            if (toText.value) {
                navigator.clipboard.writeText(toText.value);
                buttonElement.style.color = "#e91e63"; 
                buttonElement.style.backgroundColor = "#fdf2f8";
                buttonElement.style.borderColor = "#fbcfe8";
                setTimeout(() => {
                    buttonElement.style.color = "";
                    buttonElement.style.backgroundColor = "";
                    buttonElement.style.borderColor = "";
                }, 1500);
            }
        } 
        else {
            let utterance;
            let textToSpeak = "";
            let langCode = "";

            if (buttonElement.id === "speak-from" && fromText.value) {
                textToSpeak = fromText.value;
                langCode = selectTag[0].value; 
            } else if (buttonElement.id === "speak-to" && toText.value) {
                textToSpeak = toText.value;
                langCode = selectTag[1].value;
            }
            
            if (textToSpeak) {
                utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = langCode;

                let voices = window.speechSynthesis.getVoices();
                if (voices.length > 0) {
                    let matchingVoice = voices.find(voice => 
                        voice.lang.startsWith(langCode.split("-")[0]) || voice.lang === langCode
                    );
                    if (matchingVoice) {
                        utterance.voice = matchingVoice;
                    }
                }

                window.speechSynthesis.cancel(); 
                window.speechSynthesis.speak(utterance);
            }
        }
    });
});