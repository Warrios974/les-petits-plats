//Import de la "Factory Photographer" (fonction)
import { filters } from "../models/filter.js";
import { filtersDOM } from "../page/index.js";

let open = false;

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
        input.focus();
        
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
        selectOpeninput.value = "";

        
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

    if (filterDOM.getAttribute("select") == "open" && open == true && document.activeElement != input) {
        
        filterDOM.classList.add("col-2");
        filterDOM.classList.remove("col-6");
        label.style.display = "block";
        icon.setAttribute("src", "./assets/medias/icons/chevron-down.svg");
        input.setAttribute("placeholder", "");
        list.style.display = "none";
        list.classList.remove("row");
        filterDOM.setAttribute("select","close");
        input.value = "";

        open = false

        return true;
    }

    if (filterDOM.getAttribute("select") == "open" && open == true && document.activeElement === input) {
        open = true;
        return true;
    }
}

// Utilisation de la délégation d'événement pour détecter sur quoi je "click"
document.addEventListener("click",function(e){
	const target = e.target;
	if(target && target.getAttribute("filter") === "yes"){
        const parent = e.target.parentElement.parentElement;
		displayLists(parent);
	}
    if (target.parentElement.classList[1] == "select__choises") {
        const idFilter = target.parentElement.parentElement.getAttribute("id");
        const targetValue = target.textContent;
        console.log(idFilter)
        console.log("Ajout de " + target.textContent + " dans les filtres");

        filtersDOM.updateAfilterDOM(targetValue,idFilter);
        filtersDOM.addTagsFiltersInDOM(targetValue);
    }
});

document.querySelector("#filterIngredients input").addEventListener("focus", function(e) {
    const parent = e.target.parentElement.parentElement;
    displayLists(parent);
})
document.querySelector("#filterAppliances input").addEventListener("focus", function(e) {
    const parent = e.target.parentElement.parentElement;
    displayLists(parent);
})
document.querySelector("#filterUstensils input").addEventListener("focus", function(e) {
    const parent = e.target.parentElement.parentElement;
    displayLists(parent);
})