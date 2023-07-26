function saveToken() {
  fetch('http://localhost:5678/api/users/login', { 
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4OTc3MzMxMCwiZXhwIjoxNjg5ODU5NzEwfQ.gc9mgtmi727KdKfhLRDVzDGUJqcicflvkR7hSp-Z3Qk')}`
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
  // Vérifier si le token existe dans le localStorage
  if (getToken()) {
    // Le token est présent, donc l'utilisateur est connecté
    // Changer l'affichage du bouton login en bouton logout
    var loginButton = document.getElementById('loginButton');
    if (loginButton) {
      loginButton.innerHTML = 'Logout';
      loginButton.addEventListener('click', logout);
    } else {
      console.log('Élément avec ID "loginButton" introuvable.');
    }
  }
}

function logout() {
  // Code pour effectuer la déconnexion
  
  // Supprimer le token du localStorage
  removeToken();
}

// Appeler la fonction getAdminContent pour vérifier l'état de connexion lors du chargement de la page
window.addEventListener('load', getAdminContent);


var element = document.getElementById('login');
if (element) {
  element.setAttribute('href', '#');
}
    // ajouter bouton modifier quand login 
    // quand logout  les fonctions sont hidden et quand login les fonctions sont display par défaut




//finir de déclarer et d'appeler la fonction.

