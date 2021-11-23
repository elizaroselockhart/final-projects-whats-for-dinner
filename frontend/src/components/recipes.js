import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";

export default {
    displayRecipes,
    setupRecipeLinks,
    setupRecipeDeleteButton,
    SetupAddRecipeEventListeners
}

function displayRecipes(recipes) {
    return `
    <button id='btnNewRecipe'>Add a Recipe!</button>
    <ol>
        ${recipes.map(recipe => {
            return`
            <li>
                <h4>
                <span class="recipeDetails">
                    ${recipe.name} 
                </span>
                
                <input type="hidden" value='${recipe.id}'/>
                <button id="${recipe.id}" class="recipeDelete">Delete</button>
                </h4>
                      
            </li>
            `;
        }).join('')}
    </ol>
    `
}

function setupRecipeLinks() {
    let recipeLinks = document.querySelectorAll(".recipeDetails");
    recipeLinks.forEach(recipeLink => {

        recipeLink.addEventListener("click", function (evt) {

            let recipeId = this.nextElementSibling.value;
            console.log("Recipe Id:" + recipeId);

            //API Call
            //api.getRequest( => {
               
            //});
        });
    });
}

function setupRecipeDeleteButton() {
    let recipeDeleteButtons = document.querySelectorAll(".recipeDelete");

    recipeDeleteButtons.forEach(recipeDeleteButton => {
        recipeDeleteButton.addEventListener('click', function (event) {
            console.log("delete button clicked");
            let recipeId = event.target.id;


            //api.deleteRequest( => {
            
        //});
        });
    });
}

function SetupAddRecipeEventListeners() {
    let btnNewRecipe = document.getElementById('btnNewRecipe');
    btnNewRecipe.addEventListener('click', function() {
        SetupAddRecipeForm();
        SetupAddIngredient();
        SetupAddRecipeBtn();
    });
}

//To Add Recipe:
//1. Setup HTML for addrecipe.
//2. Setup HTML for addingredient button.
//3. Setup event listener for add recipe button and call API.
//4. Create a function that calls those three buttons.
//NOTE: Create another constructor for Recipe.

//Function Names:
//SetupAddRecipeForm
    //->What elements do we need in this form?
    //--Name: Name Input
    //Description: Description Input
    //Ingredients: Dynamically updating function
    //Instructions: Instructions input
    //Tags: Dynamically updating function

function SetupAddRecipeForm() {
    CONSTANTS.title.innerText = "Add Recipe";
    CONSTANTS.content.innerHTML = `
        <h4>Name:</h4><input type='text' id='recipeName' placeholder='Enter the recipe name.'/>
        <h4>Description:</h4><input type='text' id='recipeDescription' placeholder='Describe your recipe!' />
        <h4>Ingredient List</h4>
        <ul id='recipeIngredients'></ul>
            <input type='text' id='ingredient' placeholder='Add ingredient.' />
            <button id='btnAddIngredient'>Add Ingredient</button>
        <h4>Instructions:</h4><input type='text' id='recipeInstructions' placeholder='Enter the recipe instructions.'/>
        <h4>Tags:</h4>
        <p>Dropdown list of tags goes here probably. I want to avoid dropdowns but hey, whatever works.</p>
        <input type='text' id='recipeTag' placeholder='' />
        <button id='btnAddRecipe'>Add Recipe</button>
    `;
}

function SetupAddIngredient() {
    let btnAddIngredient = document.getElementById('btnAddIngredient');
    btnAddIngredient.addEventListener('click', function() {
        console.log("Add Ingredients Button Clicked!");
        let IngredientList = document.getElementById('recipeIngredients');
        let NewIngredient = document.createElement('li');
        NewIngredient.setAttribute('id', ingredient.value);
        NewIngredient.classList.add('addedIngredients');
        
        NewIngredient.appendChild(document.createTextNode(ingredient.value));
        let removebtn = document.createElement('button');
        removebtn.innerText = "Remove Ingredient";

        removebtn.addEventListener('click', function() {
            let toRemove = document.getElementById(ingredient.value);
            IngredientList.removeChild(toRemove);
        });

        NewIngredient.appendChild(removebtn);
        IngredientList.appendChild(NewIngredient);
        btnAddIngredient.setAttribute('value', '');
    })
}

function SetupAddRecipeBtn() {
    let btnAddRecipe = document.getElementById('btnAddRecipe');
    let ingredientElements = document.getElementsByClassName('addedIngredients');
    let ingredients = "";

    for (const element of ingredientElements) {
        ingredients = ingredients + element.id + ";"
    }

    btnAddRecipe.addEventListener('click', function() {
        const newRecipe = {
            Name: document.getElementById('recipeName'),
            Description: document.getElementById('recipeDescription'),
            Ingredients: ingredients,
            Instructions: document.getElementById('recipeInstructions'),
            Tags: document.getElementById('recipeTag')
        }
    
        api.postRequest(CONSTANTS.RecipesAPIURL, newRecipe, recipe => {
            console.log("New recipe created!");
            recipeDetails.DisplayRecipeDetails(recipe);
        });
    });
}

//ingredients = sepIngred.split("|");