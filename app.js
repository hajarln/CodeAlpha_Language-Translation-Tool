// ==========================================
// 1. DICTIONNAIRE DES LANGUES (Codes ISO)
// ==========================================
const countries = {
    "ar-SA": "Arabe",
    "en-GB": "Anglais",
    "es-ES": "Espagnol",
    "fr-FR": "Français",
    "de-DE": "Allemand",
    "it-IT": "Italien",
    "ja-JP": "Japonais",
    "zh-CN": "Chinois (Simplifié)",
    "ru-RU": "Russe",
    "pt-PT": "Portugais",
    "tr-TR": "Turc"
};

// ==========================================
// 2. SÉLECTION DES ÉLÉMENTS DE L'INTERFACE
// ==========================================
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const exchangeIcon = document.querySelector(".exchange");
const translateBtn = document.querySelector("#translate-btn");
const icons = document.querySelectorAll(".icons button");

// ==========================================
// 3. INJECTION DYNAMIQUE DES LANGUES
// ==========================================
selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        // Sélection par défaut : Anglais pour la source, Français pour la cible
        let selected = id == 0 ? (country_code == "en-GB" ? "selected" : "") : (country_code == "fr-FR" ? "selected" : "");
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// ==========================================
// 4. LOGIQUE DE TRADUCTION (Appel API)
// ==========================================
async function translateData() {
    let text = fromText.value.trim();
    // On extrait uniquement le code langue court (ex: "en" au lieu de "en-GB") requis par l'API
    let translateFrom = selectTag[0].value.split("-")[0];
    let translateTo = selectTag[1].value.split("-")[0];
    
    if (!text) {
        toText.value = "";
        return;
    }

    toText.placeholder = "Analyse et traduction IA en cours...";

    try {
        // Utilisation d'une API de traduction REST performante et gratuite pour le développement
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

// Événement sur le bouton "Traduire"
translateBtn.addEventListener("click", translateData);

// ==========================================
// 5. FONCTIONNALITÉ D'ÉCHANGE (Inverser)
// ==========================================
exchangeIcon.addEventListener("click", () => {
    // Échanger les textes
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    // Échanger les sélections de langues
    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

// ==========================================
// 6. OPTIONS BONUS : COPIE & SYNTHÈSE VOCALE
// ==========================================
icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        // Gestion de la Copie (si l'icône cliquée ou son parent est le bouton de copie)
        if (target.id === "copy-to" || target.parentElement.id === "copy-to") {
            if (toText.value) {
                navigator.clipboard.writeText(toText.value);
                
                // Petit effet visuel temporaire pour confirmer la copie
                let copyBtn = document.getElementById("copy-to");
                copyBtn.style.color = "#22c55e"; // Vert succès
                setTimeout(() => copyBtn.style.color = "#94a3b8", 1500);
            }
        } 
        // Gestion du Text-to-Speech (Synthèse Vocale)
        else {
            let utterance;
            // Si on clique sur le haut-parleur de gauche (source)
            if (target.id === "speak-from" || target.parentElement.id === "speak-from") {
                if (fromText.value) {
                    utterance = new SpeechSynthesisUtterance(fromText.value);
                    utterance.lang = selectTag[0].value;
                }
            } 
            // Si on clique sur le haut-parleur de droite (cible)
            else {
                if (toText.value) {
                    utterance = new SpeechSynthesisUtterance(toText.value);
                    utterance.lang = selectTag[1].value;
                }
            }
            
            if (utterance) {
                window.speechSynthesis.cancel(); // Stoppe une lecture en cours si elle existe
                window.speechSynthesis.speak(utterance);
            }
        }
    });
});