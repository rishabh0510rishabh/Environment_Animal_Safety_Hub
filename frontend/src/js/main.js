/* ===== ECOLIFE MAIN JAVASCRIPT ===== */

/**
 * Main application entry point.
 * Initializes all modular components when the DOM is fully loaded.
 * This serves as the central initialization hub for the entire application,
 * calling init functions from all imported modules in the correct order.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initNavbar();
  initSmoothScroll();
  initBackToTop();
  initAOS();
  initCounterAnimation();
  initParticles();
  initFormHandlers();
  initNavbarActiveState();
  initScrollProgress();
  initEcoChallenges();
  initTestimonialSlider();
  initModalSystem();
});



const carbonForm = document.getElementById("carbonForm");
const carbonResult = document.getElementById("carbonResult");
const carbonScoreEl = document.getElementById("carbonScore");
const carbonLevelEl = document.getElementById("carbonLevel");
const carbonTipsEl = document.getElementById("carbonTips");
const carbonBadge = document.getElementById("carbonBadge");
const liveScore = document.getElementById("liveScore");
const progressBar = document.getElementById("carbonProgress");

const weights = {
  transport: { walk: 1, public: 2, bike: 3, car: 5 },
  electricity: { low: 1, medium: 3, high: 5 },
  plastic: { low: 1, medium: 3, high: 5 },
};

function updateLiveScore() {
  let score = 0;
  let filled = 0;

  ["transport", "electricity", "plastic"].forEach((id) => {
    const val = document.getElementById(id).value;
    if (val) {
      score += weights[id][val];
      filled++;
    }
  });

  progressBar.style.width = `${(filled / 3) * 100}%`;
  liveScore.textContent = filled ? score : "—";
}

carbonForm.addEventListener("change", updateLiveScore);

carbonForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let score =
    weights.transport[transport.value] +
    weights.electricity[electricity.value] +
    weights.plastic[plastic.value];

  carbonScoreEl.textContent = score;

  carbonTipsEl.innerHTML = "";
  carbonBadge.className = "carbon-badge";

  if (score <= 4) {
    carbonLevelEl.textContent = "Excellent! You live a very eco-friendly life 🌱";
    carbonBadge.textContent = "Low Impact";
    carbonBadge.classList.add("low");
    carbonTipsEl.innerHTML += `<li><i class="fa-solid fa-check"></i> Keep inspiring others!</li>`;
  } else if (score <= 8) {
    carbonLevelEl.textContent = "Moderate footprint. Small changes can help 🌍";
    carbonBadge.textContent = "Medium Impact";
    carbonBadge.classList.add("medium");
    carbonTipsEl.innerHTML += `
      <li><i class="fa-solid fa-leaf"></i> Use public transport more</li>
      <li><i class="fa-solid fa-lightbulb"></i> Reduce power usage</li>`;
  } else {
    carbonLevelEl.textContent = "High footprint. Time to act now 🚨";
    carbonBadge.textContent = "High Impact";
    carbonBadge.classList.add("high");
    carbonTipsEl.innerHTML += `
      <li><i class="fa-solid fa-recycle"></i> Cut plastic usage</li>
      <li><i class="fa-solid fa-bus"></i> Avoid private vehicles</li>
      <li><i class="fa-solid fa-tree"></i> Plant trees regularly</li>`;
  }

  carbonResult.classList.add("success");
  carbonResult.scrollIntoView({ behavior: "smooth" });
});
const timelineItems = document.querySelectorAll(".timeline-item");

function revealTimeline() {
  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (itemTop < windowHeight - 100) {
      item.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealTimeline);

// Initial check
revealTimeline();



function showFuture(year) {
  const box = document.getElementById("futureDisplay");

  if (year === "present") {
    box.innerHTML = `
      🌍
      <h3>Earth Today</h3>
      <p>Nature is still healing. Our actions matter.</p>`;
    box.style.background = "#c8e6c9";
  }

  if (year === "2050") {
    box.innerHTML = `
      🌎
      <h3>Earth in 2050</h3>
      <p>Less trees 🌳, hotter climate 🌡️, rising seas 🌊</p>`;
    box.style.background = "#fff3cd";
  }

  if (year === "2100") {
    box.innerHTML = `
      🌑
      <h3>Earth in 2100</h3>
      <p>Extreme heat ☠️, wildlife loss 🐾, water scarcity 💧</p>`;
    box.style.background = "#f8d7da";
  }
}



function updateSurvivalScore(air, water, bio) {
  document.getElementById("airBar").style.width = air + "%";
  document.getElementById("airBar").textContent = air + "%";

  document.getElementById("waterBar").style.width = water + "%";
  document.getElementById("waterBar").textContent = water + "%";

  document.getElementById("bioBar").style.width = bio + "%";
  document.getElementById("bioBar").textContent = bio + "%";

  const survival = Math.round((air + water + bio) / 3);
  document.getElementById("finalScore").textContent =
    "Survival Score: " + survival + "%";

  const msg = document.getElementById("scoreMessage");

  if (survival >= 75) {
    msg.textContent = "🌱 Earth is thriving! Life is safe.";
  } else if (survival >= 40) {
    msg.textContent = "⚠️ Earth is struggling. Action needed!";
  } else {
    msg.textContent = "☠️ Earth is in danger. Immediate action required!";
  }
}

/* Example values – connect with your game */
updateSurvivalScore(70, 55, 65);


const toggle = document.getElementById("themeToggle");
  const icon = toggle.querySelector("i");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");
    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun", isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  const scrollBtn = document.getElementById("scrollBottomBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  });

 

function updateEarth(score) {
  const earth = document.getElementById("earth");
  const text = document.getElementById("earthText");
  const sun = document.querySelector(".sun-rays");
  const rain = document.querySelector(".rain");
  const birds = document.getElementById("birdsSound");
  const heart = document.getElementById("heartSound");

  earth.className = "earth";
  sun.style.opacity = 0;
  rain.style.opacity = 0;

  birds.pause();
  heart.pause();
  birds.currentTime = 0;
  heart.currentTime = 0;

  if (score >= 60) {
    earth.classList.add("happy");
    sun.style.opacity = 1;
    birds.play();
    text.innerText = "Earth is happy and thriving 🌱";
  }
  else if (score >= 20) {
    earth.classList.add("sad");
    rain.style.opacity = 1;
    text.innerText = "Earth is sad... needs care 💧";
  }
  else {
    earth.classList.add("critical");
    rain.style.opacity = 1;
    heart.play();
    text.innerText = "Earth is critical! Act now 🚨";
  }
}

/* Example auto-call */
updateEarth(75);

