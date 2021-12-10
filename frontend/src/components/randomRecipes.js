import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "../components/recipeDetails";
import navbar from "../components/navbar"

export default {
    getRandomRecipe,
    setupRandomBtn,
    smallRandomBtn
}


export function getRandomRecipe(num) {
    let result = Math.floor(Math.random()*num);
    return result;
}


export async function setupRandomBtn() {
    let btnRandom = document.getElementById("clickMe");
    let recipeIds = [];

    let recipes = await api.SyncGetRequest(CONSTANTS.RecipesAPIURL);
    recipes.forEach(recipe => {
        recipeIds.push(recipe.id);
    });

    btnRandom.addEventListener('click', async function() {
        console.log("random btn clicked!");
        let index = getRandomRecipe(recipeIds.length);
        let randomRecipeId = recipeIds[index];

        let randomRecipe = await api.SyncGetRequest(CONSTANTS.RecipesAPIURL + randomRecipeId);
        CONSTANTS.title.innerText = "What's For Dinner";
        CONSTANTS.content.innerHTML = await recipeDetails.DisplayRecipeDetails(randomRecipe);
        navbar.hideNavSearchBarDisplayRecipes();
        recipeDetails.SetupEditRecipeEventListeners();
        smallRandomBtn();
    });
}

async function smallRandomBtn() {
    let showRandom = document.getElementById("navRandom");
    let recipeIds = [];
    let recipes = await api.SyncGetRequest(CONSTANTS.RecipesAPIURL);
    recipes.forEach(recipe => {
        recipeIds.push(recipe.id);
    });
    // showRandom.style.display="none";
    showRandom.addEventListener('click', async function() {
        console.log("small random clicked");
        
        let index = getRandomRecipe(recipeIds.length);  
        let randomRecipeId = recipeIds[index];      
        let randomRecipe = await api.SyncGetRequest(CONSTANTS.RecipesAPIURL + randomRecipeId);
        CONSTANTS.title.innerText = "What's For Dinner";
        CONSTANTS.content.innerHTML = await recipeDetails.DisplayRecipeDetails(randomRecipe);
        navbar.hideNavSearchBarDisplayRecipes();
        recipeDetails.SetupEditRecipeEventListeners();
        smallRandomBtn();
    });
}



