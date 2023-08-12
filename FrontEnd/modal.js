var openModalButton = document.getElementById("ButtonopenModal");
var modal1 = document.getElementById("modal");
var modal2 = document.getElementById("modal2");
var closeButton = document.getElementsByClassName("close")[0];
var btnAjouterPhoto = document.getElementById("btnAjouterPhoto");
var isModal1Open = false;
var isModal2Open = false;

// Écouteurs d'événements modal
closeButton.addEventListener("click", function (event) {
  event.stopPropagation();
  closeModal1();
});

openModalButton.addEventListener("click", function () {
  if (!isModal1Open) {
    openModal1();
  }
});

btnAjouterPhoto.addEventListener("click", function () {
  if (!isModal2Open) {
    openModal2();
    modal2.style.display = "block ";
    closeModal1();
  }
});

function openModal1() {
  modal1.style.display = "block";
  logJSONDataModal();
  isModal1Open = true;
  isModal2Open = false; 
  modal2.style.display = "none"; // Cacher la modal2 lorsque la modal1 s'ouvre
}

function closeModal1() {
  modal1.style.display = "none";
  isModal1Open = false;
  clearGallery();
}

function closeModal2() {
  modal2.style.display = "none";
  isModal2Open = false;
}

function clearGallery() {
  const gallery = document.querySelector(".modal-body");
  gallery.innerHTML = ""; 
}

document.addEventListener("DOMContentLoaded", function () {
  const returnBtn = document.querySelector(".returnbtn");
  const closeBtn = document.querySelector(".closebtn");

  returnBtn.addEventListener("click", function () {
    closeModal2(); // 
    openModal1();
  });

  // Ajouter un gestionnaire d'événement pour le bouton de fermeture du modal
  closeBtn.addEventListener("click", function () {
    closeModal1();
    closeModal2();
   
  });
});

function openModal2() {
  
}


async function logJSONDataModal() {
  const response = await fetch("http://localhost:5678/api/works");
  const jsonData = await response.json();
  
  allWorks = jsonData; // met à jour la variable all Works.
  addWorkModal(jsonData);
}
// Ajouter les travaux dynamiques + icônes
function addWorkModal(data) {
  const gallery = document.querySelector(".modal-body");
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const figure = document.createElement("figure");
    figure.dataset.categoryId = item.categoryId;

    const img = document.createElement("img");
    img.src = item.imageUrl;

    figure.id = item.id;

    const titre = document.createElement("figcaption");
    titre.innerHTML = "éditer";
    figure.appendChild(img);
    figure.appendChild(titre);

    const iconBox = document.createElement("div");
    iconBox.classList.add("icon-box");

    
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    deleteIcon.addEventListener("click", (event) => {
      event.preventDefault(); 

      // Supprimer l'élément de la liste
      allWorks = allWorks.filter(work => work.id !== item.id);

      // Appeler la fonction pour supprimer l'élément du côté serveur
      supprimerElement(item.id);
    });
    iconBox.appendChild(deleteIcon);

    
    if (i === 0) {
      const iconUpDown = document.createElement("i");
      iconUpDown.classList.add("fa-solid", "fa-arrows-up-down-left-right");
      iconBox.appendChild(iconUpDown);

      iconBox.appendChild(deleteIcon);
    }
    figure.appendChild(iconBox);
    gallery.appendChild(figure);
  }
}

async function getAllWorkIds() {
  const response = await fetch('http://localhost:5678/api/works', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch works');
  }
  const works = await response.json();
  return works.map(work => work.id);
}

document.addEventListener('DOMContentLoaded', function () {
  var btnSupprimer = document.getElementById('btnSupprimer');
  btnSupprimer.addEventListener('click', async function (event) {
    event.preventDefault();  

    // Obtenir tous les identifiants des travaux et Supprimer chaque travail
    const workIds = await getAllWorkIds();

    for (let id of workIds) {
      supprimerElement(id);
    }
  
    clearGallery();

  });
});

function supprimerElement(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => {
      if (response.ok) {
        // Supprimer l'élément du tableau 'allWorks'

        // Supprimer l'élément de la modal
        const figure = document.getElementById(id);
        if (figure) {
          figure.parentNode.removeChild(figure);
        }

        console.log('Le travail a été supprimé avec succès.');
      } else {
        console.error('La suppression du travail a échoué.');
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la suppression du travail.', error);
    });
}


// menu déroulant de la modal

document.addEventListener('DOMContentLoaded', function () {
  fetchCategories();
});

// Fonction pour récupérer les catégories et remplir le menu déroulant avec les données 
async function fetchCategories() {
  const response = await fetch('http://localhost:5678/api/categories');
  const data = await response.json();

  const categorieSelect = document.getElementById('categorie');
  if (categorieSelect) {
    
    data.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id; 
      option.text = category.name;
      categorieSelect.add(option);
    });
  } else {
    console.error("L'élément de sélection de la catégorie n'a pas été trouvé");
  }
}
// Bouton "Ajouter photo+selection fichier"
document.getElementById('btnnewphoto').addEventListener('click', function () {
  document.getElementById('fileInput').click();
});

// Gérez la sélection du fichier dans l'écouteur d'événements 'change' sur le champ de fichier 'fileInput'
document.getElementById('fileInput').addEventListener('change', function (e) {
  const fileInput = document.getElementById('fileInput');
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Masquer le contenu de la div 'addphoto-container' et créé l'image + l'ajoute
        const addPhotoContainer = document.getElementById('addphoto-container');
        for (let i = 0; i < addPhotoContainer.children.length; i++) {
          addPhotoContainer.children[i].style.display = 'none';
        }
        const img = document.createElement('img');
        img.src = e.target.result;
        addPhotoContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  }
});

// Bouton "Valider"

document.getElementById('button2').addEventListener('click', function (event) {
  event.preventDefault();
  
  const title = document.getElementById('title').value;
  const categoryId = document.getElementById('categorie').value;
  const fichier = document.getElementById('fileInput');

  // Vérifier si un fichier a été sélectionné
  if (fichier.files && fichier.files.length > 0) {
    const fileInput = fichier.files[0];

    if (!title || !categoryId || !fileInput) {
      alert("Veuillez remplir tous les champs et sélectionner une image");
      return;
    }
  }

  // Créer un objet FormData pour les données du formulaire + envoi requete post
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', categoryId);
  formData.append('image', document.getElementById('fileInput').files[0]);
 
 
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      addProjectToGallery(data);
      addProjectToModal(data);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
});
// ajout du nouveau projet et de ses données dans la galerie
function addProjectToGallery(project) {
  
  let newImg = document.createElement('img');

  newImg.src = project.imageUrl;

  newImg.classList.add('gallery-image');

  document.getElementById('gallery').appendChild(newImg);
}
// nouveau projet+data dans la modal 
function addProjectToModal(project) {
  
  let modal = document.getElementById('modal2');

  modal.querySelector('#title').value = project.title;

  modal.querySelector('#categorie').value = project.categoryId;

  modal.querySelector('#fileInput').value = project.imageUrl;

  modal.style.display = "block";
}