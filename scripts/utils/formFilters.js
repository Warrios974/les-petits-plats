//Import de la "Factory Photographer" (fonction)
import { filter } from "../models/filter.js";
import { filterIngredients, filterAppliances, filterUstensils,filtersDOM } from "../page/index.js";

let open = false;

//Element ingredients select
/*const ingredientsLabel = filtersDOM["Ingredients"].querySelector("label");
const ingredientsIcon = filtersDOM["Ingredients"].querySelector("img");
const ingredientsInput = filtersDOM["Ingredients"].querySelector("input");
const ingredientsList = filtersDOM["Ingredients"].querySelector(".select__choises");*/

export function initFilterDOM(filter,filterDOM){
    
    const List = filterDOM.querySelector(".select__choises");

    let limite;

    filter.length > 30 ? limite = 30 : limite = filter.length;

    for (let index = 0; index < limite; index++) {
        const li = document.createElement( "li" );
        const thisFilter = filter;
        li.setAttribute("class", "col-4 p-2");
        li.textContent = thisFilter[index];
        List.appendChild(li);
    }
}

function displayLists(filterDOM) {
    
    //Element ingredients select
    const label = filterDOM.querySelector(".select__input label");
    const icon = filterDOM.querySelector(".select__input img");
    const input = filterDOM.querySelector(".select__input input");
    const list = filterDOM.querySelector(".select__choises");

    if (filterDOM.getAttribute("select") == "close" && open == false) {
        filterDOM.classList.add("col-6");
        filterDOM.classList.remove("col-2");
        label.style.display = "none";
        icon.setAttribute("src", "./assets/medias/icons/chevron-up.svg");
        input.setAttribute("placeholder", "Rechercher une recette");
        list.style.display = "flex";
        list.classList.add("row");
        filterDOM.setAttribute("select","open");
        
        open = true;

        return true;
    }

    if (filterDOM.getAttribute("select") == "close" && open == true) {
        const selectOpen = filterDOM.parentElement.querySelector("div[select='open']");
        
        const selectOpenlabel = selectOpen.querySelector(".select__input label");
        const selectOpenicon = selectOpen.querySelector(".select__input img");
        const selectOpeninput = selectOpen.querySelector(".select__input input");
        const selectOpenlist = selectOpen.querySelector(".select__choises");

        selectOpen.classList.add("col-2");
        selectOpen.classList.remove("col-6");
        selectOpenlabel.style.display = "block";
        selectOpenicon.setAttribute("src", "./assets/medias/icons/chevron-down.svg");
        selectOpeninput.setAttribute("placeholder", "");
        selectOpenlist.style.display = "none";
        selectOpenlist.classList.remove("row");
        selectOpen.setAttribute("select","close");

        
        filterDOM.classList.add("col-6");
        filterDOM.classList.remove("col-2");
        label.style.display = "none";
        icon.setAttribute("src", "./assets/medias/icons/chevron-up.svg");
        input.setAttribute("placeholder", "Rechercher une recette");
        list.style.display = "flex";
        list.classList.add("row");
        filterDOM.setAttribute("select","open");
        return true;
    }

    if (filterDOM.getAttribute("select") == "open" && open == true) {
        
        filterDOM.classList.add("col-2");
        filterDOM.classList.remove("col-6");
        label.style.display = "block";
        icon.setAttribute("src", "./assets/medias/icons/chevron-down.svg");
        input.setAttribute("placeholder", "");
        list.style.display = "none";
        list.classList.remove("row");
        filterDOM.setAttribute("select","close");

        open = false

        return true;
    }

}

/*ingredientsIcon.addEventListener("click", function() {
    displayLists();
})

ingredientsInput.addEventListener("focus", function() {
    displayLists();
})*/


// Utilisation de la délégation d'événement pour détecter sur quoi je "click"
document.addEventListener("click",function(e){
	const parent = e.target.parentElement.parentElement;
	const target = e.target;
	if(e.target && target.getAttribute("class") === "select"){
		displayLists(parent);
	}
});

