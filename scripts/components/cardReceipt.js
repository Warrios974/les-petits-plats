export function cardReceipt(data) {
	//Défini chaque variable en fonction du contenu de "data"
	const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;

	function createCardReceipt(receipt) {
		//Créer les differents éléments du DOM pour la création du media pour la galery
		const article = document.createElement( "article" );
		const divContainer = document.createElement( "div" );
		const imgPart = document.createElement( "div" );
		const descriptionPart = document.createElement( "div" );
		const descriptionPartOne = document.createElement( "div" );
		const descriptionPartTwo = document.createElement( "div" );
		const titleh3 = document.createElement( "h3" );
		const pDescription = document.createElement( "p" );
		const pIngredients = document.createElement( "p" );
		const spanTime = document.createElement( "span" );
		const img = document.createElement("img");

		//Complete les differents éléments 
		article.setAttribute("class","customCard col-4");
		article.setAttribute("tabindex","0");
		divContainer.setAttribute("class","container")
		img.setAttribute("src","");
		img.setAttribute("alt",name);
		imgPart.setAttribute("class", "customCard__image");
		descriptionPart.setAttribute("class","row justify-content-center customCard__description");
		descriptionPartOne.setAttribute("class","row col-12");
		descriptionPartTwo.setAttribute("class","row col-12");
		titleh3.textContent = name;
		titleh3.setAttribute("class","col-8");
		spanTime.setAttribute("class","col-4");
		pIngredients.setAttribute("class","col-7");
		pDescription.setAttribute("class","col-5");
		spanTime.innerHTML = '<img src="./assets/medias/icons/clock.svg" alt=""> ' + time + ' min';
		pDescription.textContent = description;

		article.appendChild(divContainer);
		divContainer.appendChild(imgPart);
		divContainer.appendChild(descriptionPart);	
		imgPart.appendChild(img);
	
		descriptionPart.appendChild(descriptionPartOne);
		descriptionPart.appendChild(descriptionPartTwo);

		ingredients.forEach(ingredient => {
			const span = document.createElement( "span" );
			span.innerHTML = '<strong>' + ingredient['ingredient'] + ' :</strong> ' + ingredient['quantity'] + ' ' + (ingredient['unit'] ? ingredient['unit'] : "") + '<br>';
			pIngredients.appendChild(span);
		});
		descriptionPartOne.appendChild(titleh3);
		descriptionPartOne.appendChild(spanTime);
		descriptionPartTwo.appendChild(pIngredients);
		descriptionPartTwo.appendChild(pDescription);

		return (article);
	}

	return { id, name, servings, ingredients, time, description, appliance, ustensils, createCardReceipt};
}