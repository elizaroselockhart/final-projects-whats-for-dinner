import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";

export default {
    displayRecipes,
    setupRecipeLinks,
    setupRecipeDeleteButton,
    SetupAddRecipeEventListeners,
    setupSearchBar,
    hideRecipeList
}

function displayRecipes(recipes) {
    return `
    <button id='btnNewRecipe'>Add a Recipe!</button>
    <form id="search-recipes">
    <input type="text" placeholder="Search recipes..."/>
    </form>
    <div id="recipeList">
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
    </div>
    <input type="checkbox" id="hide"/>
    <label for="hide">Hide all recipes</label>
    `;
}

function setupRecipeLinks() {
    let recipeLinks = document.querySelectorAll(".recipeDetails");
    recipeLinks.forEach(recipeLink => {

        recipeLink.addEventListener("click", function (evt) {

            let recipeId = this.nextElementSibling.value;
            console.log("Recipe Id:" + recipeId);

            //API Call
            api.getRequest(CONSTANTS.RecipesAPIURL + recipeId, data => {
                CONSTANTS.content.innerHTML = recipeDetails.recipeDetails(data);
                recipes.setupSearchBar();
            });
        });
    });
}

function setupRecipeDeleteButton() {
    let recipeDeleteButtons = document.querySelectorAll(".recipeDelete");

    recipeDeleteButtons.forEach(recipeDeleteButton => {
        recipeDeleteButton.addEventListener('click', function (event) {
            console.log("delete button clicked");
            let recipeId = event.target.id;


            api.deleteRequest(CONSTANTS.RecipesAPIURL, recipeId, data => {
                CONSTANTS.content.innerHTML = displayRecipes(data);
                setupRecipeDeleteButton();
                setupRecipeLinks();
                recipes.setupSearchBar();
            });
        });
    });
}

export function setupSearchBar() {
    let list = document.getElementById('recipeList');
    const searchbar = document.querySelector('input');
    searchbar.addEventListener('keyup', function (e) {
        console.log("Typing in search bar!");
        const term = e.target.value.toLowerCase();
        const recipes = list.querySelectorAll('li');
        Array.from(recipes).forEach(function (recipe) {
            const name = recipe.firstElementChild.textContent;
            if (name.toLowerCase().indexOf(term) != -1) {
                recipe.style.display = "block";
            } else {
                recipe.style.display = "none";
            }
        });
    });
}


function SetupAddRecipeEventListeners() {
    let btnNewRecipe = document.getElementById('btnNewRecipe');
    btnNewRecipe.addEventListener('click', function() {
        SetupAddRecipeForm();
        SetupAddIngredient();
        SetupAddTags();
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

        <button id='btnNextPage'>Next</button>
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
        ingredient.setAttribute('placeholder', 'Add a new ingredient');
    })
}

function SetupAddTags() {
    let btnAddTags = document.getElementById('btnNextPage');
    let ingredientElements = document.getElementsByClassName('addedIngredients');
    let ingredients = "";

    for (const element of ingredientElements) {
        ingredients = ingredients + element.id + ";"
    }

    btnAddTags.addEventListener('click', function() {
        const newRecipe = {
            Name: document.getElementById('recipeName').value,
            Description: document.getElementById('recipeDescription').value,
            Ingredients: ingredients,
            Instructions: document.getElementById('recipeInstructions').value,
        }

        api.postRequest(CONSTANTS.RecipesAPIURL, newRecipe, recipe => {
            console.log("New recipe created!");
            console.log(recipe);
            CONSTANTS.content.innerHTML = `
            <div id='tagSection'>
            <input type='hidden' id= 'recipe_id' value=${recipe.id} />
                <h5>Add tags for your recipe on this page.</h5>
                <ul id='tagList'></ul>
                <select id='existingTagDDL'>
                    <option disabled selected>---Choose Tags---</option>
                </select>
                <button id='btnAddTagFromList'>Add Tag From List</button>
                <h5>Can't find your tag? Add one here!</h5>
                <input type='text' id='createdTag' placeholder='Type your tag here!' />
                <button id='btnAddNewTag'>Add A New Tag</button>
                <button id='btnFinishRecipe'>Finished adding tags.</button>
            </div>
            `;
            SetupDynamicTagsList();
            PopulateTagsDDL();
            FinishRecipeCreation();
        });
    }); 
}

