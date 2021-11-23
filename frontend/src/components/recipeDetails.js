import api from "../api/api-actions";
import * as CONSTANTS from "../components/constants";


export default {
    recipeDetails,
}

function recipeDetails(recipe) {

    if(recipe.ingredients == null){
       recipe.ingredients = [];
    }


    return ` 
        <h1>Recipe Details</h1>
        <h2>Recipe Title: ${recipe.title}</h2>      
   
    <ol>
        ${recipe.ingredients.map(song => {
            return `
                <li>
                    <h4>
                        <span class="ingredientName">${ingredient.name}</span>
                        <input type='hidden' value='${ingredient.recipeId}' />
                    </h4>
                </li>
                
            `;
        }).join('')}
    </ol>
    
    `;
}