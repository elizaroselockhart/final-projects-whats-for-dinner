import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";
import recipes from "../components/recipes";

export default {
    setupNavBar,
    setupHome,
    setupRecipes,
}

export function setupNavBar(){
    return `
    <ul>
        <li id="navHome">Home</li>
        <li id="navRecipes">Recipes</li>       
    </ul>
    `;
}


function setupHome(){
    const btnHome = document.getElementById("navHome");
    btnHome.addEventListener("click", function(){
        CONSTANTS.tabTitle.innerText="Home";
        CONSTANTS.content.innerHTML =`
            <h1>What's For Dinner?</h1>
        `;
    });
}

function setupRecipes() {
    const btnRecipes = document.getElementById("navRecipes");
    btnRecipes.addEventListener("click", function(){
        console.log("Recipe display link hooked up!");
        api.getRequest(CONSTANTS.RecipesAPIURL, data => {
            CONSTANTS.content.innerHTML = recipes.displayRecipes(data);
            recipes.SetupAddRecipeEventListeners();
        });
    });
}