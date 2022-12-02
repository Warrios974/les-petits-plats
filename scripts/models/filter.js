
import { receipt } from "../models/receipt.js";

export function filter(data) {
    
    function getIngredientFilter() {
        let filterIngredients = [];
        let tabFilterIngredients = [];
        data.forEach((receipt) => { receipt['ingredients'].forEach((ingredient) => { tabFilterIngredients.push(ingredient['ingredient']) }) })
        filterIngredients = [...new Set(tabFilterIngredients)];
        return filterIngredients;
    }

    function getAppliancesFilter() {
        let filterAppliance = [];
        let tabFilterAppliance = [];
        data.forEach((receipt) => { tabFilterAppliance.push(receipt['appliance']) })
        filterAppliance = [...new Set(tabFilterAppliance)];
        return filterAppliance;
    }

    function getUstensilsFilter() {
        let filterUstensils = [];
        let tabFilterUstensils = [];
        data.forEach((receipt) => { receipt['ustensils'].forEach((ustensil) => { tabFilterUstensils.push(ustensil) }) })
        filterUstensils = [...new Set(tabFilterUstensils)];
        return filterUstensils;
    }

    return { 
        getIngredientFilter, 
        getAppliancesFilter, 
        getUstensilsFilter
   }
}