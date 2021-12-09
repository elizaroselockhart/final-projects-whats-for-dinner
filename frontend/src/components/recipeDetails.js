import api from "../api/api-actions";
import * as CONSTANTS from "../components/constants";
import recipes from "../components/recipes";

export default {
    DisplayRecipeDetails,
    SetupEditRecipeEventListeners
}

async function DisplayRecipeDetails(recipe) {
    //For editing/creating a recipe with ingredients:
    // 1. Remove any existing semicolon's from the user's input
    // 2. Append semi colon to the end of each ingredient except the last one.
    // 3. Append all ingredients together.

    // For the reverse: 
    // 1. Split by semicolon (in a separate variable).
    // 2. Treat like array.

    // to consider -> using a multicharacter separator (|;|)

    let parsedIngredients = [];
    if(recipe.ingredients == null) {
       recipe.ingredients = "";
    } else {
        parsedIngredients = recipe.ingredients.split(";");
    }

    //Based on the method we wrote on the back end, we expect that this will feed in a recipeId, and then iterate over all recipetags, pushing the recipetags that have the SAME recipeid into an array, and then return that array, which we have named LinkedTags.
    let LinkedTags = await api.SyncGetRequest(CONSTANTS.RecipeTagsAPIURL + recipe.id);

    return `
        <h1>Recipe Details</h1>
        <h2>Recipe Title: ${recipe.name}</h2>     
        <input type="hidden" id='recipe_id' value='${recipe.id}'/> 
        <button id='btnEditRecipe'>Edit Recipe</button>
        
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
        <ul id='tagList'>
            ${LinkedTags.map(LinkedTag => {
                    return `
                        <li class='addedTag' id='${LinkedTag.tag.id}' data-existingtagname='${LinkedTag.tag.name}'>
                            ${LinkedTag.tag.name}
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

//To display tags associated with the recipe:
//Get tagid from recipetag.
//Display the tag with the given id.


async function EditRecipeForm(recipe) {
    CONSTANTS.title.innerText = "Edit Recipe";
    let IngredientList = recipe.ingredients.split(";");

    let LinkedTags = await api.SyncGetRequest(CONSTANTS.RecipeTagsAPIURL + recipe.id);

    return `
        <div id='EditRecipeForm'>
            <input type='hidden' id='recipe_id' value=${recipe.id} />
            <h4>Name:</h4> <input type='text' id='recipeName' value='${recipe.name}' placeholder='Enter the recipe name.'/>
            <h4>Description:</h4> <input type='text' id='recipeDescription' value='${recipe.description}' placeholder='Describe your recipe!' />
            <h4>Ingredient List</h4>
            <ul id='recipeIngredients'>
                ${IngredientList.map(ingredient => {
                    return `
                        <li class='addedIngredient' id='${ingredient}'>
                            ${ingredient}
                            <button class='removeIngredientbtn'>Remove</button>
                        </li>
                    `;
                }).join('')}
            </ul>
            <input type='text' id='ingredientInput' placeholder='Add ingredient.' />
            <button id='btnAddIngredient'>Add Ingredient</button>
            <h4>Instructions:</h4>
            <input type='text' id='recipeInstructions' value='${recipe.instructions}' placeholder='Enter the recipe instructions.'/>
        </div>

        <div id='tagSection'>
        <h5>Tags</h5>
        <ul id='tagList'>
            ${LinkedTags.map(LinkedTag => {
                return `
                    <li class='addedTag' id='${LinkedTag.tag.id}' data-existingtagname='${LinkedTag.tag.name}'>
                        ${LinkedTag.tag.name}
                        <button class='removeTagbtn'>Remove Tag</button>
                    </li>
                `;
            }).join('')}
        </ul>
        <select id='existingTagDDL'>
            <option disabled selected>---Choose Tags---</option>
        </select>
        <button id='btnAddTagFromList'>Add Tag From List</button>
        <h5>Can't find your tag? Add one here!</h5>
        <input type='text' id='createdTag' placeholder='Type your ta    g here!' />
        <button id='btnAddNewTag'>Add A New Tag</button>
    </div>

    <button id='btnFinishEditing'>Finished Editing</button>
        `
}

function SetupEditRecipeEventListeners() {
    let btnEditRecipe = document.getElementById('btnEditRecipe');
    let recipe_id = document.getElementById('recipe_id').value;
    btnEditRecipe.addEventListener('click', function() {
        api.getRequest(CONSTANTS.RecipesAPIURL + recipe_id, async function(recipe) {
            CONSTANTS.content.innerHTML = await EditRecipeForm(recipe);
            recipes.SetupAddIngredient();
            recipes.SetupDynamicTagsList();
            recipes.PopulateTagsDDL();
            SetupExistingItemDeleteBtns();
            SubmitEditedRecipe();
        });
    });
}

function SetupExistingItemDeleteBtns() {
    let removeIngredientbtns = document.querySelectorAll('.removeIngredientbtn');
    let ingredientList = document.getElementById('recipeIngredients');
    let removeTagbtns = document.querySelectorAll('.removeTagbtn');
    let tagList = document.getElementById('tagList');

    removeIngredientbtns.forEach(removeIngredientbtn => {
        removeIngredientbtn.addEventListener('click', function() {
            let toRemove = this.parentElement;
            ingredientList.removeChild(toRemove);
        });
    });

    removeTagbtns.forEach(removeTagbtn => {
        removeTagbtn.addEventListener('click', function() {
            let toRemove = this.parentElement;
            tagList.removeChild(toRemove);
        });
    });
}

function SubmitEditedRecipe() {
    let recipe_id = document.getElementById('recipe_id').value;
    let ListofIngredients = document.getElementById('recipeIngredients');
    let indivIngredients = ListofIngredients.getElementsByTagName('li');
    let joinedIngredients = "";


    let ListofAddedTags = document.getElementById('tagList');
    let AddedTags = ListofAddedTags.getElementsByTagName('li');
    let TagsToAddToRecipe = [];

    let btnFinishEditing = document.getElementById('btnFinishEditing');
    btnFinishEditing.addEventListener('click', function() {
        
        for (let i = 0; i < (indivIngredients.length - 1); i++) {
            joinedIngredients = joinedIngredients + indivIngredients[i].id + ";"
        }

        joinedIngredients = joinedIngredients + indivIngredients[indivIngredients.length - 1].id;

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
            TagsToAddToRecipe.push(Tag);
        }

        let editedRecipe = {
            Id: document.getElementById('recipe_id').value,
            Name: document.getElementById('recipeName').value,
            Description: document.getElementById('recipeDescription').value,
            Ingredients: joinedIngredients,
            Instructions: document.getElementById('recipeInstructions').value,
        }

        api.putRequest(CONSTANTS.RecipesAPIURL, recipe_id, editedRecipe, async function(recipe) {
            CONSTANTS.content.innerHTML = await DisplayRecipeDetails(recipe);
            SetupEditRecipeEventListeners();
        });
    });
}