function FinishRecipeCreation() {
    let btnFinishRecipe = document.getElementById('btnFinishRecipe');
    btnFinishRecipe.addEventListener('click', CheckTags);
}

function SetupDynamicTagsList() {
    let btnAddTagFromList = document.getElementById('btnAddTagFromList');
    let selectList = document.getElementById('existingTagDDL');
    let TagList = document.getElementById('tagList');

    btnAddTagFromList.addEventListener('click', function(){
        console.log("Added tags from the dropdown list!");
        let AddedTag = document.createElement('li');
        AddedTag.setAttribute('id', selectList.options[selectList.selectedIndex].value);
        AddedTag.classList.add('addedTag');
        let AddedTagText = selectList.options[selectList.selectedIndex].text;
        AddedTag.appendChild(document.createTextNode(AddedTagText));

        let removeTagbtn = document.createElement('button');
        removeTagbtn.innerText = "Remove Tag";
    
        removeTagbtn.addEventListener('click', function() {
            let toRemove = document.getElementById(AddedTagText);
            TagList.removeChild(toRemove);
        });

        AddedTag.appendChild(removeTagbtn);
        TagList.appendChild(AddedTag);
    });
    
    let btnAddNewTag = document.getElementById('btnAddNewTag');
    let createdTag = document.getElementById('createdTag');
    btnAddNewTag.addEventListener('click', function(){
        console.log("Added new tag!");
        let NewTag = document.createElement('li');
        NewTag.setAttribute('id', createdTag.value);
        NewTag.classList.add('addedTag');
        NewTag.appendChild(document.createTextNode(createdTag.value));

        let removeTagbtn = document.createElement('button');
        removeTagbtn.innerText = "Remove Tag";
    
        removeTagbtn.addEventListener('click', function() {
            let toRemove = document.getElementById(createdTag.value);
            TagList.removeChild(toRemove);
        });

        NewTag.appendChild(removeTagbtn);
        TagList.appendChild(NewTag);
    });
}

function PopulateTagsDDL(){
    let ddlTagList = document.getElementById('existingTagDDL');
    if (ddlTagList != undefined) {
        api.getRequest(CONSTANTS.TagsAPIURL, tags => {
            tags.forEach(tag => {
                let option = document.createElement('option');
                option.value = tag.id;
                option.text = tag.name;
                ddlTagList.appendChild(option);
            });
        });
    }
}

function CheckTags() {
    let TagList = document.getElementsByClassName('addedTags');
    let exists = false;
    let existingTags = [];
    let recipe_id = document.getElementById('recipe_id').value;
    let tag_id = 0;

    api.getRequest(CONSTANTS.TagsAPIURL, tags => {
        tags.forEach(tag => {
            existingTags += tag;
        });
    });

    for (const addedTag of TagList) {
        existingTags.forEach(existingTag => {
            if (addedTag.id.toLowerCase() == existingTag.name.toLowerCase()) {
                exists = true;
                tag_id = existingTag.id;
            }
        });

        if (exists != true) {
            let newTag = {
                Name: tag.id.toLowerCase()
            }
           
            api.postRequest(CONSTANTS.TagsAPIURL, newTag, newtag => {
                tag_id = newtag.id;
            });
        }
        let newRecipeTag = {
            RecipeId: recipe_id,
            TagId: tag_id
        }

        api.postRequest(CONSTANTS.RecipeTagsAPIURL, newRecipeTag, recipetag => {
            console.log(recipetag);
        });
        
    }

    api.getRequest(CONSTANTS.RecipesAPIURL + recipe_id, recipe => {
        CONSTANTS.title.innerText = "Recipe Details";
        CONSTANTS.content.innerHTML = recipeDetails.recipeDetails(recipe);
    });
}


//Hide All Recipes Function
export function hideRecipeList() {
    let list = document.getElementById("recipeList");
    const hideBox = document.getElementById("hide");
    hideBox.addEventListener('change', function (e) {
        console.log("Hide recipes checkbox clicked");
        if (hideBox.checked) {
            list.style.display = "none";
        } else {
            list.style.display = "initial";

        }
    });
}

//public int Id { get; set; }
//public string Name { get; set; }
//[NotMapped]
// public virtual List<string> Ingredients { get; set; }
//public string Instructions { get; set; }
//public string Description { get; set; }
// public virtual List<RecipeTag> Tags { get; set; }