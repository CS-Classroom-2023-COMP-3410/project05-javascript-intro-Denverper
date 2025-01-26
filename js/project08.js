// Game state and story data
let gameState = {
currentScene: "start",
};

// Story structure
const story = {
start: {
    text: "You wake up in a dark forest. The air is cold, and the sound of rustling leaves surrounds you. You can barely see through the thick fog. What will you do?",
    choices: [
    { text: "Explore the forest", nextScene: "explore" },
    { text: "Stay where you are", nextScene: "stay" },
    { text: "Shout for help", nextScene: "shout" },
    ],
},
explore: {
    text: "You decide to explore the forest. After walking for a while, you hear the sound of running water. You also notice a faint light in the distance. Which way will you go?",
    choices: [
    { text: "Follow the sound of water", nextScene: "waterfall" },
    { text: "Head toward the light", nextScene: "cabin" },
    ],
},
stay: {
    text: "You decide to stay where you are. As the hours pass, the forest grows darker, and the sounds around you become more menacing. Suddenly, you hear footsteps approaching. What do you do?",
    choices: [
    { text: "Hide behind a tree", nextScene: "hide" },
    { text: "Confront the source of the noise", nextScene: "confront" },
    ],
},
shout: {
    text: "You shout for help, but your voice echoes through the forest. After a moment, you hear a response—a low growl. It seems you've attracted something's attention. What will you do?",
    choices: [
    { text: "Run as fast as you can", nextScene: "run" },
    { text: "Climb a nearby tree", nextScene: "tree" },
    ],
},
waterfall: {
    text: "You follow the sound of water and find a beautiful waterfall. As you approach, you notice a strange glowing object near the water's edge. Will you investigate?",
    choices: [
    { text: "Investigate the glowing object", nextScene: "artifact" },
    { text: "Ignore it and keep moving", nextScene: "deeper_forest" },
    ],
},
cabin: {
    text: "You approach the light and discover a small cabin. The door is slightly ajar, and you hear faint whispers coming from inside. What will you do?",
    choices: [
    { text: "Enter the cabin", nextScene: "inside_cabin" },
    { text: "Knock on the door", nextScene: "knock_cabin" },
    ],
},
hide: {
    text: "You quickly hide behind a tree. The footsteps grow louder, and you see a shadowy figure moving through the trees. It stops and sniffs the air. It seems to sense your presence. What will you do?",
    choices: [
    { text: "Stay completely still", nextScene: "still" },
    { text: "Make a run for it", nextScene: "run" },
    ],
},
confront: {
    text: "You step forward and confront the source of the noise. To your surprise, it's a traveler like you, lost in the forest. Together, you decide to team up and search for a way out.",
    choices: [],
},
run: {
    text: "You run as fast as you can, but the forest is dense, and the ground is uneven. You trip over a root and fall hard. When you look up, the shadowy figure is looming over you.",
    choices: [
    { text: "Fight back", nextScene: "fight" },
    { text: "Beg for mercy", nextScene: "mercy" },
    ],
},
tree: {
    text: "You climb a nearby tree just in time. Below you, a wolf emerges from the shadows. It circles the tree, snarling, but eventually loses interest and leaves. You climb down cautiously.",
    choices: [
    { text: "Head deeper into the forest", nextScene: "deeper_forest" },
    { text: "Try to find a way back", nextScene: "backtrack" },
    ],
},
artifact: {
    text: "You pick up the glowing object and feel a strange energy coursing through you. Suddenly, the forest seems less ominous, and you sense a clear path leading out.",
    choices: [
    { text: "Follow the path", nextScene: "escape" },
    { text: "Stay and explore the forest further", nextScene: "deeper_forest" },
    ],
},
deeper_forest: {
    text: "You venture deeper into the forest. The trees grow thicker, and the air becomes colder. You feel an eerie presence around you, but you can't see anything. Suddenly, you hear a loud crack behind you.",
    choices: [
    { text: "Turn around", nextScene: "turn" },
    { text: "Run forward", nextScene: "run" },
    ],
},
inside_cabin: {
    text: "You step inside the cabin and find a strange, dusty room filled with old books and artifacts. A mysterious figure sits in a chair, staring at you. 'I've been waiting for you,' they say.",
    choices: [
    { text: "Speak with the figure", nextScene: "speak" },
    { text: "Run out of the cabin", nextScene: "run" },
    ],
},
knock_cabin: {
    text: "You knock on the door, but no one answers. The whispers grow louder, and the door creaks open on its own. What will you do?",
    choices: [
    { text: "Enter cautiously", nextScene: "inside_cabin" },
    { text: "Leave the cabin and keep walking", nextScene: "deeper_forest" },
    ],
},
still: {
    text: "You stay completely still. The figure gets closer and closer until it's right next to you. It's a wolf, and it growls softly before walking away. You've survived this encounter, but for how long?",
    choices: [
    { text: "Continue exploring the forest", nextScene: "deeper_forest" },
    ],
},
fight: {
    text: "You fight back with all your strength. The figure is strong, but you manage to break free and run. Exhausted, you find a clearing where the forest ends. You've survived—for now.",
    choices: [],
},
mercy: {
    text: "You beg for mercy, and to your surprise, the shadowy figure lets you go. You run until you reach a road, where a passing car stops to help you. You've escaped.",
    choices: [],
},
backtrack: {
    text: "You try to backtrack, but the forest seems different. The path you took earlier is gone, and you feel hopelessly lost. You hear water nearby. What will you do?",
    choices: [
    { text: "Follow the water", nextScene: "waterfall" },
    { text: "Stay and rest", nextScene: "stay" },
    ],
},
speak: {
    text: "The figure smiles and beckons you closer. They reveal that the forest is enchanted, and only those with courage can find their way out. 'You have passed the test,' they say, and the cabin transforms into a portal.",
    choices: [
    { text: "Step through the portal", nextScene: "escape" },
    ],
},
turn: {
    text: "You turn around and come face-to-face with a glowing creature. It's not threatening, but it stares at you with curiosity. It seems to want to guide you somewhere.",
    choices: [
    { text: "Follow the creature", nextScene: "artifact" },
    { text: "Run away", nextScene: "run" },
    ],
},
escape: {
    text: "You step out of the forest into the sunlight. You've survived the journey and learned the secrets of the forest. Congratulations!",
    choices: [],
},
};  

