import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";

export default {
    displayRecipes,
    setupRecipeLinks,
    setupRecipeDeleteButton,
    SetupAddRecipeEventListeners,
    setupSearchBar,
    setupSearchByTagCheckbox,
    setupCheckboxFilter,
    hideRecipeList
}

let currentTags = [];

function displayRecipes(recipes, tags) {
    CONSTANTS.pageTags.innerHTML = 
    `<form id="search-recipes">
        <input type="text" class="searchBar" id="contentSearchBar" placeholder="Search recipes..."/>
     </form>

        <input type="checkbox" id="searchByTags" class="searchByTagsCheckBox"/>
        <label for="searchByTagsCheckBox">View Tag List</label>
        
        <div id="tagList">
        <ul>
            
            ${tags.map(tag => {
                return`
                <li class="tag" style="display:none">
                    <span class="tagDetails">
                        <input type="checkbox" id="${tag.name}" class="tagCheckbox"/>
                        ${tag.name} 
                    </span>
                </li>
                
                `;
            }).join('')}
        </ul>
        </div>
    
        <input type="checkbox" id="hide"/>
        <label for="hide">Hide all recipes</label>
    `;
    CONSTANTS.recipeName.innerHTML = 
    
    `<button id='btnNewRecipe'>Add a Recipe!</button>

        <div id="recipeList">
        <ol>
            ${recipes.map(recipe => {
                return`
                <li class="recipe">
                    <h4>
                    <span class="recipeDetails">
                        ${recipe.name} 
                    </span>
                    <input type="hidden" value='${recipe.id}'/>
                    <div display="none" class="tagString" id='tagString-${recipe.id}'>
                        ${recipe.tags.map(tag => {           
                        return tag.tag.name               
                        }).join('')}
                    </div>
                    <button id="${recipe.id}" class="recipeDelete">Delete</button>                
                    </h4>          
                </li>
                `;
            }).join('')}
        </ol>
        </div>
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
                console.log(data);
                CONSTANTS.content.innerHTML = recipeDetails.DisplayRecipeDetails(data); // grab all of our tags, feed them into recipe.Details
                setupSearchBar();
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
                setupSearchBar();
            });
        });
    });
}

export function setupSearchBar() {
    let searchbar = document.getElementById('contentSearchBar');
    let searchByTagCheckbox = document.getElementById("searchByTags");
    searchbar.addEventListener('keyup', function(e){
        let word = e.target.value.toLowerCase()
        if(searchByTagCheckbox.checked){
            //console.log("Searching for tags!");
            filterList(word, Array.from(document.getElementsByClassName("tag")));
        } else {
            //console.log("Searching!");
            filterList(word, returnFilteredRecipesByTags());
        }
    });
}

function filterList(str, targets){
    Array.from(targets).forEach(function(element){
        const name = element.querySelectorAll("span")[0].textContent;
        if(name.toLowerCase().indexOf(str) != -1){
            element.style.display = "block";
        }else {
            element.style.display = "none";
        }
    });
}

export function setupSearchByTagCheckbox() {
    const searchByTagCheckbox = document.getElementById("searchByTags");
    const searchbar = document.getElementById('contentSearchBar');
    let tags = Array.from(document.getElementsByClassName("tag"));
    let recipes = Array.from(document.getElementsByClassName("recipe"));
    searchByTagCheckbox.addEventListener('click', function(e){
            console.log("search by tags");
            searchbar.value = "";
            if(searchByTagCheckbox.checked){
                searchbar.placeholder = "Search tags..."
                filterList(searchbar.value, recipes)
                tags.forEach(tag => {
                    tag.style.display = "block";
                })
                //CONSTANTS.pageTabs.innerHTML = displayTags(data);
            } else {
                searchbar.placeholder = "Search recipes..."
                filterList(searchbar.value, tags)
                tags.forEach(tag => {
                    console.log(tag);
                    if(tag.firstElementChild.firstElementChild.checked) // might be a better way to grab the input element from our tag
                        tag.style.display = "block";
                    else {
                        tag.style.display = "none"; 
                    }
                })
            }
    });
}

export function setupCheckboxFilter() {
    const checkBoxes = Array.from(document.getElementsByClassName("tagCheckbox"));
    checkBoxes.forEach(element => {
        element.addEventListener('change', function(e){
            console.log("tags checked");
            handleCheck(e.target);
            toggleTags();        
        });
    });
}

function handleCheck(tag){
    if(currentTags.includes(tag.id)){
        let indx = currentTags.indexOf(tag.id)
        console.log("splice");
        currentTags.splice(indx, 1);
    } else {
        currentTags.push(tag.id);
    }
    console.log(currentTags);
}

function toggleTags(){
    const recipes = Array.from(document.getElementsByClassName("recipe"));
    recipes.forEach(recipe => {
        let recipeTagString = document.getElementById("tagString-"+recipe.firstElementChild.childNodes[3].value).innerText //probably a better way to write thiss
        console.log(recipeTagString);
        let hidden = false;
        currentTags.forEach(tag => {
            if(!recipeTagString.includes(tag)){
                recipe.style.display = "none";
                hidden = true;
            }
        });
        if(!hidden){recipe.style.display = "block"}
    });
}

function returnFilteredRecipesByTags(){
    const recipes = Array.from(document.getElementsByClassName("recipe"));
    return recipes.filter(recipe => {
        let recipeTagString = document.getElementById("tagString-"+recipe.firstElementChild.childNodes[3].value).innerText //probably a better way to write thiss
        console.log(recipeTagString);
        let hidden = false;
        currentTags.forEach(tag => {
            if(!recipeTagString.includes(tag)){
                hidden = true;
            }
        });
        return !hidden;
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
