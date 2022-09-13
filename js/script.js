
let inputWord = document.getElementById('input-add-word');
let inputTip = document.getElementById('input-add-tip');
let submitButton = document.getElementById('userSubmit');

userWords = [


]


submitButton.onclick = function() {

    userWords.push(
        {
        word: inputWord.value,
        tip: inputTip.value
    }
    
    )
    console.log(userWords);

}

// salvar dados
localStorage.setItem('word', JSON.stringify(userWords));

const userWordParsed = JSON.parse(localStorage.getItem('word'))
