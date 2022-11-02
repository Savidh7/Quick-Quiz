const question = document.getElementById("question");
const choices = Array.from( document.getElementsByClassName("choice-text"));
const quesCounterText = document.getElementById('quesCounter');
const scoreText = document.getElementById('score');

let currQues = {};
let acceptingAns = false;
let score = 0;
let quesCounter = 0;
let availableQues = [];

let questions = [ 
    {
        question: "In which HTML element do we put JavaScript ?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripts>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xyz.js'?",
        choice1: "<script href = 'xyz.js'>",
        choice2: "<script name = 'xyz.js'>",
        choice3: "<script src = 'xyz.js'>",
        choice4: "<script file = 'xyz.js'>",
        answer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box ?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msgBox('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    }
];

const correctBonus = 5;
const MaxQues = 3;

startGame = () => {
    quesCounter = 0;
    score = 0;
    availableQues = [...questions];
    getNewQues();
};

getNewQues = () => {
    if (availableQues.length === 0 || quesCounter >= MaxQues){
        localStorage.setItem("mostRecentScore", score);
        // goto end page
        return window.location.assign('/end/end.html');
    } 

    quesCounter++;
    quesCounterText.innerText = quesCounter + "/" + MaxQues;
    
    const quesIdx = Math.floor(Math.random() * availableQues.length);
    currQues = availableQues[quesIdx];
    question.innerText = currQues.question;

    choices.forEach(choice => {
        const num = choice.dataset['number'];
        choice.innerText = currQues['choice' + num];
    });

    availableQues.splice(quesIdx, 1);
    acceptingAns = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAns) return;

        acceptingAns = true;
        const selectedChoice = e.target;
        const selectedAns = selectedChoice.dataset['number'];

        const ClassToApply =  selectedAns == currQues.answer ? 'correct' : 'incorrect' ;
        
        if (ClassToApply === "correct") {
            score += correctBonus;
            scoreText.innerText = score;
        }

        selectedChoice.parentElement.classList.add(ClassToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(ClassToApply);
            getNewQues();
        }, 900);
    });
});

startGame();