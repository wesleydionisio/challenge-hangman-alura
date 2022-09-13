let gameActive = true;
let attempts = 6;
let dynamicList = []; //Lista dinâmica
let dynamicWrongLettersList = []; //Lista dinâmica
let secretWord; //Palavra escolhida
let secretWordTip; //Dica da palavra escolhida
let splittedSecretWord;


const words = [ //Array com os objectos constando a palavra (word) e Dica (tip)

    word1 = {

        word: 'astronauta',
        tip: 'Já foi para o espaço!'

    },

    word2 = {

        word: 'caderno',
        tip: 'Sempre vem vazio!'

    },

    word3 = {

        word: 'celular',
        tip: 'Se usa com as mãos ou com os olhos?'

    }


]

function chooseRandomWord() { //Escolhe um objeto aleatório do array words.

    const indexWord = parseInt(Math.random() * words.length) //sorteia

    secretWord = words[indexWord].word; //define o item word do objeto sorteado
    secretWordTip = words[indexWord].tip; //define o item tip do objeto sorteado
    splittedSecretWord = secretWord.split(''); //Splita a palavra sorteada e transforma em uma array
    console.log(splittedSecretWord);

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

    document.getElementById(key).classList.add(result)

}



function checkIfKeyMatches(key) {

    let keyy = key.toLowerCase();
    console.log(keyy);

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

            dynamicWrongLettersList.push(keyy);
            const renderWrongLetters = document.getElementById('wrong-letters'); //Puxa o ID de cada div e incrementa
            renderWrongLetters.innerHTML = dynamicWrongLettersList; //Renderiza no ID puxado acima a letra da palavra.
            attempts--;
            changeButton(keyy, 'wrongKey');

        }

        switch (checkGameStatus()) {

            case false:
                alert("Perdeu");
                break;
            case true:
                alert("Venceu!")
                break;
        }


    }
}

function checkGameStatus() {


    if (attempts == 0) {
        gameActive = false
        return false;

    }

    else if (dynamicList.join('').toLocaleString() == secretWord.toLowerCase()) {

        gameActive = false
        return true;

    }


}
