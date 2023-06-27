
  var openModalButton = document.getElementById("ButtonopenModal");
  var modal = document.getElementById("modal");
  var closeButton = document.getElementsByClassName("close")[0];

  openModalButton.addEventListener("click", function() {
    modal.style.display = "block";
  
  logJSONDataModal();
  
  });

  closeButton.addEventListener("click", function() {
    modal.style.display = "none";
  });

  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
    
  });

  async function logJSONDataModal() {
    const response = await fetch("http://localhost:5678/api/works");
    const jsonData = await response.json();
    console.log(jsonData);
    allWorks = jsonData; // Sauvegarder les travaux initiaux
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

    // pour supprimer du travail faire un appel à l'api avec la route liée à la suppressio des travaux 