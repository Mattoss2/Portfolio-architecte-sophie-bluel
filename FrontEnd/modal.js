var openModalButton = document.getElementById("ButtonopenModal");
var modal1 = document.getElementById("modal");
var modal2 = document.getElementById("modal2");
var closeButton = document.getElementsByClassName("close")[0];
var btnAjouterPhoto = document.getElementById("btnAjouterPhoto");
var isModal1Open = false;
var isModal2Open = false;
var returnbtn= document.getElementById("returnbtn");
var closebtn= document.getElementById("closebtn");



closeButton.addEventListener("click", function(event) {
  event.stopPropagation();
  closeModal1();
});

openModalButton.addEventListener("click", function() {
  if (!isModal1Open) {
    openModal1();
  }
});

function openModal1() {
  modal1.style.display = "block";
  logJSONDataModal();
  isModal1Open = true;
  isModal2Open = false; // modal 2 fermée lorsque la 1 s'ouvre
  modal2.style.display = "none"; // Cacher la modal2 lorsque la modal1 s'ouvre
}

function closeModal1() {
  modal1.style.display = "none";
  isModal1Open = false;
  clearGallery();
}


function closeModal2() {
  modal2.style.display = "none  ";
  isModal2Open = false;
  
}

btnAjouterPhoto.addEventListener("click", function() {
  if (!isModal2Open) {
    
    openModal2();
    modal2.style.display = "block  ";
    closeModal1();
  }
});

function clearGallery() {
  const gallery = document.querySelector(".modal-body");
  gallery.innerHTML = ""; // Effacer le contenu de la galerie
}

document.addEventListener("DOMContentLoaded", function () {
  const returnBtn = document.querySelector(".returnbtn");
  const closeBtn = document.querySelector(".closebtn");

  returnBtn.addEventListener("click", function () {
    closeModal2(); // Ferme la modal2 si elle est ouverte
    openModal1();
  });


  // Ajouter un gestionnaire d'événement pour le bouton de fermeture du modal
  closeBtn.addEventListener("click", function () {
    closeModal1();
    closeModal2();
    // Code pour fermer le modal ici
    
  });
});




async function logJSONDataModal() {
  const response = await fetch("http://localhost:5678/api/works");
  const jsonData = await response.json();
  console.log(jsonData);
  addWorkModal(jsonData);
}

function addWorkModal(data) {
  const gallery = document.querySelector(".modal-body");

  // Ajouter les travaux dynamiques
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const figure = document.createElement("figure");
    figure.dataset.categoryId = item.categoryId;

    const img = document.createElement("img");
    img.src = item.imageUrl;

    const titre = document.createElement("figcaption");
    titre.innerHTML = "éditer";
    figure.appendChild(img);
    figure.appendChild(titre);
    gallery.appendChild(figure);

    // Créer la boîte pour les icônes
    const iconBox = document.createElement("div");
    iconBox.classList.add("icon-box");

    // Ajouter l'icône "fa-trash-can" à tous les travaux
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    deleteIcon.addEventListener("click", supprimerElement); // Ajouter l'event listener pour la suppression
    iconBox.appendChild(deleteIcon);

    // Ajouter l'icône "fa-arrows-up-down-left-right" et "fa-times" au premier travail
    if (i === 0) {
      const iconUpDown = document.createElement("i");
      iconUpDown.classList.add("fa-solid", "fa-arrows-up-down-left-right");
      iconBox.appendChild(iconUpDown);

      // Déplacer l'icône "fa-trash-can" après l'icône "fa-arrows-up-down-left-right"
      iconBox.appendChild(deleteIcon);
    }

    figure.appendChild(iconBox);
  }
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
  fetch('http://localhost:5678/api/works/id', { 
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response);
    if (response.ok) {
      // Supprimer l'élément de la modal
      const iconBox = document.querySelector(".icon-box");
      const figure = iconBox.closest("figure");
      const gallery = figure.parentNode;
      gallery.removeChild(figure);
      
      console.log('Le travail a été supprimé avec succès.');
    } else {
      console.error('La suppression du travail a échoué.');
    }
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la suppression du travail.', error);
  });
}

// Ajouter cet élément à votre code HTML pour identifier le bouton "Ajouter une photo"




function openModal2() {
  // Ajoutez ici le code pour ouvrir votre deuxième modal
  console.log("Ouvrir la deuxième modal");
}



//code pour le menu déroulant de la modal
//code pour ajouter les catégories
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById('categorie');
    data.forEach(category => {
      const option = document.createElement('option');
      option.value = category.categoryId;
      option.text = category.name;
      select.add(option);
    });
  })
  .catch(error => console.error('Erreur:', error));

//code pour ajouter un nouveau projet
document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          document.getElementById('addPhotoContainer').appendChild(img);
      };
      reader.readAsDataURL(file);
  }
});

  const nom = document.getElementById('nom').value;
  const categoryId = document.getElementById('categorie').value;
  const fichier = document.getElementById('fichier').files[0];

  const formData = new FormData();
  formData.append('nom', nom);
  formData.append('categoryId', categoryId);
  formData.append('fichier', fichier);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MDM4OTIxOSwiZXhwIjoxNjkwNDc1NjE5fQ.zRx1GcxrmvMy1VtcWUWLKGwW4u01ZcVMwEEKKFEOecs"; 

  fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${token}`
      },
      body: formData,
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      addProjectToGallery(data);
      addProjectToModal(data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });


function addProjectToGallery(project) {
  
}

function addProjectToModal(project) {
  
}