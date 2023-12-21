window.addEventListener('load', function () {
    const IOnumber = this.document.getElementById("number");
    const IOaddx = this.document.getElementById('add');
    const IOscore = this.document.getElementById("score");
    const settings = this.document.getElementById("settings");
    var limitLower = 1000;
    var limitUpper = 9999;
    var addX = 3;
    var valueNumber = 2137;
    var valueScore = 0;

    window.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            IOnumber.disabled = !IOnumber.disabled;
            if (!IOnumber.disabled) {
                IOnumber.value = "";
                IOnumber.focus();
            }
            else {
                if (addDigitToNumber(valueNumber, addX) == IOnumber.value) {
                    changeBackgroundColorOverTime(100, "#00ff00");
                    valueScore = valueScore + 2;
                } else {
                    changeBackgroundColorOverTime(100, "#ff0000");
                    valueScore = valueScore - 1;
                }
                IOscore.innerHTML = valueScore;
                valueNumber = randomNumber(limitLower, limitUpper);
                IOnumber.value = valueNumber;
            }
        }
    });

    settings.addEventListener('click', function () {
        // Tworzenie overlay (tło z przezroczystym czarnym)
        var overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        overlay.style.zIndex = '1000';

        // Tworzenie białego diva w środku overlay
        var whiteDiv = document.createElement('div');
        whiteDiv.style.height = '50%';
        whiteDiv.style.width = '60%';
        whiteDiv.style.position = 'absolute';
        whiteDiv.style.top = '50%';
        whiteDiv.style.left = '50%';
        whiteDiv.style.transform = 'translate(-50%, -50%)';
        whiteDiv.style.backgroundColor = 'white';
        whiteDiv.style.padding = '20px';
        whiteDiv.style.borderRadius = '10px';

        // Dodawanie formularza
        var form = document.createElement('form');

        // Funkcja do obsługi zdarzenia input
        function handleInputChange(event) {
            event.target.style.border = ''; // Usunięcie obramowania przy zmianie wartości
        }

        // Funkcja do sprawdzania, czy pole jest puste
        function isFieldEmpty(field) {
            return field.value.trim() === '';
        }

        // Dodawanie pola dla dolnej granicy zakresu
        var lowerLimitLabel = document.createElement('label');
        lowerLimitLabel.innerHTML = 'Dolna granica zakresu:';
        var lowerLimitInput = document.createElement('input');
        lowerLimitInput.id = 'lowerLimit';
        lowerLimitInput.type = 'number';
        lowerLimitInput.min = '0';
        lowerLimitInput.max = '9999999';
        lowerLimitInput.required = true;
        lowerLimitInput.addEventListener('input', handleInputChange);

        // Dodawanie pola dla górnej granicy zakresu
        var upperLimitLabel = document.createElement('label');
        upperLimitLabel.innerHTML = 'Górna granica zakresu (większa lub równa dolnej granicy):';
        var upperLimitInput = document.createElement('input');
        upperLimitInput.id = 'upperLimit';
        upperLimitInput.type = 'number';
        upperLimitInput.min = '0';
        upperLimitInput.max = '9999999';
        upperLimitInput.required = true;
        upperLimitInput.addEventListener('input', handleInputChange);

        // Dodawanie pola dla liczby od 1 do 9
        var numberLabel = document.createElement('label');
        numberLabel.innerHTML = 'Liczba od 1 do 9:';
        var numberInput = document.createElement('input');
        numberInput.id = 'addx';
        numberInput.type = 'number';
        numberInput.min = '1';
        numberInput.max = '9';
        numberInput.required = true;
        numberInput.addEventListener('input', handleInputChange);

        // Dodawanie przycisku do zamknięcia overlay po zatwierdzeniu formularza
        var submitButton = document.createElement('button');
        submitButton.id = 'save';
        submitButton.type = 'button';
        submitButton.innerHTML = 'Save';
        submitButton.addEventListener('click', function () {
            // Walidacja przed zapisaniem
            if (isFieldEmpty(lowerLimitInput) || isFieldEmpty(upperLimitInput) || isFieldEmpty(numberInput)) {
                // Wyświetlenie czerwonych obramowań dla pustych pól
                lowerLimitInput.style.border = isFieldEmpty(lowerLimitInput) ? '1px solid red' : '';
                upperLimitInput.style.border = isFieldEmpty(upperLimitInput) ? '1px solid red' : '';
                numberInput.style.border = isFieldEmpty(numberInput) ? '1px solid red' : '';
                return;
            } else {
                lowerLimitInput.style.border = '';
                upperLimitInput.style.border = '';
                numberInput.style.border = '';
            }

            if (parseInt(lowerLimitInput.value) >= parseInt(upperLimitInput.value)) {
                lowerLimitInput.style.border = '1px solid red';
                upperLimitInput.style.border = '1px solid red';
                numberInput.style.border = ''; // Usuwamy obramowanie dla pola liczby
                return;
            } else {
                lowerLimitInput.style.border = '';
                upperLimitInput.style.border = '';
            }

            if (parseInt(numberInput.value) < 1 || parseInt(numberInput.value) > 9) {
                numberInput.style.border = '1px solid red';
                lowerLimitInput.style.border = '';
                upperLimitInput.style.border = '';
                return;
            } else {
                numberInput.style.border = '';
            }

            limitLower = lowerLimitInput.value;
            limitUpper = upperLimitInput.value;
            addX = numberInput.value;

            IOnumber.value = randomNumber(limitLower, limitUpper);
            IOaddx.value = '+' + addX;
            valueNumber = IOnumber.value;

            // Tutaj możesz umieścić kod obsługujący dane z formularza
            document.body.removeChild(overlay);
        });

        // Dodawanie elementów do formularza
        form.appendChild(lowerLimitLabel);
        form.appendChild(lowerLimitInput);
        form.appendChild(document.createElement('br'));

        form.appendChild(upperLimitLabel);
        form.appendChild(upperLimitInput);
        form.appendChild(document.createElement('br'));

        form.appendChild(numberLabel);
        form.appendChild(numberInput);
        form.appendChild(document.createElement('br'));

        form.appendChild(submitButton);

        // Dodawanie formularza do białego diva
        whiteDiv.appendChild(form);

        // Dodawanie "x" w prawym górnym rogu białego diva
        var closeButton = document.createElement('div');
        closeButton.innerHTML = 'x';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '0px';
        closeButton.style.right = '5px';
        closeButton.style.fontSize = '15px';
        closeButton.style.cursor = 'pointer';

        // Dodawanie zdarzenia do zamknięcia overlay po kliknięciu "x"
        closeButton.addEventListener('click', function () {
            document.body.removeChild(overlay);
        });

        // Dodawanie elementów do DOM
        whiteDiv.appendChild(closeButton);
        overlay.appendChild(whiteDiv);
        document.body.appendChild(overlay);
    });

})

function addDigitToNumber(x, y) {
    if (y.toString().length !== 1) {
        return "Enter the correct numbers";
    }

    const xArray = x.toString().split("");
    const result = xArray.map(digit => (parseInt(digit) + parseInt(y)) % 10).join("");

    return parseInt(result);
}

function changeBackgroundColorOverTime(t, color) {
    const body = document.querySelector("body");
    const previousColor = body.style.backgroundColor;

    body.style.backgroundColor = color;

    setTimeout(() => {
        body.style.backgroundColor = previousColor;
    }, t);
}

function randomNumber(min, max) {
    min = parseInt(min);
    max = parseInt(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}