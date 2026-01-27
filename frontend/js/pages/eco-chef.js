document.addEventListener('DOMContentLoaded', () => {
    // Mock Recipe Data
    const recipes = [
        {
            id: 1,
            title: "Lentil Bolognese",
            ingredients: ["lentils", "tomato", "onion", "garlic", "pasta"],
            carbonScore: "low",
            image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            description: "A hearty plant-based version of the classic Italian dish."
        },
        {
            id: 2,
            title: "Spinach & Chickpea Curry",
            ingredients: ["spinach", "chickpeas", "coconut milk", "rice", "spices"],
            carbonScore: "low",
            image: "https://images.unsplash.com/photo-1594998993699-31c3bf193c9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            description: "Quick, nutritious, and incredibly low impact."
        },
        {
            id: 3,
            title: "Roasted Vegetable Salad",
            ingredients: ["sweet potato", "peppers", "zucchini", "quinoa", "olive oil"],
            carbonScore: "low",
            image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            description: "Use up those leftover veggies in this colorful bowl."
        },
        {
            id: 4,
            title: "Mushroom Risotto",
            ingredients: ["mushrooms", "rice", "vegetable broth", "onion", "parmesan"],
            carbonScore: "medium",
            image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            description: "Creamy and comforting, perfect for a cold evening."
        }
    ];

    // DOM Elements
    const fridgeInput = document.getElementById('fridgeIngredients');
    const findRecipesBtn = document.getElementById('findRecipesBtn');
    const resultsContainer = document.getElementById('recipeResults');
    const features = document.querySelectorAll('.feature-card');
    const tools = document.querySelectorAll('.tool-section');
    const shoppingListContainer = document.getElementById('shoppingListItems');

    // Tab Switching Logic
    features.forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-target');

            // Hide all tools
            tools.forEach(tool => tool.classList.remove('active'));

            // Show target tool
            document.getElementById(targetId).classList.add('active');

            // Scroll to tool
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Fridge Audit Logic
    findRecipesBtn.addEventListener('click', () => {
        const input = fridgeInput.value.toLowerCase();
        if (!input) {
            alert("Please enter some ingredients first!");
            return;
        }

        const ingredients = input.split(',').map(i => i.trim());
        const matchingRecipes = recipes.filter(recipe => {
            // Check if recipe contains at least one of the entered ingredients
            return ingredients.some(ing => recipe.ingredients.includes(ing));
        });

        displayRecipes(matchingRecipes);
    });

    // Display Recipes
    function displayRecipes(recipesToDisplay) {
        resultsContainer.innerHTML = '';

        if (recipesToDisplay.length === 0) {
            resultsContainer.innerHTML = '<p>No matching recipes found. Try different ingredients!</p>';
            return;
        }

        recipesToDisplay.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <div class="recipe-image" style="background-image: url('${recipe.image}')">
                    <span class="carbon-badge ${recipe.carbonScore}">
                        ${recipe.carbonScore.toUpperCase()} CARBON
                    </span>
                </div>
                <div class="recipe-content">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                    <button class="btn btn-sm btn-outline-primary mt-2 add-to-list-btn" data-id="${recipe.id}">
                        <i class="fa-solid fa-cart-plus"></i> Add to List
                    </button>
                </div>
            `;
            resultsContainer.appendChild(card);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.add-to-list-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('button').getAttribute('data-id'));
                addToShoppingList(id);
                alert('Ingredients added to shopping list!');
            });
        });

        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Shopping List Logic
    function addToShoppingList(recipeId) {
        const recipe = recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        // Simple categorization logic
        const aisleMap = {
            'produce': ['tomato', 'onion', 'garlic', 'spinach', 'sweet potato', 'peppers', 'zucchini', 'mushrooms'],
            'pantry': ['lentils', 'pasta', 'chickpeas', 'rice', 'quinoa', 'vegetable broth', 'spices', 'olive oil', 'coconut milk'],
            'dairy': ['parmesan']
        };

        recipe.ingredients.forEach(ing => {
            let category = 'other';
            for (const [aisle, items] of Object.entries(aisleMap)) {
                if (items.includes(ing)) {
                    category = aisle;
                    break;
                }
            }

            addListItem(ing, category);
        });
    }

    function addListItem(item, category) {
        // Check if category container exists, if not create it
        let catContainer = document.getElementById(`cat-${category}`);
        if (!catContainer) {
            catContainer = document.createElement('div');
            catContainer.id = `cat-${category}`;
            catContainer.className = 'aisle-category';
            catContainer.innerHTML = `<h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>`;
            shoppingListContainer.appendChild(catContainer);
        }

        // Add item if not already valid (simple check)
        const itemHTML = `
            <div class="shopping-item">
                <input type="checkbox" id="item-${item}">
                <label for="item-${item}">${item}</label>
            </div>
        `;
        catContainer.insertAdjacentHTML('beforeend', itemHTML);
    }

    // Initial Load - Random Suggestion
    // displayRecipes(recipes.slice(0, 2));
});
