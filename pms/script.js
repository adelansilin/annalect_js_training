//addAProduct
let products = [
  { id: 1, name: "iPhone", price: 3000 },
  { id: 2, name: "Samsung", price: 5000 },
  { id: 3, name: "Realme", price: 8000 },
];
const addproducts = (product) => {
  if (!products.find((i) => i.id == product.id)) {
    products.push(product);
    console.log("Product Added Successfully!");
    let message = document.getElementById("product-message");
    message.textContent = "Product Added Successfully!";
    return true;
  } else {
    return false;
  }
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

//update product
const updateproducts = (productid) => {
  let productToBeFound = products.find((i) => i.id == productid);
  if (productToBeFound) {
    const curname = document.querySelector(
      'input[name = "product-name"]'
    ).value;
    const curprice = document.querySelector(
      'input[name = "product-price"]'
    ).value;

    if (curname.length !== 0) {
      productToBeFound.name = curname;
    }
    if (curprice.length !== 0) {
      productToBeFound.price = curprice;
    }

    let message = document.getElementById("product-message");
    message.textContent = "Product Updated Successfully!";
  }
};

//add discount
const addDiscount = (discount) => {
  const productList = document
    .getElementById("apply-discount-message")
    .querySelector("tbody");
  productList.innerHTML = ""; // Clear any existing content

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
