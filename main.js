
window.addEventListener('load', function () {
    const IOnumber = this.document.getElementById("number");
    const IOscore = this.document.getElementById("score");
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
                if (addDigitToNumber(valueNumber, 3) == IOnumber.value) {
                    changeBackgroundColorOverTime(100, "#00ff00");
                    valueScore = valueScore + 2;
                } else {
                    changeBackgroundColorOverTime(100, "#ff0000");
                    valueScore = valueScore - 1;
                }
                IOscore.innerHTML = valueScore;
                valueNumber = randomNumber(1000, 9999);
                IOnumber.value = valueNumber;
            }
        }
    });
})

function addDigitToNumber(x, y) {
    if (x.toString().length !== 4 || y.toString().length !== 1) {
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
    return Math.floor(Math.random() * (max - min + 1)) + min;
}