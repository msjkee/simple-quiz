const questions = [
    {
        question: "Who is the creator of Telegram?",
        options: ["Pavel Durov", "Mark Zuckerberg", "Cristiano Ronaldo", "Bill Gates"],
        correctAnswer: "Pavel Durov"
    },
    {
        question: "Recent Formula 1 winner?",
        options: ["Lewis Hamilton", "Max Verstappen", "Lando Norris", "Daniil Kvyat"],
        correctAnswer: "Max Verstappen"
    },
    {
        question: "Which national football team won the 2022 World Cup in Qatar?",
        options: ["Argentina", "Brazil", "England", "France"],
        correctAnswer: "Argentina"
    },
    {
        question: "Who was the main actor in the Witcher series?",
        options: ["Henry Cavill", "Cillian Murphy", "Leonardo DiCaprio", "Andrew Garfield"],
        correctAnswer: "Henry Cavill"
    },
    {
        question: "Which country is the biggest?",
        options: ["USA", "Ireland", "France", "Russia"],
        correctAnswer: "Russia"
    },
    {
        question: "Which is the best college in Ireland?",
        options: ["Trinity College", "Technical University", "Griffith College", "UCD"],
        correctAnswer: "Griffith College"
    },
    {
        question: "Which PC game is the most popular in the world?",
        options: ["Dota 2", "Call of Duty", "Counter-Strike", "Warcraft III"],
        correctAnswer: "Dota 2"
    },
    {
        question: "Who is the G.O.A.T?",
        options: ["Cristiano Ronaldo", "Stephen Curry", "Lionel Messi", "All of them"],
        correctAnswer: "All of them"
    },
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "London", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Venus", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What year did the Titanic sink?",
        options: ["1912", "1920", "1905", "1935"],
        correctAnswer: "1912"
    }
]

var startBtn = document.getElementById("startBtn");
var previousBtn = document.getElementById("previousQuestion");
var nextBtn = document.getElementById("nextQuestion");
const playBtn = document.getElementById("play-btn");

var quiz = document.getElementById("quiz");
var option = document.getElementById("options");
var result = document.getElementById("result");
var inputBox = document.getElementById("input-box");
var footer = document.getElementById("footer");
var introductionHeader = document.getElementById("introduction-header");
var questionElement = document.getElementById("quiz-question");
const quizContent = document.getElementById("quiz-container");

let currentQuestionIndex = 0;
let randomQuestions = [];
let score = 0;

playBtn.addEventListener('click', introduction);
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    checkAnswer();

    if (currentQuestionIndex === randomQuestions.length - 1) {
        var username = document.getElementById("name").value;
        var percentageScore = (score / randomQuestions.length) * 100;
        var feedbackText = 'Well done, ' + username + '!' + ' Your Quiz is finished now! Your score: ' + percentageScore + '%!';
        result.innerText = feedbackText;
        result.style.display = 'block';
        quiz.style.display = 'none';
        result.style.fontWeight = 'normal';
    }

    if (currentQuestionIndex < randomQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
});
previousBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        score--;
        showQuestion();
    }
});

function introduction() {
    quizContent.style.display = 'block';
    playBtn.style.display = 'none';
}

function selectRandomQuestions(count) {
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    randomQuestions = shuffledQuestions.slice(0, count);
}

function startQuiz() {
    var username = document.getElementById("name").value;

    if (username !== "") {
        var introductionText = 'Welcome to the Interactive Quiz, ' + username + '!';
        introductionHeader.innerText = introductionText;

        selectRandomQuestions(5);
        showQuestion();

        introductionHeader.style.fontWeight = 'normal';
        startBtn.style.display = 'none';
        inputBox.style.display = 'none';
        footer.style.display = 'none';
        quiz.style.display = 'block';
    } else {
        alert("Please enter your name!");
    }
}

function showQuestion() {
    const questionData = randomQuestions[currentQuestionIndex];

    const questionElement = document.getElementById("quiz-question");
    const optionsContainer = document.getElementById("options");

    questionElement.textContent = questionData.question;

    optionsContainer.innerHTML = '';

    if (currentQuestionIndex === 0) {
        previousBtn.style.display = 'none';
    } else {
        previousBtn.style.display ='inline';
    }

    if (currentQuestionIndex > 0) {
        introductionHeader.style.display = 'none';
    }

    questionData.options.forEach((option, index) => {
        const optionId = `option${index + 1}`;
        const label = document.createElement("label");
        label.setAttribute("for", optionId);

        const checkbox = document.createElement("input");
        checkbox.type = "radio";
        checkbox.id = optionId;
        checkbox.name = "answer";
        checkbox.value = option;

        label.textContent = option;

        optionsContainer.appendChild(checkbox);
        optionsContainer.appendChild(label);

        optionsContainer.appendChild(document.createElement("br"));
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name=\"answer\"]:checked')

    const selectedOptionValue = selectedOption.value;
    const correctAnswer = randomQuestions[currentQuestionIndex].correctAnswer;

    if (selectedOptionValue === correctAnswer) {
        score += 1;
    }
}