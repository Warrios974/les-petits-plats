import { search } from "../search/search.js";

let searchCache = [];

export function proxySearchReceipts() {

    function proxySearch(theFilter) {

        const cahedResult = searchCache.forEach((result) => {
            result["filter"] == theFilter;
        });

        if (cahedResult) {
            console.log("Data from proxy");
            search(theFilter,cahedResult["data"])
            return searchCache;
        }

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