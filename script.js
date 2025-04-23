const questionsPool = [
    "Do you like stargazing?",
    "Have you ever wished on a shooting star?",
    "Do you believe in love at first sight?",
    "Would you go on a spontaneous adventure?",
    "Do you think late-night walks are romantic?",
    "Do you enjoy cheesy pickup lines?",
    "Do you Like Me?"
];
const finalQuestion = "Would you like to go on a date with me?";

let selectedQuestions = [];
let currentQuestion = 0;

const questionElem = document.getElementById('question');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const noSound = document.getElementById('noSound');
const finalScreen = document.getElementById('finalScreen');
const fireworks = document.querySelector('.fireworks');

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function pickQuestions() {
    const count = Math.floor(Math.random() * 2) + 5; // 5 or 6
    return shuffle([...questionsPool]).slice(0, count);
}

function showQuestion(index) {
    questionElem.classList.remove('fade-in');
    void questionElem.offsetWidth;
    if (index < selectedQuestions.length) {
        questionElem.textContent = selectedQuestions[index];
    } else {
        questionElem.textContent = finalQuestion;
    }
    questionElem.classList.add('fade-in');
    yesBtn.style.display = '';
    noBtn.style.display = '';
    yesBtn.textContent = 'Yes';
    noBtn.textContent = 'No';
    yesBtn.classList.add('glow');
    yesBtn.disabled = false;
    noBtn.disabled = false;
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.style.position = 'relative';
}

// Yes button logic
yesBtn.addEventListener('click', () => {
    if (currentQuestion < selectedQuestions.length) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        // Final Yes clicked
        showFinalScreen();
    }
});

// No button dodging
function moveNoBtn(e) {
    const box = document.querySelector('.question-box');
    const rect = box.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    let maxLeft = rect.width - btnRect.width - 10;
    let maxTop = rect.height - btnRect.height - 10;
    let left = Math.random() * maxLeft;
    let top = Math.random() * maxTop;
    noBtn.style.left = left + 'px';
    noBtn.style.top = top + 'px';
    noBtn.style.position = 'absolute';
    noBtn.classList.add('moving');
    setTimeout(() => noBtn.classList.remove('moving'), 400);
    // Play funny sound
    noSound.currentTime = 0;
    noSound.play();
}
noBtn.addEventListener('mouseenter', moveNoBtn);
noBtn.addEventListener('touchstart', moveNoBtn);
noBtn.addEventListener('mousedown', moveNoBtn);

// Animated stars
function animateStars() {
    const canvas = document.getElementById('stars');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    let stars = Array.from({length: 100}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.2,
        d: Math.random() * 2 * Math.PI,
        speed: Math.random() * 0.3 + 0.1
    }));
    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (let s of stars) {
            ctx.save();
            ctx.globalAlpha = 0.7 + 0.3 * Math.sin(s.d);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
            ctx.fillStyle = '#fffbe6';
            ctx.shadowColor = '#fffbe6';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();
            s.d += s.speed * 0.05;
        }
        requestAnimationFrame(draw);
    }
    draw();
}
window.addEventListener('resize', animateStars);

// Floating hearts animation
function createHearts(n) {
    const heartsDiv = document.querySelector('.hearts');
    for (let i=0; i<n; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = (Math.random()*90+5) + 'vw';
        heart.style.top = (Math.random()*60+20) + 'vh';
        heart.style.animationDuration = (2+Math.random()*3) + 's';
        heartsDiv.appendChild(heart);
        setTimeout(()=>heart.remove(), 3500);
    }
}
function floatingHearts() {
    setInterval(()=>{
        if (document.hasFocus()) createHearts(1);
    }, 1200);
}

// Fireworks animation (simple hearts burst)
function showFinalScreen() {
    document.querySelector('.question-box').style.display = 'none';
    finalScreen.style.display = 'flex';
    launchFireworks();
}
function launchFireworks() {
    for (let i = 0; i < 16; i++) {
        setTimeout(() => fireworkBurst(), i * 120);
    }
}
function fireworkBurst() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        const x = 50 + Math.cos((i/10)*2*Math.PI) * (Math.random()*16+40);
        const y = 50 + Math.sin((i/10)*2*Math.PI) * (Math.random()*16+40);
        heart.style.left = x + 'vw';
        heart.style.top = y + 'vh';
        heart.style.animationDuration = (2+Math.random()*1.5) + 's';
        fireworks.appendChild(heart);
        setTimeout(()=>heart.remove(), 2200);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    selectedQuestions = pickQuestions();
    currentQuestion = 0;
    showQuestion(0);
    animateStars();
    floatingHearts();
});
