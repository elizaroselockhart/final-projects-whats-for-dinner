import login from "../components/login";
import navbarTabs from "../components/navbar";

const navbar = document.getElementById("navbar");


export default() => {
    setupMain();
}

function setupMain() {
    navbar.innerHTML = navbarTabs.setupNavBar();
    navbarTabs.setupPantry(); 
    navbarTabs.setupHome();
    login.setupLogin();
    navbarTabs.hideNavSearchBarDisplayRecipes();
}





