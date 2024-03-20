import axios from "axios";
//import { chronoDatas } from "../components/chrono/chronoDatas";


export default async function conversion(from,to,cardCurrencyOne) {

    
    var fromToRateWay = function (from,to,cardCurrencyOne){
        
        var beginRate = r[from];
        var currentRateName;
        var succesiveRates = [];
        var SearchDatasEntries = Object.entries(r);
        var find = false;
        var toH = base == from?to:from;
        var currencyFind = SearchDatasEntries.find((elem)=>{
            if (elem[0] == from || elem[0] == to){
                return elem;
            }
        })
        succesiveRates.push(currencyFind)
        /*if (/*cardCurrencyOne && *//*Object.entries(currencyFind[1])[0][0] == to){
            return Object.entries(currencyFind[1])[0][1]
        }*/ if (currencyFind[0] == to && currencyFind[0][from] != undefined){
            return succesiveRates;
        } else {
            currencyFind = SearchDatasEntries.find((elem)=>{
                return elem[0] == Object.entries(currencyFind[1])[0][0];
            })
            if (currencyFind != undefined){
                if (succesiveRates[0][0] == to && succesiveRates[0][1][from] != undefined){
                    find = true;
                    return succesiveRates;
                }
                succesiveRates.push(currencyFind)
                // check here also 
                if (succesiveRates[0][0] == to && succesiveRates[succesiveRates.length-1][1][from] != undefined){
                    find = true;
                }

                if (Object.keys(currencyFind[1]).includes("or") || Object.keys(currencyFind[1]).includes("metal")){
                    conversionBimetal();
                    return "0"
                }
                
                while (!find){
                    
                    if (currencyFind != undefined){
                        currencyFind = SearchDatasEntries.find((elem)=>{
                            return elem[0] == Object.entries(currencyFind[1])[0][0];
                        })
                        if (succesiveRates[0][0] == to && Object.keys(succesiveRates[succesiveRates.length-1][1])[0] == from){
                            find = true;
                        }
                        if (currencyFind != undefined && currencyFind[0] != undefined){
                            if ( currencyFind[0] == to){
                                find = true;
                            } else if (currencyFind[0] != to){

                                succesiveRates.push(currencyFind)
                            }
                        } else {
                            find = true;
                        }
                        
                    }
                    
                }
            }
            
            //return associatedRate;
        }
        return succesiveRates;
    }

    var toFromRateWay = function(from,to,cardCurrencyOne){
        

        var SearchDatasEntries = Object.entries(r);
        var SearchDatasKeys = Object.keys(r);
        var SearchDatesValues = Object.values(r);
        var base = cardCurrencyOne?from:to;
        var toHere = base == from?to:from
        var succesiveRatesToFrom = [];
        var currencyFind = SearchDatasEntries.find((elem)=>{
            var ra = Object.entries(elem[1]);
            return Object.keys(elem[1]) == base || elem[0] == base;
        })
        if (currencyFind != undefined){
            
            if (currencyFind[0] == to){
                succesiveRatesToFrom.unshift(currencyFind)
                return Object.values(currencyFind[1]);
    
            } else {
                succesiveRatesToFrom.unshift(currencyFind)
                var find = false;
                while (!find){
                    var currencyFind = SearchDatasEntries.find((el)=>{
                        var nameCurr = Object.keys(el[1])[0];
                        return nameCurr == currencyFind[0];
                    })
                    if (currencyFind != undefined){
                        succesiveRatesToFrom.unshift(currencyFind)
                        if (currencyFind != undefined && currencyFind[0]==toHere){
                            find = true;
                        }
                    } else {
                        find = true;
                    }
                }
                
                //
                //while
                var l; 
            }
        }
        
        // find the
        return succesiveRatesToFrom;
    }
    
    var conversionBimetal = function(){

    }

    var chooseTab = function (from,to,fromToRate,toFromRate){
        if (fromToRate[0][0] == from && fromToRate[fromToRate.length-1][1][to] != undefined){
            return fromToRate;
        } else if (toFromRate[0][0] == to && toFromRate[toFromRate.length-1][1][from] != undefined){
            return toFromRate;
        } else if (fromToRate[0][0] == to && fromToRate[fromToRate.length-1][1][from] != undefined){
            return fromToRate;
        }





        if (fromToRate != undefined && fromToRate[0] != undefined && (fromToRate[0][0] == from && fromToRate[fromToRate.length-1][1][to] != undefined)){
            return fromToRate;
        } else if (toFromRate != undefined && toFromRate[0] != undefined && (toFromRate[0][0] == from && toFromRate[toFromRate.length - 1][1][to] != undefined)) {
            return toFromRate
        }
    }
    

    if (!cardCurrencyOne){
        var tmp = to;
        to = from;
        from = tmp;
    }
    //var listCurrencies = symbolOptions.map((e)=>e.cardSubtitle.split(":")[1] == undefined?"":e.cardSubtitle.split(":")[1].trim())
    var r = await axios.get('./mockDatas/rateChange.json',{
        params:{
            from:from,
            to:to
        }
    }).then((json) => {
        var datas = json.data;
        var params = json.config.params;
        if (datas != undefined){
            var ratefrom = params.from != undefined ?datas[params.from]:"";
            var rateto = params.to != undefined ?datas[params.to]:""
            var SearchDatas = Object.entries(datas);
            var correspondanceFInd = false;
        }
        return datas;
    })

    var base = cardCurrencyOne?from:to;
    var toH = base == from?to:from;
    
    if (from != undefined && to != undefined){
        
        

        var fromToRate; 
        var toFromRate;
        if (fromToRate == undefined){
            fromToRate = fromToRateWay(from,to,cardCurrencyOne,r);
        }
        if (toFromRate == undefined){
            toFromRate = toFromRateWay(from,to,cardCurrencyOne,r);
        }
        

        
        
    }
    if (fromToRate != undefined && /*fromToRate[0] != undefined &&*/ toFromRate != undefined /*&& toFromRate[0] != undefined*/){
        var result = chooseTab(from,to,fromToRate,toFromRate);
    }
    
    
    if (result != undefined){
        return result;
    }

    return "Not Find";
}



export const getNameCurrency = function(){
    return "0"
}