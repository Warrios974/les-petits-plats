import { search } from "../search/search.js";

let searchCache = [];

export function proxySearchReceipts() {

    function proxySearch(theFilter) {

        searchCache.forEach(element => {
            if (JSON.stringify(theFilter) === JSON.stringify(element["filter"])) {
                
                console.log("Data from proxy");
                search(theFilter,element["data"])
                
                return element["data"];
    
            }
        });

        console.log("Add in cache")

        const data = search(theFilter);

        searchCache.push({
            "filter" : theFilter,
            "data" : data
        });
        

        return data;
        
    }


    return {
        searchCache,
        proxySearch
    }
}