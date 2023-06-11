document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  // Récupérer les valeurs des champs de texte
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Effectuer des opérations de connexion ici, comme la validation des données

  // Créer une requête POST
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5678/api-docs/#/default/post_works", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.authenticated) {
          // Rediriger vers la page d'accueil
          window.location.href = "FrontEnd/login.html";
        } else {
          // Combinaison incorrecte, afficher un message d'erreur
          document.getElementById("errorMessage").textContent = "Combinaison utilisateur-mot de passe incorrecte !";
        }
      } else {
        // Erreur de la requête
        console.error("Erreur de la requête:", xhr.status, xhr.statusText);
      }
    }
  };
  var data = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
  xhr.send(data);
});