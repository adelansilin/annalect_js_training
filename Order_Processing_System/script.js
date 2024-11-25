const products = [
  {
    id: 1,
    name: "Screwdriver",
    category: "Tools",
    price: 10.5,
  },
  {
    id: 2,
    name: "Hammer",
    category: "Tools",
    price: 12.75,
  },
  {
    id: 3,
    name: "Wrench",
    category: "Tools",
    price: 15.0,
  },
  {
    id: 4,
    name: "Drill",
    category: "Power Tools",
    price: 55.0,
  },
  {
    id: 5,
    name: "Nail Gun",
    category: "Power Tools",
    price: 90.0,
  },
  {
    id: 6,
    name: "Saw",
    category: "Tools",
    price: 20.0,
  },
  {
    id: 7,
    name: "Laser Cutter",
    category: "Machines",
    price: 500.0,
  },
  {
    id: 8,
    name: "Band Saw",
    category: "Machines",
    price: 250.0,
  },
];

const Orders = [
  {
    id: 1,
    name: "cynthia",
    contactno: 8273929731,
    listOfProducts: [
      { id: 1, name: "Hammer", price: 12.75 },
      { id: 2, name: "Band Saw", price: 250.0 },
    ],
    totalAmount: 162.75,
  },
];

//display products on dropdown
function dropdownDisplay(productArray) {
  const productList = document.getElementById("products");
  productArray.forEach((product) => {
    const option = document.createElement("option");
    option.textContent = `${product.name}`;
    productList.appendChild(option);
  });
}

//find product
function findProductByName(name) {
  const curProduct = products.find((product) => product.name == name);
  return curProduct;
}
//add orders
let curOrder = null;
let id = 1;
function addOrders() {
  const customerName = document.querySelector(
    'input[name = "customer-name"]'
  ).value;
  const customerNum = document.querySelector('input[name = "phn-no"]').value;
  const curProductName = document.getElementById("products").value;
  const message = document.getElementById("place-order-message");
  const addBtn = document.getElementById("add-btn");

  if (!customerName || !customerNum || !curProductName) {
    message.innerText = "Please fill in all the fields and select a product.";
    return;
  }

  if (!curOrder) {
    document.getElementById("order-list-body").innerText = "";
    curOrder = {
      id: id++,
      name: customerName,
      contactno: customerNum,
      listOfProducts: [],
      totalAmount: 0,
    };
  }

  const product = findProductByName(curProductName);

  if (product) {
    curOrder.listOfProducts.push({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    curOrder.totalAmount += product.price;
    message.innerText = `${product.name} added to the order.`;
    const productList = document.getElementById("order-list-body");
    const liout = document.createElement("li");
    liout.textContent = `product id : ${product.id} - product name : ${product.name} - price : ${product.price}`;
    // Add delete button to the list item
    const deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = "&#128465;";
    deleteIcon.classList.add("delete-icon");

    // Attach delete functionality
    deleteIcon.addEventListener("click", () => {
      // Remove the product from the current order
      const index = curOrder.listOfProducts.findIndex(
        (p) => p.id === product.id
      );
      if (index !== -1) {
        curOrder.totalAmount -= curOrder.listOfProducts[index].price;
        curOrder.listOfProducts.splice(index, 1);

        // Remove the list item from the UI
        productList.removeChild(liout);

        // Update the message
        message.innerText = `Removed ${product.name} from the order.`;
      }
    });

    liout.appendChild(deleteIcon);
    productList.appendChild(liout);
  } else {
    message.innerText = "Product not found.";
  }
}

//place order
function placeOrder() {
  const message = document.getElementById("place-order-message");
  if (curOrder) {
    Orders.push(curOrder);
    message.innerText = `Order placed successfully for ${curOrder.name}. Total: $${curOrder.totalAmount}`;
    curOrder = null;
    document.querySelector('input[name = "customer-name"]').value = "";
    document.querySelector('input[name = "phn-no"]').value = "";
    document.getElementById("products").value = "";
  } else {
    message.innerText = "No order to place. Please add products first.";
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   dropdownDisplay(products);
//   const addBtn = document.getElementById("add-btn");
//   addBtn.addEventListener("click", () => {
//     addOrders();
//   });
//   const placeOrderBtn = document.getElementById("place-order-btn");
//   placeOrderBtn.addEventListener("click", () => {
//     placeOrder();
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.querySelector(".cart-button");
  const orderList = document.querySelector(".order-list");
  const closeButton = document.querySelector(".close-button");
  const addBtn = document.getElementById("add-btn");
  const placeOrderBtn = document.getElementById("place-order-btn");

  // Toggle the order list panel
  cartButton.addEventListener("click", () => {
    orderList.classList.add("active");
  });

  // Close the order list panel
  closeButton.addEventListener("click", () => {
    orderList.classList.remove("active");
  });

  // Initialize dropdown and order placement logic
  dropdownDisplay(products);
  addBtn.addEventListener("click", () => {
    addOrders();
  });

  placeOrderBtn.addEventListener("click", () => {
    placeOrder();
  });
});
