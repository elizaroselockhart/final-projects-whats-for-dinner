import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "../components/recipeDetails";
import recipes from "../components/recipes";

let recipe =[1, 2, 3]

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
    // 
    
    let btnRandom = document.getElementById("clickMe");
    btnRandom.addEventListener('click', function() {
        console.log("random btn clicked!");
        let index = getRandomRecipe(recipe.length);

       // CONSTANTS.content.innerText = recipe[index];
        api.getRequest(CONSTANTS.RecipesAPIURL + recipe[index], data => {
            console.log(data);
             CONSTANTS.title.innerText= "What's For Dinner"
             CONSTANTS.content.innerHTML = recipeDetails.DisplayRecipeDetails(data); 

            // recipes.setupSearchBar();                     
        });

    });
}

function smallRandomBtn() {
    let showRandom = document.getElementById("navRandom");
    showRandom.style.display="none";
    showRandom.addEventListener('click', function () {
        console.log("small random clicked");
        

        let index = getRandomRecipe(recipe.length - 1);        
        api.getRequest(CONSTANTS.RecipesAPIURL + recipe[index], data => {
            console.log(data);
            CONSTANTS.title.innerText = "RecipeDetails"
            CONSTANTS.content.innerHTML = recipeDetails.DisplayRecipeDetails(data);
        });
    });
}



