const display = document.getElementById('result');
const themeBtn = document.getElementById('theme-btn');
const html = document.documentElement;

// Lógica de áudio
const clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
const equalSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');

function playSound(isEqual = false) {
    const sfx = isEqual ? equalSound : clickSound;
    sfx.currentTime = 0;
    sfx.play();
}

// Funções da Calculadora
function appendToDisplay(input) {
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/', '%', '.'];
    if (operators.includes(input) && operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + input;
        return;
    }
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
            display.value = eval(expression);
            playSound(true);
        }
    } catch (e) { display.value = "Erro"; }
}

// --- LÓGICA DO TUTORIAL ---
const tutorialSteps = [
    {
        title: "🎸 Bem-vindo!",
        text: "Esta é a Rock Calc. Aqui as contas têm peso! Vamos aprender a usar as funções básicas."
    },
    {
        title: "➕ Adição",
        text: "A adição junta valores. <br><b>Como usar:</b> Digite o primeiro número, aperte o botão '+' e depois o segundo número. Ex: 5 + 5 = 10."
    },
    {
        title: "➖ Subtração",
        text: "A subtração retira um valor de outro. <br><b>Como usar:</b> Use o botão '-'. Útil para calcular descontos ou diferenças."
    },
    {
        title: "✖️ Multiplicação / Divisão",
        text: "Multiplique com '×' (asterisco no teclado) ou divida com '/'. <br>Ex: 2 × 5 = 10 ou 10 / 2 = 5."
    },
    {
        title: "📉 Porcentagem",
        text: "O botão '%' divide o número por 100. <br><b>Dica:</b> Para saber 10% de 50, digite '50*10%' e aperte '='."
    }
];

let currentStep = 0;
const modal = document.getElementById('tutorial-modal');
const openBtn = document.getElementById('open-tutorial');
const closeBtn = document.querySelector('.close-modal');
const tutorialBody = document.getElementById('tutorial-body');
const prevBtn = document.getElementById('prev-step');
const nextBtn = document.getElementById('next-step');
const stepIndicator = document.getElementById('step-indicator');

function updateTutorial() {
    const step = tutorialSteps[currentStep];
    tutorialBody.innerHTML = `<h2>${step.title}</h2><p>${step.text}</p>`;
    stepIndicator.innerText = `${currentStep + 1}/${tutorialSteps.length}`;
    
    prevBtn.disabled = currentStep === 0;
    nextBtn.innerText = currentStep === tutorialSteps.length - 1 ? "Concluir" : "Próximo ➡";
}

openBtn.onclick = () => {
    modal.style.display = "flex";
    currentStep = 0;
    updateTutorial();
}

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
}

nextBtn.onclick = () => {
    if (currentStep < tutorialSteps.length - 1) {
        currentStep++;
        updateTutorial();
    } else {
        modal.style.display = "none";
    }
}

prevBtn.onclick = () => {
    if (currentStep > 0) {
        currentStep--;
        updateTutorial();
    }
}

// --- TROCA DE TEMA COM TEXTO DINÂMICO ---
themeBtn.onclick = () => {
    playSound();
    const isDark = html.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        html.setAttribute('data-theme', 'light');
        themeBtn.innerText = "Light Mode Ativado 🎸";
    } else {
        html.setAttribute('data-theme', 'dark');
        themeBtn.innerText = "Dark Mode Ativado 🤘";
    }
};