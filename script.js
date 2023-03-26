let products = [];
window.onload = async () => {
  await loadProducts();

  async function loadProducts() {
    const response = await fetch("products.json");
    const data = await response.json();
    products = data.products;
    let grid = "";
    products.forEach((product, i) => {
      grid += `
      <div onclick="productDetails(${i})" class="grid-item">
        <img
          width="100%"
          height="450px"
          src="${product.imagemUrl}"
          alt=""
        />
        <div class="product-title">
          <h1 class="product-name">${product.name}</h1>
          <p class="product-description">${product.description.match(
            /^.*?\./
          )}</p>
            <h1 class="product-price">R$${Number(product.price).toFixed(2)}</h1>
        </div>
      </div>`;
    });
    document.querySelector(".grid").innerHTML = grid;
  }
};

var modal = document.querySelector(".modal");
var modalContent = document.querySelector(".modal-content");

function productDetails(productIndex) {
  // When the modal is shown, we want a fixed body
  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  modal.style.top = `-${scrollY}`;

  const product = products[productIndex];
  modalContent.innerHTML = `
    <img
        height="700px"
        src="${product.imagemUrl}"
        alt=""
    />
    <div class="modal-text">
        <div class="modal-title">
            <h1>${product.name}</h1>
            <h2>R$${Number(product.price).toFixed(2)}</h2>
            <div>
                <h3>Descrição</h3>
                <p class="product-description">${product.description}</p>
            </div>
        </div>
        <button onclick="closeModal()" class="btn">Fechar</button>
    </div>
  `;

  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  //
  const scrollY = body.style.top;
  modal.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  //
}

//
window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
});
//
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
