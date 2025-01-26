const periodicTable = document.getElementById("periodic-table");
const searchInput = document.getElementById("search-input");
const elementDetails = document.getElementById("element-details");
const elementName = document.getElementById("element-name");
const elementSymbol = document.getElementById("element-symbol");
const elementAtomicNumber = document.getElementById("element-atomic-number");
const elementGroup = document.getElementById("element-group");

// All elements with their data
const elements = [
    { "name": "Hydrogen", "symbol": "H", "number": 1, "group": "Reactive nonmetals", "category": "group-nonmetals", "position": { "row": 1, "col": 1 } },
    { "name": "Helium", "symbol": "He", "number": 2, "group": "Noble gases", "category": "group-noble-gases", "position": { "row": 1, "col": 18 } },
    { "name": "Lithium", "symbol": "Li", "number": 3, "group": "Alkali metals", "category": "group-alkali-metals", "position": { "row": 2, "col": 1 } },
    { "name": "Beryllium", "symbol": "Be", "number": 4, "group": "Alkaline earth metals", "category": "group-alkaline-earth-metals", "position": { "row": 2, "col": 2 } },
    { "name": "Boron", "symbol": "B", "number": 5, "group": "Metalloids", "category": "group-metalloids", "position": { "row": 2, "col": 13 } },
    { "name": "Carbon", "symbol": "C", "number": 6, "group": "Reactive nonmetals", "category": "group-nonmetals", "position": { "row": 2, "col": 14 } },
    { "name": "Nitrogen", "symbol": "N", "number": 7, "group": "Reactive nonmetals", "category": "group-nonmetals", "position": { "row": 2, "col": 15 } },
    { "name": "Oxygen", "symbol": "O", "number": 8, "group": "Reactive nonmetals", "category": "group-nonmetals", "position": { "row": 2, "col": 16 } },
    { "name": "Fluorine", "symbol": "F", "number": 9, "group": "Halogens", "category": "group-halogens", "position": { "row": 2, "col": 17 } },
    { "name": "Neon", "symbol": "Ne", "number": 10, "group": "Noble gases", "category": "group-noble-gases", "position": { "row": 2, "col": 18 } },
    { "name": "Sodium", "symbol": "Na", "number": 11, "group": "Alkali metals", "category": "group-alkali-metals", "position": { "row": 3, "col": 1 } },
    { "name": "Magnesium", "symbol": "Mg", "number": 12, "group": "Alkaline earth metals", "category": "group-alkaline-earth-metals", "position": { "row": 3, "col": 2 } },
    { "name": "Aluminium", "symbol": "Al", "number": 13, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 3, "col": 13 } },
    { "name": "Silicon", "symbol": "Si", "number": 14, "group": "Metalloids", "category": "group-metalloids", "position": { "row": 3, "col": 14 } },
    { "name": "Phosphorus", "symbol": "P", "number": 15, "group": "Reactive nonmetals", "category": "group-nonmetals", "position": { "row": 3, "col": 15 } },
    { "name": "Sulfur", "symbol": "S", "number": 16, "group": "Reactive nonmetals", "category": "group-nonmetals", "position": { "row": 3, "col": 16 } },
    { "name": "Chlorine", "symbol": "Cl", "number": 17, "group": "Halogens", "category": "group-halogens", "position": { "row": 3, "col": 17 } },
    { "name": "Argon", "symbol": "Ar", "number": 18, "group": "Noble gases", "category": "group-noble-gases", "position": { "row": 3, "col": 18 } },
    { "name": "Potassium", "symbol": "K", "number": 19, "group": "Alkali metals", "category": "group-alkali-metals", "position": { "row": 4, "col": 1 } },
    { "name": "Calcium", "symbol": "Ca", "number": 20, "group": "Alkaline earth metals", "category": "group-alkaline-earth-metals", "position": { "row": 4, "col": 2 } },
    { "name": "Scandium", "symbol": "Sc", "number": 21, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 4, "col": 3 } },
    { "name": "Titanium", "symbol": "Ti", "number": 22, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 4, "col": 4 } },
    { "name": "Vanadium", "symbol": "V", "number": 23, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 4, "col": 5 } },
    { "name": "Chromium", "symbol": "Cr", "number": 24, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 4, "col": 6 } },
    { "name": "Manganese", "symbol": "Mn", "number": 25, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 4, "col": 7 } },
    { "name": "Iron", "symbol": "Fe", "number": 26, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 4, "col": 8 } },
    { "name": "Cobalt", "symbol": "Co", "number": 27, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 4, "col": 9 } },
    { "name": "Nickel", "symbol": "Ni", "number": 28, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 4, "col": 10 } },
    { "name": "Copper", "symbol": "Cu", "number": 29, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 4, "col": 11 } },
    { "name": "Zinc", "symbol": "Zn", "number": 30, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 4, "col": 12 } },
    { "name": "Gallium", "symbol": "Ga", "number": 31, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 4, "col": 13 } },
    { "name": "Germanium", "symbol": "Ge", "number": 32, "group": "Metalloids", "category": "group-metalloids", "position": { "row": 4, "col": 14 } },
    { "name": "Arsenic", "symbol": "As", "number": 33, "group": "Metalloids", "category": "group-metalloids", "position": { "row": 4, "col": 15 } },
    { "name": "Selenium", "symbol": "Se", "number": 34, "group": "Reactive nonmetals", "category": "group-nonmetals", "position": { "row": 4, "col": 16 } },
    { "name": "Bromine", "symbol": "Br", "number": 35, "group": "Halogens", "category": "group-halogens", "position": { "row": 4, "col": 17 } },
    { "name": "Krypton", "symbol": "Kr", "number": 36, "group": "Noble gases", "category": "group-noble-gases", "position": { "row": 4, "col": 18 } },
    { "name": "Rubidium", "symbol": "Rb", "number": 37, "group": "Alkali metals", "category": "group-alkali-metals", "position": { "row": 5, "col": 1 } },
    { "name": "Strontium", "symbol": "Sr", "number": 38, "group": "Alkaline earth metals", "category": "group-alkaline-earth-metals", "position": { "row": 5, "col": 2 } },
    { "name": "Yttrium", "symbol": "Y", "number": 39, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 5, "col": 3 } },
    { "name": "Zirconium", "symbol": "Zr", "number": 40, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 5, "col": 4 } },
    { "name": "Niobium", "symbol": "Nb", "number": 41, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 5, "col": 5 } },
    { "name": "Molybdenum", "symbol": "Mo", "number": 42, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 5, "col": 6 } },
    { "name": "Technetium", "symbol": "Tc", "number": 43, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 5, "col": 7 } },
    { "name": "Ruthenium", "symbol": "Ru", "number": 44, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 5, "col": 8 } },
    { "name": "Rhodium", "symbol": "Rh", "number": 45, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 5, "col": 9 } },
    { "name": "Palladium", "symbol": "Pd", "number": 46, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 5, "col": 10 } },
    { "name": "Silver", "symbol": "Ag", "number": 47, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 5, "col": 11 } },
    { "name": "Cadmium", "symbol": "Cd", "number": 48, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 5, "col": 12 } },
    { "name": "Indium", "symbol": "In", "number": 49, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 5, "col": 13 } },
    { "name": "Tin", "symbol": "Sn", "number": 50, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 5, "col": 14 } },
    { "name": "Antimony", "symbol": "Sb", "number": 51, "group": "Metalloids", "category": "group-metalloids", "position": { "row": 5, "col": 15 } },
    { "name": "Tellurium", "symbol": "Te", "number": 52, "group": "Metalloids", "category": "group-metalloids", "position": { "row": 5, "col": 16 } },
    { "name": "Iodine", "symbol": "I", "number": 53, "group": "Halogens", "category": "group-halogens", "position": { "row": 5, "col": 17 } },
    { "name": "Xenon", "symbol": "Xe", "number": 54, "group": "Noble gases", "category": "group-noble-gases", "position": { "row": 5, "col": 18 } },
    { "name": "Cesium", "symbol": "Cs", "number": 55, "group": "Alkali metals", "category": "group-alkali-metals", "position": { "row": 6, "col": 1 } },
    { "name": "Barium", "symbol": "Ba", "number": 56, "group": "Alkaline earth metals", "category": "group-alkaline-earth-metals", "position": { "row": 6, "col": 2 } },
    { "name": "Lanthanum", "symbol": "La", "number": 57, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 4 } },
    { "name": "Cerium", "symbol": "Ce", "number": 58, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 5 } },
    { "name": "Praseodymium", "symbol": "Pr", "number": 59, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 6 } },
    { "name": "Neodymium", "symbol": "Nd", "number": 60, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 7 } },
    { "name": "Promethium", "symbol": "Pm", "number": 61, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 8 } },
    { "name": "Samarium", "symbol": "Sm", "number": 62, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 9 } },
    { "name": "Europium", "symbol": "Eu", "number": 63, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 10 } },
    { "name": "Gadolinium", "symbol": "Gd", "number": 64, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 11 } },
    { "name": "Terbium", "symbol": "Tb", "number": 65, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 12 } },
    { "name": "Dysprosium", "symbol": "Dy", "number": 66, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 13 } },
    { "name": "Holmium", "symbol": "Ho", "number": 67, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 14 } },
    { "name": "Erbium", "symbol": "Er", "number": 68, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 15 } },
    { "name": "Thulium", "symbol": "Tm", "number": 69, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 16 } },
    { "name": "Ytterbium", "symbol": "Yb", "number": 70, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 17 } },
    { "name": "Lutetium", "symbol": "Lu", "number": 71, "group": "Lanthanides", "category": "group-lanthanides", "position": { "row": 8, "col": 18 } },
    { "name": "Hafnium", "symbol": "Hf", "number": 72, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 6, "col": 4 } },
    { "name": "Tantalum", "symbol": "Ta", "number": 73, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 6, "col": 5 } },
    { "name": "Tungsten", "symbol": "W", "number": 74, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 6, "col": 6 } },
    { "name": "Rhenium", "symbol": "Re", "number": 75, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 6, "col": 7 } },
    { "name": "Osmium", "symbol": "Os", "number": 76, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 6, "col": 8 } },
    { "name": "Iridium", "symbol": "Ir", "number": 77, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 6, "col": 9 } },
    { "name": "Platinum", "symbol": "Pt", "number": 78, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 6, "col": 10 } },
    { "name": "Gold", "symbol": "Au", "number": 79, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 6, "col": 11 } },
    { "name": "Mercury", "symbol": "Hg", "number": 80, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 6, "col": 12 } },
    { "name": "Thallium", "symbol": "Tl", "number": 81, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 6, "col": 13 } },
    { "name": "Lead", "symbol": "Pb", "number": 82, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 6, "col": 14 } },
    { "name": "Bismuth", "symbol": "Bi", "number": 83, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 6, "col": 15 } },
    { "name": "Polonium", "symbol": "Po", "number": 84, "group": "Metalloids", "category": "group-metalloids", "position": { "row": 6, "col": 16 } },
    { "name": "Astatine", "symbol": "At", "number": 85, "group": "Halogens", "category": "group-halogens", "position": { "row": 6, "col": 17 } },
    { "name": "Radon", "symbol": "Rn", "number": 86, "group": "Noble gases", "category": "group-noble-gases", "position": { "row": 6, "col": 18 } },
    { "name": "Francium", "symbol": "Fr", "number": 87, "group": "Alkali metals", "category": "group-alkali-metals", "position": { "row": 7, "col": 1 } },
    { "name": "Radium", "symbol": "Ra", "number": 88, "group": "Alkaline earth metals", "category": "group-alkaline-earth-metals", "position": { "row": 7, "col": 2 } },
    { "name": "Actinium", "symbol": "Ac", "number": 89, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 4 } },
    { "name": "Thorium", "symbol": "Th", "number": 90, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 5 } },
    { "name": "Protactinium", "symbol": "Pa", "number": 91, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 6 } },
    { "name": "Uranium", "symbol": "U", "number": 92, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 7 } },
    { "name": "Neptunium", "symbol": "Np", "number": 93, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 8 } },
    { "name": "Plutonium", "symbol": "Pu", "number": 94, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 9 } },
    { "name": "Americium", "symbol": "Am", "number": 95, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 10 } },
    { "name": "Curium", "symbol": "Cm", "number": 96, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 11 } },
    { "name": "Berkelium", "symbol": "Bk", "number": 97, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 12 } },
    { "name": "Californium", "symbol": "Cf", "number": 98, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 13 } },
    { "name": "Einsteinium", "symbol": "Es", "number": 99, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 14 } },
    { "name": "Fermium", "symbol": "Fm", "number": 100, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 15 } },
    { "name": "Mendelevium", "symbol": "Md", "number": 101, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 16 } },
    { "name": "Nobelium", "symbol": "No", "number": 102, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 17 } },
    { "name": "Lawrencium", "symbol": "Lr", "number": 103, "group": "Actinides", "category": "group-actinides", "position": { "row": 9, "col": 18 } },
    { "name": "Rutherfordium", "symbol": "Rf", "number": 104, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 7, "col": 4 } },
    { "name": "Dubnium", "symbol": "Db", "number": 105, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 7, "col": 5 } },
    { "name": "Seaborgium", "symbol": "Sg", "number": 106, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 7, "col": 6 } },
    { "name": "Bohrium", "symbol": "Bh", "number": 107, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 7, "col": 7 } },
    { "name": "Hassium", "symbol": "Hs", "number": 108, "group": "Transition metals", "category": "group-transition-metals", "position": { "row": 7, "col": 8 } },
    { "name": "Meitnerium", "symbol": "Mt", "number": 109, "group": "Unknown properties", "category": "group-unknown", "position": { "row": 7, "col": 9 } },
    { "name": "Darmstadtium", "symbol": "Ds", "number": 110, "group": "Unknown properties", "category": "group-unknown", "position": { "row": 7, "col": 10 } },
    { "name": "Roentgenium", "symbol": "Rg", "number": 111, "group": "Unknown properties", "category": "group-unknown", "position": { "row": 7, "col": 11 } },
    { "name": "Copernicium", "symbol": "Cn", "number": 112, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 7, "col": 12 } },
    { "name": "Nihonium", "symbol": "Nh", "number": 113, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 7, "col": 13 } },
    { "name": "Flerovium", "symbol": "Fl", "number": 114, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 7, "col": 14 } },
    { "name": "Moscovium", "symbol": "Mc", "number": 115, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 7, "col": 15 } },
    { "name": "Livermorium", "symbol": "Lv", "number": 116, "group": "Post-transition metals", "category": "group-post-transition-metals", "position": { "row": 7, "col": 16 } },
    { "name": "Tennessine", "symbol": "Ts", "number": 117, "group": "Halogens", "category": "group-halogens", "position": { "row": 7, "col": 17 } },
    { "name": "Oganesson", "symbol": "Og", "number": 118, "group": "Noble gases", "category": "group-noble-gases", "position": { "row": 7, "col": 18 } }
  ];  

