//addAProduct
let products = [
  { id: 1, name: "iPhone", price: 3000 },
  { id: 2, name: "Samsung", price: 5000 },
  { id: 3, name: "Realme", price: 8000 },
];
const addproducts = (product) => {
  const message = document.getElementById("product-message");

  // Input validation
  if (!product.id || !product.name || !product.price) {
    message.textContent = "Please provide all the inputs to add a product.";
    return false;
  }
  if (products.find((i) => i.id == product.id)) {
    message.textContent = `Product with ID ${product.id} already exists.`;
    return false;
  }

  // Add product to the list
  products.push(product);
  message.textContent = "Product Added Successfully!";
  return true;
};

//view products
function viewProducts(productArray) {
  const productTableBody = document.querySelector("#view-products tbody");
  productTableBody.innerHTML = "";

  productArray.forEach((product) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = product.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    const priceCell = document.createElement("td");
    priceCell.textContent = product.price;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);

    productTableBody.appendChild(row);
  });
}

// Update Product
const updateproducts = (productid) => {
  const curname = document.querySelector('input[name="product-name"]').value;
  const curprice = document.querySelector('input[name="product-price"]').value;
  const message = document.getElementById("product-message");

  // Input validation
  if (!productid || (!curname && !curprice)) {
    message.textContent = "Please provide the inputs to update the product.";
    return false;
  }

  // Find the product by ID
  let productToBeFound = products.find((i) => i.id == productid);
  if (!productToBeFound) {
    message.textContent = `Product with ID ${productid} not found.`;
    return false;
  }

  // Update product details
  if (curname.length !== 0) {
    productToBeFound.name = curname;
  }
  if (curprice.length !== 0) {
    productToBeFound.price = curprice;
  }

  message.textContent = "Product Updated Successfully!";
  return true;
};

//add discount
const addDiscount = (discount) => {
  const discountMessage = document.getElementById("discount-message");
  const productList = document
    .getElementById("apply-discount-message")
    .querySelector("tbody");
  productList.innerHTML = "";

  if (!discount || isNaN(discount) || discount <= 0) {
    discountMessage.textContent = "Please provide a valid discount percentage.";
    return;
  }
  const dupProducts = products.map((i) => {
    const dupelement = { ...i };
    dupelement.price = dupelement.price - (dupelement.price * discount) / 100;
    return dupelement;
  });
  dupProducts.forEach((product) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = product.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    const priceCell = document.createElement("td");
    priceCell.textContent = product.price.toFixed(2); // To display price with two decimals

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);

    productList.appendChild(row);
  });
  discountMessage.textContent = `Discount of ${discount}% applied successfully!`;
};

document.addEventListener("DOMContentLoaded", () => {
  const addbtn = document.getElementById("add-product-btn");
  addbtn.addEventListener("click", () => {
    let newid = document.querySelector('input[name="product-id"]').value;
    let newname = document.querySelector('input[name="product-name"]').value;
    let newprice = document.querySelector('input[name="product-price"]').value;
    addproducts({ id: newid, name: newname, price: newprice });
  });

  const viewbtn = document.getElementById("view-product-btn");
  viewbtn.addEventListener("click", () => {
    viewProducts(products);
  });

  const updatebtn = document.getElementById("update-product-btn");
  updatebtn.addEventListener("click", () => {
    const curid = document.querySelector('input[name="product-id"]').value;
    updateproducts(curid);
  });

  const discountbtn = document.getElementById("apply-discount-btn");
  discountbtn.addEventListener("click", () => {
    const ip = document.getElementById("discount-percentage").value;
    addDiscount(ip);
  });
});
