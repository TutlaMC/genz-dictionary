function loadWords() {
    fetch("words.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < data['words'].length; i++) {
            loadWord(data['words'][i]);
        }
    });
}

function loadWord(word){
    let wordName = word['word'];
    let tags = word['tags'];
    let synonyms = [];

    if ('synonyms' in word) {
        synonyms = word['synonyms'];
    }
    let tagHTML = ""
    for (let i = 0; i < tags.length; i++) {
        tagHTML += `<span class="tag tag-${tags[i]}">${tags[i].toUpperCase()}</span>`;
    }

    let toAdd = `<div class="word" id="${wordName}">
                <p class="word-name"><a href="word.html?word=${wordName}">${wordName}</a></p>
                <span class="word-tags">${tagHTML}</span>
            </div>`

    document.querySelector('.result-container').innerHTML += toAdd;


}

document.getElementById('searchbar').addEventListener('input', function(event) {
    for (let i = 0; i < document.getElementsByClassName('word').length; i++) {
        if (document.getElementsByClassName('word')[i].id.includes(event.target.value)) {
            document.getElementsByClassName('word')[i].style.display = 'flex';
        } else {
            document.getElementsByClassName('word')[i].style.display = 'none';
        }
    }
    if (event.target.value == "") {
        for (let i = 0; i < document.getElementsByClassName('word').length; i++) {
            document.getElementsByClassName('word')[i].style.display = 'flex';
        }
    }
});



loadWords();
