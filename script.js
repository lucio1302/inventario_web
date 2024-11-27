let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

function salvaInventario() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

function eseguiAzione() {
    let azione = document.getElementById('azione').value.toLowerCase();
    
    document.getElementById('input-articoli').style.display = 'none';
    document.getElementById('input-rimozione').style.display = 'none';
    document.getElementById('input-ricerca').style.display = 'none';

    if (azione === 'aggiungere') {
        document.getElementById('input-articoli').style.display = 'block';
    } else if (azione === 'rimuovere') {
        document.getElementById('input-rimozione').style.display = 'block';
    } else if (azione === 'cercare') {
        document.getElementById('input-ricerca').style.display = 'block';
    }
}

function aggiornaTabella() {
    let tbody = document.getElementById('articoli');
    tbody.innerHTML = '';
    inventario.forEach((articolo, index) => {
        let row = tbody.insertRow();
        row.insertCell(0).innerText = articolo;
        row.insertCell(1).innerText = ''; // Placeholder per colonna acquisto
        row.insertCell(2).innerText = ''; // Placeholder per colonna vendita
        row.insertCell(3).innerText = ''; // Placeholder per colonna listino
    });
}

function aggiungiArticolo() {
    let nomeArticolo = document.getElementById('nome-articolo').value;
    if (nomeArticolo) {
        inventario.push(nomeArticolo);
        aggiornaTabella();
        salvaInventario();
        document.getElementById('nome-articolo').value = '';
    }
}

function rimuoviArticolo() {
    let nomeArticolo = document.getElementById('nome-articolo-rimuovi').value;
    let index = inventario.indexOf(nomeArticolo);
    if (index !== -1) {
        inventario.splice(index, 1);
        aggiornaTabella();
        salvaInventario();
        document.getElementById('nome-articolo-rimuovi').value = '';
    } else {
        alert("L'articolo non è stato trovato.");
    }
}

function cercaArticolo() {
    let nomeArticolo = document.getElementById('nome-articolo-ricerca').value;
    let count = inventario.filter(articolo => articolo === nomeArticolo).length;
    if (count > 0) {
        alert(`L'articolo che stai cercando è presente ${count} volte nell'inventario.`);
    } else {
        alert("L'articolo non è presente nell'inventario.");
    }
}

document.addEventListener('DOMContentLoaded', aggiornaTabella);
