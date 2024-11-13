const products = [
  {
    id: 1,
    name: "Screwdriver",
    category: "Tools",
    price: 10.5,
    quantity: 150,
    dateAdded: new Date("2023-01-01"),
  },
  {
    id: 2,
    name: "Hammer",
    category: "Tools",
    price: 12.75,
    quantity: 120,
    dateAdded: new Date("2023-02-15"),
  },
  {
    id: 3,
    name: "Wrench",
    category: "Tools",
    price: 15.0,
    quantity: 200,
    dateAdded: new Date("2023-03-10"),
  },
  {
    id: 4,
    name: "Drill",
    category: "Power Tools",
    price: 55.0,
    quantity: 80,
    dateAdded: new Date("2023-05-25"),
  },
  {
    id: 5,
    name: "Nail Gun",
    category: "Power Tools",
    price: 90.0,
    quantity: 50,
    dateAdded: new Date("2023-06-30"),
  },
  {
    id: 6,
    name: "Saw",
    category: "Tools",
    price: 20.0,
    quantity: 100,
    dateAdded: new Date("2023-04-20"),
  },
  {
    id: 7,
    name: "Laser Cutter",
    category: "Machines",
    price: 500.0,
    quantity: 15,
    dateAdded: new Date("2023-07-15"),
  },
  {
    id: 8,
    name: "Band Saw",
    category: "Machines",
    price: 250.0,
    quantity: 25,
    dateAdded: new Date("2023-08-05"),
  },
];

// Sorting
function sortByPrice() {
  const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
  return sortedByPrice;
}

function sortByQuantity() {
  const sortedByQuantity = [...products].sort(
    (a, b) => b.quantity - a.quantity
  );
  return sortedByQuantity;
}

function sortByDate() {
  const sortedByDateAdded = [...products].sort(
    (a, b) => a.dateAdded - b.dateAdded
  );
  return sortedByDateAdded;
}

function sortProducts(criteria) {
  let sortedProducts = [];

  switch (criteria) {
    case "price":
      sortedProducts = sortByPrice();
      break;
    case "dateAdded":
      sortedProducts = sortByDate();
      break;
    case "quantity":
      sortedProducts = sortByQuantity();
      break;
    default:
      sortedProducts = products;
  }
  return sortedProducts;
}

//search product
function findProductsByCategory(category) {
  const toolsCategory = products.filter(
    (product) => product.category === category
  );
  return toolsCategory;
}

function findAffordableProducts(maxPrice) {
  const affordableProducts = products.filter(
    (product) => product.price < maxPrice
  );
  return affordableProducts;
}

function findProductByName(name) {
  const hammerProduct = products.filter((product) => product.name === name);
  return hammerProduct;
}

function findProductsByQuantity(minQuantity) {
  const highQuantityProducts = products.filter(
    (product) => product.quantity > minQuantity
  );
  return highQuantityProducts;
}

function searchProductByCriteria(criteria, value) {
  const messageSpan = document.getElementById("message");
  let filteredProducts = [];

  switch (criteria) {
    case "category":
      filteredProducts = findProductsByCategory(value);
      break;
    case "price":
      filteredProducts = findAffordableProducts(parseFloat(value));
      break;
    case "name":
      filteredProducts = findProductByName(value);
      break;
    case "quantity":
      filteredProducts = findProductsByQuantity(parseInt(value));
      break;
    default:
      messageSpan.textContent = "Invalid search criteria";
      return [];
  }

  return filteredProducts;
}

document.addEventListener("DOMContentLoaded", () => {
  const sortBtn = document.getElementById("sortBtn");
  sortBtn.addEventListener("click", () => {
    const criteria = document.getElementById("sort-criteria").value;
    let sortedProducts = sortProducts(criteria);
    displayProducts(sortedProducts);
  });

  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", () => {
    const searchCriteria = document.querySelector('input[name="sort"]:checked');
    const searchValue = document.getElementById("criteria").value;
    const messageSpan = document.getElementById("message");

    if (searchCriteria && searchValue) {
      const criteria = searchCriteria.value;
      const searchResults = searchProductByCriteria(criteria, searchValue);
      displayProducts(searchResults);
    } else if (filteredProducts.length === 0) {
      messageSpan.textContent = "No products found for the given criteria.";
    }
  });
});

function displayProducts(productArray) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  productArray.forEach((product) => {
    const liout = document.createElement("li");
    const formattedDate = product.dateAdded.toLocaleDateString("en-US");
    liout.textContent = `${product.name} - ${product.category} - ${product.price} - Quantity: ${product.quantity} - Date Added: ${formattedDate}`;
    productList.appendChild(liout);
  });
}
