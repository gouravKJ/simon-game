

let gameSeq = [];
let userSeq = [];
let btn = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game is started");
        started = true;
        level = 0; // Reset level
        gameSeq = []; // Reset game sequence
        levelUp();
    }
});

function gameflash(btn) {
    if (btn) {
        btn.classList.add("flash");
        setTimeout(function () {
            btn.classList.remove("flash");
        }, 250);
    }
}

function userflash(btn) {
    if (btn) {
        btn.classList.add("userflash");
        setTimeout(function () {
            btn.classList.remove("userflash");
        }, 2050);
    }
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `lev ${level}`;
    let randIdx = Math.floor(Math.random() * 4); // Correct: 0 to 3
    let randcolor = btn[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    gameflash(randbtn);
}

function checkans(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `game over! your score was <b> ${level}</b>press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function()
            {
                document.querySelector("body").style.color="white";
            },150
        );
        started = false;
        
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    checkans(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}
