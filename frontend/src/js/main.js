import navbarTabs from "../components/navbar";
import * as CONSTANTS from "../components/constants";
import recipes from "../components/recipes";

const navbar = document.getElementById("navbar");

export default() => {
    setupNavbar();
}

function setupNavbar() {
    navbar.innerHTML = navbarTabs.setupNavBar();
    navbarTabs.setupPantry();
}




