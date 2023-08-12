function userlogin() {
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4')}`
    }
  })
}
function saveToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

function removeToken() {
  localStorage.removeItem('token');
}

function getAdminContent() {
  // Obtenir le bouton d'ouverture de modal
  var openModalButton = document.getElementById("ButtonopenModal");
  var btnopenModal = document.getElementById("openModalButton");
  // Vérifie si le token est dans localstorage + change affichage btn login
  if (getToken()) {

    var loginButton = document.getElementById('loginButton');
    if (loginButton) {
      loginButton.innerHTML = 'Logout';
      loginButton.addEventListener('click', logout);
    } else {
      console.log('Élément avec ID "loginButton" introuvable.');
    }
    document.getElementById('bandeau').style.display = "flex";

    // Affiche btn ouvrir modal
    if (openModalButton) {

    }
  } else {
    document.getElementById('bandeau').style.display = "none";

    // Cache le bouton d'ouverture de modal
    if (openModalButton) {
      openModalButton.style.display = "none";
    }
    if (btnopenModal) {
      btnopenModal.style.display = "none";
    }
  }

  // appel fonction filtre cacher ou non
  afficherFiltresSiDeconnecte();
}
// bouton de deconnexion 
function logout() {

  var openModalButton = document.getElementById("ButtonopenModal");

  // Code pour effectuer la déconnexion

  removeToken();
  document.getElementById('bandeau').style.display = "none";

  if (openModalButton) {
    openModalButton.style.display = "none";
  }

  afficherFiltresSiDeconnecte();
}


// vérifie l'état de connexion
window.addEventListener('load', getAdminContent);


var element = document.getElementById('login');
if (element) {
  element.setAttribute('href', '#');
}




function estUtilisateurConnecte() {
  // retourne true si l'utilisateur est connecté, false sinon
  return !!localStorage.getItem('token');
}

// fonction pour afficher ou cacher les filtres selon l'état de connexion
function afficherFiltresSiDeconnecte() {
  if (estUtilisateurConnecte()) {

    document.getElementById("filterContainer").style.display = "none";

  }
}
