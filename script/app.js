console.log('hello wrold')


const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/categories`)
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

const loadPlants = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then(res => res.json())
    .then(data => displayPlants(data.plants))
}

const loadCategoryPlants = (id) => {
  //   manageSpinner(true);

  const url = `https://openapi.programming-hero.com/api/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryPlants(data.plants));
};


const loadModalPlant = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
  .then(res => res.json())
  .then(data => displayModal(data.plants))
}


const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('catogory-container')
  categoryContainer.innerHTML = ""
  for (category of categories) {
    const btnDiv = document.createElement("div")
    btnDiv.innerHTML = `
        <button id="category-${category.id}" onclick="loadCategoryPlants(${category.id})" class="btn btn-wide hover:bg-green-600 hover:text-white bg-green-50 border-none"> ${category.category_name} </button>
        `
    categoryContainer.append(btnDiv)
  }
}

const displayPlants = (plants) => {
  const plantsContainer = document.getElementById('plants-container')
  plantsContainer.setAttribute("class", "grid grid-cols-3 gap-6")
  plantsContainer.innerHTML = ""
  for (plant of plants) {
    const cardDiv = document.createElement("div")
    cardDiv.setAttribute("class", "card bg-base-100 w-[360px] h-[600px] shadow-sm")
    cardDiv.innerHTML = `
  <figure>
    <img class="w-96 h-96"
      src="${plant.image}"
      alt="Plant" />
  </figure>
  <div class="card-body space-y-2">
    <h2 id="plant-${plant.id}" onclick="displayModal(${plant.id})" class="card-title font-bold text-xl cursor-pointer">${plant.name}</h2>
    <p> ${plant.description} </p>
    <div class="flex justify-between items-center">
                    <div>
                    <span  class="bg-green-300 rounded-full p-2">${plant.category}</span>
                    </div>
                    <div>
                    <p class="text-xl font-bold">৳ ${plant.price}</p>
                    </div>
                </div>
    <div class="">
      <button class="btn btn-wide w-full rounded-full bg-green-600 text-white font-semibold">Add to Cart</button>
    </div>
</div>`
    plantsContainer.append(cardDiv)
  }
}


const displayCategoryPlants = (plants) => {
  const plantsContainer = document.getElementById('plants-container')
  plantsContainer.setAttribute("class", "grid grid-cols-3 gap-6")
  plantsContainer.innerHTML = ""
  for (plant of plants) {
    const cardDiv = document.createElement("div")
    cardDiv.setAttribute("class", "card bg-base-100 w-96 h-[600px] shadow-sm")
    cardDiv.innerHTML = `
  <figure>
    <img class="w-96 h-96"
      src="${plant.image}"
      alt="Plant" />
  </figure>
  <div class="card-body space-y-2">
    <h2 id="plant-${plant.id}" onclick="displayModal(${plant.id})" class="card-title font-bold text-xl cursor-pointer" class="card-title font-bold text-xl">${plant.name}</h2>
    <p> ${plant.description} </p>
    <div class="flex justify-between items-center">
                    <div>
                    <span  class="bg-green-300 rounded-full p-2">${plant.category}</span>
                    </div>
                    <div>
                    <p class="text-xl font-bold">৳ ${plant.price}</p>
                    </div>
                </div>
    <div class="">
      <button class="btn btn-wide w-full rounded-full bg-green-600 text-white font-semibold">Add to Cart</button>
    </div>
</div>`
    plantsContainer.append(cardDiv)
  }
}

const displayModal = (id) => {
  // Fetch plant data by ID
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => {
      const plant = data.plants; // Assuming the API returns an array of plants
      console.log(plant)
      // Get modal elements
      const modal = document.getElementById('plant-modal');
      const closeModalButton = document.getElementById('close-modal');
      
      // Set modal content
      document.getElementById('modal-plant-name').textContent = plant.name;
      document.getElementById('modal-plant-image').src = plant.image;
      document.getElementById('modal-plant-description').textContent = plant.description;
      document.getElementById('modal-plant-category').textContent = plant.category;
      document.getElementById('modal-plant-price').textContent = `৳ ${plant.price}`;

      // Show modal by removing 'hidden' class
      modal.classList.remove('hidden');

      // Close modal when the close button is clicked
      closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
      });

      // Optionally, close the modal when clicking outside of it
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });
}


loadCategories()
loadPlants()