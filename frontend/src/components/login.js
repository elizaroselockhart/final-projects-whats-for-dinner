import cookies from "../components/cookies";
import * as CONSTANTS from "../components/constants";
import navbarTabs from "../components/navbar";
import api from "../api/api-actions";


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
    });
}

export function setupLoginDisplay(){
    CONSTANTS.tabTitle.innerText="Login";
    CONSTANTS.title.innerText="What's For Dinner";
    CONSTANTS.content.innerHTML =
    //call random recipe button here to display in the corner of the page
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
        <button id="registerBtn">Register</button>
        </div>
    `;
}

// function welcomeUser(){
//   const ul = document.getElementById("navbarLi");
//   const username = `${user.username};`
//   const h2 = document.createElement("h2");
//   h2.setAttribute('id',username.value);
//   h2.appendChild(document.createTextNode(username.value));
//   ul.appendChild(h2);
// }


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
            console.log(cookies.getCookie("userId"));
            navbarTabs.setupHome();
            CONSTANTS.navbar.innerHTML = navbarTabs.setupNavBar();
            logout();
        });
    })
}

export function logout(){
    const logoutBtn = document.getElementById("navLogout");
    logoutBtn.addEventListener("click", function(){
        console.log("Logout btn clicked!");
        //this one line should be your entire logout button
        cookies.deleteCookie("userId");
        navbarTabs.setupHome();
        CONSTANTS.navbar.innerHTML = navbarTabs.setupNavBar();
        setupLogin();
    })
}















