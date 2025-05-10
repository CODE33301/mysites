const quiz = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;
let quizData = [];

// Load quiz data from JSON file
fetch('quiz_data.json')
    .then(response => response.json())
    .then(data => {
        quizData = data;
        loadQuiz();
    })
    .catch(error => console.error('Error loading quiz data:', error));

function loadQuiz() {
    const currentQuestion = quizData[currentQuestionIndex];
    quiz.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <label><input type="radio" name="answer" value="a"> ${currentQuestion.a}</label><br>
        <label><input type="radio" name="answer" value="b"> ${currentQuestion.b}</label><br>
        <label><input type="radio" name="answer" value="c"> ${currentQuestion.c}</label><br>
        <label><input type="radio" name="answer" value="d"> ${currentQuestion.d}</label><br>
    `;
}

function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    for (const answer of answers) {
        if (answer.checked) {
            return answer.value;
        }
    }
    return undefined;
}

submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuiz();
        } else {
            result.innerHTML = `You scored ${score} out of ${quizData.length}`;
            quiz.style.display = "none";
            submitButton.style.display = "none";
        }
    } else {
        alert("Please select an answer!");
    }
});
