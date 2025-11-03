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

// Nota: A causa della tua giovane età, ti consiglio di non includere un sistema di 
// login/database complesso. La raccolta delle proposte può avvenire tramite 
// un semplice link a un modulo esterno (Google Forms) per ragioni di sicurezza e gestione.
