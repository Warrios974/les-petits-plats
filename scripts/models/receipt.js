export function receipt(data) {

    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;
    
    function getId() {
        return id;
    }

    function getName() {
        return name;
    }

    function getServings() {
        return servings;
    }

    function getIngredients() {
        return ingredients;
    }

    function getTime() {
        return time;
    }

    function getDescription() {
        return description;
    }

    function getAppliance() {
        return appliance;
    }

    function getUstensils() {
        return ustensils;
    }

    function getImage() {
        return "./assets/medias/images/recette.jpg";
    }

    return { 
        id, 
        name, 
        servings, 
        ingredients, 
        time, 
        description, 
        appliance, 
        ustensils,
        getId ,
        getName ,
        getServings ,
        getIngredients ,
        getTime ,
        getDescription ,
        getAppliance ,
        getUstensils,
        getImage
   }
}