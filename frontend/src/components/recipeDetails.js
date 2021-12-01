import api from "../api/api-actions";
import * as CONSTANTS from "../components/constants";


export default {
    DisplayRecipeDetails,
}

function DisplayRecipeDetails(recipe) {
    const searchbar = document.getElementById('searchRecipes');
    searchbar.style.display = "block";
    if(recipe.ingredients == null){
       recipe.ingredients = "";
    }

    let IngredientList = recipe.ingredients.split(";");

    CONSTANTS.title.innerText = "Recipe Details";
    
    return `
    <button id="btnEditRecipe">Edit Recipe</button>
    <h2>Recipe Title: ${recipe.title}</h2>      
   
    <ol>
        ${IngredientList.map(ingredient => {
            return `
                <li>
                    <h4>
                        <span class="ingredientName">${ingredient}</span>
                        <input type='hidden' value='${recipe.id}' />
                    </h4>
                </li>
                
            `;
        }).join('')}
    </ol>
    
    `;
}

//To Edit Recipe:
//NOTE: Create another constructor for Recipe.

//1. Setup HTML for editing recipe.
//2. Setup HTML for adding ingredients (including button).
//3. Pull ingredients into an array.
//3. Add event listener for ingredient button that pushes the new ingredient input into that array.
//4. Setup save button event listener.
    //4a. Once in an array, we can feed the array of ingredient strings into the post method.
//5. Call the above two functions.

//Recipe Model has:
//Id, Name, Ingredient List, Instructions, Description, Tag List
//Name, Instructions, Description

//Details -> Edit 
//              -> Ingredients 

function EditRecipeForm(recipe) {
    CONSTANTS.title.innerText = "Edit Recipe";
    let IngredientList = recipe.ingredients.split(";");

    return ``;
}