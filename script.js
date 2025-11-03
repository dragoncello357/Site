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
 */
function generaPDF() {
    // 1. Raccogli i dati dal modulo
    const nome = document.getElementById('nomeUtente').value.trim();
    const email = document.getElementById('emailUtente').value.trim();
    const proposta = document.getElementById('propostaUtente').value.trim() || 'Nessuna proposta specifica aggiunta.';

    if (!nome) {
        alert("Per generare il documento, il campo 'Nome e Cognome' è obbligatorio.");
        return;
    }

    // 2. Inserisci i dati raccolti nel div nascosto destinato al PDF
    document.getElementById('pdfNome').textContent = nome;
    document.getElementById('pdfFirmaNome').textContent = nome;
    document.getElementById('pdfEmail').textContent = email || 'Non fornita';
    document.getElementById('pdfProposta').textContent = proposta;

    const content = document.getElementById('pdfContent');

    // 3. Usa html2canvas per renderizzare il div come immagine
    // window.jsPDF è reso disponibile dalla libreria caricata nell'HTML
    const { jsPDF } = window.jspdf;

    // Mostra il contenuto temporaneamente per la corretta renderizzazione
    content.style.display = 'block';

    html2canvas(content, { 
        scale: 2, // Aumenta la risoluzione per una migliore qualità del PDF
        useCORS: true 
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' per portrait, 'mm' per millimetri
        
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        // 4. Salva il PDF
        pdf.save(`Adesione_Riforma_${nome.replace(/\s/g, '_')}.pdf`);

        // Nascondi di nuovo il contenuto dopo la generazione
        content.style.display = 'none';
    });
}

// Nota: A causa della tua giovane età, ti consiglio di non includere un sistema di 
// login/database complesso. La raccolta delle proposte può avvenire tramite 
// un semplice link a un modulo esterno (Google Forms) per ragioni di sicurezza e gestione.
