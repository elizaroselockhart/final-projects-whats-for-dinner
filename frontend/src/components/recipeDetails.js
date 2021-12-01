import api from "../api/api-actions";
import * as CONSTANTS from "../components/constants";


export default {
    recipeDetails
}

function recipeDetails(recipe) {
    console.log(recipe)

    let parsedIngredients = [];
    if (recipe.ingredients != null) {
        parsedIngredients = recipe.ingredients.split(";")
    }

    //for editing/creating a recipe:
    // remove any existing semicolon's from the user's input
    // append semi colon to the end of each ingredient
    // append all ingredients together

    // for the reverese 
    // split by semicolor (in a separate variable)
    // treat like array

    // to consider -> using a multicharacter separator (|;|)

    return ` 
        <h1>Recipe Details</h1>
        <h2>Recipe Title: ${recipe.name}</h2>     
        <input type="hidden" value='${recipe.id}'/> 
   
    <ul>
        ${parsedIngredients.map(ingredient => {
            return `
                <li>
                    <h4>
                        <span class="ingredientName">${ingredient}</span>
                    </h4>
                </li>
                
            `;
        }).join('')}
    </ul>
    
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

    return `
    <div id='AddRecipeForm'>
        <h4>Name:</h4><input type='text' id='recipeName' placeholder='Enter the recipe name.'/>
        <h4>Description:</h4><input type='text' id='recipeDescription' placeholder='Describe your recipe!' />
        <h4>Ingredient List</h4>
        <ul id='recipeIngredients'></ul>
            <input type='text' id='ingredient' value='Add ingredient.' placeholder='Add ingredient.' />
            <button id='btnAddIngredient'>Add Ingredient</button>
        <h4>Instructions:</h4><input type='text' id='recipeInstructions' placeholder='Enter the recipe instructions.'/>

        <button id='btnNextPage'>Next</button>
    </div>
    `;
}