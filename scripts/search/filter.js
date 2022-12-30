import { receiptsFilted } from "./search.js";

export let theFilter = {
    "keyword" : "",
    "ingredients" : [],
    "appliances" : "",
    "ustensils" : [],
    "empty" : true
};

export function filters(data) {

    const filterFormDOM = document.querySelector("#formFilter fieldset");
    const tagsFiltersDOM = document.querySelector("#tagsFilters");

    let filterIngredients = [];
    let filterAppliances = [];
    let filterUstensils = [];

    let tabIngredients = [];
    let tabAppliances = [];
    let tabUstensils = [];

    initFilters();
    
    function getIngredientFilter() {
        return filterIngredients;
    }

    function getAppliancesFilter() {
        return filterAppliances;
    }

    function getUstensilsFilter() {
        return filterUstensils;
    }

    function getIngredients() {
        return tabIngredients;
    }

    function getAppliances() {
        return tabAppliances;
    }

    function getUstensils() {
        return tabUstensils;
    }

    function updateTheFilter(element,value,incORdesc) {
        if (incORdesc == "INC") {
            element == "ingredients" ? theFilter[element].push({"ingredient" : value}) : "";
            element == "ustensils" ? theFilter[element].push(value) : "";
            element == "keyword" || element == "appliances" ? theFilter[element] = value : "";
            ifEmpty();
        }
        if (incORdesc == "DESC" ) {
            element == "ingredients" ? theFilter[element] = theFilter[element].filter(item => item["ingredient"] !== value) : "";
            element == "ustensils" ? theFilter[element] = theFilter[element].filter(item => item !== value) : "";
            element == "keyword" || element == "appliances" ? theFilter[element] = "" : "";
            ifEmpty();
        }

        function ifEmpty() {
            if (value.length < 3 && theFilter["ingredients"].length == 0 && theFilter["appliances"] == "" && theFilter["ustensils"].length == 0 && theFilter["empty"] == false) {
                theFilter["empty"] = true;
                return true;
            }

            if (value.length < 3 && theFilter["ingredients"].length == 0 && theFilter["appliances"] == "" && theFilter["ustensils"].length == 0 && theFilter["empty"] == true) {
                theFilter["empty"] = true;
                return true;
            }

            if (value.length >= 3 || theFilter["ingredients"].length > 0 || theFilter["appliances"] || theFilter["ustensils"].length > 0 && theFilter["empty"] == true) {
                theFilter["empty"] = false;
                return true;
            }
        }

        return theFilter;
    }

    function updateAfilterDOM(elem,filter,incORdesc) {
        if (incORdesc == "DESC") {
            switch (filter) {
                case "filterIngredients":
                    tabIngredients = tabIngredients.filter(item => item !== elem);
                    initFiltersForDOM("ingredient");
                    initFilters();
                break;
                case "filterAppliances":
                    tabAppliances = tabAppliances.filter(item => item !== elem);
                    initFiltersForDOM("appliance");
                    initFilters();
                break;
                case "filterUstensils":
                    tabUstensils = tabUstensils.filter(item => item !== elem);
                    initFiltersForDOM("ustensil");
                    initFilters();
                break;
            
                default:
                break;
            }

            return true;
        }
        if (incORdesc == "INC") {
            switch (filter) {
                case "ingredients":
                    tabIngredients.push(elem);
                    initFiltersForDOM("ingredient");
                    initFilters();
                break;
                case "appliances":
                    tabAppliances.push(elem);
                    initFiltersForDOM("appliance");
                    initFilters();
                break;
                case "ustensils":
                    tabUstensils.push(elem);
                    initFiltersForDOM("ustensil");
                    initFilters();
                break;
            
                default:
                break;
            }

            return true;
        }
    }

    function initFiltersForDOM(elements) {

        const filterIngredientsLimited = tabIngredients.slice(0,30);
        const filterAppliancesLimited = tabAppliances.slice(0,tabAppliances.length);
        const filterUstensilsLimited = tabUstensils.slice(0,30);
        
        switch (elements) {
            case "ingredient":
                iniIngredientFilter();
            break;
            case "appliance":
                initApplianceFilter();
            break;
            case "ustensil":
                initUstensilFilter();
            break;
            case "all":
                iniIngredientFilter();
                initApplianceFilter();
                initUstensilFilter();
            break;
        
            default:
            break;
        }

        /**/
        function iniIngredientFilter() {
            
            const filterIngredientDOM = filterFormDOM.querySelector("#formFilter #filterIngredients");
            const List = filterIngredientDOM.querySelector(".select__choises");
            List.innerHTML = "";

            filterIngredientsLimited.forEach((ingredient) => {
                const li = document.createElement( "li" );
                li.setAttribute("class", "col-4 p-2");
                li.textContent = ingredient;
                List.appendChild(li);
            })
        }

        function initApplianceFilter() {

            const filterApplianceDOM = filterFormDOM.querySelector("#formFilter #filterAppliances");
            const List = filterApplianceDOM.querySelector(".select__choises");
            List.innerHTML = "";

            filterAppliancesLimited.forEach((appliance) => {
                const li = document.createElement( "li" );
                li.setAttribute("class", "col-4 p-2");
                li.textContent = appliance;
                List.appendChild(li);
            })
        }

        function initUstensilFilter() {

            const filterUstensilDOM = filterFormDOM.querySelector("#formFilter #filterUstensils");
            const List = filterUstensilDOM.querySelector(".select__choises");
            List.innerHTML = "";

            filterUstensilsLimited.forEach((ustensil) => {
                const li = document.createElement( "li" );
                li.setAttribute("class", "col-4 p-2");
                li.textContent = ustensil;
                List.appendChild(li);
            })
        }
    }

    function addTagsFiltersInDOM(nameTag,type) {
        const span = document.createElement( "span" );
        const img = document.createElement( "img" );
        span.setAttribute("class", "col-4 p-2 m-2");
        span.setAttribute("type", type);
        img.setAttribute("src","./assets/medias/icons/x-circle.svg");
        img.setAttribute("alt","");
        span.textContent = nameTag;
        span.appendChild(img);
        tagsFiltersDOM.appendChild(span);
    }

    function deleteTagsFiltersInDOM(nameTag) {
        nameTag.remove();
    }

    function initFilters(){
        let tabFilterIngredients = [];
        let tabFilterAppliance = [];
        let tabFilterUstensils = [];

        if (receiptsFilted) {
            receiptsFilted.forEach((receipt) => { receipt['ingredients'].forEach((ingredient) => { tabFilterIngredients.push(ingredient['ingredient']) }) })
            tabIngredients = [...new Set(tabFilterIngredients)];
    
            receiptsFilted.forEach((receipt) => { tabFilterAppliance.push(receipt['appliance']) })
            tabAppliances = [...new Set(tabFilterAppliance)];
    
            receiptsFilted.forEach((receipt) => { receipt['ustensils'].forEach((ustensil) => { tabFilterUstensils.push(ustensil) }) })
            tabUstensils = [...new Set(tabFilterUstensils)];
        } else {
            data.forEach((receipt) => { receipt['ingredients'].forEach((ingredient) => { tabFilterIngredients.push(ingredient['ingredient']) }) })
            tabIngredients = [...new Set(tabFilterIngredients)];
    
            data.forEach((receipt) => { tabFilterAppliance.push(receipt['appliance']) })
            tabAppliances = [...new Set(tabFilterAppliance)];
    
            data.forEach((receipt) => { receipt['ustensils'].forEach((ustensil) => { tabFilterUstensils.push(ustensil) }) })
            tabUstensils = [...new Set(tabFilterUstensils)];
        }
    }

    return { 
        getIngredientFilter, 
        getAppliancesFilter, 
        getUstensilsFilter,
        getIngredients,
        getAppliances,
        getUstensils,
        initFiltersForDOM,
        updateAfilterDOM,
        addTagsFiltersInDOM,
        deleteTagsFiltersInDOM,
        updateTheFilter
   }
}