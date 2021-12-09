import navbarTabs from "../components/navbar";
import randomRecipes from "../components/randomRecipes";
import login from "../components/login";

const navbar = document.getElementById("navbar");


export default() => {
    setupMain();
}

function setupMain() {
    navbar.innerHTML = 
    navbarTabs.setupNavBar();
    // navbarTabs.setupPantry(); 
    navbarTabs.setupHome();
    randomRecipes.getRandomRecipe();
    randomRecipes.setupRandomBtn();
    randomRecipes.smallRandomBtn();
    login.setupLogin();
    login.setupLogout();
    navbarTabs.hideNavSearchBarDisplayRecipes();
}