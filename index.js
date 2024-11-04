// --- VARIABLES
const TEAS_LENGTH = 20;
let activeIndex = 0;
let selectedTea = "1";
let scrollTimeout;
const copyright = document.getElementById("copyright-date");
const messages = [
  { id: "1", cupNum: "15", message: "You make my heart smile! " },
  { id: "2", cupNum: "8", message: "Just a little note to say I care " },
  {
    id: "3",
    cupNum: "19",
    message: "I was here, soaking up the good vibes! ✨ ",
  },
  { id: "4", cupNum: "4", message: "Just passing by to say hi! 👋" },
  {
    id: "5",
    cupNum: "1",
    message: "You’re like a cupcake in a world of muffins! 🧁",
  },
  { id: "6", cupNum: "13", message: "Living life one sprinkle at a time! 🍭" },
  { id: "7", cupNum: "20", message: "Be the reason someone smiles today! 😊" },
  { id: "8", cupNum: "7", message: "Collecting moments, not things! ✨" },
  { id: "9", cupNum: "12", message: "Chasing clouds and catching dreams! ☁️" },
  {
    id: "10",
    cupNum: "2",
    message: "Just a dandelion dreaming of becoming a wish! 🌼",
  },
  {
    id: "11",
    cupNum: "18",
    message: "If life gives you lemons, make a rainbow! 🌈",
  },
  { id: "12", cupNum: "6", message: "Finding magic in the ordinary! ✨" },
  {
    id: "13",
    cupNum: "10",
    message: "You’re a limited edition, just like a rare gem! 💎",
  },
  {
    id: "14",
    cupNum: "16",
    message: "Dance like nobody’s watching, even if they are! 💃",
  },
  {
    id: "15",
    cupNum: "3",
    message: "Coffee in one hand, adventure in the other! ☕️🌍",
  },
  { id: "16", cupNum: "9", message: "Here’s a sprinkle of joy from me! 🎉" },
  {
    id: "17",
    cupNum: "5",
    message: "Just a star trying to shine brighter! ⭐️",
  },
  { id: "18", cupNum: "11", message: "You’re the sprinkles on my cupcake! 🎊" },
];

// --- QUERY SELECTORS

const teasRandomiserContainer = document.getElementById(
  "teas-randomiser-container"
);
const teasGridContainer = document.getElementById("teas-grid-container");
const section3 = document.querySelector(".section-3");
const selectedTeaImg = document.getElementById("selectedTeaImg");
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
const messageWall = document.getElementById("message-wall");
const form = document.getElementById("form");

// ---- RENDERS
const renderCups = () => {
  const cups = Array.from({ length: TEAS_LENGTH }).map(
    (_, i) => `./assets/cup-${i + 1}.svg`
  );
  teasRandomiserContainer.innerHTML = cups
    .map(
      (each, i) =>
        `<img src="${each}" alt="tea-${i + 1}" id="${
          i + 1
        }" class="tea each-random-tea ${i === 0 && "active"}"/>`
    )
    .join("");
  teasGridContainer.innerHTML = cups
    .map(
      (each, i) =>
        `<img src="${each}" alt="tea-${i + 1}" id="${
          i + 1
        }" class="tea each-griditem-tea"/>`
    )
    .join("");
};

// ---- ANIMATE
const animateCupPanInOut = () => {
  const randomTeas = document.querySelectorAll(".each-random-tea");
  setInterval(() => {
    randomTeas[activeIndex].classList.remove("active");
    activeIndex += 1;
    if (activeIndex >= TEAS_LENGTH) {
      activeIndex = 0;
    }
    randomTeas[activeIndex].classList.add("active");
  }, 2000);
};

// ---- EVENT LISTENERS

const selectedTeaListener = () => {
  const teas = document.querySelectorAll(".tea");
  teas.forEach((tea) =>
    tea.addEventListener("click", (e) => {
      selectedTea = e.currentTarget.id;
      selectedTeaImg.src = `./assets/cup-${selectedTea}.svg`;
      section3.scrollIntoView({ behavior: "smooth" });
    })
  );
};

const menuListeners = () => {
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("active");
  });

  nav.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("active");
  });

  window.addEventListener("scroll", (e) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      nav.classList.remove("active");
    }, [1000]);
  });
};

const formListener = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = e.target.elements.input.value;
    if (!message.trim()) {
      return;
    }
    messages.unshift({
      id: new Date().toISOString(),
      cupNum: selectedTea,
      message,
    });
    renderMessageWall();
    const flipCards = document.querySelectorAll(".flip-card");
    flipCards[0].focus();
    e.target.elements.input.value = "";
    messageWall.scrollIntoView({ behavior: "smooth" });
  });
};

const renderMessageWall = () => {
  messageWall.innerHTML = messages
    .map(
      (each) => `
       <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img
              src="./assets/cup-${each.cupNum}.svg"
              alt="section4-cup"
              class="section4cup"
            />
            <img
              src="./assets/plant2.gif"
              alt="section4-plant"
              class="section4plant"
            />
          </div>
          <div class="flip-card-back">
            <span
              >${each.message}</span
            >
             <img src="./assets/sparkle.gif" alt="" class="sparkle" />
          </div>
        </div>
      </div>
  `
    )
    .join("");
};

// --- EXECUTES
renderCups();
animateCupPanInOut();
menuListeners();
selectedTeaListener();
renderMessageWall();
formListener();
copyright.innerHTML = new Date().getFullYear();
