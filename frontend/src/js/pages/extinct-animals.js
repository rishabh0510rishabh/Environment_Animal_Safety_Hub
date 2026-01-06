const extinctData = [
  {
    name: "Dodo",
    time: "1681",
    img: "../assets/extinct/dodo.jpg",
    desc: "Flightless bird native to Mauritius.",
    habitat: "Mauritius",
    diet: "Fruits & Seeds",
    cause: "Overhunting & invasive species"
  },
  {
    name: "Tasmanian Tiger (Thylacine)",
    time: "1936",
    img: "../assets/extinct/Tasmanian Tiger.jpg",
    desc: "Carnivorous marsupial with stripes.",
    habitat: "Tasmania, Australia",
    diet: "Meat",
    cause: "Hunting & habitat loss"
  },
  {
    name: "Woolly Mammoth",
    time: "~2000 BCE",
    img: "../assets/extinct/Woolly Mammoth.webp",
    desc: "Massive Ice Age mammal with long tusks.",
    habitat: "Northern Hemisphere",
    diet: "Grasses & herbs",
    cause: "Climate change & human hunting"
  },
  {
    name: "Passenger Pigeon",
    time: "1914",
    img: "../assets/extinct/Passenger Pigeon.webp",
    desc: "Once the most abundant bird in North America.",
    habitat: "North America",
    diet: "Seeds",
    cause: "Overhunting & deforestation"
  },
  {
    name: "Great Auk",
    time: "1844",
    img: "../assets/extinct/Great Auk.jpg",
    desc: "Large flightless seabird.",
    habitat: "North Atlantic",
    diet: "Fish",
    cause: "Overhunting"
  },
  {
    name: "Sabre-Toothed Cat (Smilodon)",
    time: "10,000 BCE",
    img: "../assets/extinct/Sabre-Toothed Cat.jpg",
    desc: "Prehistoric predator with long canines.",
    habitat: "Americas",
    diet: "Large mammals",
    cause: "Climate change & prey loss"
  },
  {
    name: "Steller’s Sea Cow",
    time: "1768",
    img: "../assets/extinct/Steller.jpg",
    desc: "Huge marine herbivore.",
    habitat: "North Pacific",
    diet: "Kelp & seaweed",
    cause: "Intensive hunting"
  },
  {
    name: "Aurochs",
    time: "1627",
    img: "../assets/extinct/Aurochs.webp",
    desc: "Wild ancestor of modern cattle.",
    habitat: "Eurasia",
    diet: "Grasses",
    cause: "Habitat loss & hunting"
  },
  {
    name: "Irish Elk",
    time: "7,700 BCE",
    img: "../assets/extinct/Irish Elk.jpg",
    desc: "Giant deer with massive antlers.",
    habitat: "Europe & Asia",
    diet: "Vegetation",
    cause: "Climate change & food scarcity"
  }
];


let eIndex = 0;

function render(gridId, data, count) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  data.slice(eIndex, eIndex + count).forEach(a => {
    const card = document.createElement("div");
    card.className = "animal-card";
    card.setAttribute("data-aos","fade-up");

    card.innerHTML = `
      ${a.time ? `<span class="time-badge">${a.time}</span>` : ""}
      <img src="${a.img}" alt="${a.name}">
      <div class="card-content">
        <h4>${a.name}</h4>
        <p>${a.desc}</p>
      </div>
    `;

    card.onclick = () => openModal(a);
    grid.appendChild(card);
  });

  // Hide Load More if all data loaded
  if (eIndex + count >= data.length) document.getElementById("loadMoreBtn").style.display = "none";
}

// Load More button
const loadBtn = document.getElementById("loadMoreBtn");
if (loadBtn) {
  loadBtn.addEventListener("click", ()=>{
    eIndex += 6; // increment index
    render("extinctGrid", extinctData, 6);
  });
}

// Modal
function openModal(a){
  const modal = document.getElementById("animalModal");
  modal.classList.add("active");
  document.getElementById("mImg").src = a.img;
  document.getElementById("mName").textContent = a.name;
  document.getElementById("mDesc").textContent = a.desc;
  document.getElementById("mHabitat").textContent = a.habitat;
  document.getElementById("mDiet").textContent = a.diet;
  document.getElementById("mCause").textContent = a.cause;
  document.getElementById("mTime").textContent = a.time ?? "—";
}
function closeModal(){
  document.getElementById("animalModal").classList.remove("active");
}

// Initial render
document.addEventListener("DOMContentLoaded", ()=>{
  render("extinctGrid", extinctData, 6);
});
