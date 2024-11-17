document.addEventListener('DOMContentLoaded', function() {
    const word = document.URL.split('?word=')[1];
    fetch("words.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < data['words'].length; i++) {
            if (data['words'][i]['word'] == word.replaceAll('%20', ' ')) {
                loadWord(data['words'][i]);
                
            }
        }
    });
});

function loadWord(word) {
    document.querySelector('.word-name-text').innerText = word['word']; 
    for (let e = 0; e < word['tags'].length; e++) {
        document.querySelector('.word-tags').innerHTML += `<span class="tag tag-${word['tags'][e]}">${word['tags'][e].toUpperCase()}</span>`;
    }
    for (let i = 0; i < word['meanings'].length; i++) {
        let meaning = word['meanings'][i];
        let meaningHTML = `<li class="word-meaning">
                            <i class="word-meaning-type">${meaning['type']}</i>
                            <div class="word-meaning-definition">${meaning['definition']}</div>
                            <div class="word-meaning-example">Example: ${meaning['example']}</div>
                            </li>`;
        document.querySelector('.word-meanings-list').innerHTML += meaningHTML;
    }
    document.querySelector('.word-synonyms').innerText = "Synonyms: " + word['synonyms'].join(', ');

}