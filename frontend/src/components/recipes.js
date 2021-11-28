import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";
import apiActions from "../api/api-actions";

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
        PopulateTagsDDL();
        SetupDynamicTagsList();
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
        <div id='tagSection'>
            <ul id='tagList'></ul>
            <select id='existingTagDDL'>
                <option disabled selected>---Choose Tags---</option>
            </select>
            <button id='btnAddTagFromList'>Add Tag From List</button>
            <h5>Can't find your tag? Add one here!</h5>
            <input type='text' id='createdTag' placeholder='Type your tag here!' />
            <button id='btnAddNewTag'>Add A New Tag</button>
        </div>
        <p>Dropdown list of tags goes here probably. I want to avoid dropdowns but hey, whatever works.</p>
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
        ingredient.setAttribute('placeholder', 'Add a new ingredient');
    })
}

function SetupDynamicTagsList() {
    let btnAddTagFromList = document.getElementById('btnAddTagFromList');
    let selectList = document.getElementById('existingTagDDL');
    let TagList = document.getElementById('tagList');

    btnAddTagFromList.addEventListener('click', function(){
        console.log("Added tags from the dropdown list!");
        let AddedTag = document.createElement('li');
        AddedTag.setAttribute('id', selectList.text);
        AddedTag.classList.add('addedTag');
        let AddedTagText = selectList.options[selectList.selectedIndex].text;
        AddedTag.appendChild(document.createTextNode(AddedTagText));

        let removeTagbtn = document.createElement('button');
        removeTagbtn.innerText = "Remove Tag";
    
        removeTagbtn.addEventListener('click', function() {
            let toRemove = document.getElementById(AddedTag.value);
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
            let toRemove = document.getElementById(NewTag.value);
            TagList.removeChild(toRemove);
        });

        let PostedTag = {
            Name: document.getElementById(NewTag.id)
        }

        api.postRequest(CONSTANTS.TagsAPIURL, PostedTag, data => {
            console.log(data);
        });

        NewTag.appendChild(removeTagbtn);
        TagList.appendChild(NewTag);
    })
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

function SetupAddRecipeBtn() {
    let btnAddRecipe = document.getElementById('btnAddRecipe');
    let ingredientElements = document.getElementsByClassName('addedIngredients');
    let tagElements = document.getElementsByClassName('addedTag');
    let ingredients = "";
    let tags = [];

    for (const element of ingredientElements) {
        ingredients = ingredients + element.id + ";"
    }

    for (const element of tagElements) {
        tags += element.value;
    }

    btnAddRecipe.addEventListener('click', function() {
        const newRecipe = {
            Name: document.getElementById('recipeName'),
            Description: document.getElementById('recipeDescription'),
            Ingredients: ingredients,
            Instructions: document.getElementById('recipeInstructions'),
            Tags: tags
        }
    
        api.postRequest(CONSTANTS.RecipesAPIURL, newRecipe, recipe => {
            console.log("New recipe created!");
            recipeDetails.DisplayRecipeDetails(recipe);
        });
    });
}

//ingredients = sepIngred.split(";"");

//Tags Notes:
//We need:
//  1. Dynamic tag list.
//  2. Dropdown list of existing tags
//      2a. Add tag button that adds selected to the list of tags
//  3. Type your own tag if you can't find it.
//      3a. Add tag button creates a new tag and adds it to the list of tags.

// Errors to fix: 
// "Node.removeChild: Argument 1 is not an object." when trying to remove a tag from the dynamic list.
// " recipe.ingredients.Split is not a function" when trying to add a recipe.