const searchInput = document.querySelector('#food-input');
const recipeSection = document.querySelector('.recipe-section');
const recipesList = document.querySelector('#recipes-list');
const mainTitle = document.querySelector('#section-heading');

/* 
<ul id="recipes-list">
    <li>
        <a href="" class="recipe-card">
            <h2>Poached Eggs</h2>
            <img>
            <p>Breakfast</p>
            <p>Low-Carb, Low-Sodium</p>
        </a>
    </li>
</ul>

<div class="container">
  <div class="image"></div>
  <div class="title"></div>
  <div class="meal-type"></div>
  <div class="diet-labels"></div>
</div>

*/
function generateRecipeCard(data) {
    const card = `
        <a href="${data.recipe.url}" class="flex-card" target="_blank">
            <h2 class="title">${data.recipe.label}</h2>
            <img src="${data.recipe.image}" class="recipe-image">
            <p class="meal-type">${data.recipe.mealType[0]}</p>
            <p class="diet-labels">${data.recipe.dietLabels.join(", ")}</p>
        </a>
    `
    const newLi = document.createElement('li');
    newLi.classList.add("recipe-card");
    newLi.innerHTML = card;
    recipesList.appendChild(newLi);

}

function handleRecipeSearch(e) {

    if (e.keyCode === 13 && e.target.value !== '') {
        const searchValue = e.target.value;
        fetchRecipe(searchValue);
        e.preventDefault();
        recipeSection.style.justifyContent = 'flex-start';
        mainTitle.innerText = `${searchValue} Recipes`;
        recipesList.innerHTML = "";
    }
}

function handleInputChange() {}

async function fetchRecipe(food) {
    const URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=09c9432e&app_key=9fd4ad6664f10395496d92698980d8cf`;
    const response = await fetch(URL);
    const json = await response.json();

    const recipeArr = json.hits.slice(0, 8);
    

    recipeArr.forEach( (element) => {
        generateRecipeCard(element);
    });
}

searchInput.addEventListener('keyup', handleRecipeSearch)