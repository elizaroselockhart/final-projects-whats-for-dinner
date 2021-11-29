import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";
import recipes from "../components/recipes";

export default {
    setupNavBar,
    setupPantry

}

export function setupNavBar(){
    return `
    <ul>
        <li id="navPantry">Pantry</li>
        <li id="navLogin">Login</li>       
    </ul>
    `;
}



export function setupPantry() {
    const btnPantry = document.getElementById("navPantry");
    btnPantry.addEventListener("click", function(){
        console.log("Pantry display link hooked up!");
        api.getRequest(CONSTANTS.RecipesAPIURL, data => {
            CONSTANTS.title.innerText = "All Recipes";
            CONSTANTS.tabTitle.innerText = "All Recipes";
            CONSTANTS.content.innerHTML = recipes.displayRecipes(data);
            recipes.setupRecipeLinks();
            recipes.setupSearchBar();
            recipes.hideRecipeList();  
            recipes.SetupAddRecipeEventListeners(); 
        });
    });
}
