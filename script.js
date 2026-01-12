// ============================================
// CONFIGURATION (SECURE MODE)
// ============================================
// No API Key here. It is hidden on the Netlify Server.

const LOADING_PHRASES = [
    "Compiling binary tree...", "Injecting logic probes...", "Analyzing social graph...",
    "Permuting common variations...", "Checking database for '123' patterns...",
    "Decrypting keystrokes...", "Running dictionary attack..."
];

let gameState = { history: [], questionCount: 0, maxQuestions: 20 };

const screens = {
    start: document.getElementById('screen-start'),
    game: document.getElementById('screen-game'),
    loading: document.getElementById('screen-loading'),
    guess: document.getElementById('screen-guess'),
    end: document.getElementById('screen-end')
};

const genieImg = document.getElementById('genie-img');
const questionText = document.getElementById('question-text');
const optionsArea = document.getElementById('options-area');
const inputArea = document.getElementById('input-area');
const inputField = document.getElementById('manual-input');
const loadingText = document.getElementById('loading-text');

function setGenieMood(mood) {
    if (!genieImg) return;
    if (mood === "idle") genieImg.src = "genie_idle.png";
    if (mood === "thinking") genieImg.src = "genie_think.png";
    if (mood === "win") genieImg.src = "genie_win.png";
    if (mood === "lose") genieImg.src = "genie_lose.png";
}

function switchScreen(screenName) {
    Object.values(screens).forEach(s => { if(s) s.classList.add('hidden'); });
    if(screens[screenName]) screens[screenName].classList.remove('hidden');

    if (screenName === 'loading') {
        setGenieMood('thinking');
        const randomPhrase = LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)];
        if(loadingText) loadingText.innerText = randomPhrase;
    } else if (screenName === 'game') setGenieMood('idle');
}

function startGame() {
    gameState.history = [];
    gameState.questionCount = 0;
    
    gameState.history.push({
        role: "system",
        content: `You are "The Cipher", an Elite Password Cracking AI. 
        Guess the user's password EXACTLY.
        ALGORITHM:
        1. Phase 1: Binary Search (Broad Questions).
        2. Phase 2: Social Engineering (Ask for specific names/dates).
        3. Phase 3: Mutation Engine (If user says "Rehan", check "rehan123", "rehanrehan").
        RESPONSE FORMAT (JSON ONLY):
        {"type": "question", "content": "..."} OR {"type": "input_question", "content": "..."} OR {"type": "guess", "content": "..."}`
    });

    generateNextMove();
}

async function generateNextMove() {
    switchScreen('loading');
    gameState.questionCount++;
    
    try {
        // SECURE CALL TO NETLIFY
        const response = await fetch("/.netlify/functions/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: gameState.history })
        });

        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        const content = data.choices[0].message.content;
        const move = JSON.parse(content);

        gameState.history.push({ role: "assistant", content: content });

        setTimeout(() => { processMove(move); }, 1500);

    } catch (error) {
        console.error("Game Error:", error);
        alert("Connection Error. Please try again.");
        switchScreen('start');
    }
}

function processMove(move) {
    if (move.type === "guess") {
        document.getElementById('guess-text').innerText = move.content;
        switchScreen('guess');
        setGenieMood('win'); 
    } else {
        questionText.innerText = move.content;
        switchScreen('game');
        setGenieMood('idle');

        if (move.type === "input_question") {
            optionsArea.classList.add('hidden');
            inputArea.classList.remove('hidden');
            inputArea.classList.add('flex');
            inputField.focus();
        } else {
            optionsArea.classList.remove('hidden');
            inputArea.classList.add('hidden');
            inputArea.classList.remove('flex');
        }
    }
}

function handleAnswer(answer) {
    gameState.history.push({ role: "user", content: answer });
    generateNextMove();
}

function handleManualInput() {
    const text = inputField.value.trim();
    if (text) {
        gameState.history.push({ role: "user", content: text });
        inputField.value = ""; 
        generateNextMove();
    }
}

function handleFinalResult(isCorrect) {
    const endTitle = document.getElementById('end-title');
    const endMessage = document.getElementById('end-message');
    
    if (isCorrect) {
        setGenieMood('win');
        endTitle.innerText = "System Breached";
        endTitle.className = "text-5xl font-magic font-bold text-gold";
        endMessage.innerText = "Predictable. Password cracked.";
    } else {
        setGenieMood('lose');
        endTitle.innerText = "Access Denied";
        endTitle.className = "text-5xl font-magic font-bold text-soft";
        endMessage.innerText = "You are an anomaly.";
    }
    switchScreen('end');
}

function resetGame() { switchScreen('start'); }