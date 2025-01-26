const arrayContainer = document.getElementById("array-container");
const commentary = document.getElementById("commentary");
const algorithmSelect = document.getElementById("algorithm");
const speedControl = document.getElementById("speed");
const sortButton = document.getElementById("sort");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let array = [];
let delay = 200 / speedControl.value;
let isSorting = false;

// Generate a random array
function generateArray() {
  array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
  renderArray();
}

// Render the array as bars
function renderArray() {
    arrayContainer.innerHTML = "";
    array.forEach((value, idx) => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.style.width = "20px";
        bar.className = "array-bar default";
        bar.id = `bar-${idx}`;
        bar.title = value;
        arrayContainer.appendChild(bar);
    });
}

// Highlight bars during the sorting process
function highlightBar(index, state) {
  const bar = document.getElementById(`bar-${index}`);
  bar.className = `array-bar ${state}`;
}

// Pause execution for animation
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Bubble sort with animation
async function bubbleSort() {
  commentary.textContent = "Starting Bubble Sort...";
  isSorting = true;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (!isSorting) return;

      highlightBar(j, "comparing");
      highlightBar(j + 1, "comparing");

      if (array[j] > array[j + 1]) {
        commentary.textContent = `Swapping ${array[j]} and ${array[j + 1]}`;
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderArray();
        await sleep(delay);
      }

      highlightBar(j, "default");
      highlightBar(j + 1, "default");
    }
  }

  commentary.textContent = "Bubble Sort Complete!";
  isSorting = false;
}

// Insertion sort with animation
async function insertionSort() {
  commentary.textContent = "Starting Insertion Sort...";
  isSorting = true;

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    highlightBar(i, "moving");

    while (j >= 0 && array[j] > key) {
      if (!isSorting) return;

      commentary.textContent = `Moving ${array[j]} to position ${j + 1}`;
      array[j + 1] = array[j];
      renderArray();
      await sleep(delay);

      highlightBar(j, "moving");
      highlightBar(j + 1, "moving");

      j--;
    }

    array[j + 1] = key;
    renderArray();
    await sleep(delay);

    highlightBar(j + 1, "default");
  }

  commentary.textContent = "Insertion Sort Complete!";
  isSorting = false;
}

// Stop the sorting process
function stopSorting() {
  isSorting = false;
  commentary.textContent = "Sorting Stopped.";
}

// Event listeners
sortButton.addEventListener("click", () => {
  if (isSorting) return;

  const algorithm = algorithmSelect.value;
  if (algorithm === "bubble") bubbleSort();
  else if (algorithm === "insertion") insertionSort();
});

stopButton.addEventListener("click", stopSorting);

resetButton.addEventListener("click", () => {
  isSorting = false;
  generateArray();
});

speedControl.addEventListener("input", (e) => {
  delay = 200 / e.target.value;
});

window.onload = generateArray;
