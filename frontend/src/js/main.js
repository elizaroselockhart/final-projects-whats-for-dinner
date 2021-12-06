import navbarTabs from "../components/navbar";
import * as CONSTANTS from "../components/constants";
import recipes from "../components/recipes";
import randomRecipes from "../components/randomRecipes";

const navbar = document.getElementById("navbar");
const pageContent = document.getElementById("pageContent");

export default() => {
    setupNavbar();
}

function setupNavbar() {
    navbar.innerHTML = navbarTabs.setupNavBar();
    navbarTabs.setupPantry(); navbarTabs.setupHome();
    randomRecipes.getRandomRecipe();
    randomRecipes.setupRandomBtn();
    navbarTabs.setupLogin();
    navbarTabs.hideNavSearchBarDisplayRecipes();
}





