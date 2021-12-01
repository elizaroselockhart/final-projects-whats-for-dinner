import api from "../api/api-actions";
import * as CONSTANTS from "../components/constants";
import recipes, {displayRecipes} from "./recipes";
import tags from "./tags";


export default {
    DisplayRecipeDetails
}


function DisplayRecipeDetails(recipe) {
    let searchbar = document.getElementById('searchRecipes');
    searchbar.style.display = "block";
    let parsedIngredients = [];
    if(recipe.ingredients == null) {
       recipe.ingredients = "";
    }else{
        parsedIngredients = recipe.ingredients.split(";");
    }
    return ` 
        

        <h1>Recipe Details</h1>
        <h2>${recipe.name}</h2>     
        <input type="hidden" value='${recipe.id}'/> 
        <section> 
        <h4> Description: </h4> <p>${recipe.description}</p>
            

    <h3> Ingredients: </h3>      
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

     <h3> Instructions: </h3> <p>${recipe.instructions}</p>

     <h5>Tags:</h5>
       <ul>
        
        ${recipe.tags.map( tag => {
              return`
             <li>${tag.tag.name}</li>
             `;
         }).join('')}
     </ul>
    </section>
    `;
  
}

    //<h5>Tags: </h5>
    //  <ul>
    //     ${recipeTag.map(tag=> {
    //         return`
    //         <li>${tag.name}</li>
    //         `;
    //     }).join('')}
    // </ul>

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