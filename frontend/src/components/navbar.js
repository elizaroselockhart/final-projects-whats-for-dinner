import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipes from "../components/recipes";
import cookies from "../components/cookies";

export default {
    setupNavBar,
    setupPantry,
    setupHome,
    hideNavSearchBarDisplayRecipes,
    pantryOverlayDisplay,
    openNav,
    closeNav

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
    // let hidePantry = document.getElementById("navPantry"); 
    let userId = cookies.getCookie("userId");
    let loginUser;
    console.log("UserId");
    console.log(userId);
    if(userId === "undefined" || userId === null)
    {
        loginUser = `<li id="navLogin">Login</li>`
        // hidePantry.style.display = "none";
    } else {
        console.log("Logout displays in nav");
        loginUser = `<li id="navLogout">Logout</li>`
        // hidePantry.style.display = "initial";
    }
    return `
    <ul id="navbarLi">
        <li id="navPantry"><img src="../img/pantry.png" id="pantryIcon" alt="pantry icon" width="40" height="35" margin="30px"><br>@Home <br> Welcome ${username}</li>
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
        openNav();
        pantryOverlayDisplay();
    });
}

export function pantryOverlayDisplay() { 
        return`
        <div id="myNav" class="overlay">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a> 
            <div class="overlay-content">
              <div class="container"><h1>Saved</h1></div>
              <div class="container"><h2>Categories</h2></div>
            </div>
        </div>  
        `;
}

function openNav() {
    document.getElementById("myNav").style.height = "100%";
}
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

function setupHome() {
    CONSTANTS.tabTitle.innerText="Home";
    CONSTANTS.title.innerText="What's For Dinner";
    CONSTANTS.navbar.innerHTML =  setupNavBar(); setupPantry();
    CONSTANTS.content.innerHTML =
    //call random recipe button here the image is just a placeholder
    `
        <img src="../img/shuffle.png" alt="Shuffle recipes button" id="shuffleBtn" width="400" height="400" style = "padding-bottom: 16px;">
        <p>Click for random recipe</p>
    `;
    
}

