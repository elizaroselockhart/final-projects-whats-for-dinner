import api from "../api/api-actions";
import * as CONSTANTS from "../components/constants";
import recipes from "../components/recipes";

export default {
    DisplayRecipeDetails,
    SetupEditRecipeEventListeners
}

function DisplayRecipeDetails(recipe) {
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
    // split by semicolon (in a separate variable)
    // treat like array

    // to consider -> using a multicharacter separator (|;|)

    return ` 
        <h1>Recipe Details</h1>
        <h2>Recipe Title: ${recipe.name}</h2>     
        <input type="hidden" id='recipe_id' value='${recipe.id}'/> 
        <button id='btnEditRecipe'>Edit Recipe</button>
   
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


function EditRecipeForm(recipe) {
    CONSTANTS.title.innerText = "Edit Recipe";
    let IngredientList = recipe.ingredients.split(";");

    CONSTANTS.content.innerHTML = `
        <div id='EditRecipeForm'>
            <input type='hidden' id='recipe_id' value=${recipe.id} />
            <h4>Name:</h4> <input type='text' id='recipeName' value='${recipe.name}' placeholder='Enter the recipe name.'/>
            <h4>Description:</h4> <input type='text' id='recipeDescription' value='${recipe.description}' placeholder='Describe your recipe!' />
            <h4>Ingredient List</h4>
            <ul id='recipeIngredients'>
                ${IngredientList.map(ingredient => {
                    return `
                        <li id='addedIngredient'>
                            ${ingredient}
                        </li>
                        <button id='removebtn'>Remove</button>
                    `;
                }).join('')}
            </ul>
            <input type='text' id='ingredient' placeholder='Add ingredient.' />
            <button id='btnAddIngredient'>Add Ingredient</button>
            <h4>Instructions:</h4>
            <input type='text' id='recipeInstructions' value='${recipe.instructions}' placeholder='Enter the recipe instructions.'/>
        </div>

        <div id='tagSection'>
            <h5>Tags</h5>
            <ul id='tagList'>
                ${recipe.tags.map(tag => {
                    return `
                        <li class='addedTag'>
                            ${tag.name}
                        </li>
                    `;
                }).join('')}
            </ul>
            <select id='existingTagDDL'>
                <option disabled selected>---Choose Tags---</option>
            </select>
            <button id='btnAddTagFromList'>Add Tag From List</button>
            <h5>Can't find your tag? Add one here!</h5>
            <input type='text' id='createdTag' placeholder='Type your tag here!' />
            <button id='btnAddNewTag'>Add A New Tag</button>
        </div>

        <button id='btnFinishEditing'>Finished Editing</button>
        `;
}

function SetupEditRecipeEventListeners() {
    let btnEditRecipe = document.getElementById('btnEditRecipe');
    let recipe_id = document.getElementById('recipe_id').value;
    btnEditRecipe.addEventListener('click', function() {
        api.getRequest(CONSTANTS.RecipesAPIURL + recipe_id, recipe => {
            EditRecipeForm(recipe);
            recipes.SetupAddIngredient();
            recipes.SetupDynamicTagsList();
            recipes.PopulateTagsDDL();
            SubmitEditedRecipe();
        });
    });
}

function SubmitEditedRecipe() {
    let recipe_id = document.getElementById('recipe_id').value;
    let ingredientElements = document.getElementsByClassName("addedIngredients");
    let ingredients = "";
    let ListofAddedTags = document.getElementById('tagList');
    let AddedTags = ListofAddedTags.getElementsByTagName('li');
    let TagsToAddToRecipe = [];

    let btnFinishEditing = document.getElementById('btnFinishEditing');
    btnFinishEditing.addEventListener('click', function() {
       
        for (const element of ingredientElements) {
            ingredients = ingredients + element.id + ";"
        }

        let Tag = {
            Id: 0,
            Name: 0
        }
    
        let tag_id = 0;
        let tag_name = "ifYouSeeThisSomethingHasGoneWrong";

        for (const tag of AddedTags) {

            if (tag.classList.contains('newTag')) {
                tag_id = 0;
                tag_name = tag.id;
            }

            else {
                tag_id = tag.id;
                tag_name = tag.getAttribute('data-existingtagname');
            }

            Tag = {
                Id: tag_id,
                Name: tag_name
            }
            console.log("Tag object:");
            console.log(Tag);
            TagsToAddToRecipe.push(Tag);
        }

        let editedRecipe = {
            Id: document.getElementById('recipe_id').value,
            Name: document.getElementById('recipeName').value,
            Description: document.getElementById('recipeDescription').value,
            Ingredients: ingredients,
            Instructions: document.getElementById('recipeInstructions').value,
            Tags: TagsToAddToRecipe
        }

        api.putRequest(CONSTANTS.RecipesAPIURL, recipe_id, editedRecipe, recipe => {
            CONSTANTS.content.innerHTML = DisplayRecipeDetails(recipe);
            SetupEditRecipeEventListeners();
        });
    });
}