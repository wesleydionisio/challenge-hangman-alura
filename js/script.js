let inputWord = document.getElementById('input-add-word');
let inputTip = document.getElementById('input-add-tip');
let clearButton = document.getElementById('clearUserWords');
let submitButton = document.getElementById('userSubmit');

clearButton.onclick = function() {

    localStorage.removeItem('wordsList');
    alert('Limpado com sucesso!')

}

submitButton.onclick = function () {

    if (!inputWord.value || !inputTip.value) {

        alert("Você precisa preencher os campos!");

    } else {


        words.push(
            {

                word: inputWord.value,
                tip: inputTip.value,
                isActive: true,
            }

        )

        alert("Adicionado com sucesso");

        // salvar dados
        localStorage.setItem('wordsList', JSON.stringify(words));

    }

    }



