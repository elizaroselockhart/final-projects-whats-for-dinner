import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
//import recipeDetails from "./recipeDetails";

export default {
    displayRecipes,
    setupRecipeLinks,
    setupRecipeDeleteButton,
    setupSearchBar,
    hideRecipeList
}


export function displayRecipes(recipes) {
    return`
    <form id="search-recipes">
    <input type="text" placeholder="Search recipes..."/>
    </form>
    <div id="recipeList">
    <ol>
        ${recipes.map(recipe => {
            return`
            <li>
                <h4>
                <span class="recipeDetails">
                ${recipe.name} 
                </span>
                
                <input type="hidden" value='${recipe.id}'/>
                <button id="${recipe.id}" class="recipeDelete">delete</button>
                </h4>
                      
            </li>
            `;
        }).join('')}
    </ol>
    </div>
    <input type="checkbox" id="hide"/>
    <lable for="hide">Hide all recipes</label>
    `;
}

export function setupRecipeLinks() {
    let recipeLinks = document.querySelectorAll(".recipeDetails");
    recipeLinks.forEach(recipeLink => {

        recipeLink.addEventListener("click", function (evt) {

            let recipeId = this.nextElementSibling.value;
            console.log("Recipe Id:" + recipeId);

            //API Call
            api.getRequest(CONSTANTS.RecipesAPIURL + recipeId, data => {
                CONSTANTS.content.innerHTML = recipeDetails.recipeDetails(data);
                recipes.setupSearchBar();
            });
        });
    });
}

export function setupRecipeDeleteButton() {
    let recipeDeleteButtons = document.querySelectorAll(".recipeDelete");

    recipeDeleteButtons.forEach(recipeDeleteButton => {
        recipeDeleteButton.addEventListener('click', function (event) {
            console.log("delete button clicked");
            let recipeId = event.target.id;


            api.deleteRequest(CONSTANTS.RecipesAPIURL, recipeId, data => {
                CONSTANTS.content.innerHTML = displayRecipes(data);
                setupRecipeDeleteButton();
                setupRecipeLinks();
                recipes.setupSearchBar();
            });
        });
    });
}

export function setupSearchBar() {
    let list = document.getElementById('recipeList');
    const searchbar = document.querySelector('input');
    searchbar.addEventListener('keyup', function(e){
        console.log("Typing in search bar!");
        const term = e.target.value.toLowerCase();
        const recipes = list.querySelectorAll('li');
        Array.from(recipes).forEach(function(recipe){
            const name = recipe.firstElementChild.textContent;
            if(name.toLowerCase().indexOf(term) != -1){
                recipe.style.display = "block";
            }else {
                recipe.style.display = "none";
            }
        });
    });
}


//Hide All Recipes Function
export function hideRecipeList() {
    let list = document.getElementById("recipeList");
    const hideBox = document.getElementById("hide");
    hideBox.addEventListener('change', function(e){
        console.log("Hide recipes checkbox clicked");
        if(hideBox.checked){
            list.style.display = "none";
        }else {
            list.style.display = "initial";
        }
    });
}

 //public int Id { get; set; }
        //public string Name { get; set; }
        //[NotMapped]
       // public virtual List<string> Ingredients { get; set; }
        //public string Instructions { get; set; }
        //public string Description { get; set; }
       // public virtual List<RecipeTag> Tags { get; set; }