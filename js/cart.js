// Je récupère l'endroit où je veux afficher mes produits au panier
let article = document.getElementById('cart__items');
// console.log(article);

// Depuis la page Panier, récupérer le panier (l’array) via localStorage
let productInCart = JSON.parse(localStorage.getItem('canape'));
// console.log(productInCart);

// Je déclare toutes mes variables
let canapeAfficher = "";

// Je récupère le localStorage existant et j'ajoute des produits directement depuis la page panier
function displayCart() {
  let productsInCart = JSON.parse(localStorage.getItem('canape'));
  let priceProductInCart = 0;
  let quantityProductInCart = 0;
  let totalQuantity = document.getElementById("totalQuantity");
  let totalPrice = document.getElementById("totalPrice");
  for (let canape of productsInCart) {
    let idProductInCart = canape._id;
    fetch("http://localhost:3000/api/products/" + idProductInCart)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      // Je créé et insére les éléments du localStorage dans la page Panier
      .then((value) => {
        priceProductInCart = priceProductInCart + (value.price * canape.quantity);
        totalPrice.innerHTML = priceProductInCart;

        quantityProductInCart = quantityProductInCart + parseInt(canape.quantity);
        totalQuantity.innerHTML = quantityProductInCart;
      })
  }
}

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

      // J'affiche le total en quantité et en prix
      displayCart();

      // J'ajoute ou supprime des canapés au click sur l'input
      document.querySelectorAll("input").forEach((element, index) => {
        element.addEventListener("change", (e) => {
          e.preventDefault();
          console.log(index);
          // Si l'event se passe => la quantité a été modifiée, 
          // récupérer le canape du localStorage qui a la même ID et 
          // remplacer par la nouvelle quantité
          let newQuantity = document.getElementsByClassName("itemQuantity");
          productInCart[index].quantity = newQuantity[index].value;
          localStorage.setItem('canape', JSON.stringify(productInCart));
          // J'affiche le total en quantité et en prix
          displayCart();
        })
      })
    })
}










/*
if (e) {
  let canapeLocalStorage = JSON.parse(localStorage.getItem("canape"));
  let quantityUpdateInCart = parseInt(e.target.value);
  let newCanapeUpdate = {
    _id: idProductInCart,
    colors: canape.colors,
    quantity: parseInt(quantityUpdateInCart),
  };
  canapeLocalStorage.push(newCanapeUpdate);
  localStorage.setItem("canape", JSON.stringify(canapeLocalStorage));
  
  //localStorage.setItem("canapechange", JSON.stringify(newCanapeUpdate));
  //let canapeCompile = canape.concat(newCanapeUpdate);
  //localStorage.setItem("canapeCompile", JSON.stringify(canapeCompile));

  //let quantityInLocalStorage = canape.quantity;
  

  // let quantityAddedFromCart = parseInt(e.target.value);
  // let sumQuantityInCart = canape.quantity + quantityAddedFromCart;
  // newQuantityInCart.textContent = `${sumQuantityInCart}`;

  // let sumPriceInCart = value.price * quantityAddedFromCart;
  // newPriceInCart.textContent = `${sumPriceInCart}`;
}
*/



/*
// Je supprime les éléments au click du bouton supprimer du panier
let buttonToEmptyCart = document.getElementsByClassName("deleteItem");
console.log(buttonToEmptyCart);

for (let s = 0; 1 < buttonToEmptyCart.length; s++) {
  buttonToEmptyCart[s].addEventListener("click", (event) => {
    event.preventDefault();

    let idSelectedToSupress = productInCart[s].idProductInCart;
  })
}
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

