console.log('hello wrold')


const loadCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/categories`)
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}



const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('catogory-container')
    categoryContainer.innerHTML = ""
    for(category of categories){
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button class="btn btn-wide hover:bg-green-600 hover:text-white bg-green-50 border-none"> ${category.category_name} </button>
        `
        categoryContainer.append(btnDiv)
    }
}


loadCategories()