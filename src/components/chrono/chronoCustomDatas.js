import { chronoDatas } from "./chronoDatas"
import MyCurrencyConverter from "../converterCurrency"

export const customContent = chronoDatas.map(function(e,i,arr){
    //console.error(arr)
    return (
        <div key={e.title}>
            <p>{e.cardTitle}</p>
            <p>{e.cardDetailedText}</p>
            <h3>{e.cardSubtitle}</h3>
            
            <MyCurrencyConverter currentSymbole ={e.cardSubtitle}  symbolOptions={arr} currency={e.cardTitle}></MyCurrencyConverter>
        </div>
    )
});