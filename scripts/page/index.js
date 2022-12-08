//Import de la "Factory Photographer" (fonction)
import { recipes } from "../data/recipes.js";
import { filters } from "../models/filter.js";
import { cardReceipt } from "../components/cardReceipt.js";

const receipts = await getRecettes();
export const filtersDOM = filters(receipts);

export let filterIngredients = [];
export let filterAppliances = [];
export let filterUstensils = [];

//Récupérer les infos des photographers dans le JSON
async function getRecettes() {
	return recipes;
}

//Fonction pour afficher les photographers
async function displayData(receipts) {
	const receiptsSection = document.querySelector("#receiptsGalery");

	//Pour chaque photographer créer sa carte avec la fonction "createCardPhotographer"
	receipts.forEach((receipt) => { createCardReceipt(receipt); });

	// Function qui va créer les carte
	function createCardReceipt(receipt) {
		const receiptModel = cardReceipt(receipt);
		const receiptCardDOM = receiptModel.createCardReceipt();
		receiptsSection.appendChild(receiptCardDOM);
	}


	/*let filters = 
	for (let index = 0; index < 3; index++) {
		initFilterDOM(filters[index],filtersDOM[index]);
	}*/
}

async function init() {
	// Récupère les datas des photographes
	displayData(receipts);
	filtersDOM.initFiltersForDOM("all");
}
    
init();
    