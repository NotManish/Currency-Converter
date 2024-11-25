
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let amt = document.querySelector(".amount input");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = select;
        }
        if (select.name === "to" && currCode === "NPR") {
            newOption.selected = select;
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        displayMsg(evt.target.value);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    if (amt.value === "" || amt.value < 1) {
        amt.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let respObj = await response.json();
    let fromCurrencyCode = fromCurr.value.toLowerCase();
    let toCurrencyCode = toCurr.value.toLowerCase();
    let rate = respObj[fromCurrencyCode][toCurrencyCode];
    msg.innerText = `${amt.value} ${fromCurr.value} = ${(rate * amt.value).toFixed(4)} ${toCurr.value}`;
})

displayMsg = async () => {
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let respObj = await response.json();
    let fromCurrencyCode = fromCurr.value.toLowerCase();
    let toCurrencyCode = toCurr.value.toLowerCase();
    let rate = respObj[fromCurrencyCode][toCurrencyCode];
    msg.innerText = `1 ${fromCurr.value} = ${rate} ${toCurr.value}`;
}
displayMsg();
