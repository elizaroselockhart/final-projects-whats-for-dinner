export default {
    getRequest,
    postRequest,
    deleteRequest,
    putRequest
}

function getRequest(location, callback){
    console.log(location);
    fetch(location)
    .then(response => response.json())
    .then(data => {
        callback(data);
    })
    .catch(err => console.log(err));
}

function postRequest(location, requestBody, callback){
    console.log(location);
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