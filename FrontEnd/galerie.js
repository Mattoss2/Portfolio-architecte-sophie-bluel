async function logJSONData() {
	const response = await fetch("http://localhost:5678/api/works");
	const jsonData = await response.json();
	console.log(jsonData);
	addWork(jsonData);
};
logJSONData();

function addWork(data) {
	const gallery = document.getElementById("gallery");




	data.forEach(item => {
		const figure = document.createElement("figure");
		const img = document.createElement("img");
		const titre = document.createElement("figcaption");

		img.src = item.imageUrl;
		titre.innerHTML = item.title;
		
		figure.appendChild(img);
		figure.appendChild(titre);
		gallery.appendChild(figure);
		 
  
	

	
		})
	}


	const categoryButtons = document.querySelectorAll(".category-button");
	categoryButtons.forEach(button => {
		button.addEventListener("click", () => {
		  const category = button.dataset.category;
	  console.log(category);
		})
	  })

	  async function logJSONData() {
		const response = await fetch("http://localhost:5678/api/categories");
		const jsonData = await response.json();
		console.log(jsonData);
		addWork(jsonData);
		console.log(addWork)
	  };

	
;
