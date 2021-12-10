import api from "../api/api-actions";
import * as CONSTANTS from "../components/constants";
import recipes from "../components/recipes";
import navbar from "./navbar";

export default {
    DisplayRecipeDetails,
    SetupEditRecipeEventListeners
}

async function DisplayRecipeDetails(recipe) {
    CONSTANTS.title.innerText = "What's For Dinner";
    let searchbar = document.getElementById('searchRecipes');
    let showRandom = document.getElementById("navRandom");
    showRandom.style.display = "block";
    searchbar.style.display = "block";

    let parsedIngredients = [];
    if(recipe.ingredients == null) {
       recipe.ingredients = "";
    }else{
        parsedIngredients = recipe.ingredients.split("|;|");
    }

    let LinkedTags = await api.SyncGetRequest(CONSTANTS.RecipeTagsAPIURL + recipe.id);

    return `
    <div id="recipe-details-area">
        <h2>Recipe Title: ${recipe.name}</h2>     
        <input type="hidden" id='recipe_id' value='${recipe.id}'/> 
        <button id='btnEditRecipe' class="universalBtn">Edit Recipe</button>
        
        <section id="nitty-gritty"> 
        <h4> Description: </h4> <p>${recipe.description}</p>
        
        <h3> Ingredients: </h3>      
          <ul>
              ${parsedIngredients.map(ingredient => {
                  return `
                      <li>
                            <span class="ingredientName">${ingredient}</span>
                      </li>

                  `;
              }).join('')}
          </ul>

        <h3> Instructions: </h3> <p>${recipe.instructions}</p>

        <h5>Tags:</h5>
            <ul id='recipedetailstaglist'>  
                ${LinkedTags.map(LinkedTag => {
                        return`
                    <li class='addedTag' id='${LinkedTag.tag.id}' data-existingtagname = '${LinkedTag.tag.name}'>
                            #${LinkedTag.tag.name}
                        </li>
                    `;
                }).join(' ')}
            </ul>
        </section>
    </div>
    `;

}

function SetupEditRecipeEventListeners() {
    let btnEditRecipe = document.getElementById('btnEditRecipe');
    let recipe_id = document.getElementById('recipe_id').value;
    btnEditRecipe.addEventListener('click', function() {
        api.getRequest(CONSTANTS.RecipesAPIURL + recipe_id, async function(recipe) {
            console.log(recipe);
            await EditRecipeForm(recipe);
            recipes.SetupAddIngredient();
            recipes.SetupDynamicTagsList();
            recipes.PopulateTagsDDL();
            SetupExistingItemDeleteBtns();
            SubmitEditedRecipe();
        });
    });
}


