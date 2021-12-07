import cookies from "../components/cookies";
import * as CONSTANTS from "../components/constants";
import navbarTabs from "../components/navbar";
import apiAction from "../api/api-actions";
import login from "../components/login";

export default {
    setupRegisterLink,
    setupRegisterDisplay,
    register,
}

// const UserUrl = "https://localhost:44387/api/user" + "?username={0}&password={1}&name={2}";

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
    `;
}

export function register(){
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.addEventListener("click", async function(){
        let url = CONSTANTS.UserAPIURL +"all";
        let name = document.getElementById("name").value;
        let username = document.getElementById("username").value; 
        let password = document.getElementById("password").value;
        
        const requestBody = {
            Id: 0,
            Name: name,
            Username: username,
            Password: password
        }

        if(name == "" && username == "" && password == "") 
        {
            document.getElementById("name").innerText = "This field is required"
            document.getElementById("username").innerText = "This field is required"
            document.getElementById("password").innerText = "This field is required"
        }else if (name == "") {
            document.getElementById("name").innerText = "This field is required"
            document.getElementById("username").innerText = ""
            document.getElementById("password").innerText = ""
        }else if (username == "") {
            document.getElementById("name").innerText = ""
            document.getElementById("username").innerText = "This field is required"
            document.getElementById("password").innerText = "" 
        }else if (password == "") {
            document.getElementById("name").innerText = ""
            document.getElementById("username").innerText = ""
            document.getElementById("password").innerText = "This field is required"  
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
                    apiAction.postRequest(url, requestBody, user => {
                        cookies.setCookie("userId", user.id, 7);
                        cookies.setCookie("username", user.username, 7);
                        navbarTabs.setupHome();
                        CONSTANTS.navbar.innerHTML = navbarTabs.setupNavBar();
                        logout();
                    });
                }
                else {
                    document.getElementById("name").innerText = "Name, Username, or Password already exists. Try again!"
                    document.getElementById("username").innerText = ""
                    document.getElementById("password").innerText = ""  
                }
            });

        }
    })
}

