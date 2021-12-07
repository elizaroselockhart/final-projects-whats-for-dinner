import cookies from "../components/cookies";
import * as CONSTANTS from "../components/constants";
import navbarTabs from "../components/navbar";
import api from "../api/api-actions";
import login from "../components/login";

export default {
    setupRegisterLink,
    setupRegisterDisplay,
    register
}

const UserUrl = "https://localhost:44387/api/user" + "?username={0}&password={1}&name={2}";

function setupRegisterLink() {
    const registerLink = document.getElementById("registerLinkBtn");
    registerLink.addEventListener("click", function(){
        console.log("Register display link hooked up!");
        setupRegisterDisplay();
    });
}

function setupRegisterDisplay() {
    CONSTANTS.tabTitle.innerText="Register";
    CONSTANTS.title.innerText="What's For Dinner";
    CONSTANTS.content.innerHTML =
    //call random recipe button here to display in the corner of the page
    `
        <img src="../img/login (1).png" id="loginAvatar" alt="login icon" width="150" height="150" margin="30pz">
        <form id="login">
        <input type="text" class="name" id="name" placeholder="Name"/>
        <input type="text" class="username" id="username" placeholder="Username"/>
        <input type="password" class="password" id="password" placeholder="Password"/>
        </form>
        <div id="positionRegisterBtn">
        <button id='registerBtn'>Register</button>
        </div>
        <div id="loginLink">
        <button id="loginLinkBtn">Login</button>
        </div>
    `;
}

export function register(){
    const registerBtn = document.getElementById("registerBtn");
    if(registerBtn == null){return}
    registerBtn.addEventListener("click", async function(){
        let username = document.getElementById("username").value; 
        let password = document.getElementById("password").value;
        let name = document.getElementById("name").value;
        let url = UserUrl.replace("{0}", username).replace("{1}", password).replace("{2}", name);
        console.log(url);
        api.getRequest(url,user => {
            console.log(user)
            cookies.setCookie("userId",user.id,7)
            console.log(cookies.getCookie("userId"));
            navbarTabs.setupHome();
            CONSTANTS.navbar.innerHTML = navbarTabs.setupNavBar();
            logout();
        });
    })
}