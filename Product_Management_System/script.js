//addAProduct
let products = [
  { id: 1, name: "apple", price: 3000 },
  { id: 2, name: "samsung", price: 5000 },
  { id: 3, name: "realme", price: 8000 },
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
  const productList = document.getElementById("view-products");
  productList.innerHTML = "";

  productArray.forEach((product) => {
    const liout = document.createElement("li");
    liout.textContent = `productID : ${product.id} - Product Name : ${product.name} - Product Price : ${product.price}`;
    productList.appendChild(liout);
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
  const productList = document.getElementById("apply-discount-message");
  productList.innerHTML = "";
  const dupProducts = products.map((i) => {
    const dupelement = { ...i };
    dupelement.price = dupelement.price - (dupelement.price * discount) / 100;
    return dupelement;
  });
  dupProducts.forEach((product) => {
    const liout = document.createElement("li");
    liout.textContent = `productID : ${product.id} - Product Name : ${product.name} - Product Price : ${product.price}`;
    productList.appendChild(liout);
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
