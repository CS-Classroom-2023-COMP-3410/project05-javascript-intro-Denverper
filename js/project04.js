// Predefined questions
const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Rome", "Berlin"],
      correct: 0,
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: ["Charles Dickens", "William Shakespeare", "Mark Twain", "J.K. Rowling"],
      correct: 1,
    },
    {
      question: "What is the largest planet in our solar system?",
      choices: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: 2,
    },
    {
      question: "What is the chemical symbol for water?",
      choices: ["H2O", "O2", "CO2", "H2"],
      correct: 0,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedAnswerIndex = null; // Keeps track of the selected answer
  const userAnswers = [];
  
  // DOM Elements
  const quizContainer = document.getElementById("quiz-container");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const nextButton = document.getElementById("next-button");
  
  const summaryContainer = document.getElementById("summary-container");
  const scoreElement = document.getElementById("score");
  const reviewAnswersElement = document.getElementById("review-answers");
  const restartButton = document.getElementById("restart-button");
  
  // Load a question
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = ""; // Clear previous choices
  
    currentQuestion.choices.forEach((choice, index) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.className = "choice-item"; // Add a class for styling
      li.addEventListener("click", () => selectAnswer(index, li));
      choicesElement.appendChild(li);
    });
  
    selectedAnswerIndex = null; // Reset selected answer
    nextButton.disabled = true; // Disable the "Next" button initially
  }
  
  // Handle answer selection
  function selectAnswer(index, selectedElement) {
    // Ensure the user cannot select multiple answers
    if (selectedAnswerIndex !== null) return;
  
    selectedAnswerIndex = index; // Save the selected answer index
  
    const currentQuestion = questions[currentQuestionIndex];
  
    // Highlight selected answer and the correct answer
    Array.from(choicesElement.children).forEach((li, i) => {
      if (i === currentQuestion.correct) li.classList.add("correct");
      if (i === index && i !== currentQuestion.correct) li.classList.add("incorrect");
      li.removeEventListener("click", () => selectAnswer(i, li)); // Disable clicking other answers
    });
  
    // Track user response
    userAnswers.push({
      question: currentQuestion.question,
      selected: index,
      correct: currentQuestion.correct,
    });
  
    // Increment score if the answer is correct
    if (index === currentQuestion.correct) {
      score++;
    }
  
    // Enable "Next" button after an answer is selected
    nextButton.disabled = false;
  }
  
  // Show quiz summary
  function showSummary() {
    quizContainer.classList.add("hidden");
    summaryContainer.classList.remove("hidden");
  
    scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
    reviewAnswersElement.innerHTML = ""; // Clear previous review answers
  
    // Render user answers
    userAnswers.forEach((answer, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Q${index + 1}: ${answer.question}</strong><br>
        Your answer: <span class="${answer.selected === answer.correct ? 'correct' : 'incorrect'}">
          ${questions[index].choices[answer.selected] || "No Answer"}
        </span><br>
        Correct answer: ${questions[index].choices[answer.correct]}
      `;
      reviewAnswersElement.appendChild(li);
    });
  }
  
  // Restart the quiz
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.length = 0; // Clear stored answers
  
    summaryContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
  }
  
  // Event listeners
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showSummary();
    }
  });
  
  restartButton.addEventListener("click", restartQuiz);
  
  // Initialize quiz
  loadQuestion();
  