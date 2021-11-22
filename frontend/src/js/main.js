import navbar from "./components/navbar";

const loginElement = document.getElementById("loginBtn");


export default() => {
    setupLogin();
}

function setupLogin(){

    navbar.setupLoginBtn();
    
}