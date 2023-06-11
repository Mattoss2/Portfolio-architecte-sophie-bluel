let allWorks = []; // Variable pour stocker tous les travaux initiaux

async function logJSONData() {
  const response = await fetch("http://localhost:5678/api/works");
  const jsonData = await response.json();
  console.log(jsonData);
  allWorks = jsonData; // Sauvegarder les travaux initiaux
  addWork(jsonData);
}

function addWork(data) {
	const gallery = document.getElementById("gallery");

  
	data.forEach(item => {
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
  console.log(categoriesData);
  categoriesData.unshift({
    "id": 0,
    "name": "Tous"
  });
  
  console.log(categoriesData);
  addFilters(categoriesData);
}



function addFilters(categoriesData) {
  const filterContainer = document.getElementById("filterContainer");
  console.log(filterContainer)
  categoriesData.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.onclick = () => filter(category.id);
    filterContainer.appendChild(button);
  });
}

function filter(categoryId) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ""; // Vider la galerie

  const filteredWorks = allWorks.filter(work => work.categoryId === categoryId);
  
  if (categoryId == 0){
    addWork(allWorks);
  }   
  addWork(filteredWorks);
  
 
  
  
  

}

logJSONData();
logCategoriesData();