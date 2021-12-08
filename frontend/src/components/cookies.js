export default {
    getCookie,
    setCookie,
    deleteCookie
}


export function getCookie(name){
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    console.log(v);
    return v ? v[2] : null;
}

export function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
} 

export function deleteCookie(name) { setCookie(name, '', -1); }

// let username = "davis"
// setCookie("username", username, 5);
// getCookie("davis") // return true;
// deleteCookie("davis") // davis no longer exists
// getCookie("davis") //returns null

