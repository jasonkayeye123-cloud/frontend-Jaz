// On attend que la page soit complètement chargée
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sélection du formulaire (assure-toi que ton <form> dans le HTML a id="contact-form")
    const form = document.getElementById('contact-form');

    if (!form) {
        console.error("Erreur : Le formulaire avec l'ID 'contact-form' est introuvable dans le HTML.");
        return;
    }

    // 2. Écoute de l'événement de soumission
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche la page de se recharger

        // 3. Récupération des éléments HTML
        const inputNom = document.getElementById('nom');
        const inputEmail = document.getElementById('email');
        const inputMessage = document.getElementById('message');

        // Double vérification de la présence des champs pour éviter l'erreur 'null'
        if (!inputNom || !inputEmail || !inputMessage) {
            alert("Erreur : Un ou plusieurs champs du formulaire (nom, email ou message) sont introuvables dans le HTML.");
            return;
        }

        // Extraction des valeurs
        const data = {
            nom: inputNom.value.trim(),
            email: inputEmail.value.trim(),
            message: inputMessage.value.trim()
        };

        // 4. Envoi des données au serveur Render
        try {
            const response = await fetch('https://portfolio-backend-9e0e.onrender.com/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Message envoyé avec succès !");
                form.reset(); // Vide les champs du formulaire après succès
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert(`Erreur lors de l'envoi : ${errorData.message || response.statusText}`);
            }

        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Impossible de contacter le serveur. Vérifie ta connexion internet.");
        }
    });
});