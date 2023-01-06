import { recipes } from "../data/recipes.js";

export function search(theFilter,data) {

    let receiptsFilted = recipes;
    let receiptsFiltedAlt = [];

    if (data) {
        console.log('Is data');
        return data;
    }

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
                if(name.includes(keyword) || description.includes(keyword)){
                    newTab.push(receipt);
                }else{
                    receipt["ingredients"].forEach((ingredient) => {
                        const ingredientName = ingredient["ingredient"].toLowerCase();
                        ingredientName.includes(keyword) ? newTab.push(receipt) : "";
                    });
                }
            });

            receiptsFilted = newTab;
        }

        //Tri par Ingredients
        if (theFilter["ingredients"].length != 0) {
            
            let newTab = [];
            let isReceiptValid = false;
            let isReceiptValidTab = [];

            receiptsFilted.forEach((receipt) => { 
                theFilter["ingredients"].forEach((ingredientFilter) => {
                    const test = receipt["ingredients"].find((ig) => ig.ingredient == ingredientFilter.ingredient) ? true : false;
                    isReceiptValidTab.push(test);
                });
                isReceiptValid = isReceiptValidTab.find(elem => elem == false) != null ? false : true;
                if( isReceiptValid ) newTab.push(receipt);
                isReceiptValid = false;
                isReceiptValidTab = []
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
            let isReceiptValidTab = [];
            receiptsFilted.forEach((receipt) => {
                theFilter["ustensils"].forEach((ustensilFilter) => { 
                    const test = receipt["ustensils"].find((ust) => ust == ustensilFilter) ? true : false;
                    isReceiptValidTab.push(test);
                });
                isReceiptValid = isReceiptValidTab.find(elem => elem == false) != null ? false : true;
                if( isReceiptValid ) newTab.push(receipt);
                isReceiptValid = false;
                isReceiptValidTab = []
            });

            receiptsFilted = newTab;
        }
        
        receiptsFiltedAlt = receiptsFilted;
    }

    return receiptsFilted;
}