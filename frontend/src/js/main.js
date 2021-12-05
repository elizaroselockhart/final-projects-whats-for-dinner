import login from "../components/login";
import navbarTabs from "../components/navbar";
// import * as CONSTANTS from "../components/constants";
// import recipes from "../components/recipes";

const navbar = document.getElementById("navbar");
// const pageContent = document.getElementById("pageContent");

export default() => {
    setupMain();
}

function setupMain() {
    navbar.innerHTML = navbarTabs.setupNavBar();
    navbarTabs.setupPantry(); navbarTabs.setupHome();
    login.setupLogin(); //login.logout();
    navbarTabs.hideNavSearchBarDisplayRecipes();
}





