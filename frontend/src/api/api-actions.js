export default {
    getRequest,
    SyncGetRequest,
    postRequest,
    SyncPostRequest,
    deleteRequest,
    SyncDeleteRequest,
    putRequest
}

function getRequest(location, callback){
    fetch(location)
    .then(response => response.json())
    .then(data => {
        callback(data);
    })
    .catch(err => console.log(err));
}

async function SyncGetRequest(location){
    return await fetch(location)
    .then(response => response.json())
    .catch(err => console.log(err))
}

function postRequest(location, requestBody, callback){
    fetch(`${location}`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        callback(data);
    })
    .catch(err => console.log(err));
}

async function SyncPostRequest(location, requestBody) {
    return await fetch(`${location}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

function deleteRequest(location, id, callback){
    fetch(`${location} ${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        callback(data);
    })
    .catch(err => console.log(err));
}

async function SyncDeleteRequest(location, id) {
    return await fetch(`${location} ${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

function putRequest(location, id, requestBody, callback) {
    fetch(`${location}${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        callback(data);
    })
    .catch(err => console.log(err));
}
