
function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function hash_string(string) {
    let hash = 0;
    if (string.length == 0) return hash;

    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

// console.log("Hash tajenky: " + hash_string("pila"))

function ukaz_napovedu() {
    // const date_show = new Date("January 11, 2025 23:00:00"); ZMENIT!!!!!!!
    const date_show = new Date("December 27, 2024 23:00:00");


    const date_now = new Date();
    let time_show = date_show.getTime();
    let time_now = date_now.getTime();

    // Ukaz odpocet
    
    if (time_now <= time_show) {
        let rozdil = time_show - time_now;
        let h = Math.floor((rozdil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((rozdil % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((rozdil % (1000 * 60)) / 1000);

        let text = "za ";

        if (h != 0) text += h + "h ";
        if (m != 0) text += m + "m ";
        text += s + "s";
        document.getElementById("odpocet").textContent = text;

    }
    else {
        // Ukaz napovedu ve 23:00
        let napoveda = "5c69626d66636928626d2878616469";

        const myDecipher = decipher("mySecretSalt");

        document.getElementById("napoveda").textContent = myDecipher(napoveda);
        document.getElementById("odpocet").textContent = "";
    }
    setTimeout(ukaz_napovedu, 1000);
}

function submit() {
    let tajenka = 3440942; // pila
    let CASE_SENSITIVE = false;

    let input = document.getElementById("vstup").value;
    if (!CASE_SENSITIVE) 
        input = input.toLowerCase();
    input = input.trim()
    input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Zbav se diakritiky
    
    console.log("Vstup: \"" + input + "\"");
    console.log("Hash vstupu: " + hash_string(input));

    info = document.getElementById("info")
    image = document.getElementById("obrazek")

    if (hash_string(input) == tajenka) {
        // spravne
        image.style.display = "block";
        unfade(image);

        info.style.display = "block";
        info.innerHTML = "Správně!";
        info.style.color = "green";
        info.style.borderColor = "green";
        info.style.backgroundColor = "lightgreen";

        unfade(info);
    } else {
        // spatne
        image.style.display = "none";
        info.style.display = "block";
        info.innerHTML = "Tohle není správná odpověď<br>Zkus to znovu";
        info.style.color = "red";
        info.style.borderColor = "red";
        info.style.backgroundColor = "#fadbd8";

        unfade(info);
    }
}

const cipher = salt => {
    const textToChars = text => text.split("").map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
}
    
const decipher = salt => {
    const textToChars = text => text.split("").map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join("");
}

// To create a cipher
const myCipher = cipher("mySecretSalt")

//Then cipher any text:
console.log(myCipher("Tajenka je pila"))

//To decipher, you need to create a decipher and use it:
const myDecipher = decipher("mySecretSalt")
// console.log(myDecipher("7c606d287b6d6b7a6d7c287b7c7a61666f"))