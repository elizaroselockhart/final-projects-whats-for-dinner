import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipes from "../components/recipes";
import cookies from "../components/cookies";

export default {
    setupNavBar,
    // setupPantry,
    setupHome,
    hideNavSearchBarDisplayRecipes
}

export function hideNavSearchBarDisplayRecipes() {
    const showRandom = document.getElementById("navRandom");
    const hideSearch = document.getElementById("searchRecipes");

    hideSearch.addEventListener("click", function () {
        console.log("Hide nav search, display recipes");
        hideSearch.style.display = "none";
        showRandom.style.display = "block";
        api.getRequest(CONSTANTS.SearchDataAPIURL, data => {
            CONSTANTS.title.innerText = "What's For Dinner?";
            CONSTANTS.tabTitle.innerText = "Search Recipes";
            console.log(data);
            CONSTANTS.content.innerHTML =
                recipes.displayRecipes(data.allRecipes, data.allTags);
                recipes.setupRecipeDeleteButton();
                recipes.SetupAddRecipeEventListeners();
                recipes.setupSearchBar();
                recipes.setupRecipeLinks();
                recipes.setupSearchByTagCheckbox();
                recipes.setupCheckboxFilter();
                recipes.hideRecipeList();        
        });
    });

}

export function setupNavBar() {
    let username = cookies.getCookie("username");
    let userId = cookies.getCookie("userId");
    let loginUser;
    let pantry;
    console.log("UserId");
    console.log(userId);
    if (userId === "undefined" || userId === null) {
        pantry = ``;
        loginUser = `<li id="navLogin">Login</li>`
    } else {
        console.log("Logout displays in nav");
        pantry = `<li id="navPantry">Welcome ${username}</li>`
        loginUser = `<li id="navLogout">Logout</li>`
    }
    return `
    <ul id="navbarLi">
        ${pantry}
        <li id="search-area">
            <form id="search-recipes">
                <input type="text" class="searchBar" id="searchRecipes" placeholder="Search recipes..."/>
                <p class="tooltipText" id="show">Click to view all recipes</p>
             </form>
        </li>
       ${loginUser}
    </ul>

     
    `;
}

function setupHome() {
    CONSTANTS.tabTitle.innerText = "Home";
    CONSTANTS.title.innerText = "What's For Dinner?";
    CONSTANTS.navbar.innerHTML = setupNavBar(); //setupPantry();
    CONSTANTS.positionRandomBtn.innerHTML = "";

    CONSTANTS.content.innerHTML =
        `
        <img src="../img/shuffle.png" alt="Shuffle recipes button" id="clickMe" width="300" height="300" />
        <p id="home-page-text">Click the image to find out!</p>      
    `;
}