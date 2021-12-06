import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipes from "../components/recipes";
import tags from "../components/tags";

export default {
    setupNavBar,
    setupPantry
}

export function setupNavBar(){
    return `
    <ul>
        <li id="navPantry">Pantry</li>
        <li id="navTags">Tags</li>
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
            recipes.setupRecipeDeleteButton();
            recipes.setupSearchBar();
            recipes.hideRecipeList();  
            recipes.SetupAddRecipeEventListeners(); 
        });
    });
}

export function SetupTags() {
    const btnTags = document.getElementById("navTags");
    btnTags.addEventListener("click", function(){
        console.log("Tags display link hooked up!");
        api.getRequest(CONSTANTS.TagsAPIURL, tags => {
            CONSTANTS.title.innerText = "All Tags";
            CONSTANTS.content.innerHTML = tags.DisplayAllTags(tags);
            tags.SetupTagDeleteBtn();
        });
    });
}
