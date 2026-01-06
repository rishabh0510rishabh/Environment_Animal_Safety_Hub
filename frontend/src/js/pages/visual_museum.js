// Initialize Animate On Scroll (AOS)
AOS.init({
    once: true, // Animation happens only once
    offset: 100, // Trigger point
});

const animals = [
    {
        name: "Dodo", 
        scientific: "Raphus cucullatus", 
        desc: "A flightless bird from Mauritius, extinct due to human activity.", 
        status: "EXT", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvn6lVUkTAw3IUwiw7eqsIL1qUKuROlnZeVfntDyPK_j-C-GYwC4Nf5RG3LtqyQ84VKEoHcG1s7Xl4ZiDMTa1Fojvb-ZfSBiyRk9yNCZPZXA&s=10"
    },
    {
        name: "Bengal Tiger", 
        scientific: "Panthera tigris tigris", 
        desc: "Largest tiger subspecies, critically endangered.", 
        status: "END", 
        img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg"
    },
    {
        name: "Giant Panda", 
        scientific: "Ailuropoda melanoleuca", 
        desc: "Native to China, now classified as vulnerable after conservation.", 
        status: "REC", 
        img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG"
    },
    {
        name: "Passenger Pigeon", 
        scientific: "Ectopistes migratorius", 
        desc: "Once abundant in North America, extinct by early 20th century.", 
        status: "EXT", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ4Li5bmjwk9idrJRjovgkIwxz2m0pnfQRyrhakUwnq4Y_Gdln8gdBSXXZGhc_3GqtsmB7T-KyFlR1RMRFm-FmajdgtlOs8fnIidz6l7exDQ&s=10"
    },
    {
        name: "African Elephant", 
        scientific: "Loxodonta africana", 
        desc: "Largest land mammal, endangered due to poaching.", 
        status: "END", 
        img: "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg"
    },
    {
        name: "Bald Eagle", 
        scientific: "Haliaeetus leucocephalus", 
        desc: "Recovered in North America through conservation efforts.", 
        status: "REC", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQPrSx16s7lvq6Tluw6hLcckx7X_3DOG_BQieqBQyHxhiXaos_abPU_mZTZkGs4KiRP0-gdX6f1YlTvLFI3Wx6Cc_ehuPSklixCYykpT4Z6A&s=10"
    },
    {
        name: "Great Auk", 
        scientific: "Pinguinus impennis", 
        desc: "Flightless seabird, extinct in the 19th century.", 
        status: "EXT", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq_CIaEgCmxdOJJ1miE1_6fy4Z2E_Aqo8ekHo6xYvjD30kNfU1LL52Vo4eD3ioDMSRqRvmmCZj7StB-A5J0vK16wvfFFrs8-PSscPfDEg6ZQ&s=10"
    },
    {
        name: "Snow Leopard", 
        scientific: "Panthera uncia", 
        desc: "Vulnerable mountain predator in Central Asia.", 
        status: "END", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4LZa6sxD12mHOns4RVRS2knJVNVdhfq9nsjh4LlLtDP1T_k2DDALXzpIs4KAh_MXxEnx-0oguggAnr27l66E9Ei1I1-CeLjmg2ynndArq&s=10"
    },
    {
        name: "Red Panda", 
        scientific: "Ailurus fulgens", 
        desc: "Small mammal from Himalayas, recovered in conservation areas.", 
        status: "REC", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAEp75tMV22Ts7Qotj_AschdAREORBqN9cahBCvJYJzeYcJ8_4iir4eHC8sudrnnF70dHYwqC6Y8XYsIMasOsyel45BsYgWgnRWEiS81Q&s=10"
    },
    {
        name: "Carolina Parakeet", 
        scientific: "Conuropsis carolinensis", 
        desc: "Native to North America, extinct in early 20th century.", 
        status: "EXT", 
        img: "https://tse2.mm.bing.net/th/id/OIP.ywjvYkIeeVKvvRnVkw4WcQHaG0?w=640&h=590&rs=1&pid=ImgDetMain&o=7&rm=3"
    }
];

const museumGrid = document.getElementById('museumGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

function populateMuseum(filter = 'all') {
    museumGrid.innerHTML = '';
    
    // Convert NodeList to Array to use for filter if needed, 
    // or just iterate animals
    let filteredAnimals = animals.filter(animal => filter === 'all' || animal.status === filter);
    
    filteredAnimals.forEach((animal, index) => {
        const card = document.createElement('div');
        card.classList.add('animal-card');
        
        // Add AOS Animation attributes
        // The delay increases with the index to create a "wave" loading effect
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString()); 
        
        // Status Text Map
        let statusText = "";
        if(animal.status === 'EXT') statusText = "Extinct";
        else if(animal.status === 'END') statusText = "Endangered";
        else statusText = "Recovered";

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${animal.img}" alt="${animal.name}" class="animal-image">
                <div class="status-badge status-${animal.status}">${statusText}</div>
            </div>
            <div class="animal-content">
                <h3 class="animal-name">${animal.name}</h3>
                <p class="scientific-name">${animal.scientific}</p>
                <p class="animal-description">${animal.desc}</p>
            </div>
        `;
        museumGrid.appendChild(card);
    });
}

// Initial Load
populateMuseum('all');

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');
        // Re-populate
        populateMuseum(btn.dataset.filter);
    });
});