import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import '../../src/App.css';
import axios from "axios";
import { Input } from '@mui/material';
import conversion,{getNameCurrency} from '../classes/utilsConverter';
 
function MyCurrencyConverter({currentSymbole,symbolOptions,currency}) {

    
    var symbol = currentSymbole.split(":")[1] == undefined?"":currentSymbole.split(":")[1].trim();
    var listCurrenciesOptionsMap = symbolOptions.map((e)=>{
        return e.cardSubtitle.split(":")[1] == undefined?"":{
            symbol:e.cardSubtitle.split(":")[1].trim(),
            name:e.cardTitle
        }
    })
    var listCurrenciesOptions = symbolOptions.map((e)=> e.cardSubtitle.split(":")[1] == undefined?"":e.cardSubtitle.split(":")[1].trim())

    var remainCurrency;
    if (listCurrenciesOptions.includes(symbol.trim())){
        remainCurrency = listCurrenciesOptions.splice(listCurrenciesOptions.indexOf(symbol.trim()),1);
    }

    
    //listCurrenciesOptions.splice(listCurrenciesOptions.indexOf(symbol),1);
    //listCurrenciesOptions.shift();
    
    
    //var "" = ""Splitted[1] == undefined?"" : ""Splitted[1];

    
    //var currenciesOptions = listOptions.map((el)=>el.current""e.split(":")[1]);
    // Initializing all the state variables 
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState(symbol);
    const [to, setTo] = useState();
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);
 

    useEffect(()=>{
        var symbol = currentSymbole.split(":")[1] == undefined?"":currentSymbole.split(":")[1].trim();
        var listCurrenciesOptions = symbolOptions.map((e)=>e.cardSubtitle.split(":")[1] == undefined?"":e.cardSubtitle.split(":")[1].trim())
        var remainCurrency = listCurrenciesOptions.splice(listCurrenciesOptions.indexOf(symbol.trim()),1);
    },[from,to])




    // Calling the api whenever the dependency changes
    useEffect(() => {
            axios.get('./mockDatas/rateChange.json')
              //.then(data => data.json()) // Parsing the data into a JavaScript object
              .then((json) => {

                var changeRateEntries = Object.entries(json.data);

                var symbolInRateChange = changeRateEntries.find((el)=>{

                   return el[0] == currency
                })

                //symbolInRateChange = from;
                
                //alert(JSON.stringify(json.data.changeRate)) // Displaying the stringified data in an alert popup
                //setInfo(json.data.changeRate[from])
                
                setInfo(symbolInRateChange)
            })
        /*Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })*/
            convert();
    }, [from]);



    useEffect(()=> {
        convert()
    },[to,input])


    // Calling the convert function whenever
    // a user switches the currency
    useEffect(() => {
        setOptions(info);
        convert();
    }, [info])
 
    // Function to convert the currency
    function convert() {
        //var valu = info != undefined?0:(info.length>0?)
        //var v = 
        if (input == 0){
            setInput(1);
        }
        if (info == undefined){
            //info = 0
        } else {

            
            if (info[1] != undefined){
                if (to != undefined && from != undefined){
                        var currency1 = from.trim() == symbol?symbol:from;
                        var currency2 = to.trim() == symbol?symbol:to; 
                        /*symbolOptions.find((el) => {
                            if (el.cardTitle.trim() == currency.trim()){
                                return 
                            }
                        })*/
                        var indexCurrency1 = listCurrenciesOptions.indexOf(currency1);
                        var indexCurrency2 = listCurrenciesOptions.indexOf(currency2);


                    if (indexCurrency1 !== -1){
                        var nameCurrency1 = symbolOptions[indexCurrency1] == undefined? "":symbolOptions[indexCurrency1].cardTitle;    
                    } else if (indexCurrency1 === -1){
                        nameCurrency1 = currency
                    }
                    if (indexCurrency2 !== -1){    
                        var nameCurrency2 = symbolOptions[indexCurrency2] == undefined?"":symbolOptions[indexCurrency2].cardTitle;
                    } else if (indexCurrency2 === -1){
                        nameCurrency2 = currency
                    }
                    /*var p = conversion(nameCurrency1,nameCurrency2).then(a =>{
                        console.error(a);
                        return a;
                    });*/
                    //console.error("fdsfdf",p);
                    var nameFrom = listCurrenciesOptionsMap.find((elem) => {
                        if (elem.symbol == from){
                            return elem
                        }
                    }).name
                    var nameTo = listCurrenciesOptionsMap.find((elem) => {
                        if (elem.symbol == to){
                            return elem
                        }
                    }).name
                }
                

                
                var indexFrom = listCurrenciesOptions.indexOf(from);
                var indexTo = listCurrenciesOptions.indexOf(to);


                if (indexFrom !== -1){
                    var nameFrom = symbolOptions[indexFrom] == undefined? "":symbolOptions[indexFrom].cardTitle;    
                } else {
                }

                if (indexTo !== -1){    
                    var nameTo = symbolOptions[indexTo] == undefined?"":symbolOptions[indexTo].cardTitle;
                } else {

                }

                if (nameFrom == undefined){
                    if (nameTo == currency){
                        nameFrom = remainCurrency
                    } else {
                        nameFrom =  currency;
                    }
                }
                if (nameTo == undefined){
                    if (nameFrom == currency){
                        nameTo = remainCurrency
                    } else {
                        nameTo =  currency;
                    }
                }
                /*var p = conversion(nameFrom,nameTo).then(da=>{
                    var m;
                    console.error(da)
                    var s;
                    return da;
                });*/

                
                var entriesInfos = Object.entries(info[1]);
                if (entriesInfos != undefined){
     
                    var newRate;
                    if (entriesInfos[0][0] === nameTo){
                        newRate = entriesInfos[0][1];
                    } else if (entriesInfos[0][0] === nameFrom){
                        newRate = entriesInfos[0][1]
                    } else {
                        //newRate = 0;
                        /*var t = conversion(nameCurrency1,nameCurrency2).then(a =>{
                            console.error(a);
                            newRate = a;
                            return a;
                        });*/
                       
                        
                        //console.error()
                    }
  
                }
            }
            //var entriesInfos = Object.entries(info[1]);
            //rate = Object.values(info[0])[0]
        }
        var rate = newRate;
        if (rate == undefined){
            var cardCurrencyOne;
            if (nameFrom == currency){
                cardCurrencyOne = true;
            } else if (nameTo == currency){
                cardCurrencyOne = false;
            }
            rate = conversion(nameFrom,nameTo,cardCurrencyOne).then(d=>{
                if (d != undefined && d != "Not Find"){
                    if (symbol == from && d[0][0]==nameFrom){
                        var total = 1;
                        for (var r of d){
                            var rateMultiplicator = Object.values(Object.values(r)[1])[0];
                            total *= rateMultiplicator;
                        }
                        setOutput(input * total);
                    } else if (symbol == to && d[0][0]==nameFrom) {
                        var total = 1;
                        for (var r of d){
                            var rateMultiplicator = Object.values(Object.values(r)[1])[0];
                            total *= rateMultiplicator;
                        }
                        setOutput(input * total);
                    }else {
                        var total = 1;
                        for (var s of d){
                            var rateDivisor = Object.values(Object.values(s)[1])[0];
                            total *= rateDivisor;
                        }
                        setOutput(input / total);
                    }
                    //return d;
                }
                
            });
        } else {
            if (symbol == from){
                setOutput(input * rate);
            } else {
                setOutput(input / rate);
            }
        }
        

        
        //var rate = info[to];
        
        
    }
 
    // Function to switch between two currency
    function flip() {
        var temp = from;
 
        setFrom(to);
        setTo(temp);
    }
 
    return (
        <div className="">
            <div className="">
                <h1>Currency converter</h1>
            </div>
            <div className="">
                <div className="">
                    <h3>Amount</h3>
                    <input type="text"
                        placeholder="Enter the amount"
                        onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className="">
                    <h3>From</h3>
                    { (from !== symbol ) &&
                        <Dropdown options={listCurrenciesOptions}
                        onChange={(e) => { setFrom(e.value ); convert()/*setFrom(symbol)*/ }}
                        value={from} placeholder="From" />}
                    {(from === symbol) && <Input readOnly
                        onChange={(e) => { setTo(e.value) }}
                        value={from} placeholder="From" />}
                    
                </div>
                <div className="">
                    <HiSwitchHorizontal size="30px"
                        onClick={() => { flip() }} />
                </div>
                <div className="">
                    <h3>To</h3>
                    { (from === symbol ) &&
                        <Dropdown options={listCurrenciesOptions}
                        onChange={(e) => { setTo(e.value); convert()}}
                        value={to} placeholder="To" />}
                    {(from !== symbol) && <Input readOnly
                        onChange={(e) => { setTo(e.value) }}
                        value={to} placeholder="To" />}
                </div>
            </div>
            <div className="">
                <button onClick={() => { convert() }}>Convert</button>
                <h2>Converted Amount:</h2>
                <p>{input + " " + from + " = " + output.toFixed(8) + " " + to}</p>
            </div>
        </div>
    );
}
 
export default MyCurrencyConverter;