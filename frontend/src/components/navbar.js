import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipes from "../components/recipes";
import recipeDetails from "./recipeDetails";
import randomRecipes from "../components/randomRecipes";
import cookies from "../components/cookies";
import tagList from "../components/tags";

export default {
    setupNavBar,
    setupPantry,
    SetupTags,
    setupHome,
    hideNavSearchBarDisplayRecipes,
    setupLogin,
    setupLoginDisplay,
    hideNavSearchBarDisplayRecipes
}

export function hideNavSearchBarDisplayRecipes() {
    const showRandom= document.getElementById("navRandom")
    const hideSearch = document.getElementById("searchRecipes");
    hideSearch.addEventListener("click", function(){
        console.log("Hide nav search, display recipes");
            hideSearch.style.display = "none";
            showRandom.style.display="block";
            api.getRequest(CONSTANTS.SearchDataAPIURL, data => {
                CONSTANTS.title.innerText = "";
                CONSTANTS.tabTitle.innerText = "All Recipes";
                console.log(data);
                CONSTANTS.content.innerHTML = recipes.displayRecipes(data.allRecipes, data.allTags);
                recipes.setupRecipeDeleteButton();
                recipes.setupSearchBar();
                recipes.setupRecipeLinks();
                recipes.setupSearchByTagCheckbox();
                recipes.setupCheckboxFilter();
                recipes.hideRecipeList();   
                randomRecipes.smallRandomBtn();
        });
    });
}

export function setupNavBar(){
    let username = cookies.getCookie("username");
    // let hidePantry = document.getElementById("navPantry"); 
    let userId = cookies.getCookie("userId");
    let loginUser;
    let pantry;
    console.log("UserId");
    console.log(userId);
    if(userId === "undefined" || userId === null)
    {
        pantry = ``;
        loginUser = `<li id="navLogin">Login</li>`
        // hidePantry.style.display = "none";
    } else {
        console.log("Logout displays in nav");
        pantry = `<li id="navPantry"><img src="../img/pantry.png" id="pantryIcon" alt="pantry icon" width="40" height="35" margin="30px"><br>@Home <br> Welcome ${username}</li>`
        loginUser = `<li id="navLogout">Logout</li>`
        // hidePantry.style.display = "initial";
    }
    return `
    <ul id="navbarLi">
        ${pantry}
        <li id="navTags">Tags</li>
        <li id="navPantry"><img src="../img/pantry.png" id="pantryIcon" alt="pantry icon" width="40" height="35" margin="30pz"><br>Pantry</li>
        <li id="navRandom"><img src="../img/shuffle.png" id="smRandom" alt="random icon" width="40" height="35" margin="30pz"><br>Random Recipe</li>
        <li id="navSearch">
        <form id="search-recipes">
        <input type="text" class="searchBar" id="searchRecipes" placeholder="Search recipes..."/>
        </form>
        </li>
       ${loginUser}
    </ul>
    `;
}

export function setupPantry() {
    const btnPantry = document.getElementById("navPantry");
    btnPantry.addEventListener("click", function(){
        console.log("Pantry display link hooked up!");
        api.getRequest(CONSTANTS.SearchDataAPIURL, data => {
        CONSTANTS.title.innerText = "All Recipes";
        CONSTANTS.tabTitle.innerText = "All Recipes";
        CONSTANTS.content.innerHTML = recipes.displayRecipes(data.allRecipes, data.allTags);
        recipes.setupRecipeLinks();
        recipes.setupRecipeDeleteButton();
        recipes.setupSearchBar();
        recipes.hideRecipeList();  
        recipes.SetupAddRecipeEventListeners(); 
        });
    });
}

export function SetupTags() {
    const btnTags = document.getElementById("navTags");
    btnTags.addEventListener("click", function(){
        console.log("Tags display link hooked up!");
        api.getRequest(CONSTANTS.TagsAPIURL, tags => {
            CONSTANTS.title.innerText = "All Tags";
            CONSTANTS.content.innerHTML = tagList.DisplayAllTags(tags);
            tagList.SetupTagDeleteBtn();
        });
    });
}

export function setupLogin() {
    const btnLogin = document.getElementById("navLogin");
    btnLogin.addEventListener("click", function(){
        console.log("Login display hooked up!");
        setupLoginDisplay();
    });
}

export function setupLoginDisplay(){
    CONSTANTS.tabTitle.innerText="Login";
    CONSTANTS.title.innerText="What's For Dinner";
    CONSTANTS.content.innerHTML =
    //call random recipe button here to display in the corner of the page
    `
        <img src="../img/login (1).png" id="loginAvatar" alt="login icon" width="150" height="150" margin="30px">
        <form id="login">
        <input type="text" class="username" id="username" placeholder="Username"/>
        <input type="password" class="password" id="password" placeholder="Password"/>
        </form>
        <div id="positionLoginBtn">
        <button id='loginBtn'>Login</button>
        </div>
        <div id="registerLink">
        <button id="registerBtn">Register</button>
        </div>
    `;
}

function setupHome() {
    CONSTANTS.tabTitle.innerText="Home";
    CONSTANTS.title.innerText="What's For Dinner";
    CONSTANTS.navbar.innerHTML =  setupNavBar(); setupPantry();
    CONSTANTS.content.innerHTML = 
    //call random recipe button here the image is just a placeholder
    `
        <img src="../img/shuffle.png" alt="Shuffle recipes button" id="clickMe" width="400" height="400" style = "padding-bottom: 16px;">
        <p>Click for random recipe</p>      
    `;
}

/* <input type="hidden" value='${recipe.id}' id="hiddenRandomRecipe"/> */

