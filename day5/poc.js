document.addEventListener("DOMContentLoaded", () => {
  const x = document.getElementById("btn");
  x.addEventListener("click", () => {
    let content = document.getElementById("t1");
    let out = parseInt(content.value) + 1;
    let spanElement = document.getElementById("out");
    spanElement.innerHTML = out;
  });
});
