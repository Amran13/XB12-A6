let cart = [];


const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};


const loadCategories = () => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/categories`)
    .then(res => res.json())
    .then(data => {
      displayCategories(data.categories)
      manageSpinner(false);
    })
  }
  
  const loadPlants = () => {
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then(res => res.json())
    .then(data => {
      displayPlants(data.plants)
      manageSpinner(false);
    })
  }
  
  const loadCategoryPlants = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCategoryPlants(data.plants)
      manageSpinner(false);
    });
};

const loadModalPlant = (id) => {
    manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
  .then(res => res.json())
  .then(data => {
    displayModal(data.plants)
      manageSpinner(false);
  })
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
  plantsContainer.setAttribute("class", "grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1  gap-6")
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
      <button onclick="addToCart(${plant.id})" class="btn btn-wide w-full rounded-full bg-green-600 text-white font-semibold">Add to Cart</button>
    </div>
</div>`
    plantsContainer.append(cardDiv)
  }
}


const addToCart = (id) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => {
      const plant = data.plants;

      const exist = cart.find(item => item.id === plant.id);

      if (exist) {
        exist.quantity += 1;
      } else {
        plant.quantity = 1;
        cart.push(plant);
      }

      displayCart();
      manageSpinner(false)
    });
};

const removeFromCart = (id) => {
  const updatedCart = cart
    .map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0);

  cart = updatedCart; 
  displayCart()
};

const displayCart = () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "bg-white p-3 rounded-lg shadow mb-3";

    div.innerHTML = `
      <div class="flex justify-between items-center">
        <div>
          <p class="font-bold text-green-700">${item.name}</p>
          <p>Price: ৳ ${item.price}</p>
        </div>

        <button onclick="removeFromCart(${item.id})"
        class="btn btn-error btn-sm">
          X
        </button>
      </div>
    `;

    cartContainer.appendChild(div);
  })


  const totalDiv = document.createElement("div");
  totalDiv.className = "bg-green-100 p-3 rounded-lg mt-3";

  totalDiv.innerHTML = `
    <p class="font-bold text-xl">Total: ৳ ${total}</p>
  `;

  cartContainer.appendChild(totalDiv);
}

const displayCategoryPlants = (plants) => {
  const plantsContainer = document.getElementById('plants-container')
  plantsContainer.setAttribute("class", "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6")
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
      <button  onclick="addToCart(${plant.id})" class="btn btn-wide w-full rounded-full bg-green-600 text-white font-semibold">Add to Cart</button>
    </div>
</div>`
    plantsContainer.append(cardDiv)
  }
}

const displayModal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => {
      const plant = data.plants;
      console.log(plant)
      const modal = document.getElementById('plant-modal')
      const closeModalButton = document.getElementById('close-modal')
      
      // Set modal content
      document.getElementById('modal-plant-name').textContent = plant.name
      document.getElementById('modal-plant-image').src = plant.image
      document.getElementById('modal-plant-description').textContent = plant.description
      document.getElementById('modal-plant-category').textContent = plant.category
      document.getElementById('modal-plant-price').textContent = `৳ ${plant.price}`

      modal.classList.remove('hidden')

      closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden')
      });

      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden')
        }
      })
    })
}


loadCategories()
loadPlants()