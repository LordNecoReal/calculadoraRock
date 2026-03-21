const display = document.getElementById('result');
const themeBtn = document.getElementById('theme-btn');
const html = document.documentElement;

// Configuração do Áudio (Som de Rock/Metal)
const clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3'); // Som de clique seco
const heavySound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3'); // Som mais forte para o '='

function playRockSound(isEqual = false) {
    if (isEqual) {
        heavySound.currentTime = 0;
        heavySound.play();
    } else {
        clickSound.currentTime = 0; // Reinicia o som para permitir cliques rápidos
        clickSound.play();
    }
}

// --- FUNÇÕES DA CALCULADORA ---

function appendToDisplay(input) {
    playRockSound();
    display.value += input;
}

function clearDisplay() {
    playRockSound();
    display.value = "";
}

function deleteLast() {
    playRockSound();
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value.replace(/%/g, '/100');
        if (expression) {
            playRockSound(true); // Som diferenciado para o resultado
            display.value = eval(expression);
        }
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

// --- INTERAÇÃO COM O TECLADO E FEEDBACK VISUAL ---

document.addEventListener('keydown', (event) => {
    const key = event.key;
    let buttonToHighlight = null;

    // Mapeamento de teclas para encontrar o botão na tela e brilhar
    const buttons = Array.from(document.querySelectorAll('.btn'));
    
    if (/[0-9]/.test(key)) {
        buttonToHighlight = buttons.find(b => b.innerText === key);
        appendToDisplay(key);
    } else if (['+', '-', '*', '/', '.', '%'].includes(key)) {
        buttonToHighlight = buttons.find(b => b.innerText === (key === '*' ? '×' : key));
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        buttonToHighlight = document.querySelector('.equal');
        calculate();
    } else if (key === 'Backspace') {
        buttonToHighlight = buttons.find(b => b.innerText === 'DEL');
        deleteLast();
    } else if (key === 'Escape') {
        buttonToHighlight = document.querySelector('.clear');
        clearDisplay();
    }

    // Adiciona efeito visual temporário
    if (buttonToHighlight) {
        buttonToHighlight.classList.add('active-press');
        setTimeout(() => buttonToHighlight.classList.remove('active-press'), 100);
    }
});

// --- TROCA DE TEMA ---
themeBtn.addEventListener('click', () => {
    playRockSound();
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeBtn.innerText = newTheme === 'dark' ? "Modo Heavy ativado🤘" : "Modo Rock ativado 🎸";
});