// Render the periodic table
function renderTable() {
  elements.forEach((element) => {
    const elementDiv = document.createElement("div");
    elementDiv.classList.add("element", element.category);
    elementDiv.style.gridColumn = element.position.col;
    elementDiv.style.gridRow = element.position.row;
    elementDiv.textContent = element.symbol;

    // Add click listener
    elementDiv.addEventListener("click", () => {
      showElementDetails(element);
      highlightElement(elementDiv);
    });

    periodicTable.appendChild(elementDiv);
  });
}

// Highlight selected element
function highlightElement(selectedDiv) {
  document.querySelectorAll(".element").forEach((el) => el.classList.remove("highlight"));
  selectedDiv.classList.add("highlight");
}

// Show element details
function showElementDetails(element) {
  elementDetails.classList.remove("hidden");
  elementName.textContent = element.name;
  elementSymbol.textContent = element.symbol;
  elementAtomicNumber.textContent = element.number;
  elementGroup.textContent = element.group;
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".element").forEach((div) => {
    const element = elements.find((el) => el.symbol === div.textContent);
    if (element && (element.name.toLowerCase().includes(query) || element.symbol.toLowerCase().includes(query) || String(element.number).includes(query))) {
      div.style.display = "block";
      div.style.visibility = "visible";
    } else {
      div.style.visibility = "hidden";
    }
  });
});

// Initialize the app
renderTable();
