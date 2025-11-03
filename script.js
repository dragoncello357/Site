/**
 * Funzione per mostrare o nascondere la proposta di riforma
 * @param {string} sezioneId - L'ID della sezione (es. 'salari' o 'burocrazia')
 */
function mostraProposta(sezioneId) {
    // Costruisce l'ID del div che contiene la proposta (es. 'proposta-salari')
    const propostaDiv = document.getElementById('proposta-' + sezioneId);
    
    // Controlla lo stato attuale del div
    if (propostaDiv.style.display === 'block') {
        // Se è visibile, nascondilo
        propostaDiv.style.display = 'none';
        // Aggiorna il testo del bottone
        document.querySelector(`#${sezioneId} .cta-button`).textContent = 'Vedi Proposta di Riforma';
    } else {
        // Se è nascosto, rendilo visibile
        propostaDiv.style.display = 'block';
        // Aggiorna il testo del bottone
        document.querySelector(`#${sezioneId} .cta-button`).textContent = 'Nascondi Proposta';
    }
}

// La funzione 'mostraProposta' rimane invariata nel file script.js

/**
 * Funzione per generare il PDF dinamico con i dati dell'utente.
 * Utilizza html2canvas per trasformare il contenuto HTML in un'immagine e jspdf per creare il PDF.
 */// La funzione 'generaPDF' in script.js deve essere modificata così:
function generaPDF() {
    // 1. Raccogli i dati dal modulo
    const nome = document.getElementById('nomeUtente').value.trim();
    const email = document.getElementById('emailUtente').value.trim();
    const proposta = document.getElementById('propostaUtente').value.trim() || 'Nessuna proposta specifica aggiunta.';
    const consenso = document.getElementById('consensoPubblicazione');

    if (!nome) {
        alert("Per generare il documento, il campo 'Nome e Cognome' è obbligatorio.");
        return;
    }
    
    if (!consenso.checked) {
        alert("Devi accettare la clausola di consenso per poter generare il documento.");
        return;
    }

    // 2. Inserisci i dati raccolti nel div nascosto destinato al PDF
    document.getElementById('pdfNome').textContent = nome;
    document.getElementById('pdfFirmaNome').textContent = nome;
    document.getElementById('pdfEmail').textContent = email || 'Non fornita';
    document.getElementById('pdfProposta').textContent = proposta;

    const content = document.getElementById('pdfContent');

    // 3. Usa html2canvas per renderizzare il div come immagine
    const { jsPDF } = window.jspdf;

    content.style.display = 'block';

    html2canvas(content, { 
        scale: 2, 
        useCORS: true 
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        // 4. Salva il PDF
        pdf.save(`Adesione_Riforma_${nome.replace(/\s/g, '_')}.pdf`);

        content.style.display = 'none';
    });
}

// Aggiunto stile per la casella di consenso
.consent-checkbox {
    text-align: left;
    display: flex;
    align-items: flex-start;
    font-size: 0.9em;
}

.consent-checkbox input {
    margin-right: 10px;
    margin-top: 3px; /* Allinea il checkbox con la label */
}

// Nota: A causa della tua giovane età, ti consiglio di non includere un sistema di 
// login/database complesso. La raccolta delle proposte può avvenire tramite 
// un semplice link a un modulo esterno (Google Forms) per ragioni di sicurezza e gestione.
