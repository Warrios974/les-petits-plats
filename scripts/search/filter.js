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

    initFilters(data,theFilter);
    
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

    function updateAfilterDOM(elem,filter,action) {

        if (action == "UP") {

            switch (filter) {
                case "searchIngredient":
                    
                    let newIngredientTab = [];
                    const keywordIngredient = elem.toLowerCase();
                    
                    filterIngredients.forEach((ingredient) => {
                        const nameIngredient = ingredient.toLowerCase();
                        nameIngredient.includes(keywordIngredient) ? newIngredientTab.push(ingredient) : "";
                    });

                    initFiltersForDOM("ingredient",newIngredientTab);
                break;
                case "searchAppliance":
                    
                    let newApplianceTab = [];
                    const keywordAppliance = elem.toLowerCase();
                    
                    filterAppliances.forEach((appliance) => {
                        const nameAppliance = appliance.toLowerCase();
                        nameAppliance.includes(keywordAppliance) ? newApplianceTab.push(appliance) : "";
                    });

                    initFiltersForDOM("appliance",newApplianceTab);
                break;
                case "searchUstensil":
                    
                    let newUstensilsTab = [];
                    const keywordUstensils = elem.toLowerCase();
                    
                    filterUstensils.forEach((ustensil) => {
                        const nameUstensils = ustensil.toLowerCase();
                        nameUstensils.includes(keywordUstensils) ? newUstensilsTab.push(ustensil) : "";
                    });

                    initFiltersForDOM("ustensil",newUstensilsTab);
                break;
            
                default:
                break;
            }

            return true;
        }

        if (action == "DESC") {
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

            initFiltersForDOM("ingredient",filterIngredients);
            initFiltersForDOM("appliance",filterAppliances);
            initFiltersForDOM("ustensil",filterUstensils);

            return true;
        }
        if (action == "INC") {

            initFiltersForDOM("ingredient",filterIngredients);
            initFiltersForDOM("appliance",filterAppliances);
            initFiltersForDOM("ustensil",filterUstensils);

            return true;
        }
    }

    function initFiltersForDOM(elements,data) {
        
        switch (elements) {
            case "ingredient":
                iniIngredientFilter(data);
            break;
            case "appliance":
                initApplianceFilter(data);
            break;
            case "ustensil":
                initUstensilFilter(data);
            break;
            case "all":
                iniIngredientFilter(filterIngredients);
                initApplianceFilter(filterAppliances);
                initUstensilFilter(filterUstensils);
            break;
        
            default:
            break;
        }

        /**/
        function iniIngredientFilter(data) {
            
            const filterIngredientDOM = filterFormDOM.querySelector("#formFilter #filterIngredients");
            const List = filterIngredientDOM.querySelector(".select__choises");
            List.innerHTML = "";

            data.forEach((ingredient) => {
                const li = document.createElement( "li" );
                li.setAttribute("class", "col-4 p-2");
                li.textContent = ingredient;
                List.appendChild(li);
            })
        }

        function initApplianceFilter(data) {

            const filterApplianceDOM = filterFormDOM.querySelector("#formFilter #filterAppliances");
            const List = filterApplianceDOM.querySelector(".select__choises");
            List.innerHTML = "";

            data.forEach((appliance) => {
                const li = document.createElement( "li" );
                li.setAttribute("class", "col-4 p-2");
                li.textContent = appliance;
                List.appendChild(li);
            })
        }

        function initUstensilFilter(data) {

            const filterUstensilDOM = filterFormDOM.querySelector("#formFilter #filterUstensils");
            const List = filterUstensilDOM.querySelector(".select__choises");
            List.innerHTML = "";

            data.forEach((ustensil) => {
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
        span.setAttribute("class","tag col-4 p-2 m-2")
        const className = "tag--" + type;
        span.classList.add(className);
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

    function initFilters(receiptsFilted,theFilter){

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
        initFilters,
        initFiltersForDOM,
        updateAfilterDOM,
        addTagsFiltersInDOM,
        deleteTagsFiltersInDOM,
        updateTheFilter
   }
}