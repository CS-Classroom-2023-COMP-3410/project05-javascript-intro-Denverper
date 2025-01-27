const textToType = document.getElementById("text-to-type");
const userInput = document.getElementById("user-input");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const playAgainButton = document.getElementById("play-again");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const typingArea = document.getElementById("typing-area");
const results = document.getElementById("results");
const difficultySelect = document.getElementById("difficulty");

let generatedText = "";
let startTime;
let totalCharactersTyped = 0;
let totalErrors = 0;

// Generate random text based on difficulty
function generateText(difficulty) {
  const easySentences = [
    "The fluffy cat is sleeping peacefully on the soft, blue mat.",
    "I love eating fresh apples and bananas on sunny afternoons.",
    "The sun is shining brightly, and the children are playing happily.",
    "A dog is barking loudly at the mailman in the quiet neighborhood.",
    "She enjoys reading short, exciting stories during her free time."
  ];

  const mediumSentences = [
    "The children were laughing and running in the large, grassy field.",
    "He found a small, rusty key hidden under the old wooden floorboards.",
    "The giraffe stretched its long neck to grab the highest, greenest leaves.",
    "I enjoy walking along the sandy beach while the tide is coming in.",
    "The bird flew swiftly and gracefully across the bright, cloudy sky."
  ];

  const hardSentences = [
    "Philosophers often ponder the infinite mysteries of the vast universe late at night.",
    "Supercalifragilisticexpialidocious is a challenging word that few people dare to spell correctly.",
    "The deconstruction of perceived reality remains a central theme in postmodern philosophy.",
    "Metamorphosis symbolizes both a physical change and a profound personal transformation.",
    "The juxtaposition of vibrant light and deep shadows creates a dramatic effect in the masterpiece."
  ];

  const sentences =
    difficulty === "easy"
      ? easySentences
      : difficulty === "medium"
      ? mediumSentences
      : hardSentences;

  return Array.from({ length: 3 }, () => sentences[Math.floor(Math.random() * sentences.length)]).join(" ");
}

// Start the typing trainer
function startGame() {
  const difficulty = difficultySelect.value;
  generatedText = generateText(difficulty);
  textToType.innerHTML = renderText("", generatedText); // Render the initial text
  userInput.value = "";
  totalCharactersTyped = 0;
  totalErrors = 0;
  typingArea.classList.remove("hidden");
  results.classList.add("hidden");
  startTime = Date.now();
}

// Restart the game
function restartGame() {
  startGame();
}

// Display results
function endGame() {
  const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
  const wordCount = generatedText.split(" ").length;
  const wpm = Math.round((wordCount / elapsedTime) * 60);

  // Calculate accuracy
  const totalCharacters = generatedText.length;
  const accuracy = Math.max(
    Math.round(((totalCharacters - totalErrors) / totalCharacters) * 100),
    0
  );

  // Display results
  wpmElement.textContent = wpm;
  accuracyElement.textContent = accuracy;
  typingArea.classList.add("hidden");
  results.classList.remove("hidden");
}

// Render text with real-time error highlighting (handles prefixes)
function renderText(input, text) {
  const inputWords = input.split(" ");
  const textWords = text.split(" ");

  return textWords
    .map((word, index) => {
      if (index < inputWords.length) {
        const typedWord = inputWords[index];
        // Check if the typed word matches or is a prefix of the actual word
        if (word.startsWith(typedWord)) {
          return `<span class="correct">${word}</span>`;
        } else {
          return `<span class="error">${word}</span>`;
        }
      }
      return word;
    })
    .join(" ");
}

// Highlight errors in real time
userInput.addEventListener("input", () => {
  const typedText = userInput.value.trim();
  totalCharactersTyped++;

  const typedWords = typedText.split(" ");
  const targetWords = generatedText.split(" ");

  totalErrors = 0; // Reset errors to recalculate
  typedWords.forEach((word, index) => {
    if (!targetWords[index]?.startsWith(word)) {
      totalErrors++; // Increment errors for incorrect words or prefixes
    }
  });

  textToType.innerHTML = renderText(typedText, generatedText);

  // Automatically end game when text matches
  if (typedText === generatedText) {
    endGame();
  }
});

// Event listeners
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
playAgainButton.addEventListener("click", restartGame);
