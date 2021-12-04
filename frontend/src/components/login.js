import cookies from "../components/cookies";
import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions"; 

const UserUrl = "https://localhost:44387/api/recipe/" + "?username={0}&password={1}";

export default {
    login,
    setupLogin,
    setupLoginDisplay
}

export function setupLogin() {
    const btnLogin = document.getElementById("navLogin");
    btnLogin.addEventListener("click", function(){
        console.log("Login display hooked up!");
        login();
    });
}

export function login(){
    let username = document.getElementById("username"); 
    let password = document.getElementById("password");
    
    fetch(UserUrl.replace("{0}", username).replace("{1}", password))
    .then(response => response.json())
    .then(data => {

    cookies.setCookie("userId", data.id, 7);
    });
    setupLoginDisplay();
}
//need get request

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
        <button onclick="setCookie("userId", data.id, 7)" value="submit" id='loginBtn'>Login</button>
        </div>
        <div id="registerLink">
        <button id="registerBtn">Register</button>
        </div>
    `;
}














