let gameActive = true;
let attempts = 6;
let dynamicList = []; //Lista dinâmica para comparação
let dynamicWrongLettersList = []; //Lista dinâmica com as letras erradas
let secretWord; //Palavra escolhida
let secretWordTip; //Dica da palavra escolhida
let splittedSecretWord; //Palvra escolhida divida em letras
let renderAstronaut = document.getElementById('astronaut-game');
let words = [];
let userCheckbox = document.getElementById('switch-1');
let tipCheckbox = document.getElementById('switch-2');

let useDefaultButton = document.getElementById('useDefault');
let isOnlyUserWords = JSON.parse(localStorage.getItem('userOption')); //or false
let isTipHidden = JSON.parse(localStorage.getItem('userTipOption')); //or false
let getuserWordsList = JSON.parse(localStorage.getItem('userWordsList'));

const delayTime = 800;


function reload() {

    window.location.reload()
}

function checkWords() {

    if (words.length == 0) {
        localStorage.removeItem('userWordsList');
        gameActive = false;
    }

}

function checkIfCached() {

    if (getuserWordsList != null) {

        words = words.concat(getuserWordsList);

    }

    if (isOnlyUserWords == null) {

        isOnlyUserWords = false;

    }

    if (isTipHidden == null) {

        isTipHidden = false;

    }

}

function checkActiveWords() {
    let activeWords = words.filter(function (name) { return name.isActive == true; })
    words = activeWords;
}


const convertToSlug = (text) => {
    const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return text.toString().toLowerCase().trim()
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[\s\W-]+/g, '_') // Replace spaces, non-word characters and dashes with a single dash (-)
}


words = words = [ //Array com os objetos constando a palavra (word) e Dica (tip)

    {

        word: 'astronauta',
        tip: 'Já foi para o espaço!',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'caderno',
        tip: 'Alguns usam para anotar!',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'celular',
        tip: 'É tecnológico!',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'pau_brasil',
        tip: 'Árvore',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'michael_jackson',
        tip: 'Cantor',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'rainha_elizabeth',
        tip: 'Rest in Peace',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'cachorro_quente',
        tip: 'Comida',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'gremio',
        tip: 'Gigante',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'among_us',
        tip: 'Impostor',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'pringles',
        tip: 'Comida em cilindro',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'bora_bill',
        tip: 'Viral',
        isActive: true,
        userAdded: false,

    },

    {

        word: 'oracle_one',
        tip: 'Melhor curso já feito',
        isActive: true,
        userAdded: false,

    },

];

const defaultWords = words;

checkIfCached();

checkActiveWords();

userCheckbox.onclick = function () {

    changeUserCustomWords();

};

useDefaultButton.onclick = function () {

    isOnlyUserWords = false;
    localStorage.clear();
    setTimeout(function () { window.location.href = './game.html'; }, 800);


}

tipCheckbox.onclick = function () {

    changeTip();

};

function changeUserCustomWords() {

    isOnlyUserWords = isOnlyUserWords != true;
    localStorage.setItem('userOption', JSON.stringify(isOnlyUserWords)); //Salva a opção do usuário em cache
    setTimeout(function () { window.location.reload() }, 1000)

}

function changeTip() {

    isTipHidden = isTipHidden != true;
    localStorage.setItem('userTipOption', JSON.stringify(isTipHidden)); //Salva a opção do usuário em cache
    setTimeout(function () { window.location.reload() }, 1000)

}

if (isOnlyUserWords == true && words.length == null) {
    words = defaultWords
    isOnlyUserWords = false;
    userCheckbox.checked = false;
    localStorage.removeItem('userWordsList');

}

else if (isOnlyUserWords) {

    words = getuserWordsList;
    userCheckbox.checked = true;

} else if(!isOnlyUserWords) {

    words = defaultWords;
    userCheckbox.checked = false;

}

if (isTipHidden) {

    document.getElementById('keyboard-boxes').classList.toggle('locked');
    document.getElementById('tip-text').classList.toggle('hidden');
    tipCheckbox.checked = true;

}


function chooseRandomWord() { //Escolhe um objeto aleatório do array words.

    const indexWord = parseInt(Math.random() * words.length) //sorteia
    secretWord = words[indexWord].word; //define o item word do objeto sorteado
    secretWordTip = words[indexWord].tip; //define o item tip do objeto sorteado
    splittedSecretWord = secretWord.split(''); //Splita a palavra sorteada e transforma em uma array

}


checkWords();


chooseRandomWord(); //Chama função para sortear palavra


function renderChoosedWord() { //Renderiza na tela a palavra sorteada e a dica.

    for (let i = 0; i < splittedSecretWord.length; i++) { //Loop para preencher os boxes com cada palavra.


        const renderWord = document.getElementById(`${(i + 1)}`); //Puxa o ID de cada div e incrementa
        renderWord.innerHTML = '&nbsp;'; //Renderiza no ID puxado acima a letra da palavra.

    }

    if (splittedSecretWord.includes('_')) {

        dynamicList.push('_');
        let getIndex = splittedSecretWord.indexOf('_');
        let addBlankSpace = document.getElementById(getIndex + 1);
        addBlankSpace.classList.add('blank-space');

    }

    const renderTip = document.getElementById('render-tip'); //Puxa o ID da Dica.
    renderTip.innerHTML = "Tema: " + secretWordTip //Renderiza no ID da Dica.


}

renderChoosedWord();


function changeButton(key, result) {

    document.getElementById(key).classList.add(result);

    function buttonLocker() {

        let lockKeyboard = document.getElementById(key);
        let loadingSpinner = setTimeout(toggleLocked, delayTime);
        lockKeyboard.innerHTML = '<div class="loading-spinner disabled"></div>';
        document.getElementById('keyboard-boxes').classList.toggle('locked');

        function toggleLocked() {
            lockKeyboard.innerHTML = key;
            document.getElementById('keyboard-boxes').classList.toggle('locked');

        };

    }

    buttonLocker();

}

function delayedWordRender(ie) {
    renderWord = document.getElementById(`${(ie + 1)}`); //Puxa o ID de cada div e incrementa
    renderWord.innerHTML = splittedSecretWord[ie]; //Renderiza no ID puxado acima a letra da palavra.
}

function checkIfKeyMatches(key) {

    let keyy = key.toLowerCase();

    if (gameActive) {

        if (splittedSecretWord.includes(keyy)) {

            for (i = 0; i < splittedSecretWord.length; i++) {

                if (splittedSecretWord[i] == keyy) {
                    dynamicList[i] = keyy;

                    let renderiza = setTimeout(delayedWordRender.bind(null, i), delayTime);
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

        checkGameStatus();


    }


}



function checkGameStatus() {

    filteredDynamicList = dynamicList.filter(function (e) { return e != null; });
    filteredSplittedSecretWord = splittedSecretWord.filter(function (e) { return e != '_'; });


    if (attempts == 0) {
        document.getElementById('keyboard-boxes').classList.add('disabled');
        gameActive = false;
        setTimeout(function () { document.location.hash = '#try-again' }, 1500);
        return false;

    }


    else if (filteredSplittedSecretWord.length == filteredDynamicList.length) {
        findWord = words.filter(function (name) { return name.word == secretWord; });
        findWord[0].isActive = false;
        checkActiveWords();
        document.getElementById('keyboard-boxes').classList.add('disabled');
        gameActive = false;
        setTimeout(function () { document.location.hash = '#winner' }, 1500);
        // salvar dados
        localStorage.setItem('userWordsList', JSON.stringify(words));
        return true;

    }


}


