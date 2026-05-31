const form = document.querySelector('form'); // Remplace par l'id de ton formulaire si besoin
const responseMessage = document.getElementById('form-response');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. On récupère les valeurs des champs
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        // 2. Envoi des données au serveur local
        const response = await fetch('https://portfolio-backend-9e0e.onrender.com/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nom, email, message })
});

        const result = await response.json();

        // 3. On affiche le résultat de manière stylée à l'écran
        responseMessage.style.display = "block"; // On affiche le paragraphe

        if (response.ok) {
            // Succès ! Texte vert
            responseMessage.style.color = "#22c55e"; 
            responseMessage.textContent = "🚀 Génial ! Ton message a été envoyé avec succès, bro !";
            form.reset(); // Supprime les textes saisis dans les cases pour vider le formulaire
        } else {
            // Erreur renvoyée par le serveur. Texte rouge
            responseMessage.style.color = "#ef4444";
            responseMessage.textContent = result.error || "Oups, une erreur est survenue.";
        }

    } catch (error) {
        // Erreur réseau (ex: serveur éteint). Texte rouge
        responseMessage.style.display = "block";
        responseMessage.style.color = "#ef4444";
        responseMessage.textContent = "❌ Impossible de joindre le serveur. Vérifie s'il est bien allumé !";
    }
});