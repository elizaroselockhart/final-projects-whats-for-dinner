export default {
    displayRecipes
}

export function displayRecipes(recipes) {
    return`
    <ol>
        ${recipes.map(recipes => {
            return`
            <li>
                <h4><span class="recipeDetails">
                ${recipe.title} 
                </span></h4>
                      
            </li>
            `
        })}
    </ol>
    `

}