import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "../components/recipeDetails";
import recipes from "../components/recipes";

let recipe =[1, 2, 3]

export default {
    getRandomRecipe,
    setupRandomBtn
}


export function getRandomRecipe(num) {
    let result = Math.floor(Math.random()*num);
    return result;
}


export function setupRandomBtn() {
    let btnRandom = document.getElementById("clickMe");
    btnRandom.addEventListener('click', function() {
        console.log("random btn clicked!");
        let index = getRandomRecipe(recipe.length);
       // CONSTANTS.content.innerText = recipe[index];
        api.getRequest(CONSTANTS.RecipesAPIURL + recipe[index], data => {
            console.log(data);
             CONSTANTS.title.innerText= "What's For Dinner"
             CONSTANTS.content.innerHTML = recipeDetails.DisplayRecipeDetails(data); 
            // recipes.setupSearchBar();                     
        });
    });
}











// import recipes from "../components/recipes";
// import navbar from "./navbar";
// import * as CONSTANTS from "../components/constants";
// import api from "../api/api-actions";
// import recipeDetails from "./recipeDetails";

// export default {
//     setupRandomBtn,
//     randomRecipeList
// }


// Array.prototype.sample = function(){
//     return this[Math.floor(Math.random()*this.length)];
// }

// export function setupRandomBtn() {
//     const randomRecBtn = document.getElementById('clickMe');
//     randomRecBtn.addEventListener("click", function(){
//         console.log("random btn clicked!");
//         randomRecipeList();
//     });
// }

// export function displayRandomRecipe(recipe) {
//     return`
//     <div id="randomRecipe">
//     <ol>
//         ${recipe => {
//             return`
//             <li class="recipe">
//                 <h4>
//                 <span class="recipeDetails">
//                     ${recipe.name} 
//                 </span>
//                 <input type="hidden" value='${recipe.id}'/>
//                 <div display="none" class="tagString" id='tagString-${recipe.id}'>
//                     ${recipe.tags.map(tag => {           
//                     return tag.tag.name               
//                     })        
//             </li>
//             `;

    
// }

// function getRandom(recipes){
//     const allRecipes = document.getElementById('recipeList');
//     let min = 0;
//     let max = allRecipes.length;
//     let getRandomRec = (Math.floor(Math.random() * (max - min + 1)) + min);
    
//     return getRandomRec
