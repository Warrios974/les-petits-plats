//Import de la "Factory Photographer" (fonction)
import { recipes } from "../data/recipes.js";
import { cardReceipt } from "../components/cardReceipt.js";

export let filterAppliance = [];
export let filterUstensils = [];
export let filterIngredients = [];

//Récupérer les infos des photographers dans le JSON
async function getRecettes() {
	return recipes;
}
async function initData() {
	// Récupère les datas des photographes et de leurs medias
	const receipts = await getRecettes();

	// [...new Set(tabFilterIngredients)] utilisation du ECMAScript 6
	// Ajoute dans les tableaux
	let tabFilterAppliance = [];
	receipts.forEach((receipt) => { tabFilterAppliance.push(receipt['appliance']) })
	filterAppliance = [...new Set(tabFilterAppliance)];
	// Ajoute dans les tableaux
	let tabFilterUstensils = [];
	receipts.forEach((receipt) => { receipt['ustensils'].forEach((ustensil) => { tabFilterUstensils.push(ustensil) }) })
	filterUstensils = [...new Set(tabFilterUstensils)];
	// Ajoute dans les tableaux
	let tabFilterIngredients = [];
	receipts.forEach((receipt) => { receipt['ingredients'].forEach((ingredient) => { tabFilterIngredients.push(ingredient['ingredient']) }) })
	filterIngredients = [...new Set(tabFilterIngredients)];
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

//Fonction pour afficher les photographers
async function setFilter() {
	
}

async function init() {
	// Récupère les datas des photographes
	const receipts = await getRecettes();
	await initData();
	displayData(receipts);
	setFilter();
}
    
init();
    