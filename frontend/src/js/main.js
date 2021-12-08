import login from "../components/login";
import navbarTabs from "../components/navbar";
import * as CONSTANTS from "../components/constants";
import recipes from "../components/recipes";
import randomRecipes from "../components/randomRecipes";
import register from "../components/register";

const navbar = document.getElementById("navbar");


export default() => {
    setupMain();
}

function setupMain() {
    navbar.innerHTML = navbarTabs.setupNavBar();
    navbarTabs.setupPantry(); navbarTabs.setupHome();
    randomRecipes.getRandomRecipe();
    randomRecipes.setupRandomBtn();
    randomRecipes.smallRandomBtn();
    navbarTabs.setupLogin();
    navbarTabs.hideNavSearchBarDisplayRecipes();
    navbarTabs.SetupTags();
}