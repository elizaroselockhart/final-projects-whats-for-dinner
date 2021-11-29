import api from "../api/api-actions";
import * as CONSTANTS from "../components/constants";
import {
    displayRecipes
} from "./recipes";


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