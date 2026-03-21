const display = document.getElementById('result');
const themeBtn = document.getElementById('theme-btn');
const html = document.documentElement;

// Sons (Links externos funcionais)
const clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
const equalSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');

function playSound(isEqual = false) {
    const sfx = isEqual ? equalSound : clickSound;
    sfx.currentTime = 0;
    sfx.play();
}

function appendToDisplay(input) {
    playSound();
    display.value += input;
}

function clearDisplay() {
    playSound();
    display.value = "";
}

function deleteLast() {
    playSound();
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value.replace(/%/g, '/100');
        if (expression) {
            playSound(true);
            display.value = eval(expression);
        }
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

// Atalhos de Teclado
document.addEventListener('keydown', (e) => {
    const key = e.key;
    let btn;

    if (/[0-9\+\-\*\/\.\%]/.test(key)) {
        const map = {'*': '×'};
        const searchText = map[key] || key;
        btn = Array.from(document.querySelectorAll('.btn')).find(b => b.innerText === searchText);
        appendToDisplay(key);
    } else if (key === 'Enter') {
        e.preventDefault();
        btn = document.querySelector('.equal');
        calculate();
    } else if (key === 'Backspace') {
        btn = Array.from(document.querySelectorAll('.btn')).find(b => b.innerText === 'DEL');
        deleteLast();
    } else if (key === 'Escape') {
        btn = document.querySelector('.clear');
        clearDisplay();
    }

    if (btn) {
        btn.classList.add('active-press');
        setTimeout(() => btn.classList.remove('active-press'), 100);
    }
});

// Troca de Tema
themeBtn.addEventListener('click', () => {
    playSound();
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.innerText = isDark ? "Modo rock ativado 🎸" : "Modo Heavy ativado🤘";
});