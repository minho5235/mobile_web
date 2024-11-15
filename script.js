// script.js

const API_KEY = "ca6e341a0c994412b55c077cc870e22e"; // Spoonacular에서 발급받은 API Key를 입력하세요.

function findRecipes() {
    const ingredient = document.getElementById("ingredientInput").value.trim();

    if (!ingredient) {
        alert("재료를 입력하세요!");
        return;
    }

    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=10&apiKey=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const recipeList = document.getElementById("recipeList");
            recipeList.innerHTML = ""; // 이전 결과 초기화

            if (data.length > 0) {
                data.forEach(recipe => {
                    const recipeItem = document.createElement("div");
                    recipeItem.innerHTML = `
                        <strong>${recipe.title}</strong><br>
                        <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; max-width:300px; border-radius:8px; margin:10px 0;">
                        <a href="https://spoonacular.com/recipes/${recipe.title.replaceAll(" ", "-")}-${recipe.id}" target="_blank">레시피 보기</a>
                    `;
                    recipeList.appendChild(recipeItem);
                });
            } else {
                recipeList.innerHTML = "<p>해당 재료로 찾은 레시피가 없습니다.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
            alert("레시피를 불러오는 중 문제가 발생했습니다.");
        });
}
