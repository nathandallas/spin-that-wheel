let wheel = document.querySelector(".wheel");
let spinBtn = document.querySelector(".spinBtn");
let isSpinning = false;
let options = ["1", "2", "3", "4", "5", "6", "7", "8"];
let currentResult = "";

// Create Wheel
createWheel();

// Set up customizable option count
document.getElementById("optionCount").addEventListener("input", function () {
  const count = parseInt(this.value);
  const inputContainer = document.getElementById("optionInputs");
  inputContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.className = "option-input";
    div.innerHTML = `
        <label>Option ${i + 1}: </label>
        <input type="text" class="wheel-option" value="${
          options[i] || `Option ${i + 1}`
        }">
        `;
    inputContainer.appendChild(div);
  }
});

// Update wheel when button clicked
document.getElementById("updateWheel").addEventListener("click", function () {
  const optionInputs = document.querySelectorAll(".wheel-option");
  options = Array.from(optionInputs).map(input => input.value);
  createWheel();
});

spinBtn.onclick = function () {
  if (isSpinning) return;

  isSpinning = true;
  spinBtn.classList.add("disabled");
  let value = Math.ceil(Math.random() * 3600);
  wheel.style.transform = "rotate(" + value + "deg)";

  setTimeout(function () {
    isSpinning = false;
    spinBtn.classList.remove("disabled");
    const degrees = value % 360;
    let index =
      options.length - 1 - Math.floor((degrees / 360) * options.length);
    index = index % options.length;
    currentResult = options[index];
    showResult(currentResult);
  }, 5000);
};

// Create wheel segments
function createWheel() {
  wheel.innerHTML = "";
  const colors = [
    "#FFDA1F",
    "#FBAC23",
    "#F68128",
    "#F25A2C",
    "#ED3731",
    "#E93550",
    "#E43A75",
    "#E03E97",
    "#DB43B5",
    "#D747CF",
    "#BE4BD2",
    "#A250CE",
  ];
  const angle = 360 / options.length;

  options.forEach((option, i) => {
    const segment = document.createElement("div");
    segment.className = "number";
    segment.style.setProperty("--clr", colors[i % colors.length]);
    segment.style.transform = `rotate(${i * angle}deg)`;
    segment.innerHTML = `
            <span style="transform: rotate(${angle / 2}deg)">
                ${option}
            </span>
        `;
    wheel.appendChild(segment);
  });
}

// Show result
function showResult(result) {
  const modal = document.querySelector(".result-container");
  const resultText = document.querySelector("#resultText span");
  resultText.textContent = result;
  modal.classList.remove("hidden");
}

// Close
document.getElementById("closeResult").addEventListener("click", function () {
  document.querySelector(".result-container").classList.add("hidden");
});
