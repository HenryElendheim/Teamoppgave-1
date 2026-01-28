//Loading from memory (localstorage)
let coins = Number(localStorage.getItem("coins")) || 0;
console.log("Loaded coins:", coins);

let hasDouble = localStorage.getItem("hasDouble") === "true";
console.log("Loaded hasDouble:", hasDouble)

let hasBonus = localStorage.getItem("hasBonus") === "true";
console.log("Loaded hasBonus:", hasBonus)

let hasTriple = localStorage.getItem("hasTriple") === "true";
console.log("Loaded hasTriple:", hasTriple)

let hasAuto = localStorage.getItem("hasAuto") === "true";
console.log("Loaded hasAuto:", hasAuto)

let bonus = Number(localStorage.getItem("bonus")) || 0;
console.log("Loaded bonus:", bonus);





// Main Code
const coinsText = document.getElementById("coinsText");
const bonusText = document.getElementById("bonusText");

let amountPerClick = 1;
let cost = 0;
let multiplier = 1;



// Update
function update() {
    let total = (amountPerClick + bonus) * multiplier;

    multiplier = 1;

    if (durationActive("double")) {
        multiplier *= 2
    }

    coinsText.textContent = `Coins: ${coins}`;
    bonusText.textContent = `Coins per click: ${total}`;
    saveCoins()
    durationUI();
}
setInterval(update, 250);










// clicking
function clickedGuy() {
    let total = (amountPerClick + bonus) * multiplier;
    coins += total;
    update()
}

//Save coins to memory
function saveCoins() {
    localStorage.setItem("coins", coins);
}

//reset memory
function resetAll() {
    localStorage.clear();
    location.reload();
}







// Duration Code

function startTimer(powerUp, duration) {
    const endTimer = Date.now() + duration;
    localStorage.setItem(powerUp + "Duration", endTimer)
}


function durationActive(powerUp) {
    const end = Number(localStorage.getItem(powerUp + "Duration"))

    if (!end) return false;

    if (Date.now() > end) {
        localStorage.removeItem(powerUp, "Duration");
        return false;
    }
    return true;
}


function getTimeLeft(powerUp) {
    const end = Number(localStorage.getItem(powerUp + "Duration"))

    if (!end) return 0;

    return Math.max(0, Math.ceil((end - Date.now()) / 1000));
}




const statusDuration = document.getElementById("statusDuration");
function durationUI() {
    let text = "";

    if (durationActive("double")) {
        text += `Double: ${getTimeLeft("double")}s`;
    }

    statusDuration.textContent = text;
}











// inventory

function inventoryToggle() {
    const inventory = document.getElementById("inventory")
    const invList = document.getElementById("invList")

    const invDouble = document.getElementById("invDouble")
    const invAuto = document.getElementById("invAuto")
    const invTriple = document.getElementById("invTriple")

    if (inventory.style.display === "none" || inventory.style.display === "") {
        inventory.style.display = "block";
        console.log("inv open shown");
    } else {
        inventory.style.display = "none";
        console.log("inv open hidden");
    }



    if (hasDouble) {
        invDouble.style.display = "block";
        console.log("Double Active");
    }

    if (hasAuto) {
        invAuto.style.display = "block";
        console.log("Auto Active");

    }

    if (hasTriple) {
        invTriple.style.display = "block";
        console.log("Triple Active");

    }
}



//Inventory Function

function activateDouble() {
    startTimer("double", 15000) //15000 ms blir om til 15 sekunder
    update()
}



function activateAuto() {

}



function activateTriple() {
    console.log("Tripled all coins")
    coins *= 3;
    update()
}














// Shop



function buyDouble() {
    cost = 4; // Setter prisen til upgraden. Prisen er 249 pga if-setningen under

    if (coins >= cost && !hasDouble) { // Da når vi har 250 can vi kjøpe upgraden. (&& !hasDouble gjør så at du ikke kan gjenkjøpe den)
        coins -= cost; // vi legger til +1 så du betaler 50 coins
        hasDouble = true;
        localStorage.setItem("hasDouble", "true");

        startTimer("double", 15000) // 15 Sekunder

        console.log("Double activated for 15s")
    } else {
        return;
    }
    update()
}

function buyBonus() {
    cost = 2;

    if (coins >= cost) {
        coins -= cost;
        console.log("Bought Bonus 1+ per click")

        bonus += 1;
        hasBonus = true;
        localStorage.setItem("hasBonus", "true");
        localStorage.setItem("bonus", bonus);
    } else {
        return;
    }
    update()
}



function buyAuto() { // Dette blir heller som en grandma fra cookie clicker og gir deg bare penger over tid
    cost = 10
    if (coins >= cost) {
        coins -= cost;    


        hasAuto = true;
        localStorage.setItem("hasAuto", "true");
        console.log("buy auto buy +10 coins");
    }
}



function buyTriple() {
    cost = 9;

    if (coins >= cost && !hasTriple) {
        coins -= cost;
        console.log("Bought Triple all coins")

        coins *= 3;

        hasTriple = true;
        localStorage.setItem("hasTriple", "true");
    }

    update()
}



function permaDeath() {
    cost = 1000000

    if (coins >= cost) {
        localStorage.clear();
        location.reload();
    }
}









// auto function
function autoFunction() {

}