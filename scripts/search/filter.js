
import { receipt } from "../models/receipt.js";

export function filters(data) {

    const filterFormDOM = document.querySelector("#formFilter fieldset");
    const tagsFiltersDOM = document.querySelector("#tagsFilters");

    let filterIngredients = [];
    let filterAppliances = [];
    let filterUstensils = [];

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

    function updateAfilterDOM(elem,filter) {
        switch (filter) {
            case "filterIngredients":
                filterIngredients = filterIngredients.filter(item => item !== elem);
                initFiltersForDOM("ingredient");
            break;
            case "filterAppliances":
                filterAppliances = filterAppliances.filter(item => item !== elem);
                initFiltersForDOM("appliance");
            break;
            case "filterUstensils":
                filterUstensils = filterUstensils.filter(item => item !== elem);
                initFiltersForDOM("ustensil");
            break;
        
            default:
            break;
        }
    }

    function initFiltersForDOM(elements) {

        const filterIngredientsLimited = filterIngredients.slice(0,30);
        const filterAppliancesLimited = filterAppliances.slice(0,filterAppliances.length);
        const filterUstensilsLimited = filterUstensils.slice(0,30);
        
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

    function addTagsFiltersInDOM(nameTag) {
        const span = document.createElement( "span" );
        const img = document.createElement( "img" );
        span.setAttribute("class", "col-4 p-2 m-2");
        img.setAttribute("src","./assets/medias/icons/x-circle.svg");
        img.setAttribute("alt","");
        span.textContent = nameTag;
        span.appendChild(img);
        tagsFiltersDOM.appendChild(span);
    }

    function initFilters(){
        let tabFilterIngredients = [];
        data.forEach((receipt) => { receipt['ingredients'].forEach((ingredient) => { tabFilterIngredients.push(ingredient['ingredient']) }) })
        filterIngredients = [...new Set(tabFilterIngredients)];

        let tabFilterAppliance = [];
        data.forEach((receipt) => { tabFilterAppliance.push(receipt['appliance']) })
        filterAppliances = [...new Set(tabFilterAppliance)];

        let tabFilterUstensils = [];
        data.forEach((receipt) => { receipt['ustensils'].forEach((ustensil) => { tabFilterUstensils.push(ustensil) }) })
        filterUstensils = [...new Set(tabFilterUstensils)];
    }

    return { 
        getIngredientFilter, 
        getAppliancesFilter, 
        getUstensilsFilter,
        initFiltersForDOM,
        updateAfilterDOM,
        addTagsFiltersInDOM
   }
}