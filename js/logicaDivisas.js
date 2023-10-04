const dolaresInput = document.getElementById('dolares');
const convertirBtn = document.getElementById('convertirBtn');
const bitcoinInput = document.getElementById('bitcoin');
const colonesInput = document.getElementById('colones');
const price = document.createElement('span');
let bitcoinPriceLoaded = false; 

function convertir() {
    if (!bitcoinPriceLoaded) {
        alert('Espere un momento para cargar el precio de Bitcoin.');
        return;
    }
    const dolares = parseFloat(dolaresInput.value);
    if (isNaN(dolares) || dolares < 0) {
        dolaresInput.classList.add('is-invalid'); 
        return;
    } else {
        dolaresInput.classList.remove('is-invalid'); 
    }
    const precioBitcoin = parseFloat(price.innerHTML);
    if (isNaN(precioBitcoin)) {
        alert('El precio de Bitcoin no es válido. Intente nuevamente más tarde.');
        return;
    }
    const bitcoin = dolares / precioBitcoin;
    //1 dólar = 8.77 colones
    const colones = dolares * 8.77;
    // los decimales que quiero mostar
    bitcoinInput.value = bitcoin.toFixed(8); 
    colonesInput.value = colones.toFixed(2); 
}
convertirBtn.addEventListener('click', convertir);
const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcbusd@trade');

ws.onmessage = (event) => {
    const stockObject = JSON.parse(event.data);
    price.innerHTML = stockObject.p;
    bitcoinPriceLoaded = true;
    convertir();
}