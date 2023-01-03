//Import de la "Factory Photographer" (fonction)
import { receiptsGalery } from "../components/receiptsGalery.js";
import { filtersDOM } from "../page/index.js";
import { proxySearchReceipts } from "../proxy/proxySearchReceipts.js";

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
        
        return true;
	}
    if (target.parentElement && target.parentElement.classList[1] == "select__choises") {
        const idFilter = target.parentElement.parentElement.getAttribute("id");
        const targetValue = target.textContent;


        switch (idFilter) {
            case "filterIngredients":
                filtersDOM.addTagsFiltersInDOM(targetValue,"ingredients");
                const theFilterOne = filtersDOM.updateTheFilter("ingredients",targetValue,"INC");
                const dataOne = proxySearchReceipts().proxySearch(theFilterOne);
                filtersDOM.updatedFilters(dataOne);
                filtersDOM.updateAfilterDOM(targetValue,idFilter,"DESC");
                receiptsGalery(dataOne);
            break;
            case "filterAppliances":
                const theFilterTwo = filtersDOM.updateTheFilter("appliances",targetValue,"INC");
                filtersDOM.addTagsFiltersInDOM(targetValue,"appliances");
                const dataTwo = proxySearchReceipts().proxySearch(theFilterTwo);
                filtersDOM.updatedFilters(dataTwo);
                filtersDOM.updateAfilterDOM(targetValue,idFilter,"DESC");
                receiptsGalery(dataTwo);
            break;
            case "filterUstensils":
                const theFilterThree = filtersDOM.updateTheFilter("ustensils",targetValue,"INC");
                filtersDOM.addTagsFiltersInDOM(targetValue,"ustensils");
                const dataThree = proxySearchReceipts().proxySearch(theFilterThree);
                filtersDOM.updatedFilters(dataThree);
                filtersDOM.updateAfilterDOM(targetValue,idFilter,"DESC");
                receiptsGalery(dataThree);
            break;
            default:
            break;
        }
        
    
        return true;
    }

    if (target.parentElement.parentElement && target.parentElement.parentElement.getAttribute("id") == "tagsFilters") {
        const typeFilter = target.parentElement.getAttribute("type");
        const span = target.parentElement;
        const targetValue = target.parentElement.textContent;

        filtersDOM.deleteTagsFiltersInDOM(span);

        switch (typeFilter) {
            case "ingredients":
                const theFilterOne = filtersDOM.updateTheFilter("ingredients",targetValue,"DESC");
                const dataOne = proxySearchReceipts().proxySearch(theFilterOne);
                filtersDOM.updatedFilters(dataOne);
                filtersDOM.updateAfilterDOM(targetValue,"ingredients","INC");
                receiptsGalery(dataOne);
            break;
            case "appliances":
                const theFilterTwo = filtersDOM.updateTheFilter("appliances",targetValue,"DESC");
                const dataTwo = proxySearchReceipts().proxySearch(theFilterTwo);
                filtersDOM.updatedFilters(dataTwo);
                filtersDOM.updateAfilterDOM(targetValue,"appliances","INC");
                receiptsGalery(dataTwo);
            break;
            case "ustensils":
                const theFilterThree = filtersDOM.updateTheFilter("ustensils",targetValue,"DESC");
                const dataThree = proxySearchReceipts().proxySearch(theFilterThree);
                filtersDOM.updatedFilters(dataThree);
                filtersDOM.updateAfilterDOM(targetValue,"ustensils","INC");
                receiptsGalery(dataThree);
            break;
            default:
            break;
        }
        
        return true;
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
document.querySelector("#seacrh").addEventListener("input", function(e) {
    const value = e.target.value;
    
    if (e.target.value.length >= 3) {
        const theFilter = filtersDOM.updateTheFilter("keyword",value,"INC");
        const data = proxySearchReceipts().proxySearch(theFilter);
        receiptsGalery(data);
    }

    if (e.target.value.length < 3) {
        const theFilter = filtersDOM.updateTheFilter("keyword",value,"DESC");
        const data = proxySearchReceipts().proxySearch(theFilter);
        receiptsGalery(data);
    }
})