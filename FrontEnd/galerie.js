let allWorks = []; // Variable pour stocker tous les travaux initiaux

async function logJSONData() {
  const response = await fetch("http://localhost:5678/api/works");
  const jsonData = await response.json();
  
  allWorks = jsonData; // Sauvegarder les travaux initiaux
  addWork(jsonData);
}

function addWork(data) {
  const gallery = document.getElementById("gallery");
 
  data.forEach((item) => {
    const figure = document.createElement("figure");
    figure.dataset.categoryId = item.categoryId;
    const img = document.createElement("img");
    img.src = item.imageUrl;
    const titre = document.createElement("figcaption");
    titre.innerHTML = item.title;
    figure.appendChild(img);
    figure.appendChild(titre);
    gallery.appendChild(figure);
  });
}


async function logCategoriesData() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categoriesData = await response.json();

  categoriesData.unshift({
    "id": 0,
    "name": "Tous"
  });

  addFilters(categoriesData);
}



function addFilters(categoriesData) {
  const filterContainer = document.getElementById("filterContainer");
  
  categoriesData.forEach((category, index) => {
    const button = document.createElement("button");
    button.classList.add("filter");  // Ajout classe filtre au btn 

    // Ajout classe active filtre sur click 
    if (index === 0) {
      button.classList.add('active');
    }

    button.textContent = category.name;
    button.onclick = () => {
      // Retirer la classe 'active' de tous les filtres
      document.querySelectorAll(".filter").forEach((filter) => {
        filter.classList.remove("active");
      });

      button.classList.add('active');

      filter(category.id);
    };
    filterContainer.appendChild(button);
  });

  // Filtrer par la première catégorie (Tous) par défaut
  filter(0);
}



function filter(categoryId) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ""; 

  const filteredWorks = allWorks.filter((work) => work.categoryId === categoryId);

  if (categoryId == 0) {
    addWork(allWorks);
  }
  addWork(filteredWorks);






}

logJSONData();
logCategoriesData();