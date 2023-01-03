import { recipes } from "../data/recipes.js";


export function search(theFilter,data) {

    if (data) {
        return data;
    }

    let receiptsFilted = recipes;

    if (theFilter["empty"] == true) {
        return recipes;
    }
    
    if (theFilter["empty"] == false) {
        if (theFilter["keyword"]) {
            let newTab = [];
            receiptsFilted.forEach((receipt) => {
                const keyword = theFilter["keyword"].toLowerCase();
                const name = receipt["name"].toLowerCase();
                const description = receipt["description"].toLowerCase();
                name.includes(keyword) || description.includes(keyword) ? newTab.push(receipt) : "";

                receipt["ingredients"].forEach((ingredient) => {
                    const ingredientName = ingredient["ingredient"].toLowerCase();
                    ingredientName.includes(keyword) ? newTab.push(receipt) : "";
                });
            });
            receiptsFilted = newTab;
        }

        //Tri par Ingredient
        if (theFilter["ingredients"].length != 0) {
            
            let newTab = [];
            let isReceiptValid = false;

            receiptsFilted.forEach((receipt) => { 
                theFilter["ingredients"].forEach((ingredientFilter) => { 
                    isReceiptValid = receipt["ingredients"].find((ig) => ig.ingredient == ingredientFilter.ingredient);
                    if( !isReceiptValid ) return;
                });
                if( isReceiptValid ) newTab.push(receipt);
                isReceiptValid = false;
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