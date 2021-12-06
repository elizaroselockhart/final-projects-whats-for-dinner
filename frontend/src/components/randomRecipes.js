import recipes from "./recipes";
import navbar from "./navbar";
import * as CONSTANTS from "../components/constants";
import api from "../api/api-actions";
import recipeDetails from "./recipeDetails";

export const randomRecBtn = document.getElementById('clickMe');

export const getRandomBtn = randomRecBtn => {
    randomRecBtn.addEventListener("click", () => {

        //const recipes = Array.from(document.getElementsByClassName("recipe"));
        //let randomRec = recipes[Math.floor(Math.random() * recipes.length)];

        console.log(getRandomBtn())

    })

}

//not sure where to go from here. I've tried several diff ways but for some reason nothing works. I've tried to pull from index.html and I've tried to fetch from 2 of our api but didn't work. 



function getRandom(recipes){
    const allRecipes = document.getElementById('recipeList');
    let min = 0;
    let max = allRecipes.length;
    let getRandomRec = (Math.floor(Math.random() * (max - min + 1)) + min);
    
    return getRandomRec
}