const question = document.getElementById("question");
const choices = Array.from( document.getElementsByClassName("choice-text"));

let currQues = {};
let acceptingAns = false;
let score = 0;
let quesCounter = 0;
let availableQues = [];

let questions = [ 
    
];

const correctBonus = 5;
const MaxQues = 3;

startGame = () => {
    quesCounter = 0;
    score = 0;
    availableQues = [...questions];
    getNewQues;
};

getNewQues = () => {
    quesCounter++;
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

