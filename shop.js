// Shop
function buyDouble() {
    cost = 50;

    if (coins >= cost && !hasDouble) { // Da når vi har 250 can vi kjøpe upgraden. (&& !hasDouble gjør så at du ikke kan gjenkjøpe den)
        coins -= cost;
        hasDouble = true;
        localStorage.setItem("hasDouble", "true");

        startTimer("double", 15000) // 15 Sekunder

        console.log("Double activated for 15s")
    } else {
        return;
    }
    updateShopUI()
}


function buyBonus(amountBought = 1) {
    cost = 250;
    const totalCost = cost * amountBought;

    if (coins >= totalCost) {
        coins -= totalCost;
        console.log("Bought Bonus");

        bonus += amountBought; // Dette gjør så a hvis du kjøper 1 får du +1. hvis du kjøper 100 får du +100
        hasBonus = true;
        localStorage.setItem("hasBonus", "true");
        localStorage.setItem("bonus", bonus);
    } else {
        return;
    }
    updateShopUI()
}


function showBuyMultiple() {
    const x10or100 = document.getElementById("x10/100");

    if (x10or100.style.display === "none" || x10or100.style.display === '') {
        x10or100.style.display = "block";
    } else {
        x10or100.style.display = "none";
    }
}


function buyAuto(amountBought = 1) { // Dette blir heller som en grandma fra cookie clicker og gir deg bare penger over tid
    cost = 5000
    const totalCost = cost * amountBought;
    if (coins >= totalCost) {
        coins -= totalCost;

        autoAmount += amountBought;

        hasAuto = true;
        localStorage.setItem("hasAuto", "true");

        localStorage.setItem("autoAmount", autoAmount);
    }

    updateShopUI()
}






function buyTriple() {
    cost = 50000;

    if (coins >= cost && !hasTriple) {
        coins -= cost;
        console.log("Bought Triple all coins")

        coins *= 3;

        hasTriple = true;
        localStorage.setItem("hasTriple", "true");
    }

    updateShopUI()()
}



function permaDeath() {
    cost = 1000000

    if (coins >= cost) {
        localStorage.clear();
        location.reload();
    }
}




const doubleButton = document.getElementById("doubleButton"),
    bonusButton1 = document.getElementById("bonusButton1"),
    bonusButton2 = document.getElementById("bonusButton2"),
    bonusButton3 = document.getElementById("bonusButton3"),
    autoButton = document.getElementById("autoButton"),
    autoButton2 = document.getElementById("autoButton2"),
    autoButton3 = document.getElementById("autoButton3"),
    tripleButton = document.getElementById("tripleButton"),
    permaButton = document.getElementById("permaButton");





function toggleGrey(button, costUpgrade, isOwned) {
    if (coins < costUpgrade || isOwned) {
        button.classList.add("grey");
    }
    else {
        button.classList.remove("grey");
    }
}



function updateShopUI() {
    toggleGrey(doubleButton, 50, hasDouble);
    toggleGrey(bonusButton1, 250);
    toggleGrey(bonusButton2, 2500);
    toggleGrey(bonusButton3, 25000);
    toggleGrey(autoButton, 5000);
    toggleGrey(autoButton2, 50000);
    toggleGrey(autoButton3, 500000);
    toggleGrey(tripleButton, 50000, hasTriple);
    toggleGrey(permaButton, 1000000); 
}
updateShopUI()




//hide inv in shop

if (inventory.style.display === "none" || inventory.style.display === "") {
    inventory.style.display = "none";
    console.log("inv open hidden in shop");
}
