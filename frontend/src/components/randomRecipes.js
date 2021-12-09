import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "../components/recipeDetails";
import recipes from "../components/recipes";



export function getAllRecipes() {
    let recipeIds = [];
    api.getRequest(CONSTANTS.RecipesAPIURL, data => {
        recipes.forEach(recipe => {
            recipeIds.push(recipe.id);
        });
    });
}

export default {
    getRandomRecipe,
    setupRandomBtn,
    smallRandomBtn
}


export function getRandomRecipe(num) {
    let result = Math.floor(Math.random()*num);
    return result;
}


export function setupRandomBtn() {
    let btnRandom = document.getElementById("clickMe");
    let recipeIds = [];
    api.getRequest(CONSTANTS.RecipesAPIURL, recipes => {
        recipes.forEach(recipe => {
            recipeIds.push(recipe.id);
        });
    });
    btnRandom.addEventListener('click', function() {
        console.log("random btn clicked!");
        let index = getRandomRecipe(recipeIds.length);
        let randomRecipeId = recipeIds[index];
        api.getRequest(CONSTANTS.RecipesAPIURL + randomRecipeId, data => {
            console.log(data);
             CONSTANTS.title.innerText= "What's For Dinner"
             CONSTANTS.content.innerHTML = recipeDetails.DisplayRecipeDetails(data);                   
        });
    });
}

function smallRandomBtn() {
    let showRandom = document.getElementById("navRandom");
    let recipeIds = [];
    api.getRequest(CONSTANTS.RecipesAPIURL, recipes => {
        recipes.forEach(recipe => {
            recipeIds.push(recipe.id);
        });
    });
    showRandom.style.display="none";
    showRandom.addEventListener('click', function () {
        console.log("small random clicked");
        
        let index = getRandomRecipe(recipeIds.length);  
        let randomRecipeId = recipeIds[index];      
        api.getRequest(CONSTANTS.RecipesAPIURL + randomRecipeId, data => {
            console.log(data);
             CONSTANTS.title.innerText= "What's For Dinner"
             CONSTANTS.content.innerHTML = recipeDetails.DisplayRecipeDetails(data);  
        });
    });
}