// Display the current scene
function displayScene() {
const scene = story[gameState.currentScene];
const storyText = document.getElementById("story-text");
const choicesContainer = document.getElementById("choices");

// Update the story text
storyText.textContent = scene.text;

// Clear previous choices
choicesContainer.innerHTML = "";

// Display choices
scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.classList.add("btn");
    button.addEventListener("click", () => {
    gameState.currentScene = choice.nextScene;
    displayScene();
    });
    choicesContainer.appendChild(button);
});

// Hide choices if no options are available
if (scene.choices.length === 0) {
    const button = document.createElement("button");
    button.textContent = "Restart";
    button.classList.add("btn");
    button.addEventListener("click", () => resetGame());
    choicesContainer.appendChild(button);
}
}

// Save the game state to localStorage
function saveProgress() {
localStorage.setItem("interactiveStoryGameState", JSON.stringify(gameState));
alert("Progress saved!");
}

// Load the game state from localStorage
function loadProgress() {
const savedState = localStorage.getItem("interactiveStoryGameState");
if (savedState) {
    gameState = JSON.parse(savedState);
    displayScene();
} else {
    alert("No saved progress found.");
}
}

// Reset the game to the initial state
function resetGame() {
gameState = { currentScene: "start" };
displayScene();
localStorage.removeItem("interactiveStoryGameState");
}

// Event listeners for buttons
document.getElementById("reset-button").addEventListener("click", resetGame);
document.getElementById("save-button").addEventListener("click", saveProgress);
document.getElementById("load-button").addEventListener("click", loadProgress);

// Initialize the game
displayScene();
