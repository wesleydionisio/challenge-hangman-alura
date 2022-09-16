let inputWord = document.getElementById('input-add-word');
let inputTip = document.getElementById('input-add-tip');
let clearButton = document.getElementById('clearUserWords');
let submitButton = document.getElementById('userSubmit');


clearButton.onclick = function () {

    localStorage.removeItem('wordsList');
    alert('Limpado com sucesso!')

}

submitButton.onclick = function () {

    if (!inputWord.value || !inputTip.value) {

        alert("Você precisa preencher os campos!");

    } else {


        words.push(
            {

                word: convertToSlug(inputWord.value),
                tip: inputTip.value,
                isActive: true,
                userAdded: true,


            }

        )

        alert("Adicionado com sucesso");

        // salvar dados
        localStorage.setItem('wordsList', JSON.stringify(words));

    }

}


document.addEventListener('touchmove', function (e) { }, false);

var _switch = document.getElementById("switch-1"),
    switchHit = false,
    hasTouch = false;

function toggleHit() { if (!switchHit) { switchHit = true; _switch.classList.add("hit"); } }
function setTouch() { if (!hasTouch) { hasTouch = true; _switch.classList.add("touch"); } }

_switch.onclick = toggleHit;
_switch.ontouchstart = function (e) { setTouch(); e.preventDefault(); e.target.click(); }


