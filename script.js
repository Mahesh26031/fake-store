const form= document.getElementById('filter-select')
const productList = document.querySelector("#product-list");
const ratingFilter = document.querySelector("#rating-filter");
const categoryFilter = document.querySelector("#category-filter");
const orderBy = document.querySelector("#order-by");
const searchInput = document.querySelector("#search-input");
let productsArray = [];

fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(products => {
    productsArray = products;
    displayProducts(products);
    
  });

function displayProducts(products) {
    productList.innerHTML = "";
    products.forEach(product => {
      const productCard = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p class="price">Price: $${product.price}</p>
          <p class="rating-rate">Rating: ${product.rating.rate}</p>
          <p class="count">Category: ${product.category}</p>
        </div>
      `;
    productList.innerHTML += productCard;
    });

}


form.addEventListener("submit", function(event){

  event.preventDefault();
  let filteredProducts = productsArray
          
  const selectedRating = ratingFilter.value;
  const selectedCategory = categoryFilter.value;
  const searchInputvalue = searchInput.value;
  const order = orderBy.value

  if (selectedRating === "" && selectedCategory === "" && order === "" && searchInputvalue === "") {
    displayProducts(productsArray);
    return;
  } 

  if(selectedRating!==""){
    filteredProducts = filteredProducts.filter(
        product => product.rating.rate >= selectedRating
      );

    displayProducts(filteredProducts);
  }

  if (selectedCategory !== "") {
    filteredProducts = filteredProducts.filter(
      product => product.category === selectedCategory
    );
  displayProducts(filteredProducts);
  }

  if(order!==""){
    if (order === "asc") {
      filteredProducts = filteredProducts.sort((a, b) => a.rating.rate - b.rating.rate);
    } else {
      filteredProducts = filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }
    displayProducts(filteredProducts);
  }

  if(searchInputvalue!=="")
  {
    console.log(filteredProducts)
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchInputvalue.toLowerCase())
    );
    displayProducts(filteredProducts);

  }


 
});




