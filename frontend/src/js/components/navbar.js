

export default {
    setupLoginBtn

}


function setupLoginBtn(){
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener('click', function(){
        console.log("Login Button Clicked");
    });
}


