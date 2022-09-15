let gameActive = true;
let attempts = 6;
let dynamicList = []; //Lista dinâmica para comparação
let dynamicWrongLettersList = []; //Lista dinâmica com as letras erradas
let secretWord; //Palavra escolhida
let secretWordTip; //Dica da palavra escolhida
let splittedSecretWord; //Palvra escolhida divida em letras
let renderAstronaut = document.getElementById('astronaut-game');
const getWordsList = JSON.parse(localStorage.getItem('wordsList'));


function checkIfCached() {

    if (localStorage.wordsList == null) {

        words = words

    } else {

        words = getWordsList;

    }

}

function checkActiveWords() {

    let activeWords = words.filter(function (name) { return name.isActive == true; })
    words = activeWords;
    return words;

}



let words = [ //Array com os objetos constando a palavra (word) e Dica (tip)

    {

        word: 'astronauta',
        tip: 'Já foi para o espaço!',
        isActive: true,

    },

    {

        word: 'caderno',
        tip: 'Sempre vem vazio!',
        isActive: true,

    },

    {

        word: 'celular',
        tip: 'Se usa com as mãos ou com os olhos?',
        isActive: true,

    }


]

checkActiveWords()

checkIfCached();


function chooseRandomWord() { //Escolhe um objeto aleatório do array words.

    const indexWord = parseInt(Math.random() * words.length) //sorteia
    secretWord = words[indexWord].word; //define o item word do objeto sorteado
    secretWordTip = words[indexWord].tip; //define o item tip do objeto sorteado
    splittedSecretWord = secretWord.split(''); //Splita a palavra sorteada e transforma em uma array

}




chooseRandomWord(); //Chama função para sortear palavra [REMOVER]

function renderChoosedWord() { //Renderiza na tela a palavra sorteada e a dica.


    for (let i = 0; i < splittedSecretWord.length; i++) { //Loop para preencher os boxes com cada palavra.

        const renderWord = document.getElementById(`${(i + 1)}`); //Puxa o ID de cada div e incrementa
        renderWord.innerHTML = '&nbsp;'; //Renderiza no ID puxado acima a letra da palavra.

    }

    const renderTip = document.getElementById('render-tip'); //Puxa o ID da Dica.
    renderTip.innerHTML = "Dica: " + secretWordTip //Renderiza no ID da Dica.


}

renderChoosedWord();


function changeButton(key, result) {

    document.getElementById(key).classList.add(result);

    function buttonLocker() {

        let lockKeyboard = document.getElementById(key);
        let waitAnimation = setTimeout(toggleLocked, 1000);
        lockKeyboard.innerHTML = '<div class="loading-spinner disabled"></div>';
        document.getElementById('keyboard-boxes').classList.toggle('locked');

        function toggleLocked() {

            lockKeyboard.innerHTML = key;
            document.getElementById('keyboard-boxes').classList.toggle('locked');

        };

    }

    buttonLocker();

}



function checkIfKeyMatches(key) {

    let keyy = key.toLowerCase();

    if (gameActive) {

        if (splittedSecretWord.includes(keyy)) {

            for (i = 0; i < secretWord.length; i++) {

                if (splittedSecretWord[i] == keyy) {

                    dynamicList[i] = keyy;
                    renderWord = document.getElementById(`${(i + 1)}`); //Puxa o ID de cada div e incrementa
                    renderWord.innerHTML = splittedSecretWord[i]; //Renderiza no ID puxado acima a letra da palavra.



                }

            }



            changeButton(keyy, 'successKey');

        } else if (gameActive == true & dynamicWrongLettersList.includes(keyy) == false) {
            attempts--;
            switch (attempts) {
                case 6:
                    renderAstronaut.style.backgroundImage = "url('./img/astronaut_0.svg')";
                    break;
                case 5:
                    renderAstronaut.style.backgroundImage = "url('./img/astronaut_1.svg')";
                    break;
                case 4:
                    renderAstronaut.style.backgroundImage = "url('./img/astronaut_2.svg')";
                    break;
                case 3:
                    renderAstronaut.style.backgroundImage = "url('./img/astronaut_3.svg')";
                    break;
                case 2:
                    renderAstronaut.style.backgroundImage = "url('./img/astronaut_4.svg')";
                    break;
                case 1:
                    renderAstronaut.style.backgroundImage = "url('./img/astronaut_5.svg')";
                    break;
                case 0:
                    renderAstronaut.style.backgroundImage = "url('./img/astronaut_6.svg')";
                    renderAstronaut.classList.remove('float');
                    renderAstronaut.classList.toggle('falling');
                    break;




            }
            dynamicWrongLettersList.push(keyy);
            const renderWrongLetters = document.getElementById('wrong-letters'); //Puxa o ID de cada div e incrementa
            renderWrongLetters.innerHTML = dynamicWrongLettersList; //Renderiza no ID puxado acima a letra da palavra.
            changeButton(keyy, 'wrongKey');

        }

        switch (checkGameStatus()) {
            case false:
                break;
            case true:
                break;
        }


    }
}

function checkGameStatus() {


    if (attempts == 0) {
        document.getElementById('keyboard-boxes').classList.add('disabled')
        gameActive = false
        return false;

    }

    else if (dynamicList.join('').toLocaleString() == secretWord.toLowerCase()) {
        findWord = words.filter(function (name) { return name.word == secretWord; })
        findWord[0].isActive = false;
        checkActiveWords()
        // salvar dados
        localStorage.setItem('wordsList', JSON.stringify(words));
        document.getElementById('keyboard-boxes').classList.add('disabled')
        gameActive = false
        alert('Venceu!')
        return true;

    }


}

