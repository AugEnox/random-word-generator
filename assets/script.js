let WordList;
let WordListLength;
let GenerationCounter = 0;
let isMultiWord = false;

function ImportWordList(callback) {
    fetch('assets/words_alpha.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            const wordList = text.trim().split('\n');
            WordList = wordList;
            WordListLength = WordList.length;
            callback();
        })
        .catch(error => {
            console.error('There was a problem fetching the word list:', error);
            WordList = [];
            WordListLength = 0;
            callback();
        });
}

ImportWordList(function () {
    console.log("WordList:", WordList);
    console.log("WordListLength:", WordListLength);
});

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetRandomWord(amount = 1) {
    var result = "";

    for (let i = 0; i < amount; i++) {
        var randomIndex = getRandomInteger(0, WordListLength);
        result += WordList[randomIndex] + " </br>";
        GenerationCounter++;
    }
    return result;
}

function ValidateWordAmountText() {
    var wordAmountTextValue = document.getElementById('wordAmountText').value;
    var wordAmountValue = parseInt(wordAmountTextValue);

    if (isNaN(wordAmountValue)) {
        SendInvalidAlert('Only use whole numbers')
        return 0;
    }

    if (wordAmountValue > 10000) {
        SendInvalidAlert("Please use a smaller number! Preferrably 10,000 or below.");
        return 0;
    }

    var invalidAlert = document.getElementById('invalidAmountAlert');
    invalidAlert.style.display = "none";
    return wordAmountValue;
}

function DisplayRandomWord() {
    var displayContainer = document.getElementById('randomResult');

    var RandomWord;
    var wordAmount = 1;

    if (isMultiWord) {
        var validation = ValidateWordAmountText();
        if (validation < 1) {
            SendInvalidAlert("Please input a number");
            return;
        }
        
        var invalidAlert = document.getElementById('invalidAmountAlert');
        invalidAlert.classList.remove('is-invalid');
        wordAmount = validation;
    }

    RandomWord = GetRandomWord(wordAmount);

    ResetContainers();

    displayContainer.className = 'shadow-none p-4 my-2 bg-body-tertiary rounded text-wrap';
    displayContainer.innerHTML += '<h3 class="text-center">' + RandomWord + '</h3>';

    var counterContainer = document.getElementById('resultCounter');
    counterContainer.innerHTML += '<p>Words Generated: ' + GenerationCounter + '</p>';
}

function SendInvalidAlert(message = "") {
    var invalidAlert = document.getElementById('invalidAmountAlert');
    invalidAlert.classList.add('is-invalid');
    invalidAlert.style.display = "block";
    invalidAlert.innerText = "Invalid amount! " + message;
}

function ResetContainers() {
    var displayContainer = document.getElementById('randomResult');
    displayContainer.className = '';
    displayContainer.innerHTML = '';

    var counterContainer = document.getElementById('resultCounter');
    counterContainer.innerHTML = '';
}

function OnMultiWordCheck() {
    var checkbox = document.getElementById('multiWordCheckbox');
    var multiWordForm = document.getElementById('wordAmountForm');
    if (checkbox.checked) {
        multiWordForm.style.display = 'block';
        isMultiWord = true;
        return;
    };
    multiWordForm.style.display = 'none';
    isMultiWord = false;
}

document.getElementById('generateRandomWord').addEventListener('click', DisplayRandomWord);
document.getElementById('hideResults').addEventListener('click', ResetContainers);
document.getElementById('multiWordCheckbox').addEventListener('change', OnMultiWordCheck);
document.getElementById('wordAmountText').addEventListener('input', ValidateWordAmountText);