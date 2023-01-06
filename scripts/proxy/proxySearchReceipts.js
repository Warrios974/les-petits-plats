import { search } from "../search/search.js";

let searchCache = [];

export function proxySearchReceipts() {

    function proxySearch(theFilter,incORdesc) {

        searchCache.forEach(element => {

            const theFilterJSON = JSON.stringify(theFilter);
            const elementFilterJSON  = JSON.stringify(element["filter"]);

            console.log(theFilterJSON);
            console.log(elementFilterJSON);

            if ( theFilterJSON == elementFilterJSON) {
                debugger
                console.log("Data from proxy");

                search(theFilter,incORdesc,element["data"])
                
                return element["data"];
    
            }
        });

        console.log("Add in cache")

        const data = search(theFilter,incORdesc);

        searchCache.push({
            "filter" : theFilter,
            "data" : data
        });
        

        console.log(searchCache)
        return data;
        
    }


    return {
        searchCache,
        proxySearch
    }
}