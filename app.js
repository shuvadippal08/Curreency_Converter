const BASE_URL =
  "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";
// const URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_5MSkR7lCs2jhOjthcqtU0zAMch1s51A8V9UCa4Fr";


const btn = document.querySelector("#btn");
const msg = document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns){
  for(currCode in countryList){
    let newOption  = document.createElement("option");
    newOption.innerText  = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    }else if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change",(evt)=>{
    UpdateFlag(evt.target);
  });
}


const UpdateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;

};
btn.addEventListener("click", async (evt)=>{
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if(amountVal === "" || amountVal < 1){
    amountVal = 1;
    amount.value = "1";
  }
  console.log(fromCurr.value,toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value}_${toCurr.value}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  // console.log(response);
  // console.log(data);
  let rate = 1/data.rate;
  let finalAmount  = amountVal * rate;
  console.log(finalAmount);

  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
