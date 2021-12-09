import cookies from "../components/cookies";
import * as CONSTANTS from "../components/constants";
import navbarTabs from "../components/navbar";
import apiAction from "../api/api-actions";
import login from "../components/login";
import main from "../js/main";

export default {
    setupRegisterLink,
    setupRegisterDisplay,
    register
}

function setupRegisterLink() {
    const registerLink = document.getElementById("registerLinkBtn");
    registerLink.addEventListener("click", function(){
        console.log("Register display link hooked up!");
        setupRegisterDisplay();
        register();
        login.login();
    });
}

function setupRegisterDisplay() {
    CONSTANTS.tabTitle.innerText="Register";
    CONSTANTS.title.innerText="What's For Dinner";
    CONSTANTS.content.innerHTML =
    `
        <img src="../img/login (1).png" id="loginAvatar" alt="login icon" width="150" height="150" margin="30pz">
        <div id="error-message"></div>
        <div id="already-exists"></div>
        <form id="login">
        <input type="text" class="name" id="name" placeholder="Name" required/>
        <input type="text" class="username" id="username" placeholder="Username" required/>
        <input type="password" class="password" id="password" placeholder="Password" required/>
        </form>
        <div id="positionRegisterBtn">
        <button id='registerBtn'>Register</button>
        </div>
    `;
}

export function register(){
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.addEventListener("click", async function(){
        let url = CONSTANTS.UserAPIURL +"GetAll";
        let name = document.getElementById("name").value;
        let username = document.getElementById("username").value; 
        let password = document.getElementById("password").value;
        
        const requestBody = {
            Id: 0,
            Name: name,
            Username: username,
            Password: password
        }
      
        if (name == "") {
            document.getElementById("error-message").innerText = "This field is required"
        }else if (username == "") {
            document.getElementById("error-message").innerText = "This field is required" 
        }else if (password == "") {
            document.getElementById("error-message").innerText = "This field is required"  
        }
        else {
            let isUnique = true;

            apiAction.getRequest(url, users =>{
                users.forEach(user => {
                if (user.username === username){
                    isUnique = false;
                }
            });

                if (isUnique) {
                    apiAction.postRequest(CONSTANTS.UserAPIURL, requestBody, user => {
                        cookies.setCookie("userId", user.id, 7);
                        cookies.setCookie("username", user.username, 7);
                        navbarTabs.setupHome();
                        CONSTANTS.navbar.innerHTML = navbarTabs.setupNavBar();
                        main();
                        login.logout();
                    });
                }
                else {
                    document.getElementById("already-exists").innerText = "Username already exists. Try again!"
                }
            });

        }
    })
}

