const OWNER = "Jagrati3";
const REPO = "Environment_Animal_Safety_Hub";

/* ================================
   CONFIG: ADD YOUR MENTORS HERE
================================ */
const mentors = [
  {
    username: "Jagrati3",
    role: "Project Mentor",
    badge: "Mentor"
  }
];

/* ================================
   DOM ELEMENTS
================================ */
const contributorsContainer = document.getElementById("contributorsContainer");
const mentorsSection = document.getElementById("mentorsSection");
const totalContributorsEl = document.getElementById("totalContributors");
const totalPRsEl = document.getElementById("totalPRs");
const totalCommitsEl = document.getElementById("totalCommits");
const searchInput = document.getElementById("searchInput");
const errorMessage = document.getElementById("errorMessage");

let contributorsData = [];

/* ================================
   FETCH CONTRIBUTORS (COMMITS)
================================ */
async function fetchContributors() {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contributors?per_page=100`
  );

  if (!res.ok) throw new Error("Failed to fetch contributors");
  return await res.json();
}

/* ================================
   FETCH ALL MERGED PRs (CORRECT WAY)
================================ */
async function fetchAllMergedPRs() {
  let page = 1;
  let allPRs = [];
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/pulls?state=closed&per_page=100&page=${page}`
    );

    if (!res.ok) throw new Error("Failed to fetch PRs");

    const data = await res.json();

    if (data.length === 0) {
      hasMore = false;
    } else {
      allPRs = [...allPRs, ...data];
      page++;
    }
  }

  // Only merged PRs
  return allPRs.filter(pr => pr.merged_at !== null);
}

/* ================================
   LOAD MENTORS
================================ */
async function loadMentors() {
  mentorsSection.innerHTML = "";

  for (let mentor of mentors) {
    try {
      const res = await fetch(`https://api.github.com/users/${mentor.username}`);
      const data = await res.json();

      const card = document.createElement("div");
      card.className = "mentor-card";

      card.innerHTML = `
        <img src="${data.avatar_url}" />
        <h3>${data.login}</h3>
        <p>${mentor.role}</p>
        <span class="badge">${mentor.badge}</span>
        <br/><br/>
        <a href="${data.html_url}" target="_blank" style="color:#00bfff;">View Profile</a>
      `;

      mentorsSection.appendChild(card);
    } catch (err) {
      console.error("Mentor load failed:", err);
    }
  }
}

/* ================================
   LOAD CONTRIBUTORS (OPTIMIZED)
================================ */
async function loadContributors() {
  try {
    contributorsContainer.innerHTML = "Loading...";

    const contributors = await fetchContributors();
    const mergedPRs = await fetchAllMergedPRs();

    // Count merged PRs per author
    const prCountMap = {};

    mergedPRs.forEach(pr => {
      const author = pr.user.login;
      prCountMap[author] = (prCountMap[author] || 0) + 1;
    });

    contributorsData = contributors.map(contributor => ({
      username: contributor.login,
      avatar: contributor.avatar_url,
      profile: contributor.html_url,
      commits: contributor.contributions,
      mergedPRs: prCountMap[contributor.login] || 0
    }));

    // Sort by merged PRs first, then commits
    contributorsData.sort((a, b) => {
      if (b.mergedPRs !== a.mergedPRs) {
        return b.mergedPRs - a.mergedPRs;
      }
      return b.commits - a.commits;
    });

    updateStats();
    displayContributors(contributorsData);

  } catch (error) {
    console.error(error);
    showError();
  }
}

/* ================================
   DISPLAY CONTRIBUTORS
================================ */
function displayContributors(data) {
  contributorsContainer.innerHTML = "";

  if (data.length === 0) {
    contributorsContainer.innerHTML = "No contributors found.";
    return;
  }

  data.forEach((user, index) => {
    const card = document.createElement("div");
    card.className = "contributor-card";

    // Crown for top contributor
    const crown = index === 0 ? "👑" : "";

    card.innerHTML = `
      <img src="${user.avatar}" />
      <h3>${crown} ${user.username}</h3>
      <p><strong>Commits:</strong> ${user.commits}</p>
      <p><strong>Merged PRs:</strong> ${user.mergedPRs}</p>
      <a href="${user.profile}" target="_blank">View Profile</a>
    `;

    contributorsContainer.appendChild(card);
  });
}

/* ================================
   UPDATE STATS
================================ */
function updateStats() {
  totalContributorsEl.textContent = contributorsData.length;

  const totalPRs = contributorsData.reduce(
    (sum, user) => sum + user.mergedPRs,
    0
  );

  const totalCommits = contributorsData.reduce(
    (sum, user) => sum + user.commits,
    0
  );

  totalPRsEl.textContent = totalPRs;
  totalCommitsEl.textContent = totalCommits;
}

/* ================================
   SEARCH
================================ */
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = contributorsData.filter((user) =>
    user.username.toLowerCase().includes(value)
  );

  displayContributors(filtered);
});

/* ================================
   ERROR
================================ */
function showError() {
  contributorsContainer.innerHTML = "";
  errorMessage.textContent =
    "Unable to load contributors. GitHub API rate limit exceeded.";
}

/* ================================
   INIT
================================ */
loadMentors();
loadContributors();
