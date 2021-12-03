import main from "./js/main";
import cookies from "./components/cookies"
import { login } from "./components/login";

//check for login
let userId = cookies.getCookie("userId");
if(userId == undefined)
{
    login();
}else{
    main();
}
main();