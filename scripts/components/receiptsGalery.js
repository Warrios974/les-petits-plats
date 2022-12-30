import { receiptsSection } from "../page/index.js";
import { cardReceipt } from "../components/cardReceipt.js";

export function receiptsGalery(data) {

    // Function qui va créer les carte
    //Pour chaque photographer créer sa carte avec la fonction "createCardReceipt"
    receiptsSection.innerHTML = "";
    data.forEach((receipt) => { createCardReceipt(receipt); });

    function createCardReceipt(receipt) {
        const receiptModel = cardReceipt(receipt);
        const receiptCardDOM = receiptModel.createCardReceipt();
        receiptsSection.appendChild(receiptCardDOM);
    }
}