// Je récupère l'endroit où je veux afficher mes produits au panier
let article = document.getElementById("cart__items");
// console.log(article);

// Depuis la page Panier, récupérer le panier (l’array) via localStorage
let productInCart = JSON.parse(localStorage.getItem("canape"));
// console.log(productInCart);

// Je déclare toutes mes variables
let displayCanape = "";

// Je récupère le localStorage existant et j'ajoute des produits directement depuis la page panier
function displayCart() {
  let productsInCart = JSON.parse(localStorage.getItem("canape"));
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
        priceProductInCart = priceProductInCart + value.price * canape.quantity;
        totalPrice.innerHTML = priceProductInCart;

        quantityProductInCart =
          quantityProductInCart + parseInt(canape.quantity);
        totalQuantity.innerHTML = quantityProductInCart;
      });
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
      displayCanape = `
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
      article.insertAdjacentHTML("afterbegin", displayCanape);

      // J'affiche le total en quantité et en prix
      displayCart();

      // J'ajoute ou supprime des canapés au click sur l'input
      document.querySelectorAll(".itemQuantity").forEach((element, index) => {
        element.addEventListener("change", (e) => {
          e.preventDefault();
          // Si l'event se passe => la quantité a été modifiée :
          // récupérer le canape du localStorage qui a la même ID et
          // remplacer par la nouvelle quantité
          let newQuantity = document.getElementsByClassName("itemQuantity");
          productInCart[index].quantity = parseInt(newQuantity[index].value);
          localStorage.setItem("canape", JSON.stringify(productInCart));
          // J'affiche le total en quantité et en prix
          displayCart();
        });
      });

      // Au click du bouton supprimer, je retire le produit du localStorage
      let deleteCart = document.querySelectorAll(".deleteItem");

      deleteCart.forEach((el, index) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          // Si l'event se passe => le click sur "supprimer" :
          // supprimer le canape du localStorage qui a la même ID et
          productInCart.splice(index, 1);
          localStorage.setItem("canape", JSON.stringify(productInCart));
          // supprimer le bloc HTML <article> du produit et
          let selectProductToDelete = deleteCart[index].closest(".cart__item");
          selectProductToDelete.remove();
          // recalculer le total de produits et de prix
          displayCart();
        });
      });
    });
}
// FORMULAIRE

// Validation des données du formulaire

// Quand je clique sur le bouton "commander"
// si tous mes champs sont remplis
// et que les données sont validées
// alors, j'envoie mon formulaire

let regexLetters =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
let regexAddress =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'1-9]+$/u;
let regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let orderSubmit = document.getElementById("order");

orderSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  function validationFirstName() {
    let inputFirstName = document.getElementById("firstName").value;
    let messageFirstName = document.getElementById("firstNameErrorMsg");
    if (regexLetters.test(inputFirstName) == true) {
      messageFirstName.innerText = "Prénom valide.";
    } else if (inputFirstName == "") {
      messageFirstName.innerText = "Merci d'entrer un prénom.";
    } else {
      messageFirstName.innerText =
        "Le prénom doit comporter des lettres et des tirets uniquement.";
    }
  }

  function validationLastName() {
    let inputLastName = document.getElementById("lastName").value;
    let messageLastName = document.getElementById("lastNameErrorMsg");
    if (regexLetters.test(inputLastName) == true) {
      messageLastName.innerText = "Nom valide.";
    } else if (inputLastName == "") {
      messageLastName.innerText = "Merci d'entrer un nom.";
    } else {
      messageLastName.innerText =
        "Le nom doit comporter des lettres et des tirets uniquement.";
    }
  }

  function validationAddress() {
    let inputAddress = document.getElementById("address").value;
    let messageAddress = document.getElementById("addressErrorMsg");
    if (regexAddress.test(inputAddress) == true) {
      messageAddress.innerText = "Adresse valide.";
    } else if (inputAddress == "") {
      messageAddress.innerText = "Merci d'entrer une adresse.";
    } else {
      messageAddress.innerText =
        "Le nom doit comporter des lettres et des tirets uniquement.";
    }
  }

  function validationCity() {
    let inputCity = document.getElementById("city").value;
    let messageCity = document.getElementById("cityErrorMsg");
    if (regexLetters.test(inputCity) == true) {
      messageCity.innerText = "Ville valide.";
    } else if (inputCity == "") {
      messageCity.innerText = "Merci d'entrer une ville.";
    } else {
      messageCity.innerText = "Merci d'entrer des caractères valides.";
    }
  }

  function validationEmail() {
    let inputEmail = document.getElementById("email").value;
    let messageEmail = document.getElementById("emailErrorMsg");
    if (regexEmail.test(inputEmail) == true) {
      messageEmail.innerText = "Email valide.";
      return true;
    } else if (inputEmail == "") {
      messageEmail.innerText = "Merci d'entrer une ville.";
    } else {
      messageEmail.innerText = "Merci d'entrer des caractères valides.";
    }
    return false;
  }

  validationFirstName();
  validationLastName();
  validationAddress();
  validationCity();
  validationEmail();
});

/*

// J'envoie la commande

let informationsToOrder = {
  "contact": {
    "firstName": inputFirstName,
    "lastName": inputLastName,
    "address": inputAddress,
    "city": inputCity,
    "email": inputEmail,
  },
  "products": [

  ]
};

let urlOrder = "http://localhost:3000/api/products/order";

let order = {
  method: 'POST',
  body: JSON.stringify(informationsToOrder)
};

// J'envoie les informations à l'API

fetch(urlOrder, order)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
    console.log(res);
  })

*/
