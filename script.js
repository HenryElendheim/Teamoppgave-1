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

let autoAmount = Number(localStorage.getItem("autoAmount")) || 0;
console.log("Loaded autoAmount:", autoAmount);

let income = autoAmount * 10;

let doubleCooldown = Number(localStorage.getItem("doubleCooldown")) || 0;
let tripleCooldown = Number(localStorage.getItem("tripleCooldown")) || 0;


// Main Code
const coinsText = document.getElementById("coinsText");
const bonusText = document.getElementById("bonusText");
const incomeText = document.getElementById("incomeText");

let amountPerClick = 1;
let cost = 0;
let multiplier = 1;



// Update
function update() {
    let total = (amountPerClick + bonus) * multiplier;
    multiplier = 1;
    let income = autoAmount * 10;

    if (durationActive("double")) {
        multiplier *= 2
    }

    coinsText.textContent = `Coins: ${coins.toLocaleString()}`;
    bonusText.textContent = `Coins per click: ${total.toLocaleString()}`;
    incomeText.textContent = `Income per second: ${income.toLocaleString()}`;
    saveCoins()
    durationUI();
}
setInterval(update, 250); //updater hvert 250ms
if (hasAuto && autoAmount > 0) {
    setInterval(() => {
        let income = autoAmount * 10;
        coins += income;
        update()
    }, 1000
    )
}







// clicking
function clickedGuy() {
    let total = (amountPerClick + bonus) * multiplier;
    coins += total;
    update()
}

//Save coins to memory
function saveCoins() {
    localStorage.setItem("coins", coins);
    localStorage.setItem("autoAmount", autoAmount)
}

//reset memory
function resetAll() {
    localStorage.clear();
    location.reload();
}







// Duration Code
function startTimer(powerUp, duration) {
    const endTimer = Date.now() + duration;
    // Date.now henter tiden nå i millesekunder som teller opp helt siden årstallet 1970
    // duration variablen henter verdien som ble skrevet inn
    // La oss si at vi har aktivert double
    // den sender da videre 15000 millesekunder.

    // Her er et simpelt eksempel

    // endTimer = 15000
    // Date.now = 1700000000000
    // endTimer + Date.now = 1700000015000
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
    // Koden over henter frem fra parametern powerUp. Den aktivere function durationUI()
    // End henter den tall verdien fra powerUp. La oss si den henter double som varer i 15s
    // powerUp sender info i millesekunder. dvs den sender 15000 som verdi
    if (!end) return 0;

    return Math.max(0, Math.ceil((end - Date.now()) / 1000));
    // Math.max(0, ...) gjør at den aldri går i negative tall. hvis den treffer -1 så vises 0
    // Math.ceil runder alltid opp, dvs at 1.1 = 2 og 1.8 = 2 og til slutt 1.0 = 1
    // Dette gjør så at den ikke teller ned til 0 sekunder når den er på 1.4s

    // Date.now er forklart i startTimer()

    // end = 1700000015000
    // Date.now = 1700000000000
    // end - Date.now = 15000
    // 15000 / 1000 = 15
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
const inventory = document.getElementById("inventory")
const invDouble = document.getElementById("invDouble")
const invTriple = document.getElementById("invTriple")

function inventoryToggle() {


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
    } else {
        invDouble.style.display = "none";
    }

    if (hasTriple) {
        invTriple.style.display = "block";
        console.log("Triple Active");
    } else {
        invTriple.style.display = "none";
    }
}



const doubleCD = 30000; // 30s cooldown
const tripleCD = 60000; // 60s cooldown
const doubleCDText = document.getElementById("doubleCDText");
const tripleCDText = document.getElementById("tripleCDText");

// activateDouble: cooldown starts after duration ends
function activateDouble() {
    const now = Date.now();

    // Check if cooldown is active
    if (now < doubleCooldown) {
        const remaining = Math.ceil((doubleCooldown - now) / 1000);
        console.log(`Double is on cooldown for ${remaining}s`);
        return;
    }

    const duration = 15000; // 15s double duration
    startTimer("double", duration);

    // Set cooldown to start after duration
    doubleCooldown = now + duration + doubleCD;
    localStorage.setItem("doubleCooldown", doubleCooldown);

    update();
}

// activateTriple: cooldown starts immediately after triple activation
function activateTriple() {
    const now = Date.now();
    if (hasTriple) {
        if (now < tripleCooldown) {
            const remaining = Math.ceil((tripleCooldown - now) / 1000);
            console.log(`Triple is on cooldown for ${remaining}s`);
            return;
        }

        coins *= 3;

        tripleCooldown = now + tripleCD;
        localStorage.setItem("tripleCooldown", tripleCooldown);

        update();
    }


}

// Update cooldown text next to buttons
function updateCooldownUI() {
    const now = Date.now();

    // Double
    if (now < doubleCooldown) {
        invDouble.disabled = true;
        invDouble.style.opacity = 0.5;
        doubleCDText.textContent = `Cooldown: ${Math.ceil((doubleCooldown - now) / 1000)}s`;
    } else {
        invDouble.disabled = false;
        invDouble.style.opacity = 1;
        doubleCDText.textContent = '';
    }

    // Triple
    if (now < tripleCooldown) {
        invTriple.disabled = true;
        invTriple.style.opacity = 0.5;
        tripleCDText.textContent = `Cooldown: ${Math.ceil((tripleCooldown - now) / 1000)}s`;
    } else {
        invTriple.disabled = false;
        invTriple.style.opacity = 1;
        tripleCDText.textContent = '';
    }
}

// Call every tick
setInterval(() => {
    durationUI(); // update durations like Double active time
    updateCooldownUI();
}, 250);
