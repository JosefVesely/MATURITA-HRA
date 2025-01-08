function oznam_zacatek() {
    const date = new Date();

    if ([22, 23, 0, 1].includes(date.getHours())) {
        document.getElementById("text").innerHTML = "Hra začala! <br><br>Naskenuj QR kód a začni hrát."
    }

    setTimeout(oznam_zacatek, 1000);
}