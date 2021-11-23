import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";

export default {
    displayRecipes,
    setupRecipeLinks,
    setupRecipeDeleteButton
}

export function displayRecipes(recipes) {
    return`
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
    `
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
            });
        });
    });
}

 //public int Id { get; set; }
        //public string Name { get; set; }
        //[NotMapped]
       // public virtual List<string> Ingredients { get; set; }
        //public string Instructions { get; set; }
        //public string Description { get; set; }
       // public virtual List<RecipeTag> Tags { get; set; }