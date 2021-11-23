import apiActions from "../api/api-actions";

export const title = document.getElementById("pageTitle");
export const content = document.getElementById("pageContent");
export const tabTitle = document.getElementById("tabTitle");

export const RecipesAPIURL = 'https://localhost:44387/api/recipe';


//export const GetAllRecipes = function(){
    //let allRecipes = document.getElementById("recipeList");
    //if(allRecipes != undefined){
        //apiActions.getRequest(RecipesAPIURL, recipes =>{
           //recipes.forEach(recipe =>{
                //let option = document.createElement('option');
                //option.value = recipe.id;
               //option.text = recipe.name;
                //allRecipes.appendChild(option);
            //});
        //});
    //}
    
//}