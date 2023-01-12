//Import des fonction et variable nécesaire puis d'autres fichiers
import { receiptsGalery } from "../components/receiptsGalery.js";
import { filtersDOM } from "../page/index.js";
import { proxySearchReceipts } from "../proxy/proxySearchReceipts.js";

//Déclaration variable
let open = false;

//Déclaration des éléments du DOM
const mainSearch = document.querySelector("#seacrh");
const searchIngredient = document.querySelector("#searchIngredient");
const searchAppliance = document.querySelector("#searchAppliance");
const searchUstensil = document.querySelector("#searchUstensil");

const searchTab = [searchIngredient, searchAppliance, searchUstensil];

const inputSearchIngredient = document.querySelector("#filterIngredients input");
const inputSearchAppliance = document.querySelector("#filterAppliances input");
const inputSearchUstensil = document.querySelector("#filterUstensils input");

const inputTab = [inputSearchIngredient, inputSearchAppliance, inputSearchUstensil];

//Fonction qui gére l'affichage des menu des filtres
function displayLists(filterDOM) {
    
    //Déclaration des éléments du filtre
    const label = filterDOM.querySelector(".select__input label");
    const icon = filterDOM.querySelector(".select__input img");
    const input = filterDOM.querySelector(".select__input input");
    const list = filterDOM.querySelector(".select__choises");

    //Affichage du menu du filtre si il est fermer 
    //mais qu'aucun autre filtre est ouvert
    if (filterDOM.getAttribute("select") == "close" && open == false) {
        
        //Affichage du filtre 
        filterDOM.classList.add("col-6");
        filterDOM.classList.remove("col-2");
        label.style.display = "none";
        icon.setAttribute("src", "./assets/medias/icons/chevron-up.svg");
        input.setAttribute("placeholder", "Rechercher une recette");
        list.style.display = "flex";
        list.classList.add("row");
        filterDOM.setAttribute("select","open");
        input.focus();
        
        //Indique que maintenant un filtre est ouvert
        open = true;

        return true;
    }

    //Affichage du menu du filtre si il est fermer 
    //quand un autre filtre est ouvert
    if (filterDOM.getAttribute("select") == "close" && open == true) {
        const selectOpen = filterDOM.parentElement.querySelector("div[select='open']");
        
        //Déclaration des élément du filtre ouvert
        const selectOpenlabel = selectOpen.querySelector(".select__input label");
        const selectOpenicon = selectOpen.querySelector(".select__input img");
        const selectOpeninput = selectOpen.querySelector(".select__input input");
        const selectOpenlist = selectOpen.querySelector(".select__choises");

        //Fermeture du filtre ouvert
        selectOpen.classList.add("col-2");
        selectOpen.classList.remove("col-6");
        selectOpenlabel.style.display = "block";
        selectOpenicon.setAttribute("src", "./assets/medias/icons/chevron-down.svg");
        selectOpeninput.setAttribute("placeholder", "");
        selectOpenlist.style.display = "none";
        selectOpenlist.classList.remove("row");
        selectOpen.setAttribute("select","close");
        selectOpeninput.value = "";

        //Ouverture sélectionné
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

    //Fermature du menu du filtre si il est ouvert 
    //quand un autre filtre est ouvert
    //et que l'élément active n'est pas l'input du filtre
    if (filterDOM.getAttribute("select") == "open" && open == true && document.activeElement != input) {
        
        //Fermeture du filtre
        filterDOM.classList.add("col-2");
        filterDOM.classList.remove("col-6");
        label.style.display = "block";
        icon.setAttribute("src", "./assets/medias/icons/chevron-down.svg");
        input.setAttribute("placeholder", "");
        list.style.display = "none";
        list.classList.remove("row");
        filterDOM.setAttribute("select","close");
        input.value = "";

        //Indique que maintenant tous les filtres sont fermés
        open = false

        return true;
    }

    
    //Quand on clic sur un autre input on garde la variable open à "true"
    if (filterDOM.getAttribute("select") == "open" && open == true && document.activeElement === input) {
        open = true;
        return true;
    }
}

// Utilisation de la délégation d'événement pour détecter sur quoi je "clic"
document.addEventListener("click",function(e){
	const target = e.target;

    //Si je clic sur la fleche d'un des filtres
	if(target && target.getAttribute("filter") === "yes"){
        const parent = e.target.parentElement.parentElement;
		displayLists(parent);
        
        return true;
	}

    //Si je clic sur un des choix
    if (target.parentElement && target.parentElement.classList[1] == "select__choises") {
        const idFilter = target.parentElement.parentElement.getAttribute("id");
        const targetValue = target.textContent;


        switch (idFilter) {
            //si c'est dans le filtre ingredient
            case "filterIngredients":{
                inputSearchIngredient.value = ""
                filtersDOM.addTagsFiltersInDOM(targetValue,"ingredients"); //Ajout l'élément cliquer dans la section des tags
                const theFilterOne = filtersDOM.updateTheFilter("ingredients",targetValue,"INC"); //Met a jour le tableau des recherche
                const dataOne = proxySearchReceipts().proxySearch(theFilterOne); //Envoi la recherche a la fonction search
                filtersDOM.initFilters(dataOne,theFilterOne); //Mise a jour des tableaux de filtres
                filtersDOM.updateAfilterDOM(targetValue,idFilter,"DESC"); //Met a jour les filtres sur le DOM
                receiptsGalery(dataOne); //Affiche les recettes dans le DOM
            }
            break;
            //si c'est dans le filtre appareil
            case "filterAppliances":{
                inputSearchAppliance.value = ""
                filtersDOM.addTagsFiltersInDOM(targetValue,"appliances");
                const theFilterTwo = filtersDOM.updateTheFilter("appliances",targetValue,"INC");
                const dataTwo = proxySearchReceipts().proxySearch(theFilterTwo);
                filtersDOM.initFilters(dataTwo,theFilterTwo);
                filtersDOM.updateAfilterDOM(targetValue,idFilter,"DESC");
                receiptsGalery(dataTwo);
            }
            break;
            //si c'est dans le filtre ustensile
            case "filterUstensils":{
                inputSearchUstensil.value = ""
                filtersDOM.addTagsFiltersInDOM(targetValue,"ustensils");
                const theFilterThree = filtersDOM.updateTheFilter("ustensils",targetValue,"INC");
                const dataThree = proxySearchReceipts().proxySearch(theFilterThree);
                filtersDOM.initFilters(dataThree,theFilterThree);
                filtersDOM.updateAfilterDOM(targetValue,idFilter,"DESC");
                receiptsGalery(dataThree);
            }
            break;
            default:

            break;
        }
        
    
        return true;
    }

    //Si je clic sur la croix d'un tag ajouté
    if (target.parentElement.parentElement && target.parentElement.parentElement.getAttribute("id") == "tagsFilters") {
        const typeFilter = target.parentElement.getAttribute("type");
        const span = target.parentElement;
        const targetValue = target.parentElement.textContent;

        filtersDOM.deleteTagsFiltersInDOM(span);

        switch (typeFilter) {
            //si c'est un ingredient
            case "ingredients":{
                const theFilterOne = filtersDOM.updateTheFilter("ingredients",targetValue,"DESC"); //Met a jour le tableau des recherche
                const dataOne = proxySearchReceipts().proxySearch(theFilterOne); //Envoi la recherche a la fonction search
                filtersDOM.initFilters(dataOne,theFilterOne); //Mise a jour des tableaux de filtres
                filtersDOM.updateAfilterDOM(targetValue,"ingredients","INC"); //Met a jour les filtres sur le DOM
                receiptsGalery(dataOne);//Affiche les recettes dans le DOM
            }
            break;
            //si c'est un appareil
            case "appliances":{
                const theFilterTwo = filtersDOM.updateTheFilter("appliances",targetValue,"DESC");
                const dataTwo = proxySearchReceipts().proxySearch(theFilterTwo);
                filtersDOM.initFilters(dataTwo,theFilterTwo);
                filtersDOM.updateAfilterDOM(targetValue,"appliances","INC");
                receiptsGalery(dataTwo);
            }
            break;
            //si c'est un ustensile
            case "ustensils":{
                const theFilterThree = filtersDOM.updateTheFilter("ustensils",targetValue,"DESC");
                const dataThree = proxySearchReceipts().proxySearch(theFilterThree);
                filtersDOM.initFilters(dataThree,theFilterThree);
                filtersDOM.updateAfilterDOM(targetValue,"ustensils","INC");
                receiptsGalery(dataThree);
            }
            break;
            default:
            break;
        }
        
        return true;
    }
});

//Si j'écris quelques choses dans la barre de recherche principale
mainSearch.addEventListener("input", function(e) {
    const value = e.target.value;
    
    //Si le mot clé est plus grand ou egale a 3
    if (e.target.value.length >= 3) {
        //Lance une nouvelle recherche est affiche une nouvelle galery de recettes
        const theFilter = filtersDOM.updateTheFilter("keyword",value,"INC");
        const data = proxySearchReceipts().proxySearch(theFilter);
        receiptsGalery(data);
    }

    //Si le mot clé est inferieur a 3
    if (e.target.value.length < 3) {
        //Lance une nouvelle recherche est affiche une nouvelle galery de recettes
        const theFilter = filtersDOM.updateTheFilter("keyword",value,"DESC");
        const data = proxySearchReceipts().proxySearch(theFilter);
        receiptsGalery(data);
    }
})

//Si je clic sur un des input des filtres
inputTab.forEach((input) => {
    input.addEventListener("focus", function(e) {
        const parent = e.target.parentElement.parentElement;
        displayLists(parent);
    })
})

//Si j'écris quelques choses dans l'une des barres de recherche des filtres
searchTab.forEach((search) => {
    search.addEventListener("input", function(e) {
        const value = e.target.value;
        const idFilter = e.target.getAttribute("id");
        //Met a jour le filtre concerné
        filtersDOM.updateAfilterDOM(value,idFilter,"UP");
    })
})