// Je récupère l'endroit où je veux afficher mes produits au panier
let article = document.getElementById('cart__items');
let deleteCart = document.getElementsByClassName("deleteItem");
// console.log(article);

// Depuis la page Panier, récupérer le panier (l’array) via localStorage
let productInCart = JSON.parse(localStorage.getItem('canape'));
// console.log(productInCart);

// Je parcours l’array de mon localStorage
// Je connecte le site à l'API : si j'ai un résultat correspondant, je retourne le résultat de l'API, sinon, message d'erreur
let canapeAfficher = "";

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
      canapeAfficher += `
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
    })
}

// J'additionne et j'affiche le total
let priceProductInCart = [value.price];
console.log(priceProductInCart);
let sum = 0;
for (let t = 0; t < priceProductInCart.length; t++) {
  sum += priceProductInCart[t];
}
console.log(sum);

/*
    // Je supprime du panier au click du bouton "supprimer"
    .then(() => {
      deleteCart.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem();
      })
    })
*/

