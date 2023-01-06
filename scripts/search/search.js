import { recipes } from "../data/recipes.js";

let receiptsFilted = recipes;

export function search(theFilter,incORdesc,data) {

    if (data) {
        console.log('Is data')
        debugger
        return data;
    }

    if (theFilter["empty"] == true) {
        return recipes;
    }
    
    if (theFilter["empty"] == false && incORdesc == "INC") {

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

        //Tri par Ingredients
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
        
        //Tri par Appareils
        if (theFilter["appliances"] != "") {

            let newTab = [];

            receiptsFilted.forEach((receipt) => { 
                theFilter["appliances"] == receipt["appliance"] ? newTab.push(receipt) : "";
            });

            receiptsFilted = newTab;
        }

        //Tri par Ustensiles
        if (theFilter["ustensils"].length != 0) {

            let newTab = [];
            let isReceiptValid = false;

            receiptsFilted.forEach((receipt) => {
                theFilter["ustensils"].forEach((ustensilFilter) => { 
                    isReceiptValid = receipt["ustensils"].find((ust) => ust == ustensilFilter);
                    if( !isReceiptValid ) return;
                });
                if( isReceiptValid ) newTab.push(receipt);
                isReceiptValid = false;
            });

            receiptsFilted = newTab;
        }
        
        
    }
    
    if (theFilter["empty"] == false && incORdesc == "DESC") {
        
        receiptsFilted = recipes;

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

        //Tri par Ingredients
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
        
        //Tri par Appareils
        if (theFilter["appliances"] != "") {

            let newTab = [];

            receiptsFilted.forEach((receipt) => { 
                theFilter["appliances"] == receipt["appliance"] ? newTab.push(receipt) : "";
            });

            receiptsFilted = newTab;
        }

        //Tri par Ustensiles
        if (theFilter["ustensils"].length != 0) {

            let newTab = [];
            let isReceiptValid = false;

            receiptsFilted.forEach((receipt) => {
                theFilter["ustensils"].forEach((ustensilFilter) => { 
                    isReceiptValid = receipt["ustensils"].find((ust) => ust == ustensilFilter);
                    if( !isReceiptValid ) return;
                });
                if( isReceiptValid ) newTab.push(receipt);
                isReceiptValid = false;
            });

            receiptsFilted = newTab;
        }
        
        
    }

    return receiptsFilted;
}