// ===============================
// TRANSLATE FUNCTION
// ===============================

async function translateText() {

    const inputText = document
        .getElementById("inputText")
        .value
        .trim();

    const sourceLanguage = document
        .getElementById("sourceLanguage")
        .value;

    const targetLanguage = document
        .getElementById("targetLanguage")
        .value;

    const outputText = document
        .getElementById("outputText");


    // Empty input check
    if (inputText === "") {
        alert("Please enter some text!");
        return;
    }


    // Same language
    if (sourceLanguage === targetLanguage) {
        outputText.value = inputText;
        return;
    }


    outputText.value = "Translating...";


    try {

        const url =
            "https://translate.googleapis.com/translate_a/single" +
            "?client=gtx" +
            "&sl=" + encodeURIComponent(sourceLanguage) +
            "&tl=" + encodeURIComponent(targetLanguage) +
            "&dt=t" +
            "&q=" + encodeURIComponent(inputText);


        const response = await fetch(url);


        if (!response.ok) {
            throw new Error("Translation request failed");
        }


        const data = await response.json();


        let translatedText = "";


        // Google response-ல இருந்து full translation எடுக்கிறது
        if (data && data[0]) {

            data[0].forEach(function (item) {

                if (item && item[0]) {
                    translatedText += item[0];
                }

            });

        }


        if (translatedText.trim() !== "") {

            outputText.value = translatedText;

        } else {

            outputText.value = "Translation failed!";

        }


    } catch (error) {

        console.error("Translation Error:", error);

        outputText.value =
            "Translation failed! Check your internet connection.";

    }

}


// ===============================
// SWAP FUNCTION
// ===============================

function swapLanguages() {

    const sourceLanguage =
        document.getElementById("sourceLanguage");

    const targetLanguage =
        document.getElementById("targetLanguage");

    const inputText =
        document.getElementById("inputText");

    const outputText =
        document.getElementById("outputText");


    // Swap languages
    const tempLanguage = sourceLanguage.value;

    sourceLanguage.value =
        targetLanguage.value;

    targetLanguage.value =
        tempLanguage;


    // Swap text
    const tempText =
        inputText.value;

    inputText.value =
        outputText.value;

    outputText.value =
        tempText;

}


// ===============================
// CLEAR FUNCTION
// ===============================

function clearText() {

    document
        .getElementById("inputText")
        .value = "";

    document
        .getElementById("outputText")
        .value = "";

}


// ===============================
// COPY FUNCTION
// ===============================

async function copyText() {

    const text =
        document
            .getElementById("outputText")
            .value
            .trim();


    if (text === "") {

        alert("Nothing to copy!");
        return;

    }


    try {

        await navigator.clipboard.writeText(text);

        alert("Copied successfully!");

    } catch (error) {

        // Clipboard வேலை செய்யவில்லை என்றால் fallback
        const outputText =
            document.getElementById("outputText");

        outputText.select();

        document.execCommand("copy");

        alert("Copied successfully!");

    }

}


// ===============================
// SPEAK FUNCTION
// ===============================

function speakText() {

    const text =
        document
            .getElementById("outputText")
            .value
            .trim();


    const language =
        document
            .getElementById("targetLanguage")
            .value;


    if (text === "") {

        alert("முதலில் Translate செய்யவும்!");
        return;

    }


    // Previous speech stop
    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    // Language map
    const languageMap = {

        en: "en-US",
        ta: "ta-IN",
        hi: "hi-IN",
        fr: "fr-FR",
        es: "es-ES",
        de: "de-DE"

    };


    speech.lang =
        languageMap[language] || "en-US";


    speech.rate = 0.9;

    speech.pitch = 1;


    // Available voices
    const voices =
        window.speechSynthesis.getVoices();


    // Correct language voice find
    const selectedVoice =
        voices.find(function (voice) {

            return voice.lang
                .toLowerCase()
                .startsWith(language.toLowerCase());

        });


    if (selectedVoice) {

        speech.voice =
            selectedVoice;

    }


    window.speechSynthesis.speak(speech);

}


// ===============================
// LOAD VOICES
// ===============================

window.speechSynthesis.onvoiceschanged =
    function () {

        window.speechSynthesis.getVoices();

    };