async function EditRecipeForm(recipe) {
    CONSTANTS.title.innerText = "Edit Recipe";
    let IngredientList = recipe.ingredients.split("|;|");

    let LinkedTags = await api.SyncGetRequest(CONSTANTS.RecipeTagsAPIURL + recipe.id);

    CONSTANTS.content.innerHTML = `
        <div id='EditRecipeForm'>
            <input type='hidden' id='recipe_id' value=${recipe.id} />
            <h4>Name:</h4> <input type='text' id='recipeName' value='${recipe.name}' placeholder='Enter the recipe name.'/>
            <h4>Description:</h4> 
                <textarea id='recipeDescription' placeholder='Enter the recipe description!'>${recipe.description}</textarea>
            <h4>Ingredient List</h4>
            <ul id='recipeIngredients'>
                ${IngredientList.map(ingredient => {
                    return `
                        <li class='addedIngredient' id='${ingredient}'>
                            ${ingredient}
                            <button class='removeIngredientbtn'><i class="fas fa-trash-alt"></i></button>
                        </li>
                    `;
                }).join('')}
            </ul>
            <input type='text' id='ingredientInput' placeholder='Add ingredient.' />
            <button id='btnAddIngredient'>Add Ingredient</button>
            <h4>Instructions:</h4>
            <textarea id='recipeInstructions' placeholder='Enter the recipe instructions.'>${recipe.instructions}</textarea>
        </div>

        <div id='tagSection'>
            <h5>Tags</h5>
            <ul id='tagList'>
                ${LinkedTags.map(LinkedTag => {
                    return `
                        <li class='addedTag' id='${LinkedTag.tag.id}' data-existingtagname='${LinkedTag.tag.name}'>
                            ${LinkedTag.tag.name}
                            <button class='removeTagbtn'><i class="fas fa-trash-alt"></i></button>
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

    <button id='btnFinishEditing' class="universalBtn">Finished Editing</button>
        `
}

function SetupExistingItemDeleteBtns() {
    let removeIngredientbtns = document.querySelectorAll('.removeIngredientbtn');
    let ingredientList = document.getElementById('recipeIngredients');
    let removeTagbtns = document.querySelectorAll('.removeTagbtn');
    let tagList = document.getElementById('tagList');

    removeIngredientbtns.forEach(removeIngredientbtn => {
        removeIngredientbtn.addEventListener('click', function () {
            let toRemove = this.parentElement;
            ingredientList.removeChild(toRemove);
        });
    });

    removeTagbtns.forEach(removeTagbtn => {
        removeTagbtn.addEventListener('click', function () {
            console.log("Remove tag btn clicked!");
            let toRemove = this.parentElement;
            tagList.removeChild(toRemove);
        });
    });
}

function SubmitEditedRecipe() {
    let recipe_id = document.getElementById('recipe_id').value;
    let btnFinishEditing = document.getElementById('btnFinishEditing');

    btnFinishEditing.addEventListener('click', function() {
        let ListofIngredients = document.getElementById('recipeIngredients');
        let indivIngredients = ListofIngredients.getElementsByTagName('li');
        let joinedIngredients = "";

        for (let i = 0; i < (indivIngredients.length - 1); i++) {
            joinedIngredients = joinedIngredients + indivIngredients[i].id + "|;|"
        }

        joinedIngredients = joinedIngredients + indivIngredients[indivIngredients.length - 1].id;

        let editedRecipe = {
            Id: document.getElementById('recipe_id').value,
            Name: document.getElementById('recipeName').value,
            Description: document.getElementById('recipeDescription').value,
            Ingredients: joinedIngredients,
            Instructions: document.getElementById('recipeInstructions').value,
        }

        api.putRequest(CONSTANTS.RecipesAPIURL, recipe_id, editedRecipe, recipe => {
            UpdateRecipeTags(recipe);
        });
    });
}

async function UpdateRecipeTags(recipe) {

    await api.SyncDeleteRequest(CONSTANTS.RecipeTagsAPIURL, recipe.id);

    let Tag = {
        Id: 0,
        Name: "if_you_see_this_something_has_gone_wrong"
    }

    let SentTag = {
        Name: "if_you_see_this_something_has_gone_wrong"
    }

    let tag_id = 0;
    let tag_name = "ifYouSeeThisSomethingHasGoneWrong";

    let ListofAddedTags = document.getElementById('tagList');
    let AddedTags = ListofAddedTags.getElementsByTagName('li');
    let TagsToAddToRecipe = [];

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

    let tags = await api.SyncGetRequest(CONSTANTS.TagsAPIURL);
    let recipetag_tagid;
    let ListofTagIds = [];

    TagsToAddToRecipe.forEach(async function(TagToAddToRecipe) {
        recipetag_tagid = TagToAddToRecipe.Id;
        if (TagToAddToRecipe.Id == 0){
            let exists = false;
            tags.forEach(tag => {
                if (TagToAddToRecipe.Name.toLowerCase() == tag.name.toLowerCase()) {
                    recipetag_tagid = tag.id;
                    exists = true;
                }
            });
            if (exists == false) {
                SentTag.Name = TagToAddToRecipe.Name.toLowerCase();
                let NewTag = await api.SyncPostRequest(CONSTANTS.TagsAPIURL, SentTag);
                recipetag_tagid = NewTag.id;
            }
        }
        ListofTagIds.push(recipetag_tagid);
    });

    let AssociatedRecipeTags = [];

    ListofTagIds.forEach(aatagId => {

        let RecipeTag = {
            Id: 0,
            RecipeId: recipe.id,
            TagId: aatagId
        }
        console.log(RecipeTag);
        
        api.postRequest(CONSTANTS.RecipeTagsAPIURL, RecipeTag, recipetag => {
            AssociatedRecipeTags.push(recipetag);
            console.log("New recipetags created!");
        });
    });

    recipe = await api.SyncGetRequest(CONSTANTS.RecipesAPIURL + recipe.id);
    
    CONSTANTS.content.innerHTML = await DisplayRecipeDetails(recipe);
    navbar.hideNavSearchBarDisplayRecipes();
    SetupEditRecipeEventListeners();
    // randomRecipes.smallRandomBtn();
    CONSTANTS.title.innerText = "What's For Dinner";
}