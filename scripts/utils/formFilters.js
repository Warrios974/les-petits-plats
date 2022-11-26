//Import de la "Factory Photographer" (fonction)
import { filterIngredients } from "../page/index.js";

const filterFormDOM = document.querySelector("#formFilter fieldset");
const ingredientsSelectDOM = filterFormDOM.querySelector("#formFilter #filterIngredients");
const applianceSelectDOM = filterFormDOM.querySelector("#formFilter #filterAppliance");
const ustensilsSelectDOM = filterFormDOM.querySelector("#formFilter #filterUstensils");
let open = false;

//Element ingredients select
const ingredientsLabel = ingredientsSelectDOM.querySelector("label");
const ingredientsIcon = ingredientsSelectDOM.querySelector("img");
const ingredientsInput = ingredientsSelectDOM.querySelector("input");
const ingredientsList = ingredientsSelectDOM.querySelector(".select__choises");

export function initFilter(){

    for (let index = 0; index < 30; index++) {
        const li = document.createElement( "li" );
        li.setAttribute("class", "col-4 p-2");
        li.textContent = filterIngredients[index];
        ingredientsList.appendChild(li);
    }
}

function displayList() {
    if (!open) {

        initFilter();
        ingredientsSelectDOM.classList.add("col-6");
        ingredientsSelectDOM.classList.remove("col-2");
        ingredientsLabel.style.display = "none";
        ingredientsIcon.setAttribute("src", "./assets/medias/icons/chevron-up.svg");
        ingredientsInput.setAttribute("placeholder", "Rechercher une recette");
        ingredientsList.style.display = "flex";
        ingredientsList.classList.add("row");

        open = true;
    }else{

        ingredientsSelectDOM.classList.add("col-2");
        ingredientsSelectDOM.classList.remove("col-6");
        ingredientsLabel.style.display = "block";
        ingredientsIcon.setAttribute("src", "./assets/medias/icons/chevron-down.svg");
        ingredientsInput.setAttribute("placeholder", "");
        ingredientsList.style.display = "none";
        ingredientsList.innerHTML = "";

        open = false;
    }
}

ingredientsIcon.addEventListener("click", function() {
    displayList();
})

ingredientsInput.addEventListener("focus", function() {
    displayList();
})

