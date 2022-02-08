// Je récupère l'endroit où je veux afficher mes produits au panier
let article = document.querySelector("article");
// console.log(article);

// Depuis la page Panier, récupérer le panier (l’array) via localStorage
let canapeSelected = JSON.parse(localStorage.getItem('canape'));
// console.log(canapeSelected);

// Je parcours l’array de mon localStorage
let productInCart = JSON.parse(localStorage.getItem('canape'));

for (let canape of productInCart) {
    
// Je créé et insére les éléments du localStorage dans la page Panier
canapeAfficher = `
                <div class="cart__item__img">
                <img src="${canape.imageURL}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>${canape.colors}</p>
                    <p>42,00 €</p>
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
            `;
article.insertAdjacentHTML('afterbegin', canapeAfficher);

console.log(canape);
}

/*
<div class="cart__price">
<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
</div>
<div class="cart__order">
<form method="get" class="cart__order__form">
  <div class="cart__order__form__question">
    <label for="firstName">Prénom: </label>
    <input type="text" name="firstName" id="firstName" required>
    <p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>
  </div>
  <div class="cart__order__form__question">
    <label for="lastName">Nom: </label>
    <input type="text" name="lastName" id="lastName" required>
    <p id="lastNameErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="address">Adresse: </label>
    <input type="text" name="address" id="address" required>
    <p id="addressErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="city">Ville: </label>
    <input type="text" name="city" id="city" required>
    <p id="cityErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="email">Email: </label>
    <input type="email" name="email" id="email" required>
    <p id="emailErrorMsg"></p>
  </div>
  <div class="cart__order__form__submit">
    <input type="submit" value="Commander !" id="order">
  </div>
</form>
</div>
*/