import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";
import recipes from "../components/recipes";

export default {
    setupNavBar,
    setupPantry,
    setupHome,
    setupLogin,
    setupRegisterBtn,
    setupRegisterDisplay,
    setupLoginDisplay,
    hideNavSearchBarDisplayRecipes

}

export function hideNavSearchBarDisplayRecipes() {
    const hideSearch = document.getElementById("searchRecipes");
    hideSearch.addEventListener("click", function(){
        console.log("Hide nav search, display recipes");
            hideSearch.style.display = "none";
            api.getRequest(CONSTANTS.RecipesAPIURL, data => {
                CONSTANTS.content.innerHTML =  recipes.displayRecipes(data);
                recipes.setupSearchBar();
 
            });
        
    });
}

export function setupNavBar(){
    return `
    <ul>
        <li id="navPantry"><img src="../img/pantry.png" id="pantryIcon" alt="pantry icon" width="40" height="35" margin="30pz"><br>Pantry</li>
        <li id="navSearch">
        <form id="search-recipes">
        <input type="text" class="searchBar" id="searchRecipes" placeholder="Search recipes..."/>
        </form>
        </li>
        <li id="navLogin">Login</li>       
    </ul>
    `;
}

export function setupPantry() {
    const btnPantry = document.getElementById("navPantry");
    btnPantry.addEventListener("click", function(){
        console.log("Pantry display link hooked up!");
        api.getRequest(CONSTANTS.SearchDataAPIURL, data => {
            CONSTANTS.title.innerText = "";
            CONSTANTS.tabTitle.innerText = "All Recipes";
            console.log(data);
            CONSTANTS.content.innerHTML = recipes.displayRecipes(data.allRecipes, data.allTags); // this is just all of the recipes
            recipes.setupRecipeLinks();
            recipes.setupSearchBar();
            recipes.setupSearchByTag();
            recipes.displayIndividualTagCheckbox();
            recipes.displaySearchByTagCheckbox();
            recipes.hideRecipeList();   
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

export function setupRegisterBtn() {
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.addEventListener("click", function(){
        console.log("Register display button hooked up!");
        setupRegisterDisplay();
    });
}

export function setupRegisterDisplay() {
    CONSTANTS.tabTitle.innerText="Register";
    CONSTANTS.title.innerText="What's For Dinner";
    CONSTANTS.content.innerHTML =
    //call random recipe button here to display in the corner of the page
    `
        <img src="../img/login (1).png" id="loginAvatar" alt="login icon" width="150" height="150" margin="30pz">
        <form id="login">
        <input type="text" class="username" id="username" placeholder="Username"/>
        <input type="password" class="password" id="password" placeholder="Password"/>
        <input type="text" class="email" id="email" placeholder="Email"/>
        </form>
        <div id="positionRegisterBtn">
        <button id='registerBtn'>Register</button>
        </div>
        <div id="loginLink">
        <button id="loginLinkBtn">Login</button>
        </div>
    `;
}

function setupHome() {
    CONSTANTS.tabTitle.innerText="Home";
    CONSTANTS.title.innerText="What's For Dinner";
    CONSTANTS.content.innerHTML =
    //call random recipe button here the image is just a placeholder
    `
        <img src="../img/shuffle.png" alt="Shuffle recipes button" width="400" height="400" style = "padding-bottom: 16px;">
        <p>Click for random recipe</p>
    `;

}
