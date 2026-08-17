const questions = [
    {
        question: "Which language is used to structure a web page?",
        options: ["CSS", "HTML", "JavaScript", "Python"],
        answer: "HTML"
    },

    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "CSS", "Java", "C++"],
        answer: "CSS"
    },

    {
        question: "Which language is used to add interactivity to a web page?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["var", "int", "string", "define"],
        answer: "var"
    },

    {
        question: "Which method selects an element by its ID?",
        options: [
            "getElementById()",
            "queryClass()",
            "selectId()",
            "getElement()"
        ],
        answer: "getElementById()"
    }
];

let currentQuestion = 0;
let score = 0;
let selected = false;

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("startBtn");

const quizBox = document.getElementById("quiz-box");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

const nextBtn = document.getElementById("nextBtn");

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressBar = document.getElementById("progressBar");

const result = document.getElementById("result");
const scoreElement = document.getElementById("score");
const resultMessage = document.getElementById("resultMessage");

const restartBtn = document.getElementById("restartBtn");


/* Start Quiz */

startBtn.addEventListener("click", () => {

    startScreen.classList.add("hidden");

    quizBox.classList.remove("hidden");

    currentQuestion = 0;
    score = 0;

    showQuestion();
});


/* Show Question */

function showQuestion() {

    selected = false;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent =
        `Score: ${score}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    optionsElement.innerHTML = "";

    nextBtn.disabled = false;

    nextBtn.style.opacity = "1";


    current.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option");

        button.addEventListener("click", () => {

            if (selected) {
                return;
            }

            selected = true;

            if (option === current.answer) {

                button.classList.add("correct");

                score++;

                scoreDisplay.textContent =
                    `Score: ${score}`;

            } else {

                button.classList.add("wrong");

                const allOptions =
                    document.querySelectorAll(".option");

                allOptions.forEach(btn => {

                    if (btn.textContent === current.answer) {

                        btn.classList.add("correct");

                    }

                });

            }

        });

        optionsElement.appendChild(button);

    });
}


/* Next Button */

nextBtn.addEventListener("click", () => {

    if (!selected) {

        alert("Please select an answer first.");

        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


/* Show Result */

function showResult() {

    quizBox.classList.add("hidden");

    result.classList.remove("hidden");

    scoreElement.textContent =
        `Your score is ${score} out of ${questions.length}`;

    if (score === questions.length) {

        resultMessage.textContent =
            "Excellent! You got all answers correct.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Good job! Keep practicing to improve your score.";

    } else {

        resultMessage.textContent =
            "Keep practicing and try again.";

    }

}


/* Restart Quiz */

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    result.classList.add("hidden");

    quizBox.classList.remove("hidden");

    showQuestion();

});