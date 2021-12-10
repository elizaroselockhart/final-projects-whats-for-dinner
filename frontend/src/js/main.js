import navbarTabs from "../components/navbar";
import randomRecipes from "../components/randomRecipes";
import recipes from "../components/recipes";
import login from "../components/login";

const navbar = document.getElementById("navbar");

export default() => {
    setupMain();
}

function setupMain() {
    navbar.innerHTML = 
    navbarTabs.setupNavBar();
    navbarTabs.setupHome();
    randomRecipes.setupRandomBtn();
    randomRecipes.smallRandomBtn();
    login.setupLogin();
    login.setupLogout();
    navbarTabs.hideNavSearchBarDisplayRecipes();
}