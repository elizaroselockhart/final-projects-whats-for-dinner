import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";
import tags from "./tags";

export default {
    displayRecipes,
    setupRecipeLinks,
    setupRecipeDeleteButton,
    SetupAddRecipeEventListeners,
    setupSearchBar,
    hideRecipeList,
    SetupAddIngredient,
    SetupAddTags,
    SetupDynamicTagsList,
    PopulateTagsDDL,
    setupSearchByTagCheckbox,
    setupCheckboxFilter,
    hideRecipeList
}

let currentTags = [];

function displayRecipes(recipes, tags) {
    return `
    
    <button id='btnNewRecipe'>Add a Recipe!</button>

    <div id="recipeList">
        <ol>
            ${recipes.map(recipe => {
                return `
                <li class="recipe">
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

    <form id="search-recipes">
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
}

//TAGS DISPLAY HTML:
/* <div display="none" class="tagString" id='tagString-${recipe.id}'>
        ${recipe.tags.map(tag => {           
            return tag.name               
        }).join('')}
    </div> */

function setupRecipeLinks() {
    let recipeLinks = document.querySelectorAll(".recipeDetails");
    recipeLinks.forEach(recipeLink => {

        recipeLink.addEventListener("click", function (evt) {

            let recipeId = this.nextElementSibling.value;

            //API Call
            api.getRequest(CONSTANTS.RecipesAPIURL + recipeId, data => {
                CONSTANTS.content.innerHTML = recipeDetails.DisplayRecipeDetails(data);
                setupSearchBar();
                recipeDetails.SetupEditRecipeEventListeners();
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
                CONSTANTS.content.innerHTML = displayRecipes(data.allRecipes, data.allTags);
                setupRecipeDeleteButton();
                setupRecipeLinks();
                setupSearchBar();
                hideRecipeList();  
                SetupAddRecipeEventListeners(); 
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

//Error: addEventListener not a function
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
                //CONSTANTS.pageTabs.innerHTML = ''
                    //currentTags = [];
                    //toggleTags();
                // add the old event listener here
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
        <div id='AddRecipeForm'>
            <h4>Name:</h4><input type='text' id='recipeName' placeholder='Enter the recipe name.'/>
            <h4>Description:</h4><input type='text' id='recipeDescription' placeholder='Describe your recipe!' />
            <h4>Ingredient List</h4>
            <ul id='recipeIngredients'></ul>
                <input type='text' id='ingredientInput' placeholder='Add ingredient.' />
                <button id='btnAddIngredient'>Add Ingredient</button>
            <h4>Instructions:</h4><input type='text' id='recipeInstructions' placeholder='Enter the recipe instructions.'/>

            <button id='btnNextPage'>Next</button>
        </div>
    `;
}

function SetupAddIngredient() {
    let btnAddIngredient = document.getElementById('btnAddIngredient');
    let ingredientInput = document.getElementById('ingredientInput');

    btnAddIngredient.addEventListener('click', function() {
        console.log("Add Ingredients Button Clicked!");
        let IngredientList = document.getElementById('recipeIngredients');
        
        let NewIngredient = document.createElement('li');
        NewIngredient.setAttribute('id', ingredientInput.value)
        NewIngredient.classList.add('addedIngredients');
        
        NewIngredient.appendChild(document.createTextNode(ingredientInput.value));

        let removebtn = document.createElement('button');
        removebtn.setAttribute('id', 'removebtn');
        removebtn.innerText = "Remove Ingredient";

        NewIngredient.appendChild(removebtn);
        IngredientList.appendChild(NewIngredient);

        removebtn.addEventListener('click', function() {
            let toRemove = this.parentNode;
            IngredientList.removeChild(toRemove);
        });

        ingredientInput.setAttribute('value', '');
    })
}

function SetupAddTags() {
    let btnAddTags = document.getElementById('btnNextPage');
    let ListofIngredients = document.getElementById('recipeIngredients');
    let indivIngredients = ListofIngredients.getElementsByTagName('li');
    let joinedIngredients = "";

    btnAddTags.addEventListener('click', function() {

        for (let i = 0; i < (indivIngredients.length - 1); i++) {
            joinedIngredients = joinedIngredients + indivIngredients[i].id + ";"
        }

        joinedIngredients = joinedIngredients + indivIngredients[indivIngredients.length - 1].id;

        const newRecipe = {
            Name: document.getElementById('recipeName').value,
            Description: document.getElementById('recipeDescription').value,
            Ingredients: joinedIngredients,
            Instructions: document.getElementById('recipeInstructions').value
        }

        api.postRequest(CONSTANTS.RecipesAPIURL, newRecipe, recipe => {
            CONSTANTS.content.innerHTML = `
                <input type='hidden' id='recipe_id' value='${recipe.id}' />

                <div id='tagSection'>
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
            CheckRecipeTags();
        });
    });
}

function SetupDynamicTagsList() {
    let btnAddTagFromList = document.getElementById('btnAddTagFromList');
    let selectList = document.getElementById('existingTagDDL');
    let TagList = document.getElementById('tagList');

    btnAddTagFromList.addEventListener('click', function(){
       
        let AddedTag = document.createElement('li');
        AddedTag.setAttribute('id', selectList.children[selectList.selectedIndex].value);
        AddedTag.classList.add('addedTag');
        let AddedTagText = selectList.children[selectList.selectedIndex].text;
        AddedTag.setAttribute('data-existingtagname', AddedTagText);
        AddedTag.appendChild(document.createTextNode(AddedTagText));

        let removeTagbtn = document.createElement('button');
        removeTagbtn.setAttribute('id', 'removeTagbtn');
        removeTagbtn.innerText = "Remove Tag";

        removeTagbtn.addEventListener('click', function() {
            let toRemove = this.parentNode;
            TagList.removeChild(toRemove);
        });

        AddedTag.appendChild(removeTagbtn);
        TagList.appendChild(AddedTag);
    });
    
    let btnAddNewTag = document.getElementById('btnAddNewTag');
    let createdTag = document.getElementById('createdTag');
    btnAddNewTag.addEventListener('click', function(){
        let NewTag = document.createElement('li');
        NewTag.setAttribute('id', createdTag.value);
        NewTag.classList.add('addedTag');
        NewTag.classList.add('newTag');
        NewTag.appendChild(document.createTextNode(createdTag.value));

        let removeTagbtn = document.createElement('button');
        removeTagbtn.innerText = "Remove Tag";
    
        removeTagbtn.addEventListener('click', function() {
            let toRemove = this.parentNode;
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

function CheckRecipeTags() {
    let ListofTags = document.getElementById('tagList');
    let recipe_id = document.getElementById('recipe_id').value;
    let btnFinishAddingTags = document.getElementById('btnFinishRecipe');

    let Tag = {
        Id: 0,
        Name: "if_you_see_this_something_has_gone_wrong"
    }

    let tag_id = 0;
    let tag_name = "if_you_see_this_something_has_gone_wrong";
    let recipetag_tagid = 0;

    btnFinishAddingTags.addEventListener('click', async function() {
        let TagsToCheck = ListofTags.getElementsByTagName('li');
        let FormattedTags = [];
        for (const tagtocheck of TagsToCheck) {
            if (tagtocheck.classList.contains('newTag')) {
                tag_id = 0;
                tag_name = tagtocheck.id;
            }
            else {
                tag_id = tagtocheck.id;
                tag_name = tagtocheck.getAttribute('data-existingtagname');
            }
            Tag = {
                Id: tag_id,
                Name: tag_name
            }
    
            FormattedTags.push(Tag);
        }
    
        let ListofTagIds = [];
        let SentTag = {
            Name: "if_you_see_this_something_has_gone_wrong"
        }
    
        let tags = await api.SyncGetRequest(CONSTANTS.TagsAPIURL);

        FormattedTags.forEach(async function(FormattedTag) {
            recipetag_tagid = FormattedTag.Id;
            if (FormattedTag.Id == 0){
                let exists = false;
                tags.forEach(tag => {
                    if (FormattedTag.Name.toLowerCase() == tag.name.toLowerCase()) {
                        recipetag_tagid = tag.id;
                        exists = true;
                    }
                });
                if (exists == false) {
                    SentTag.Name = FormattedTag.Name.toLowerCase();
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
                RecipeId: recipe_id,
                TagId: aatagId
            }
            
            api.postRequest(CONSTANTS.RecipeTagsAPIURL, RecipeTag, recipetag => {
                AssociatedRecipeTags.push(recipetag);
                console.log("New recipetags created!");
            });
        });
    });
}

//Hide All Recipes Function
export function hideRecipeList() {
    let list = document.getElementById("recipeList");
    const hideBox = document.getElementById("hide");
    hideBox.addEventListener('change', function (e) {
        if (hideBox.checked) {
            list.style.display = "none";
        } else {
            list.style.display = "initial";
        }
    });
}