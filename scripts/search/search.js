import { recipes } from "../data/recipes.js";

export let receiptsFilted;

export function search(theFilter,data) {

    if (data) {
        return data;
    }

    receiptsFilted = recipes;

    if (theFilter["empty"] == true) {
        return recipes;
    }
    
    if (theFilter["empty"] == false) {
        if (theFilter["keyword"]) {
            let newTab = [];
            recipes.forEach((receipt) => {
                const keyword = theFilter["keyword"].toLowerCase();
                const name = receipt["name"].toLowerCase();
                const description = receipt["description"].toLowerCase();
                if (name.includes(keyword) || description.includes(keyword)) {
                    newTab.push(receipt)
                }
            });
            receiptsFilted = newTab;
        }

        if (theFilter["ingredients"].length != 0) {
            let newTab = [];
            receiptsFilted.forEach((receipt) => { 
                receipt["ingredients"].forEach((ingredient) => { 
                    theFilter["ingredients"].forEach((ingredientFilter) => { 
                        ingredientFilter["ingredient"] == ingredient["ingredient"] ? newTab.push(receipt) : "";
                    });
                });
            });
            receiptsFilted = newTab;
        }
        
        if (theFilter["appliances"] != "") {
            let newTab = [];
            receiptsFilted.forEach((receipt) => { 
                theFilter["appliances"] == receipt["appliance"] ? newTab.push(receipt) : "";
            });
            receiptsFilted = newTab;
        }

        if (theFilter["ustensils"].length != 0) {
            let newTab = [];
            receiptsFilted.forEach((receipt) => { 
                receipt["ustensils"].forEach((ustensil) => { 
                    theFilter["ustensils"].forEach((ustensilFilter) => { 
                        ustensilFilter == ustensil ? newTab.push(receipt) : "";
                    });
                });
            });
            receiptsFilted = newTab;
        }
        
    }

    return receiptsFilted;
}