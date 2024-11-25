document.addEventListener("DOMContentLoaded", () => {
  const pms = document.getElementById("pms");
  const ops = document.getElementById("ops");

  function navigateTo(url) {
    window.open(url, "_blank"); // Redirect to the given URL
  }
  pms.addEventListener("click", () => {
    navigateTo("/Annalect_JS_Training/Product_Management_System/index.html");
  });
  ops.addEventListener("click", () => {
    navigateTo("/Annalect_JS_Training/Order_Processing_System/prob2.html");
  });
});
