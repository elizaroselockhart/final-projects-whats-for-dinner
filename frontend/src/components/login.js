import cookies from "../components/cookies";
import * as CONSTANTS from "../components/constants";
import navbarTabs from "../components/navbar";
import api from "../api/api-actions";
import register from "../components/register"


const UserUrl = "https://localhost:44387/api/user" + "?username={0}&password={1}";

export default {
    login,
    setupLogin,
    setupLoginDisplay,
    logout
}

export function setupLogin() {
    const navbtnLogin = document.getElementById("navLogin");
    if(navbtnLogin == null){return}
    navbtnLogin.addEventListener("click", function(){
        console.log("Login btn display hooked up!");
        setupLoginDisplay();
        login();
        register.setupRegisterLink();
    });
}

export function setupLoginDisplay(){
    CONSTANTS.tabTitle.innerText="Login";
    CONSTANTS.title.innerText="What's For Dinner";
    CONSTANTS.content.innerHTML =
    `
        <img src="../img/login (1).png" id="loginAvatar" alt="login icon" width="150" height="150" margin="30px">
        <form id="login">
        <input type="text" class="username" id="username" placeholder="Username"/>
        <input type="password" class="password" id="password" placeholder="Password"/>
        </form>
        <div id="positionLoginBtn">
        <button value="submit" id='loginBtn'>Login</button>
        </div>
        <div id="registerLink">
        <button id="registerLinkBtn">Register</button>
        </div>
    `;
}

export function login(){
    const loginBtn = document.getElementById("loginBtn");
    if(loginBtn == null){return}
    loginBtn.addEventListener("click", async function(){
        let username = document.getElementById("username").value; 
        let password = document.getElementById("password").value;
        let url = UserUrl.replace("{0}", username).replace("{1}", password);
        console.log(url);
        api.getRequest(url,user => {
            console.log(user)
            cookies.setCookie("userId",user.id,7)
            cookies.setCookie("username", user.username, 7)
            console.log(cookies.getCookie("userId"));
            navbarTabs.setupHome();
            logout();
        });
    })
}

export function logout(){
    const logoutBtn = document.getElementById("navLogout");
    logoutBtn.addEventListener("click", function(){
        console.log("Logout btn clicked!");
        cookies.deleteCookie("userId");
        CONSTANTS.navbar.innerHTML = navbarTabs.setupHome();
        navbarTabs.setupHome();
        login();
    })
}















