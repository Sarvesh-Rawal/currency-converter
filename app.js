let fromcurr = document.querySelector('.from select');
let tocurr = document.querySelector('.to select');
let fromImg = document.querySelector('.from img');
let toImg = document.querySelector('.to img');
let dropdowns = document.querySelectorAll('.dropdown select');
let btn = document.querySelector('form button');
let msg = document.querySelector('.msg-container p');
let changeImg = document.querySelector('i');

const updateFlag = () => {
    let currFromCountry = countryList[fromcurr.value]; 
    let currToCountry = countryList[tocurr.value]; 
    fromImg.setAttribute('src',`https://flagsapi.com/${currFromCountry}/flat/64.png`);
    toImg.setAttribute('src',`https://flagsapi.com/${currToCountry}/flat/64.png`);
}

for(let select of dropdowns){
    for(let code in countryList){
        let newdrop = document.createElement('option');
        newdrop.value = code;
        newdrop.innerText = code;
        select.append(newdrop);

        if(select.name === 'from' && code === 'USD'){
            newdrop.selected = 'selected';
        }
        if(select.name === 'to' && code === 'INR'){
            newdrop.selected = 'selected';
        }

        select.addEventListener('change',() => {
            updateFlag();
        })
    }
}

const exchangeRate = async () => {
    let amt = document.querySelector('.amount input');
    let amtval = amt.value;
    
    if (amtval === "" || amtval < 1) {
        amt = 1;
        amtval = 1;
    }

    let fromCurrVal = fromcurr.value;
    let toCurrVal = tocurr.value;
    console.log(fromCurrVal,toCurrVal);
    
    const baseUrl = `https://api.currencyapi.com/v3/latest?apikey=cur_live_NS3pR18wUMkrxAVrqz5PAbaGwOhil2eM7PzIttxR&base_currency=${fromCurrVal}`;
    console.log(baseUrl);

    const URL = `${baseUrl}=${fromCurrVal}`;
    let response = await fetch(baseUrl);
    let data = await response.json();
    let exchangeValue = data['data'][toCurrVal]['value'];
    console.log(exchangeValue);
    console.log(amtval);
    let finalAmt = amtval * exchangeValue;
    console.log(finalAmt);
    msg.classList.remove('hide');
    msg.innerText = `${amtval} ${fromCurrVal} = ${finalAmt} ${toCurrVal}`;

}

btn.addEventListener('click',(evt) => {
    evt.preventDefault();
    exchangeRate();
})  
