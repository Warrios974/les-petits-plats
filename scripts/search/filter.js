export let theFilter = {
    "keyword" : "",
    "ingredients" : [],
    "appliances" : [],
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

    const receipts = data;

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
                    filterIngredients = filterIngredients.filter(item => item !== elem);
                break;
                case "filterAppliances":
                    filterAppliances = filterAppliances.filter(item => item !== elem);
                break;
                case "filterUstensils":
                    filterUstensils = filterUstensils.filter(item => item !== elem);
                break;
            
                default:
                break;
            }

            initFiltersForDOM("ingredient");
            initFiltersForDOM("appliance");
            initFiltersForDOM("ustensil");

            return true;
        }
        if (incORdesc == "INC") {
            initFiltersForDOM("ingredient");
            initFiltersForDOM("appliance");
            initFiltersForDOM("ustensil");

            return true;
        }
    }

    function initFiltersForDOM(elements) {
        
        const filterIngredientsLimited = filterIngredients.length > 30 ? filterIngredients.slice(0,30) : filterIngredients;
        const filterAppliancesLimited = filterAppliances.slice(0,filterAppliances.length);
        const filterUstensilsLimited = filterUstensils > 30 ? filterUstensils.slice(0,30) : filterUstensils;
        
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
        data.forEach((receipt) => { receipt['ingredients'].forEach((ingredient) => { tabFilterIngredients.push(ingredient['ingredient']) }) })
        tabIngredients = [...new Set(tabFilterIngredients)];
        filterIngredients = tabIngredients;
        filterIngredients = filterIngredients.sort();

        let tabFilterAppliance = [];
        data.forEach((receipt) => { tabFilterAppliance.push(receipt['appliance']) })
        tabAppliances = [...new Set(tabFilterAppliance)];
        filterAppliances = tabAppliances;
        filterIngredients = filterIngredients.sort();

        let tabFilterUstensils = [];
        data.forEach((receipt) => { receipt['ustensils'].forEach((ustensil) => { tabFilterUstensils.push(ustensil) }) })
        tabUstensils = [...new Set(tabFilterUstensils)];
        filterUstensils = tabUstensils;
        filterIngredients = filterIngredients.sort();
    }

    function updatedFilters(receiptsFilted,theFilter){

        let tabFilterIngredients = [];
        receiptsFilted.forEach((receipt) => { receipt['ingredients'].forEach((ingredient) => { tabFilterIngredients.push(ingredient['ingredient']) }) })
        filterIngredients = [...new Set(tabFilterIngredients)];
        filterIngredients = filterIngredients.sort();
        theFilter["ingredients"].forEach((ingredientFilter) => {
            filterIngredients = filterIngredients.filter(ing => ing !== ingredientFilter.ingredient);
        });

        let tabFilterAppliance = [];
        receiptsFilted.forEach((receipt) => { tabFilterAppliance.push(receipt['appliance']) })
        filterAppliances = [...new Set(tabFilterAppliance)];
        filterAppliances = filterAppliances.sort();
        theFilter["ustensils"].forEach((applianceFilter) => {
            filterAppliances = filterAppliances.filter(app => app !== applianceFilter);
        });

        let tabFilterUstensils = [];
        receiptsFilted.forEach((receipt) => { receipt['ustensils'].forEach((ustensil) => { tabFilterUstensils.push(ustensil) }) })
        filterUstensils = [...new Set(tabFilterUstensils)];
        filterUstensils = filterUstensils.sort();
        theFilter["ustensils"].forEach((ustensilFilter) => {
            filterUstensils = filterUstensils.filter(ust => ust !== ustensilFilter);
        });
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
        updatedFilters,
        addTagsFiltersInDOM,
        deleteTagsFiltersInDOM,
        updateTheFilter
   }
}