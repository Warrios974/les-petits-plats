//Import de la "Factory Photographer" (fonction)
import { recipes } from "../data/recipes.js";
import { filter } from "../models/filter.js";
import { cardReceipt } from "../components/cardReceipt.js";
import { initFilterDOM } from "../utils/formFilters.js";

const filterFormDOM = document.querySelector("#formFilter fieldset");

export const filtersDOM = {
    "0" : filterFormDOM.querySelector("#formFilter #filterIngredients"), 
    "1" : filterFormDOM.querySelector("#formFilter #filterAppliance"), 
    "2" : filterFormDOM.querySelector("#formFilter #filterUstensils")
}

export let filterIngredients = [];
export let filterAppliances = [];
export let filterUstensils = [];

//Récupérer les infos des photographers dans le JSON
async function getRecettes() {
	return recipes;
}

export async function setFilters() {
	// Récupère les datas des photographes et de leurs medias
	const receipts = await getRecettes();
	filterIngredients = filter(receipts).getIngredientFilter();
	filterAppliances = filter(receipts).getAppliancesFilter();
	filterUstensils = filter(receipts).getUstensilsFilter();
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
}

async function init() {
	// Récupère les datas des photographes
	const receipts = await getRecettes();
	await setFilters();
	displayData(receipts);
	let filters = [filterIngredients, filterAppliances, filterUstensils]
	for (let index = 0; index < 3; index++) {
		initFilterDOM(filters[index],filtersDOM[index]);
	}
}
    
init();
    