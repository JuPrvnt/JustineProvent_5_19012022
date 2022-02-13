// Je récupère l'endroit où je veux afficher mes produits au panier
let article = document.getElementById('cart__items');
// console.log(article);

// Depuis la page Panier, récupérer le panier (l’array) via localStorage
let productInCart = JSON.parse(localStorage.getItem('canape'));
// console.log(productInCart);

// Je déclare toutes mes variables
let canapeAfficher = "";
let priceProductInCart = 0;
let quantityProductInCart = 0;
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
// let deleteCart = document.getElementsByClassName("deleteItem");

// Je parcours l’array de mon localStorage
// Je connecte le site à l'API : si j'ai un résultat correspondant, je retourne le résultat de l'API, sinon, message d'erreur

for (let canape of productInCart) {
  // console.log(canape._id);
  let idProductInCart = canape._id;
  // console.log(idProductInCart);

  fetch("http://localhost:3000/api/products/" + idProductInCart)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    // Je créé et insére les éléments du localStorage dans la page Panier
    .then((value) => {
      canapeAfficher = `
                <article class="cart__item" data-id="${value._id}" data-color="${value.colors}">
                <div class="cart__item__img">
                <img src="${value.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${value.name}</h2>
                    <p>${canape.colors}</p>
                    <p>${value.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canape.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
                </article> 
            `;
      article.insertAdjacentHTML('afterbegin', canapeAfficher);
      // console.log(canape);

      // J'affiche le total en quantité et en prix
      priceProductInCart += value.price * canape.quantity;
      totalPrice.innerHTML = priceProductInCart;

      quantityProductInCart += canape.quantity;
      totalQuantity.innerHTML = quantityProductInCart;

      // Je récupère le localStorage existant et j'ajoute des produits directement depuis la page panier

      let newQuantityInCart = document.getElementById("totalQuantity");
      let newPriceInCart = document.getElementById("totalPrice");

      document.querySelectorAll("input").forEach((element) => {
        element.addEventListener("change", (e) => {
          e.preventDefault();
          let quantityAddedFromCart = parseInt(e.target.value);
          let sumQuantityInCart = canape.quantity + quantityAddedFromCart;
          newQuantityInCart.textContent = `${sumQuantityInCart}`;

          let sumPriceInCart = value.price * quantityAddedFromCart;
          newPriceInCart.textContent = `${sumPriceInCart}`;
        })
      })
    })
}


/*
    // Je supprime du panier au click du bouton "supprimer"
    .then(() => {
      deleteCart.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem();
      })
    })
      const buttonToEmptyCart = document.querySelector(".to-empty-cart");
  buttonToEmptyCart.addEventListener("click", () => {
    localStorage.clear();
  });
        if (quantityAddedFromCart.value > canape.quantity) {
        quantityProductInCart += canape.quantity;
        totalQuantity.innerHTML = quantityAddedFromCart;
      }
      console.log(quantityAddedFromCart);
    }



        let newQuantityInCart = document.getElementById("totalQuantity");
        // let totalInCart = quantityProductInCart + parseInt(event.target.value);
        // newQuantityInCart.textContent = `${totalInCart}`;

        let canapeLocalStorage = JSON.parse(localStorage.getItem("canape"));

        canapeLocalStorage.forEach(element => {
          element.quantity = quantityProductInCart + parseInt(event.target.value);
          const newQuantityCanape = JSON.stringify(canapeLocalStorage);
          localStorage.setItem("canape", newQuantityCanape);
          newQuantityInCart.textContent = `${canape.quantity}`;
        })
*/

