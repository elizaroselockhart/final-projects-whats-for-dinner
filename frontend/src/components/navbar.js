import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";
import recipes from "../components/recipes";
import cookies from "../components/cookies";

export default {
    setupNavBar,
    setupPantry,
    setupHome,
    setupRegisterBtn,
    setupRegisterDisplay,
    hideNavSearchBarDisplayRecipes

}

export function hideNavSearchBarDisplayRecipes() {
    const hideSearch = document.getElementById("searchRecipes");
    hideSearch.addEventListener("click", function(){
        console.log("Hide nav search, display recipes");
            hideSearch.style.display = "none";
            api.getRequest(CONSTANTS.SearchDataAPIURL, data => {
                CONSTANTS.title.innerText = "";
                CONSTANTS.tabTitle.innerText = "All Recipes";
                console.log(data);
                CONSTANTS.content.innerHTML = recipes.displayRecipes(data.allRecipes, data.allTags);
                recipes.setupSearchBar();
                recipes.setupRecipeLinks();
                recipes.setupSearchByTagCheckbox();
                recipes.setupCheckboxFilter();
                recipes.hideRecipeList();   
        });
    });
}

export function setupNavBar(){
    let username = cookies.getCookie("username"); 
    let userId = cookies.getCookie("userId");
    let loginUser;
    let welcomeUser;
    console.log("UserId");
    console.log(userId);
    if(userId === "undefined" || userId === null)
    {
        loginUser = `<li id="navLogin">Login</li>`
        welcomeUser = `<li id="navPantry"><img src="../img/pantry.png" id="pantryIcon" alt="pantry icon" width="40" height="35" margin="30pz"><br>Pantry</li>`
    } else {
        console.log("Logout displays in nav");
        loginUser = `<li id="navLogout">Logout</li>`
        welcomeUser = `<li id="navPantry"><img src="../img/pantry.png" id="pantryIcon" alt="pantry icon" width="40" height="35" margin="30pz"><br>Pantry <br> Welcome ${username}</li>`
    }
    return `
    <ul id="navbarLi">
        ${welcomeUser}
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
    });
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
