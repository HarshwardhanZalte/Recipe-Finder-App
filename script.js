document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    searchRecipes(query);
});

function searchRecipes(query) {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=3d6cca8b88db4fdb893a4472e1a84a03`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                displayRecipes(data.results);
            } else {
                displayNoResults();
            }
        })
        .catch(error => {
            console.error('Error fetching the recipes:', error);
            displayError(error);
        });
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        const recipeImage = recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}">` : '';

        recipeElement.innerHTML = `
            ${recipeImage}
            <h2>${recipe.title}</h2>
            <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a>
        `;

        recipesContainer.appendChild(recipeElement);
        
    });
}

function displayNoResults() {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '<p>No recipes found. Please try another search.</p>';
}

function displayError(error) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = `<p>Error: ${error.message}</p>`;
}
