//Import des fonction et variable nécesaire puis d'autres fichiers
import { recipes } from "../data/recipes.js";

//Fonction qui va retourner les datas filtré en fonction de la recherche
export function search(theFilter,data) {

    let receiptsFilted = recipes;

    //Data qui viendrai du proxy
    if (data) {
        console.log('Is proxy data');
        return data;
    }

    //Si le tableau des recherche est vide (comme au départ)
    if (theFilter["empty"] == true) {
        return recipes;
    }
    
    //Si le tableau des recherche n'est pas vide
    if (theFilter["empty"] == false) {

        //Tri en fonction du mot clé
        if (theFilter["keyword"]) {
            
            let newTab = [];

            receiptsFilted.forEach((receipt) => {
                const keyword = theFilter["keyword"].toLowerCase();
                const name = receipt["name"].toLowerCase();
                const description = receipt["description"].toLowerCase();
                //Vérifie si le mot clé est inclu dans le nom, la description
                if(name.includes(keyword) || description.includes(keyword)){
                    newTab.push(receipt);
                //et dans les ingredients de la recette
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
            
            //Vérifie que si la recette contient chaque ingredients de la recherche
            receiptsFilted.forEach((receipt) => { 
                theFilter["ingredients"].forEach((ingredientFilter) => {
                    //Vérifie si l'ingredient ce trouve dans la recette
                    const test = receipt["ingredients"].find((ig) => ig.ingredient.toLowerCase() == ingredientFilter.ingredient.toLowerCase()) ? true : false;
                    //Ajout le resultat test dans un tableau
                    isReceiptValidTab.push(test);
                });
                //Quand chaque ingredients de la recherche et vérifié, on vérifie si le tableaux 
                //de vérification des recette est TOTALEMENT "true"
                isReceiptValid = isReceiptValidTab.find(elem => elem === false) != null ? false : true;
                //Si oui la recette est ajouté
                if( isReceiptValid ) newTab.push(receipt);
                //Reset des variables
                isReceiptValid = false;
                isReceiptValidTab = []
            });
            
            receiptsFilted = newTab;
        }
        
        //Tri par Appareils
        if (theFilter["appliances"] != "") {

            let newTab = [];

            //Vérifie si la recette contient chaque appareil de la recherche
            receiptsFilted.forEach((receipt) => { 
                theFilter["appliances"].toLowerCase() == receipt["appliance"].toLowerCase() ? newTab.push(receipt) : "";
            });

            receiptsFilted = newTab;
        }

        //Tri par Ustensiles
        if (theFilter["ustensils"].length != 0) {

            let newTab = [];
            let isReceiptValid = false;
            let isReceiptValidTab = [];
            
            //Vérifie si la recette contient chaque appareil de la recherche
            //Le même principe que pour les ingredients (voir commentaire du tri par ingredient)
            receiptsFilted.forEach((receipt) => {
                theFilter["ustensils"].forEach((ustensilFilter) => { 
                    const test = receipt["ustensils"].find((ust) => ust.toLowerCase() == ustensilFilter.toLowerCase()) ? true : false;
                    isReceiptValidTab.push(test);
                });
                isReceiptValid = isReceiptValidTab.find(elem => elem == false) != null ? false : true;
                if( isReceiptValid ) newTab.push(receipt);
                isReceiptValid = false;
                isReceiptValidTab = []
            });

            receiptsFilted = newTab;
        }
    }
    
    return receiptsFilted;
}