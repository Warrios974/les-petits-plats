import { search } from "../search/search.js";

let searchCache = [];

export function proxySearchReceipts() {
    
    function proxySearch(theFilter) {
        
        console.log(searchCache)
        if (searchCache.length != 0) {
            searchCache.forEach(element => {
                debugger
                if (element["filter"] === theFilter) {
                    
                    console.log("Data from proxy");
                    const data = element["data"];
                    return data;
                }
            });
        }

        console.log("Add in cache")
        const data = search(theFilter);

        searchCache.push({
            "filter" : theFilter,
            "data" : data
        });
        
        console.log(searchCache)
        return data;
        
    }


    return {
        proxySearch
    }
}