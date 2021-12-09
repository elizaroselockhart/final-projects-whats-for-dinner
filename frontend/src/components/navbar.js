import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipes from "../components/recipes";
import randomRecipes from "../components/randomRecipes";
import cookies from "../components/cookies";

export default {
    setupNavBar,
    setupPantry,
    setupHome,
    hideNavSearchBarDisplayRecipes
}

export function hideNavSearchBarDisplayRecipes() {
    const showRandom = document.getElementById("navRandom");
    const hideSearch = document.getElementById("searchRecipes");
    hideSearch.addEventListener("click", function(){
        console.log("Hide nav search, display recipes");
            hideSearch.style.display = "none";
             showRandom.style.display="block";
            api.getRequest(CONSTANTS.SearchDataAPIURL, data => {
                CONSTANTS.title.innerText = "What's For Dinner";
                CONSTANTS.tabTitle.innerText = "Search Recipes";
                console.log(data);
                CONSTANTS.content.innerHTML = 
                recipes.displayRecipes(data.allRecipes, data.allTags);
                recipes.setupRecipeDeleteButton();
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
    let pantry;
    console.log("UserId");
    console.log(userId);
    if(userId === "undefined" || userId === null)
    {
        pantry = ``;
        loginUser = `<li id="navLogin">Login</li>`
    } else {
        console.log("Logout displays in nav");
        pantry = `<li id="navPantry"><img src="../img/pantry.png" id="pantryIcon" alt="pantry icon" width="40" height="35" margin="30px"><br>@Home <br> Welcome ${username}</li>`
        loginUser = `<li id="navLogout">Logout</li>`
    }
    return `
    <ul id="navbarLi">
        ${pantry}
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
    let userId = cookies.getCookie("userId");
    if(userId === "undefined" || userId === null){
        return;
    }
    btnPantry.addEventListener("click", function(){
        console.log("Pantry display link hooked up!");
        api.getRequest(CONSTANTS.SearchDataAPIURL, data => {
        CONSTANTS.title.innerText = "Pantry";
        CONSTANTS.tabTitle.innerText = "Pantry";
        CONSTANTS.content.innerHTML = 
        "The pantry is where all of our saved recipes and ingredients will go if we can get to it." 
        });
    });
}

function setupHome() {
    CONSTANTS.tabTitle.innerText="Home";
    CONSTANTS.title.innerText="What's For Dinner";
    CONSTANTS.navbar.innerHTML =  setupNavBar(); setupPantry();
    CONSTANTS.content.innerHTML = 
    `
        <img src="../img/shuffle.png" alt="Shuffle recipes button" id="clickMe" width="400" height="400" style = "padding-bottom: 16px;">
        <p>Click for random recipe</p>      
    `;
}


