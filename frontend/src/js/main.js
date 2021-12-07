import login from "../components/login";
import navbarTabs from "../components/navbar";
import register from "../components/register";

const navbar = document.getElementById("navbar");


export default() => {
    setupMain();
}

function setupMain() {
    navbar.innerHTML = navbarTabs.setupNavBar();
    navbarTabs.setupPantry(); 
    navbarTabs.setupHome();
    login.setupLogin();
    register.setupRegisterLink();
    navbarTabs.hideNavSearchBarDisplayRecipes();
}





