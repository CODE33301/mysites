const quiz = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

let currentTopicIndex = 0;
let currentSubtopicIndex = 0;
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
    const currentTopic = quizData[currentTopicIndex];
    const currentSubtopic = currentTopic.subtopics[currentSubtopicIndex];

    quiz.innerHTML = `
        <div class="question">${currentSubtopic.question}</div>
        <label><input type="radio" name="answer" value="a"> ${currentSubtopic.a}</label><br>
        <label><input type="radio" name="answer" value="b"> ${currentSubtopic.b}</label><br>
        <label><input type="radio" name="answer" value="c"> ${currentSubtopic.c}</label><br>
        <label><input type="radio" name="answer" value="d"> ${currentSubtopic.d}</label><br>
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
        if (answer === quizData[currentTopicIndex].subtopics[currentSubtopicIndex].correct) {
            score++;
        }
        currentSubtopicIndex++;
        
        // Move to the next topic if all subtopics in the current topic are answered
        if (currentSubtopicIndex >= quizData[currentTopicIndex].subtopics.length) {
            currentTopicIndex++;
            currentSubtopicIndex = 0; // Reset subtopic index for the new topic
        }

        // Check if there are more topics to display
        if (currentTopicIndex < quizData.length) {
            loadQuiz();
        } else {
            result.innerHTML = `You scored ${score} out of ${quizData.length * 3}`; // Assuming 3 questions per topic
            quiz.style.display = "none";
            submitButton.style.display = "none";
        }
    } else {
        alert("Please select an answer!");
    }
});
