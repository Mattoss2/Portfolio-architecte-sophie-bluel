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



	});
};



async function logCategoriesData() {
	const response = await fetch("http://localhost:5678/api/categories");
	const jsonData = await response.json();
	console.log(jsonData);
	addFilters(jsonData);
	console.log(addFilters)
};

logCategoriesData();
function addFilters(Data) {

	const categoryFilter = document.getElementById("category-filter");

	Data.forEach(item => {

		const button = document.createElement("button")

		button.value = item.id;
		button.textContent = item.name;
		categoryFilter.appendChild(button);
		

		
			button.addEventListener("click", () => {
				const category = button.value;
			const filteredWorks= Data.filter(work=> work.category=== category);
			button.value =item.id;
			
			addWork(filteredWorks);

			
				console.log(category);
			})
		})

	}
