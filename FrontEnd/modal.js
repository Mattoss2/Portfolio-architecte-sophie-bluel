var openModalButton = document.getElementById("ButtonopenModal");
var modal = document.getElementById("modal");
var closeButton = document.getElementsByClassName("close")[0];
var isModalOpen = false; // Variable de statut pour suivre l'état de la modal

openModalButton.addEventListener("click", function() {
  if (!isModalOpen) {
    openModal();
  }
});

closeButton.addEventListener("click", function(event) {
  event.stopPropagation(); // Empêcher la propagation de l'événement de clic
  closeModal();
});

window.addEventListener("click", function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

async function openModal() {
  modal.style.display = "block";
  logJSONDataModal();
  isModalOpen = true;
}

function closeModal() {
  modal.style.display = "none";
  isModalOpen = false;
  clearGallery(); // Effacer les travaux de la modal lors de la fermeture
}

async function logJSONDataModal() {
  const response = await fetch("http://localhost:5678/api/works");
  const jsonData = await response.json();
  console.log(jsonData);
  addWorkModal(jsonData);
}

function addWorkModal(data) {
  const gallery = document.querySelector(".modal-body");

  data.forEach(item => {
    const figure = document.createElement("figure");
    figure.dataset.categoryId = item.categoryId;

    const img = document.createElement("img");
    img.src = item.imageUrl;

    const titre = document.createElement("figcaption");
    titre.innerHTML = "éditer";

    figure.appendChild(img);
    figure.appendChild(titre);
    gallery.appendChild(figure);
  });
}

function clearGallery() {
  const gallery = document.querySelector(".modal-body");
  gallery.innerHTML = ""; // Effacer le contenu de la galerie
}



document.addEventListener('DOMContentLoaded', function() {
  var btnSupprimer = document.getElementById('btnSupprimer');
  btnSupprimer.addEventListener('click', supprimerElement);
});



function supprimerElement() {
  fetch('http://localhost:5678/api/works/3', { 
    method: 'DELETE',
    headers: {
      Autorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4ODE0MDAwNCwiZXhwIjoxNjg4MjI2NDA0fQ.b9RQAjIGJG_vgqRvGmae08CiP97UouCp_ZQ4nBsYp90`
    }
  })
  .then(response => {
    console.log(response);
    if (response.ok) {
      
      console.log('La galerie a été supprimée avec succès.');
    } else {
      console.error('La suppression de la galerie a échoué.');
    }
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la suppression de la galerie.', error);
  });
}